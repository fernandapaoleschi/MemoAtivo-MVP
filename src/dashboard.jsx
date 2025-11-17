import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Brain,
  Plus,
  Clock,
  Target,
  Zap,
  Settings,
  Bell,
  BarChart3,
  Calendar,
  Trophy,
  Sparkles,
  Upload,
  ArrowLeft,
  ChevronRight,
  X,
} from 'lucide-react';

// --- DADOS INICIAIS ---
const studyAreasData = [
  {
    id: "matematica",
    name: "Matemática",
    emoji: "📐",
    color: "primary",
    bgGradient: "bg-gradient-to-br from-blue-50 to-blue-100",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
    buttonColor: "border-blue-700 text-blue-700",
    hoverButtonColor: "hover:bg-blue-700 hover:text-white",
    
    topics: [
      {
        id: "funcoes",
        name: "Funções",
        cardCount: 15,
        status: "active",
        flashcards: [
          {
            id: "f1",
            question: "O que é uma função quadrática?",
            answer: "Uma função quadrática é uma função polinomial de segundo grau, da forma f(x) = ax² + bx + c, onde a ≠ 0.",
            difficulty: "medium",
            status: "learning",
          },
        ],
      },
      {
        id: "geometria",
        name: "Geometria",
        cardCount: 18,
        status: "active",
        flashcards: [
          {
            id: "g1",
            question: "Qual é a fórmula da área de um círculo?",
            answer: "A = πr²",
            difficulty: "easy",
            status: "mastered",
          },
        ],
      },
      { id: "algebra", name: "Álgebra", cardCount: 12, status: "completed", flashcards: [] },
    ],
  },
  {
    id: "historia",
    name: "História",
    emoji: "🏛️",
    color: "secondary",
    bgGradient: "bg-gradient-to-br from-cyan-50 to-cyan-100",
    borderColor: "border-cyan-200",
    textColor: "text-cyan-800",
    buttonColor: "border-cyan-700 text-cyan-800",
    hoverButtonColor: "hover:bg-cyan-700 hover:text-white",
    
    topics: [
      { id: "brasil-colonial", name: "Brasil Colonial", cardCount: 16, status: "active", flashcards: [] },
      { id: "republica", name: "República", cardCount: 12, status: "completed", flashcards: [] }
    ]
  },
  {
    id: "biologia",
    name: "Biologia",
    emoji: "🧬",
    color: "green",
    bgGradient: "bg-gradient-to-br from-green-50 to-green-100",
    borderColor: "border-green-200",
    textColor: "text-green-700",
    buttonColor: "border-green-600 text-green-700",
    hoverButtonColor: "hover:bg-green-600 hover:text-white",
    
    topics: [
      { id: "genetica", name: "Genética", cardCount: 20, status: "active", flashcards: [] },
      { id: "citologia", name: "Citologia", cardCount: 18, status: "active", flashcards: [] },
      { id: "ecologia", name: "Ecologia", cardCount: 14, status: "completed", flashcards: [] }
    ]
  },
  // ... (continuação do initialStudyAreas)
  {
    id: "quimica",
    name: "Química",
    emoji: "⚗️",
    color: "accent",
    bgGradient: "bg-gradient-to-br from-yellow-50 to-yellow-100",
    borderColor: "border-yellow-200",
    textColor: "text-amber-800",
    buttonColor: "border-amber-700 text-amber-800",
    hoverButtonColor: "hover:bg-amber-700 hover:text-white",
    
    topics: [
      // Tópico 1: Orgânica (com 2 cards de exemplo)
      {
        id: "organica",
        name: "Orgânica",
        cardCount: 2, // Corrigido
        status: "active", // ou o status que preferir
        lastReviewed: "",
        flashcards: [
          {
            id: "q1",
            question: "O que é um carbono quiral?",
            answer: "É um átomo de carbono que está ligado a quatro grupos diferentes.",
            difficulty: "medium",
            status: "new",
          },
          {
            id: "q2",
            question: "Qual é a fórmula geral de um alcano?",
            answer: "CnH2n+2",
            difficulty: "easy",
            status: "learning",
          }
        ]
      },
      // Tópico 2: Inorgânica (com 2 cards de exemplo)
      {
        id: "inorganica",
        name: "Inorgânica",
        cardCount: 2, // Corrigido
        status: "active",
        flashcards: [
          {
            id: "q3",
            question: "O que é uma ligação iônica?",
            answer: "É a ligação formada pela atração eletrostática entre íons de cargas opostas.",
            difficulty: "easy",
            status: "new"
          },
          {
            id: "q4",
            question: "Qual é o nome do composto H2SO4?",
            answer: "Ácido Sulfúrico.",
            difficulty: "easy",
            status: "new"
          }
        ]
      },
      // Tópico 3: Físico-Química (com 1 card de exemplo)
      {
        id: "fisico-quimica",
        name: "Físico-Química",
        cardCount: 1, // Corrigido
        status: "completed",
        flashcards: [
          {
            id: "q5",
            question: "O que é entalpia?",
            answer: "É a medida da energia total em um sistema termodinâmico.",
            difficulty: "medium",
            status: "mastered" // 'mastered' para testar a lógica do botão
          }
        ]
      }
    ]
  },
];

// --- PROCESSAMENTO AUTOMÁTICO DOS TOTAIS (V2 - CORRIGIDO) ---
const initialStudyAreas = studyAreasData.map(area => {
  
  // 1. Processa os tópicos PRIMEIRO para corrigir o cardCount
  const processedTopics = area.topics.map(topic => {
    // Calcula o cardCount real com base no tamanho do array de flashcards
    const realCardCount = topic.flashcards.length; 
    
    return {
      ...topic,
      cardCount: realCardCount // <-- CORRIGE O cardCount (ex: Geometria de 18 para 1)
    };
  });

  // 2. Calcula o total de conjuntos (tópicos)
  const totalSets = processedTopics.length;
  
  // 3. Soma o 'cardCount' JÁ CORRIGIDO de cada tópico
  const totalCards = processedTopics.reduce((sum, topic) => sum + topic.cardCount, 0);

  // 4. Retorna a área com dados 100% corretos
  return {
    ...area,
    topics: processedTopics, // <-- Usa os tópicos já processados
    totalSets,
    totalCards
  };
});

