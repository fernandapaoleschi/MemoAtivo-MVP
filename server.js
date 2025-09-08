import express from "express";
import OpenAI from "openai";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  console.error("❌ ERRO: OPENAI_API_KEY não encontrada no .env");
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/generate-flashcards", async (req, res) => {
  try {
    const { description, count } = req.body;

    const prompt = `
Você é um gerador de flashcards educacionais para estudantes do Ensino Médio, seguindo a BNCC.
O objetivo é apoiar a memorização através de perguntas curtas e respostas objetivas.

Regras:
- Gere exatamente ${count} flashcards.
- Cada flashcard deve ter {"question": "...", "answer": "..."}.
- A pergunta deve ser direta e clara.
- A resposta deve ser curta e objetiva.
- Se o conteúdo for de Matemática, Física ou Química, inclua a fórmula necessária (em notação matemática clara).
- Não use textos longos, apenas o essencial para memorização.
- Não escreva nada fora do JSON (sem explicações, sem markdown, sem \`\`\`).

Formato esperado (JSON puro):
[
  { "question": "Pergunta 1", "answer": "Resposta 1" },
  { "question": "Pergunta 2", "answer": "Resposta 2" }
]

Tema: "${description}"
    `;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    let text = response.choices[0].message.content.trim();

    // 🔎 Extrai apenas o array JSON caso venha texto extra
    const bracketMatch = text.match(/\[.*\]/s);
    if (bracketMatch) {
      text = bracketMatch[0];
    }

    let flashcards = [];
    try {
      flashcards = JSON.parse(text);

      // Garante que seja um array de objetos
      if (!Array.isArray(flashcards)) {
        throw new Error("Resposta não é um array válido");
      }
    } catch (e) {
      console.error("❌ Erro ao fazer parse do JSON:", e, "\nResposta recebida:", text);
      flashcards = [];
    }

    res.json({ result: flashcards });
  } catch (error) {
    console.error("Erro no servidor:", error);
    res.status(500).json({ error: "Erro ao gerar flashcards" });
  }
});

app.listen(5000, () =>
  console.log("Servidor rodando em http://localhost:5000")
);