// --- COMPONENTE PRINCIPAL ---
export default function MemoAtivoDashboard() {
  
  // 1. INICIALIZE O ESTADO DIRETAMENTE COM OS DADOS PADRÃO.
  const [studyAreas, setStudyAreas] = useState(initialStudyAreas);
  
  // 2. ADICIONE UM NOVO ESTADO DE CONTROLE DE CARREGAMENTO
  const [isLoading, setIsLoading] = useState(true); 

  // Mantenha todos os seus outros useStates aqui:
  const [currentView, setCurrentView] = useState("dashboard");
  const [selectedStudyArea, setSelectedStudyArea] = useState(null); 
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [studyMode, setStudyMode] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [studyCards, setStudyCards] = useState([]);
  const [sliderValue, setSliderValue] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTopicName, setNewTopicName] = useState("");
  const [selectedAreaId, setSelectedAreaId] = useState("");
  const [selectedTopicId, setSelectedTopicId] = useState("");
  const [flashcardCount, setFlashcardCount] = useState(5);
  const [isNewFlashcardModalOpen, setIsNewFlashcardModalOpen] = useState(false);
  const [iaDescription, setIaDescription] = useState("");
  const [numFlashcards, setNumFlashcards] = useState(5);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // 3. USE EFFECT PARA CARREGAR OS DADOS (APENAS UMA VEZ)
  useEffect(() => {
    const savedData = localStorage.getItem("memoAtivoStudyAreas");
    if (savedData && savedData !== "undefined" && savedData !== "null") {
      try {
        const parsedData = JSON.parse(savedData);
        setStudyAreas(parsedData); // Substitui o estado inicial pelos dados salvos
      } catch (e) {
        console.error("Erro ao carregar dados salvos, usando dados iniciais.", e);
      }
    }
    setIsLoading(false); // Marca que o carregamento inicial terminou
  }, []); // O array vazio [] garante que este efeito rode SÓ UMA VEZ.

  // 4. USE EFFECT PARA SALVAR OS DADOS (QUANDO MUDAM)
  useEffect(() => {
    // Só salva no localStorage APÓS o carregamento inicial ter sido concluído.
    if (!isLoading) {
      localStorage.setItem("memoAtivoStudyAreas", JSON.stringify(studyAreas));
    }
  }, [studyAreas, isLoading]); // Roda sempre que 'studyAreas' ou 'isLoading' mudar.
  useEffect(() => {
    // Se o toast aparecer...
    if (showSuccessToast) {
      // Cria um "alarme" (timer) para escondê-lo depois de 3 segundos
      const timer = setTimeout(() => {
        setShowSuccessToast(false);
      }, 3000); // 3000ms = 3 segundos

      // Limpa o alarme se o componente for fechado
      return () => clearTimeout(timer);
    }
  }, [showSuccessToast]); // Este efeito só roda quando [showSuccessToast] mudar 

  // --- LÓGICA DE NAVEGAÇÃO ---
  const handleStudyAreaClick = (studyArea) => { setSelectedStudyArea(studyArea); setCurrentView("study-area"); };
  const handleTopicClick = (topic) => { setSelectedTopic(topic); setCurrentView("topic"); };
  const handleBackToDashboard = () => { setCurrentView("dashboard"); setSelectedStudyArea(null); setSelectedTopic(null); };
  const handleBackToStudyArea = () => { setCurrentView("study-area"); setSelectedTopic(null); };
  const openNewTopicModal = () => setIsModalOpen(true);
  const closeNewTopicModal = () => setIsModalOpen(false);

  // --- LÓGICA DO MODAL ---
  const handleAddNewTopic = (e) => {
    e.preventDefault();
    if (!newTopicName.trim()) return;

    const newTopic = {
      id: Date.now().toString(),
      name: newTopicName,
      cardCount: 3,
      status: "active",
      flashcards: [
        { id: "1", front: "Exemplo de pergunta 1", back: "Resposta 1" },
        { id: "2", front: "Exemplo de pergunta 2", back: "Resposta 2" },
        { id: "3", front: "Exemplo de pergunta 3", back: "Resposta 3" },
      ],
    };

    const updatedAreas = studyAreas.map((area) => {
      if (area.id === selectedStudyArea.id) {
        return {
          ...area,
          topics: [...area.topics, newTopic],
          totalSets: area.totalSets + 1,
          totalCards: area.totalCards + newTopic.cardCount,
        };
      }
      return area;
    });

    setStudyAreas(updatedAreas);

    // 🔥 atualiza também a área selecionada
    const updatedSelected = updatedAreas.find(area => area.id === selectedStudyArea.id);
    setSelectedStudyArea(updatedSelected);

    setNewTopicName("");
    closeNewTopicModal();
  };

  //Deletar cards (CORRIGIDO E ROBUSTO - V3 - FINAL)
const handleDeleteCard = (areaId, topicId, cardIdToDelete) => {
  if (!window.confirm("Tem certeza que deseja excluir este flashcard?")) return;

  // --- Parte 1: Atualiza o estado principal (e o localStorage) ---
  // Isso é assíncrono, mas garante que os dados serão salvos corretamente.
  setStudyAreas((prevAreas) => {
    return prevAreas.map((area) => {
      // CORREÇÃO: Usa o 'areaId' que recebemos, não o 'selectedStudyArea'
      if (area.id !== areaId) return area;

      let cardsRemoved = 0;

      const updatedTopics = area.topics.map((topic) => {
        // CORREÇÃO: Usa o 'topicId' que recebemos, não o 'selectedTopic'
        if (topic.id !== topicId) return topic;

        const originalLength = topic.flashcards.length;
        const updatedFlashcards = topic.flashcards.filter(
          (card) => card.id !== cardIdToDelete
        );

        cardsRemoved = originalLength - updatedFlashcards.length;

        return {
          ...topic,
          flashcards: updatedFlashcards,
          cardCount: updatedFlashcards.length,
        };
      });

      return {
        ...area,
        topics: updatedTopics,
        totalCards: area.totalCards - cardsRemoved,
      };
    });
  });
  
  // --- Parte 2: Atualiza a UI (o estado local) IMEDIATAMENTE ---
  // Esta lógica agora roda de forma síncrona.
  
  // A) Se o tópico que estamos vendo na tela é o mesmo do card apagado...
  if (selectedTopic?.id === topicId) {
    setSelectedTopic((prevTopic) => {
      const updatedFlashcards = prevTopic.flashcards.filter(
        (card) => card.id !== cardIdToDelete
      );
      return {
        ...prevTopic,
        flashcards: updatedFlashcards,
        cardCount: updatedFlashcards.length,
      };
    });
  }
  
  // B) Se a área que estamos vendo na tela é a mesma do card apagado...
  // (Isso atualiza os contadores na tela de "study-area")
  if (selectedStudyArea?.id === areaId) {
     setSelectedStudyArea((prevArea) => {
        const updatedTopics = prevArea.topics.map(topic => {
           if (topic.id === topicId) {
               const updatedFlashcards = topic.flashcards.filter(
                   (card) => card.id !== cardIdToDelete
               );
               return {
                 ...topic,
                 flashcards: updatedFlashcards,
                 cardCount: updatedFlashcards.length
               };
           }
           return topic;
        });

        // Recalcula o total de cards da área
        const newTotalCards = updatedTopics.reduce((sum, topic) => sum + topic.cardCount, 0);

        return {
          ...prevArea,
          topics: updatedTopics,
          totalCards: newTotalCards
        };
     });
  }
};

  // --- LÓGICA DO MODO DE ESTUDO ---
  const startStudyMode = () => {
    if (selectedTopic) {
      
      // --- FILTRO CORRIGIDO (Verifica a data) ---
      const now = new Date();
      const cardsToStudy = selectedTopic.flashcards.filter(card => {
        // 1. Pega todos os cards 'Novos'
        if (card.status === "new") return true;
        
        // 2. Pega todos os cards 'Para Revisar' (agendados manualmente)
        if (card.status === "review") return true;
        
        // 3. Pega os 'Aprendendo' cuja data de revisão já chegou
        if (card.status === "learning" && new Date(card.reviewDate) <= now) {
          return true;
        }
        
        // Ignora o resto
        return false;
      });
      // ------------------------------------------

      if (cardsToStudy.length > 0) {
        setStudyCards(cardsToStudy);
        setCurrentCardIndex(0);
        setShowAnswer(false);
        setStudyMode(true);
      }
    }
  };
  const exitStudyMode = () => { setStudyMode(false); setStudyCards([]); };
  const revealAnswer = () => setShowAnswer(true);
  
  const markCard = (difficulty) => {
    const qualityMap = { hard: 1, medium: 2, easy: 3 };
    const quality = qualityMap[difficulty];

    // 1. Pega o card atual
    const currentCard = studyCards[currentCardIndex];

    // 2. Calcula os novos dados de repetição espaçada
    const updatedCard = calculateSpacedRepetition(currentCard, quality);

    // 3. Verifica se este é o último card da sessão
    const isLastCard = currentCardIndex >= studyCards.length - 1;

    // 4. Atualiza o estado 'studyAreas' (a fonte da verdade)
    setStudyAreas((prevAreas) =>
      prevAreas.map((area) => {
        // Se não for a área certa, não mexe
        if (area.id !== selectedStudyArea.id) return area;

        // É a área certa, atualiza os tópicos
        return {
          ...area,
          topics: area.topics.map((topic) => {
            // Se não for o tópico certo, não mexe
            if (topic.id !== selectedTopic.id) return topic;

            // É o tópico certo! Vamos atualizá-lo.
            
            // Primeiro, atualiza o flashcard que acabamos de estudar
            const updatedFlashcards = topic.flashcards.map((card) =>
              card.id === updatedCard.id ? updatedCard : card
            );

            // Segundo, verifica se a sessão terminou para atualizar o tópico
            if (isLastCard) {
              // Sessão terminou! Atualiza o card E o status do tópico
              return {
                ...topic,
                status: "active", // <-- Muda o status do TÓPICO
                lastReviewed: new Date().toISOString(),
                flashcards: updatedFlashcards, // <-- Salva o card atualizado
              };
            } else {
              // Sessão ainda não terminou. Apenas atualiza o card
              return {
                ...topic,
                flashcards: updatedFlashcards, // <-- Salva o card atualizado
              };
            }
          }),
        };
      })
    );

    // 5. Atualiza o estado local 'selectedTopic' para a UI reagir
    // (Isso é importante para a tela "topic" atualizar imediatamente)
    setSelectedTopic((prevTopic) => {
      const updatedFlashcards = prevTopic.flashcards.map((card) =>
        card.id === updatedCard.id ? updatedCard : card
      );
      
      if (isLastCard) {
        return {
          ...prevTopic,
          status: "active",
          lastReviewed: new Date().toISOString(),
          flashcards: updatedFlashcards,
        };
      } else {
        return {
          ...prevTopic,
          flashcards: updatedFlashcards,
        };
      }
    });

    // 6. Avança para o próximo card ou finaliza a sessão
    if (isLastCard) {
      exitStudyMode();
    } else {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowAnswer(false);
    }
  };

  // --- COMPONENTES DE UI REUTILIZÁVEIS ---
  const Header = ({ onBackClick }) => (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          {onBackClick && (<button onClick={onBackClick} className="mr-2 p-2 rounded-lg hover:bg-muted"><ArrowLeft className="h-5 w-5" /></button>)}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-bg-primary shadow-3d"><Brain className="h-6 w-6 text-primary-foreground" /></div>
          <h1 className="text-2xl font-bold text-primary font-heading">MemoAtivo</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-lg hover:bg-muted"><Bell className="h-5 w-5" /><span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">3</span></button>
          <button className="p-2 rounded-lg hover:bg-muted"><Settings className="h-5 w-5" /></button>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary font-semibold text-secondary-foreground shadow-3d">JD</div>
        </div>
      </div>
    </header>
  );

  
  const TopicBadge = ({ topic }) => {
    const now = new Date();
    
    // 1. Verifica se tem cartões "new"
    const hasNewCards = topic.flashcards.some(c => c.status === "new");
    
    // 2. Verifica se tem cartões "learning" vencidos
    const hasLearningDue = topic.flashcards.some(
      c => c.status === "learning" && new Date(c.reviewDate) <= now
    );

    // 3. Define se o badge deve ser vermelho
    // O badge é vermelho se:
    //   a) O status do tópico for "review" (o manual que corrigimos)
    //   b) Tiver cartões novos
    //   c) Tiver cartões de aprendizado vencidos
    const needsReview = topic.status === "review" || hasNewCards || hasLearningDue;
    
    // 4. Define se está completo
    // Só está completo se NÃO precisar de revisão e o status for "completed"
    const isCompleted = !needsReview && topic.status === 'completed';

    // 5. Define a cor e o texto
    let badgeClass = 'bg-muted text-muted-foreground'; // Padrão (active)
    let badgeText = `${topic.cardCount} cards`;

    if (needsReview) {
      badgeClass = 'bg-red-100 text-red-700';
      badgeText = 'Revisar hoje!';
    } else if (isCompleted) {
      badgeClass = 'bg-green-100 text-green-700';
    }

    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-lg ${badgeClass}`}>
        {badgeText}
      </span>
    );
  };
 const generateFlashcardsWithAI = async (description, count) => {
    try {
      const res = await fetch("http://localhost:5000/api/generate-flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, count }),
      });

      if (!res.ok) {
        // Se a resposta não for OK, lê a mensagem de erro do backend
        const errorData = await res.json().catch(() => ({ error: "Erro desconhecido ao ler a resposta" })); 
        throw new Error(errorData.error || `Erro no servidor: ${res.status}`);
      }

      const data = await res.json();

      // Apenas formata e retorna os NOVOS cards
      const flashcardsWithMeta = data.result.map((fc, i) => ({
        id: Date.now() + i,
        question: fc.question,
        answer: fc.answer,
        status: "new",
        difficulty: "médio",
      }));

      return flashcardsWithMeta; // <-- RETORNA APENAS OS CARDS NOVOS

    } catch (err) {
      console.error("Erro na chamada da IA:", err);
      alert(`Não foi possível gerar os flashcards: ${err.message}`);
      return null; // Retorna null em caso de erro
    }
  };
  // --- LÓGICA DE REPETIÇÃO ESPAÇADA (SRS) ---
  const calculateSpacedRepetition = (card, quality) => {
    // --- ✅ CHAVE DE TESTE (Modo Minutos vs. Modo Dias) ---
    //
    //   true  = os intervalos são em MINUTOS (para testar)
    //   false = os intervalos são em DIAS (para o app real)
    //
    const IS_TEST_MODE = true; 
    // ----------------------------------------------------

    const EASE_FACTOR_DEFAULT = 2.5;
    let easeFactor = card.easeFactor || EASE_FACTOR_DEFAULT;
    let interval = card.interval || 0;
    let repetitions = card.repetitions || 0;

    // --- LÓGICA (PROPORÇÃO 1:2:4 APROVADA) ---
    if (quality === 1) { // "Difícil"
      repetitions = 0;
      interval = IS_TEST_MODE ? 1 : 1; // 1 minuto ou 1 dia
      easeFactor = Math.max(1.3, easeFactor - 0.2); 
    
    } else if (quality === 2) { // "Médio"
      repetitions += 1;
      if (repetitions === 1) {
        interval = IS_TEST_MODE ? 2 : 2; // 2 minutos ou 2 dias
      } else if (repetitions === 2) {
        interval = IS_TEST_MODE ? 5 : 5; // 5 minutos ou 5 dias
      } else {  
        interval = Math.ceil(interval * easeFactor);
      }

    } else if (quality === 3) { // "Fácil"
      repetitions += 1;
      if (repetitions === 1) {
        interval = IS_TEST_MODE ? 4 : 4; // 4 minutos ou 4 dias
      } else if (repetitions === 2) {
        interval = IS_TEST_MODE ? 10 : 10; // 10 minutos ou 10 dias
      } else {
        interval = Math.ceil(interval * easeFactor);
      }
      easeFactor += 0.15; 
    }
    // ---------------------------------------------

    // Define a próxima data de revisão
    const today = new Date();
    const nextReviewDate = new Date(today);

    if (IS_TEST_MODE) {
      nextReviewDate.setMinutes(today.getMinutes() + interval);
    } else {
      nextReviewDate.setDate(today.getDate() + interval);
    }

    // Determina o novo status do card
    const masteredThreshold = IS_TEST_MODE ? 60 : 30; // 60 minutos ou 30 dias
    const newStatus = interval > masteredThreshold ? "mastered" : "learning";

    return {
      ...card,
      easeFactor,
      interval,
      repetitions,
      reviewDate: nextReviewDate.toISOString(),
      status: newStatus,
      lastReviewed: new Date().toISOString(),
    };
  };

  // --- VISTAS DA APLICAÇÃO ---

  if (studyMode && studyCards.length > 0) {
    const currentCard = studyCards[currentCardIndex];
    return (
      <div className="min-h-screen bg-background">
        {showSuccessToast && (
  <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] p-4 rounded-lg bg-green-600 text-white shadow-lg animate-pulse">
    <span className="font-bold">🎉 Flashcards gerados com sucesso!</span>
  </div>
)}
        <Header onBackClick={exitStudyMode} />
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2"><span className="text-sm text-muted-foreground">Progresso da Sessão</span><span className="text-sm font-medium">{Math.round(((currentCardIndex + 1) / studyCards.length) * 100)}%</span></div>
            <div className="h-2 w-full rounded-full bg-muted"><div className="h-2 rounded-full bg-primary" style={{ width: `${((currentCardIndex + 1) / studyCards.length) * 100}%` }}></div></div>
          </div>
          <div className="mx-auto max-w-4xl">
            <div className="min-h-[400px] rounded-lg border border-border bg-card p-8 text-center shadow-3d">
              {showAnswer ? (
                <div className="flex h-full flex-col items-center justify-center space-y-6">
                  <h2 className="text-2xl font-bold text-secondary font-heading">Resposta:</h2>
                  <p className="text-xl leading-relaxed text-muted-foreground">{currentCard.answer}</p>
                  <div className="w-full space-y-4 pt-6">
                    <p className="text-lg font-semibold text-muted-foreground">Como se saiu com esta pergunta?</p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                      <button onClick={() => markCard("hard")} className="flex-1 rounded-lg border-2 border-red-200 bg-red-50 py-3 px-6 text-red-700 shadow-3d hover:bg-red-100">😰 Difícil</button>
                      <button onClick={() => markCard("medium")} className="flex-1 rounded-lg border-2 border-yellow-200 bg-yellow-50 py-3 px-6 text-yellow-700 shadow-3d hover:bg-yellow-100">🤔 Médio</button>
                      <button onClick={() => markCard("easy")} className="flex-1 rounded-lg border-2 border-green-200 bg-green-50 py-3 px-6 text-green-700 shadow-3d hover:bg-green-100">😊 Fácil</button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex h-full flex-col items-center justify-center space-y-6">
                  <h2 className="text-2xl font-bold text-primary font-heading">Pergunta:</h2>
                  <p className="text-xl leading-relaxed text-muted-foreground">{currentCard.question}</p>
                  <button onClick={revealAnswer} className="rounded-lg bg-primary py-4 px-8 text-lg font-semibold text-primary-foreground shadow-3d transition-all duration-300 hover:shadow-3d-hover"><Brain className="mr-2 inline h-5 w-5" />Mostrar Resposta</button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (currentView === "topic" && selectedTopic && selectedStudyArea) {
    // calcula estatísticas simples
    const total = selectedTopic.flashcards.length;
    const novos = selectedTopic.flashcards.filter(c => c.status === "new").length;
    const aprendendo = selectedTopic.flashcards.filter(c => c.status === "learning").length;
    const revisar = selectedTopic.flashcards.filter(c => c.status === "review").length;
    const dominados = selectedTopic.flashcards.filter(c => c.status === "mastered").length;

    // --- ✅ CÁLCULO ATUALIZADO ---
    const now = new Date();
    // Calcula quantos cards "aprendendo" já estão vencidos
    const learningDue = selectedTopic.flashcards.filter(
        c => c.status === "learning" && new Date(c.reviewDate) <= now
    ).length;
    // O total para estudar é: Novos + Para Revisar + Aprendendo Vencidos
    const cardsDueCount = novos + revisar + learningDue;

    return (
      <div className="min-h-screen bg-background">
        {showSuccessToast && (
  <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] p-4 rounded-lg bg-green-600 text-white shadow-lg animate-pulse">
    <span className="font-bold">🎉 Flashcards gerados com sucesso!</span>
  </div>
)}
        <Header onBackClick={handleBackToStudyArea} />
        <main className="container mx-auto px-4 py-8 space-y-8">
          
          {/* Cabeçalho com breadcrumb */}
          <div>
            <p className="text-sm text-muted-foreground">
              {selectedStudyArea.name} → {selectedTopic.name}
            </p>
            <h1 className="text-4xl font-bold font-heading text-primary">
              {selectedTopic.name}
            </h1>
            <p className="text-muted-foreground">
              {total} flashcards • {selectedStudyArea.name}
            </p>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-lg bg-card p-4 shadow-3d text-center">
              <p className="text-sm text-muted-foreground">Novos</p>
              <p className="text-2xl font-bold text-primary">{novos}</p>
            </div>
            <div className="rounded-lg bg-card p-4 shadow-3d text-center">
              <p className="text-sm text-muted-foreground">Aprendendo</p>
              <p className="text-2xl font-bold text-yellow-600">{aprendendo}</p>
            </div>
            <div className="rounded-lg bg-card p-4 shadow-3d text-center">
              <p className="text-sm text-muted-foreground">Para Revisar</p>
              <p className="text-2xl font-bold text-purple-600">{revisar}</p>
            </div>
            <div className="rounded-lg bg-card p-4 shadow-3d text-center">
              <p className="text-sm text-muted-foreground">Dominados</p>
              <p className="text-2xl font-bold text-green-600">{dominados}</p>
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-4">
            <button
            onClick={startStudyMode}
            disabled={cardsDueCount === 0} // <-- MUDANÇA AQUI
            className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-white font-semibold shadow-3d disabled:bg-gray-400"
          >
            <Brain className="h-5 w-5" /> Iniciar Estudo
            {cardsDueCount > 0 && ( // <-- MUDANÇA AQUI
              <span className="ml-2 text-sm font-medium">{cardsDueCount} cards</span> // <-- MUDANÇA AQUI
            )}
          </button>
            <button className="rounded-lg border border-border px-6 py-3 font-semibold shadow-sm hover:bg-muted">
              Ver Estatísticas
            </button>
          </div>

          {/* Lista de Flashcards */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Flashcards</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedTopic.flashcards.map((card) => (
                <div
                  key={card.id}
                  // 👇 1. ADICIONE 'relative' AQUI
                  className="relative rounded-lg border border-border bg-card p-4 shadow-sm hover:shadow-md transition cursor-pointer"
                >
                  {/* 👇 2. ADICIONE ESTE BOTÃO DE EXCLUIR */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation(); // Impede que o clique afete o card pai
                      // 👇 CORREÇÃO: Passa o ID da Área, do Tópico e do Card
                      handleDeleteCard(selectedStudyArea.id, selectedTopic.id, card.id);
                      }}
                      className="absolute top-2 right-2 p-1 rounded-full text-muted-foreground hover:bg-red-100 hover:text-red-600 transition-colors z-10"
                      aria-label="Excluir card"
                  >
                      <X className="h-4 w-4" />
                  </button>
                   
                  {/* Badges de status e dificuldade */}
                  <div className="mb-2 flex gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-yellow-100 text-yellow-700 text-xs font-semibold">
                      {card.status || "novo"}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 text-xs">
                      {card.difficulty || "médio"}
                    </span>
                  </div>

                  {/* Só mostra a pergunta */}
                  <p className="font-semibold text-primary mb-1">Pergunta:</p>
                  <p className="text-muted-foreground">{card.question}</p>
                </div>
              ))}

              {/* Botão adicionar */}
              <div
                onClick={() => setIsNewFlashcardModalOpen(true)}
                className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 hover:bg-muted/30 transition"
              >
                <Plus className="h-6 w-6 text-muted-foreground mb-2" />
                <span className="font-semibold text-muted-foreground text-sm">
                  Adicionar Novo Flashcard
                </span>
              </div>
            </div>
          </div>
        </main>

        {/* Modal Novo Flashcard */}
        {isNewFlashcardModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-xl rounded-2xl bg-card p-6 shadow-xl">
              
              {/* Header modal */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-primary">Gerar Flashcards com IA</h2>
                <button
                  onClick={() => setIsNewFlashcardModalOpen(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </div>

              {/* Formulário IA */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Descrição para a IA *</label>
                  <textarea
                    id="ia-description"
                    value={iaDescription}
                    onChange={(e) => setIaDescription(e.target.value)}
                    placeholder="Descreva o conteúdo para virar flashcards..."
                    className="flex min-h-[80px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Quanto mais detalhes você fornecer, melhores serão os flashcards gerados.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Número de Flashcards</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={numFlashcards}
                    onChange={(e) => setNumFlashcards(Number(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground mt-1">{numFlashcards} cards</p>
                </div>
              </div>

              {/* Ações */}
              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => setIsNewFlashcardModalOpen(false)}
                  className="px-4 py-2 rounded-lg border bg-muted text-muted-foreground hover:bg-muted/70"
                >
                  Cancelar
                </button>
                <button
            onClick={async () => { // 👈 1. Adicione "async"
              // 2. Espere a IA terminar
              const result = await generateFlashcardsWithAI(iaDescription, numFlashcards, selectedTopic.id);
              
              // 3. Feche o modal
              setIsNewFlashcardModalOpen(false);

              // 4. Se deu certo (result não é nulo), mostre o pop-up
              if (result) {
                setShowSuccessToast(true); // 👈 ATIVA O POP-UP
              }
            }}
            className="px-4 py-2 rounded-lg border bg-primary text-primary-foreground hover:opacity-90"
          >
            Gerar Flashcards
          </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (currentView === "study-area" && selectedStudyArea) {
    
    return (
      <div className="min-h-screen bg-background">
        {showSuccessToast && (
  <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] p-4 rounded-lg bg-green-600 text-white shadow-lg animate-pulse">
    <span className="font-bold">🎉 Flashcards gerados com sucesso!</span>
  </div>
)}
        <Header onBackClick={handleBackToDashboard} />
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8 flex items-center gap-4">
            <div className={`flex h-16 w-16 items-center justify-center rounded-2xl border-2 ${selectedStudyArea.bgGradient} ${selectedStudyArea.borderColor} shadow-3d`}>
              <span className="text-4xl">{selectedStudyArea.emoji}</span>
            </div>
            <div>
              <h1 className={`text-4xl font-bold ${selectedStudyArea.textColor} font-heading`}>{selectedStudyArea.name}</h1>
              <p className="text-lg text-muted-foreground">{selectedStudyArea.totalSets} conjuntos • {selectedStudyArea.totalCards} flashcards</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {selectedStudyArea.topics.map((topic) => {
              // --- CÁLCULO DINÂMICO DO PROGRESSO ---
  const totalCards = topic.cardCount;
  const dominados = topic.flashcards.filter(c => c.status === 'mastered').length;
  
  // Evita divisão por zero se não houver cards
  const progress = totalCards > 0 ? Math.round((dominados / totalCards) * 100) : 0;
  // --- FIM DA CORREÇÃO ---

  return (
    <div key={topic.id} className="cursor-pointer rounded-2xl border border-border bg-card p-6 shadow-3d transition-all duration-300 hover:shadow-3d-hover space-y-4">
      <div onClick={() => handleTopicClick(topic)} className="flex items-center justify-between">
        <span className={`${selectedStudyArea.textColor} font-heading font-bold text-xl`}>{topic.name}</span>
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      </div>
      <div onClick={() => handleTopicClick(topic)}>
        <div className="flex justify-between items-center text-sm text-muted-foreground mb-1">
          <span>Flashcards</span>
          <TopicBadge topic={topic} />
        </div>
        <div className="flex justify-between text-sm text-muted-foreground mb-1">
          <span>Progresso</span>
          {/* Mostra o progresso dinâmico */}
          <span>{progress}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-muted">
          {/* Usa o progresso dinâmico no 'style' */}
          <div className="h-2 rounded-full bg-primary" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      <button
        onClick={() => handleTopicClick(topic)}
        className={`w-full rounded-lg border py-2 font-medium shadow-sm transition ${selectedStudyArea.buttonColor} ${selectedStudyArea.hoverButtonColor}`}
      >
        {/* Lógica do botão (pode manter) */}
        {progress === 100 ? "Revisar" : "Estudar"}
      </button>
    </div>
  )
})}
            {/* BOTÃO CORRIGIDO */}
            <div
              onClick={openNewTopicModal}
              className="flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-muted-foreground/30 text-center shadow-inner transition-all duration-300 hover:bg-muted/50"
            >
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-muted"><Plus className="h-6 w-6 text-muted-foreground" /></div>
              <h3 className="font-semibold text-muted-foreground">Novo Tópico</h3>
              <p className="text-sm text-muted-foreground">Adicione um novo tópico em {selectedStudyArea.name}</p>
            </div>
          </div>
        </main>

        {/* MODAL CORRIGIDO */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-card rounded-2xl shadow-3d p-8 w-full max-w-md relative">
              <button onClick={closeNewTopicModal} className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors">
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
              <h2 className="text-2xl font-bold font-heading text-primary mb-6">Criar Novo Tópico</h2>
              <form className="space-y-4" onSubmit={handleAddNewTopic}> {/* ATUALIZE AQUI */}
                <div>
                  <label htmlFor="topic-name" className="text-sm font-medium text-foreground">Nome do Tópico</label>
                  <input
                    type="text"
                    id="topic-name"
                    placeholder="Ex: Análise Combinatória"
                    value={newTopicName} // 🔥 conecta ao estado
                    onChange={(e) => setNewTopicName(e.target.value)} // 🔥 atualiza estado
                    className="mt-1 flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full h-11 rounded-lg bg-primary text-primary-foreground font-semibold shadow-3d hover:bg-primary/90 transition-colors"
                >
                  Criar Tópico
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
const now = new Date();
  let totalCardCount = 0;
  let totalMasteredCount = 0;
  let totalDueCount = 0;

  studyAreas.forEach(area => {
    // 1. Soma o total de cards da área (já está pré-calculado)
    totalCardCount += area.totalCards; 

    area.topics.forEach(topic => {
      topic.flashcards.forEach(card => {
        // 2. Conta os cards dominados (mastered)
        if (card.status === 'mastered') {
          totalMasteredCount++;
        }

        // 3. Conta os cards para revisão (Novos, Para Revisar, ou Aprendendo Vencidos)
        if (card.status === 'new' || card.status === 'review') {
          totalDueCount++;
        } else if (card.status === 'learning' && card.reviewDate && new Date(card.reviewDate) <= now) {
          totalDueCount++;
        }
      });
    });
  });

  // 4. Calcula o progresso geral
  const overallProgress = totalCardCount > 0 
    ? Math.round((totalMasteredCount / totalCardCount) * 100) 
    : 0;
  
  // NOTA: "Sequência" e "+X esta semana" são placeholders.
  // O seu estado 'studyAreas' não armazena o histórico necessário para calcular isso.
  // Vamos manter os valores da imagem por enquanto para não quebrar o layout.
  const studyStreak = 15;
  const newThisWeek = 12;
  return (
    <div className="min-h-screen bg-background">
      {showSuccessToast && (
  <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] p-4 rounded-lg bg-green-600 text-white shadow-lg animate-pulse">
    <span className="font-bold">🎉 Flashcards gerados com sucesso!</span>
  </div>
)}
      <Header />
      <main className="container mx-auto space-y-8 px-4 py-8">
        <section className="text-center space-y-4">
          <h2 className="text-balance text-4xl font-bold gradient-bg-primary bg-clip-text text-transparent font-heading">Bem-vindo de volta, João!</h2>
          <p className="mx-auto max-w-2xl text-lg text-pretty text-muted-foreground">Continue sua jornada de aprendizado. Você está fazendo um ótimo progresso!</p>
        </section>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        
        {/* Total de Cards (Dinâmico) */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-3d">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Total de Cards</h3>
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="text-3xl font-bold text-primary font-heading">{totalCardCount}</div>
            <p className="mt-1 text-xs text-muted-foreground">+{newThisWeek} esta semana</p>
          </div>
        </div>

        {/* Progresso Geral (Dinâmico) */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-3d">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Progresso Geral</h3>
            <Target className="h-5 w-5 text-secondary" />
          </div>
          <div>
            <div className="text-3xl font-bold text-cyan-700 font-heading">{overallProgress}%</div>
            <div className="mt-2 h-2 w-full rounded-full bg-muted">
              <div className="h-2 rounded-full bg-secondary" style={{ width: `${overallProgress}%` }}></div>
            </div>
          </div>
        </div>
        
        {/* Sequência de Estudos (Placeholder) */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-3d">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Sequência de Estudos</h3>
            <Zap className="h-5 w-5 text-accent" />
          </div>
          <div>
            <div className="text-3xl font-bold text-accent-foreground font-heading">{studyStreak}</div>
            <p className="mt-1 text-xs text-muted-foreground">dias consecutivos 🔥</p>
          </div>
        </div>
        
        {/* Próxima Revisão (Dinâmico) */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-3d">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Próxima Revisão</h3>
            <Clock className="h-5 w-5 text-purple-500" />
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600 font-heading">{totalDueCount}</div>
            <p className="mt-1 text-xs text-muted-foreground">cards aguardando</p>
          </div>
        </div>
        
      </section>

      {/*  <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-border bg-card p-6 shadow-3d"><div className="flex flex-row items-center justify-between space-y-0 pb-2"><h3 className="text-sm font-medium text-muted-foreground">Total de Cards</h3><BookOpen className="h-5 w-5 text-primary" /></div><div><div className="text-3xl font-bold text-primary font-heading">247</div><p className="mt-1 text-xs text-muted-foreground">+12 esta semana</p></div></div>
          <div className="rounded-lg border border-border bg-card p-6 shadow-3d"><div className="flex flex-row items-center justify-between space-y-0 pb-2"><h3 className="text-sm font-medium text-muted-foreground">Progresso Semanal</h3><Target className="h-5 w-5 text-secondary" /></div><div><div className="text-3xl font-bold text-cyan-700 font-heading">78%</div><div className="mt-2 h-2 w-full rounded-full bg-muted"><div className="h-2 rounded-full bg-secondary" style={{ width: '78%' }}></div></div></div></div>
          <div className="rounded-lg border border-border bg-card p-6 shadow-3d"><div className="flex flex-row items-center justify-between space-y-0 pb-2"><h3 className="text-sm font-medium text-muted-foreground">Sequência de Estudos</h3><Zap className="h-5 w-5 text-accent" /></div><div><div className="text-3xl font-bold text-accent-foreground font-heading">15</div><p className="mt-1 text-xs text-muted-foreground">dias consecutivos 🔥</p></div></div>
          <div className="rounded-lg border border-border bg-card p-6 shadow-3d"><div className="flex flex-row items-center justify-between space-y-0 pb-2"><h3 className="text-sm font-medium text-muted-foreground">Próxima Revisão</h3><Clock className="h-5 w-5 text-purple-500" /></div><div><div className="text-3xl font-bold text-purple-600 font-heading">23</div><p className="mt-1 text-xs text-muted-foreground">cards aguardando</p></div></div>
        </section> */}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-lg border border-border bg-card p-6 shadow-3d space-y-6">
              {/* Título e Descrição (já existentes) */}
              <div className="space-y-2">
                <h3 className="flex items-center gap-2 text-xl font-bold font-heading">
                  <Sparkles className="h-6 w-6 text-accent" />
                  Gerar Flashcards com IA
                </h3>
                <p className="text-sm text-muted-foreground">
                  Escolha a área de estudo, defina o tópico e descreva o que quer estudar para a IA criar os flashcards.
                </p>
              </div>

              {/* FORMULÁRIO (CÓDIGO NOVO) */}
              <form
                className="space-y-6"
                onSubmit={async (e) => { 
              e.preventDefault();
              
              if (!selectedAreaId || !selectedTopicId || !iaDescription) {
                alert("Preencha área, tópico e descrição!");
                return;
              }
              
              // 1. CHAMA A IA e espera os novos cards
              //    (passa apenas 'description' e 'count', não mais o topicId)
              const newFlashcards = await generateFlashcardsWithAI(iaDescription, flashcardCount);
              
              // 2. VERIFICA SE DEU ERRO (se a IA retornou null)
              if (newFlashcards === null) {
                // O 'alert' de erro já foi dado dentro da função da IA
                return; 
              }

              // 3. SUCESSO! ATUALIZA O ESTADO (a lógica foi movida para cá)
              let updatedTopic = null;
              let updatedArea = null;

              setStudyAreas((prevAreas) => {
                const areaIdx = prevAreas.findIndex(a => a.topics.some(t => t.id === selectedTopicId));
                if (areaIdx === -1) return prevAreas; // Segurança

                const newStudyAreas = prevAreas.map((area, idx) => {
                  if (idx !== areaIdx) return area;

                  // Encontra e atualiza o tópico correto
                  const updatedTopics = area.topics.map(t => {
                    if (t.id !== selectedTopicId) return t;
                    
                    // Este é o tópico!
                    updatedTopic = {
                        ...t,
                        flashcards: [...(t.flashcards || []), ...newFlashcards],
                        cardCount: t.cardCount + newFlashcards.length, 
                    };
                    return updatedTopic;
                  });
                  
                  // Esta é a área!
                  updatedArea = {
                    ...area,
                    topics: updatedTopics,
                    totalCards: area.totalCards + newFlashcards.length,
                  };
                  return updatedArea;
                });

                return newStudyAreas;
              });

              // 4. LIMPA O FORMULÁRIO E ATIVA O POP-UP
              setIaDescription(""); 
              setShowSuccessToast(true); // <-- 🎉 SEU POP-UP VAI APARECER AQUI

              // 5. NAVEGA PARA O TÓPICO ATUALIZADO
              if (updatedTopic && updatedArea) {
                  // Atualiza os estados locais também para a navegação
                  setSelectedTopic(updatedTopic);
                  setSelectedStudyArea(updatedArea);
                  handleTopicClick(updatedTopic);
              }
            }}
              > 
                <div className="space-y-2">
                  <label htmlFor="study-area" className="text-sm font-medium text-foreground">Área de Estudo *</label>
                  <select
                    id="study-area"
                    value={selectedAreaId}
                    onChange={(e) => {
                      setSelectedAreaId(e.target.value);
                      setSelectedTopicId(""); // reseta quando mudar área
                    }}
                    className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Selecione a área de estudo</option>
                    {studyAreas.map(area => (
                      <option key={area.id} value={area.id}>{area.name}</option>
                    ))}
                  </select>
                  <p className="text-xs text-muted-foreground">Escolha em qual matéria os flashcards serão organizados.</p>
                </div>

                {/* TÓPICO ESPECÍFICO */}
                <div className="space-y-2">
                  <label htmlFor="specific-topic" className="text-sm font-medium text-foreground">Tópico Específico *</label>

                  {selectedAreaId && studyAreas.find(area => area.id === selectedAreaId)?.topics.length > 0 ? (
                    <select
                      id="specific-topic"
                      value={selectedTopicId}
                      onChange={(e) => setSelectedTopicId(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Selecione um tópico existente</option>
                      {studyAreas.find(area => area.id === selectedAreaId).topics.map(topic => (
                        <option key={topic.id} value={topic.id}>{topic.name}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      id="specific-topic"
                      placeholder="Digite um novo tópico..."
                      className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  )}

                  <p className="text-xs text-muted-foreground">Escolha um tópico existente ou digite um novo.</p>
                </div>

                {/* DESCRIÇÃO PARA A IA */}
                <div className="space-y-2">
                  <label htmlFor="ia-description" className="text-sm font-medium text-foreground">Descrição para a IA *</label>
                  <textarea
                    id="ia-description"
                    placeholder="Ex: Detalhar os principais eventos que levaram à Independência do Brasil..."
                    className="flex min-h-[80px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    value={iaDescription}
                    onChange={(e) => setIaDescription(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Cole aqui seu material de estudo. Quanto mais detalhes, melhores serão os flashcards.</p>
                </div>
                <button type="submit" className="flex w-full h-12 items-center justify-center gap-2 rounded-lg bg-primary text-lg font-semibold text-primary-foreground shadow-3d transition-all duration-300 hover:shadow-3d-hover">
                  <Brain className="h-5 w-5" />
                  Gerar Flashcards
                </button>
              </form>
              <div className="space-y-2">
                <label htmlFor="flashcard-count" className="text-sm font-medium text-foreground">Número de Flashcards:</label>
                
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">1</span>
                  <input
                    type="range"
                    id="flashcard-count"
                    min="1"
                    max="10"
                    value={flashcardCount}
                    onChange={(e) => setFlashcardCount(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm text-muted-foreground">10</span>
                  <span className="px-2 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                    {flashcardCount} cards
                  </span>
                </div>
              </div>

              {/* CAIXA IA INTELIGENTE E BOTÕES (CÓDIGO NOVO) */}
              <div className="rounded-xl border border-accent/20 bg-gradient-to-r from-accent/10 to-secondary/10 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-primary">IA Inteligente</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  A nossa IA analisa o seu texto e cria automaticamente flashcards otimizados!
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 border-t border-border pt-6 md:grid-cols-2">
                <button className="flex h-16 flex-col items-center justify-center gap-2 rounded-lg border border-border bg-transparent shadow-3d transition-all duration-300 hover:shadow-3d-hover">
                  <Plus className="h-6 w-6 text-muted-foreground" />
                  <span className="font-semibold text-foreground">Criar Manualmente</span>
                </button>
                <button className="flex h-16 flex-col items-center justify-center gap-2 rounded-lg border border-border bg-transparent shadow-3d transition-all duration-300 hover:shadow-3d-hover">
                  <Upload className="h-6 w-6 text-muted-foreground" />
                  <span className="font-semibold text-foreground">Importar Arquivo</span>
                </button>
              </div>
            </div>
            {/* ÁREAS DE ESTUDO - AGORA ATUALIZADO */}
            <div className="rounded-lg border border-border bg-card p-6 shadow-3d">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold font-heading text-muted-foreground">Áreas de Estudo</h3>
                <button className="p-2 rounded-full hover:bg-muted"><Trophy className="w-5 w-5 text-purple-500" /></button>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {studyAreas.map((area) => (
                  <div key={area.id} className={`p-4 rounded-2xl border ${area.borderColor} ${area.bgGradient} shadow-3d transition-all`}>
                    <div onClick={() => handleStudyAreaClick(area)} className="flex items-center gap-3 mb-4 cursor-pointer">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl shadow-3d bg-white/50"><span className="text-3xl">{area.emoji}</span></div>
                      <div className="flex-1">
                        <h4 className={`font-bold font-heading ${area.textColor}`}>{area.name}</h4>
                        <p className="text-sm text-muted-foreground">{area.totalSets} conjuntos • {area.totalCards} cards</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                      {area.topics.slice(0, 3).map(topic => (
                        <div key={topic.id} className="flex justify-between items-center bg-white/60 p-2 rounded-lg">
                          <span className="text-sm font-medium text-gray-800">{topic.name}</span>
                          <TopicBadge topic={topic} />
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStudyAreaClick(area);
                      }}
                      className={`w-full mt-4 rounded-lg py-2 font-semibold border-2 transition-colors bg-transparent ${area.buttonColor} ${area.hoverButtonColor}`}
                    >
                      Acessar {area.name}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-lg border border-border bg-card p-6 shadow-3d">
              <h3 className="flex items-center gap-2 font-bold font-heading mb-4">
                <BarChart3 className="h-5 w-5 text-accent" />
                Recomendações
              </h3>
              <div className="space-y-3">
                <div className="rounded-lg border border-accent/20 bg-accent/10 p-3">
                  <div className="mb-1 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium">Melhor horário</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Você aprende melhor às 14h-16h</p>
                </div>
                <div className="rounded-lg border border-primary/20 bg-primary/10 p-3">
                  <div className="mb-1 flex items-center gap-2">
                    <Target className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Foco sugerido</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Revisar Química - Orgânica hoje</p>
                </div>
                <div className="rounded-lg border border-secondary/20 bg-secondary/10 p-3">
                  <div className="mb-1 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-secondary" />
                    <span className="text-sm font-medium">Meta diária</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Faltam 5 cards para completar</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 shadow-3d">
              <h3 className="flex items-center gap-2 font-bold font-heading mb-4">
                <Settings className="h-5 w-5 text-purple-600" />
                Configurações Rápidas
              </h3>
              <div className="space-y-1">
                <button className="flex w-full items-center gap-3 rounded-lg p-3 text-left hover:bg-muted">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Notificações</div>
                    <div className="text-xs text-muted-foreground">Lembretes de estudo</div>
                  </div>
                </button>
                <button className="flex w-full items-center gap-3 rounded-lg p-3 text-left hover:bg-muted">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Cronograma</div>
                    <div className="text-xs text-muted-foreground">Planejar sessões</div>
                  </div>
                </button>
                <button className="flex w-full items-center gap-3 rounded-lg p-3 text-left hover:bg-muted">
                  <BarChart3 className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Relatórios</div>
                    <div className="text-xs text-muted-foreground">Ver progresso detalhado</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}