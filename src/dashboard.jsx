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
} from 'lucide-react';

// --- DADOS E TIPOS (ADAPTADOS DO SEU EXEMPLO) ---
const studyAreas = [
    {
      id: "matematica",
      name: "Matemática",
      emoji: "📐",
      color: "primary",
      bgGradient: "from-blue-50 to-blue-100",
      borderColor: "border-blue-200",
      textColor: "text-primary",
      buttonColor: "bg-primary hover:bg-primary/90",
      totalSets: 3,
      totalCards: 45,
      topics: [
        {
          id: "funcoes",
          name: "Funções",
          cardCount: 15,
          status: "active",
          flashcards: [
            { id: "f1", question: "O que é uma função quadrática?", answer: "Uma função quadrática é uma função polinomial de segundo grau, da forma f(x) = ax² + bx + c, onde a ≠ 0.", difficulty: "medium", status: "learning" },
            { id: "f2", question: "Como encontrar o vértice de uma parábola?", answer: "O vértice de uma parábola f(x) = ax² + bx + c está no ponto (-b/2a, f(-b/2a)).", difficulty: "hard", status: "new" },
            { id: "f3", question: "Qual é o domínio de uma função quadrática?", answer: "O domínio de uma função quadrática é sempre o conjunto dos números reais (ℝ).", difficulty: "easy", status: "mastered" },
          ],
        },
        { id: "geometria", name: "Geometria", cardCount: 18, status: "active", flashcards: [{ id: 'g1', question: 'Qual é a fórmula da área de um círculo?', answer: 'A = πr²', difficulty: 'easy', status: 'mastered' }] },
        { id: "algebra", name: "Álgebra", cardCount: 12, status: "completed", flashcards: [] },
      ],
    },
    { id: "historia", name: "História", emoji: "🏛️", color: "secondary", bgGradient: "from-cyan-50 to-cyan-100", borderColor: "border-cyan-200", textColor: "text-cyan-800", buttonColor: "border-cyan-700 text-cyan-800 hover:bg-cyan-700 hover:text-white", totalSets: 2, totalCards: 28, topics: [ { id: "brasil-colonial", name: "Brasil Colonial", cardCount: 16, status: "active", flashcards: [] }, { id: "republica", name: "República", cardCount: 12, status: "completed", flashcards: [] }]},
    { id: "biologia", name: "Biologia", emoji: "🧬", color: "green", bgGradient: "from-green-50 to-green-100", borderColor: "border-green-200", textColor: "text-green-700", buttonColor: "border-green-600 text-green-700 hover:bg-green-600 hover:text-white", totalSets: 4, totalCards: 62, topics: [{ id: "genetica", name: "Genética", cardCount: 20, status: "active", flashcards: [] }]},
    { id: "quimica", name: "Química", emoji: "⚗️", color: "accent", bgGradient: "from-yellow-50 to-yellow-100", borderColor: "border-yellow-200", textColor: "text-accent-foreground", buttonColor: "bg-accent hover:bg-accent/90", totalSets: 3, totalCards: 38, topics: [{ id: "organica", name: "Orgânica", cardCount: 15, status: "review", lastReviewed: "hoje", flashcards: [] }]},
];

// --- COMPONENTE PRINCIPAL ---
export default function MemoAtivoDashboard() {
  const [currentView, setCurrentView] = useState("dashboard");
  const [selectedStudyArea, setSelectedStudyArea] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [studyMode, setStudyMode] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [studyCards, setStudyCards] = useState([]);
  const [sliderValue, setSliderValue] = useState(10);

  // --- LÓGICA DE NAVEGAÇÃO ---
  const handleStudyAreaClick = (studyArea) => { setSelectedStudyArea(studyArea); setCurrentView("study-area"); };
  const handleTopicClick = (topic) => { setSelectedTopic(topic); setCurrentView("topic"); };
  const handleBackToDashboard = () => { setCurrentView("dashboard"); setSelectedStudyArea(null); setSelectedTopic(null); };
  const handleBackToStudyArea = () => { setCurrentView("study-area"); setSelectedTopic(null); };

  // --- LÓGICA DO MODO DE ESTUDO ---
  const startStudyMode = () => {
    if (selectedTopic) {
      const cardsToStudy = selectedTopic.flashcards.filter((card) => card.status !== "mastered");
      setStudyCards(cardsToStudy);
      setCurrentCardIndex(0);
      setShowAnswer(false);
      setStudyMode(true);
    }
  };
  const exitStudyMode = () => { setStudyMode(false); setStudyCards([]); };
  const revealAnswer = () => setShowAnswer(true);
  const markCard = (difficulty) => {
    if (currentCardIndex < studyCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowAnswer(false);
    } else {
      exitStudyMode();
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

  const TopicBadge = ({ topic }) => (
    <span className={`px-2 py-1 text-xs font-semibold rounded-md ${topic.status === "review" ? "bg-red-100 text-red-700" : "bg-muted text-muted-foreground"}`}>
      {topic.status === "review" ? `Revisar ${topic.lastReviewed}!` : `${topic.cardCount} cards`}
    </span>
  );

  // --- VISTAS DA APLICAÇÃO ---

  if (studyMode && studyCards.length > 0) {
    const currentCard = studyCards[currentCardIndex];
    return (
      <div className="min-h-screen bg-background">
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
    return (
        <div className="min-h-screen bg-background">
            <Header onBackClick={handleBackToStudyArea} />
            <main className="container mx-auto px-4 py-8">
                 <div className="mb-8 flex items-center gap-4">
                    <div className={`flex h-16 w-16 items-center justify-center rounded-2xl border-2 ${selectedStudyArea.bgGradient} ${selectedStudyArea.borderColor} shadow-3d`}><span className="text-4xl">{selectedStudyArea.emoji}</span></div>
                    <div>
                        <h1 className={`text-4xl font-bold ${selectedStudyArea.textColor} font-heading`}>{selectedTopic.name}</h1>
                        <p className="text-lg text-muted-foreground">{selectedTopic.cardCount} flashcards • {selectedStudyArea.name}</p>
                    </div>
                 </div>
                 <div className="mb-6 flex gap-4">
                    <button onClick={startStudyMode} disabled={selectedTopic.flashcards.length === 0} className="flex items-center gap-2 rounded-lg bg-primary py-3 px-6 text-lg font-semibold text-primary-foreground shadow-3d transition-all duration-300 hover:shadow-3d-hover disabled:cursor-not-allowed disabled:bg-gray-400"><Brain className="h-5 w-5" />Iniciar Estudo</button>
                 </div>
                 <div className="space-y-4">
                    <div className="flex items-center justify-between"><h2 className="text-2xl font-bold font-heading">Flashcards</h2><button className="flex items-center gap-2 rounded-lg bg-primary py-2 px-4 font-semibold text-primary-foreground shadow-3d"><Plus className="h-4 w-4" />Adicionar Card</button></div>
                    {selectedTopic.flashcards.map((card) => (
                        <div key={card.id} className="rounded-lg border border-border bg-card p-6 shadow-3d"><p className="mb-2 text-lg font-semibold">{card.question}</p><p className="text-muted-foreground">{card.answer}</p></div>
                    ))}
                    <div className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 text-center shadow-3d transition-all duration-300 hover:shadow-3d-hover"><div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-muted"><Plus className="h-6 w-6 text-muted-foreground" /></div><h3 className="font-semibold text-muted-foreground">Adicionar Novo Flashcard</h3></div>
                 </div>
            </main>
        </div>
    )
  }

  if (currentView === "study-area" && selectedStudyArea) {
    return (
        <div className="min-h-screen bg-background">
            <Header onBackClick={handleBackToDashboard} />
            <main className="container mx-auto px-4 py-8">
                <div className="mb-8 flex items-center gap-4">
                    <div className={`flex h-16 w-16 items-center justify-center rounded-2xl border-2 ${selectedStudyArea.bgGradient} ${selectedStudyArea.borderColor} shadow-3d`}><span className="text-4xl">{selectedStudyArea.emoji}</span></div>
                    <div>
                        <h1 className={`text-4xl font-bold ${selectedStudyArea.textColor} font-heading`}>{selectedStudyArea.name}</h1>
                        <p className="text-lg text-muted-foreground">{selectedStudyArea.totalSets} conjuntos • {selectedStudyArea.totalCards} flashcards</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {selectedStudyArea.topics.map((topic) => (
                        <div key={topic.id} onClick={() => handleTopicClick(topic)} className="cursor-pointer rounded-lg border border-border bg-card p-6 shadow-3d transition-all duration-300 hover:shadow-3d-hover">
                            <div className="flex items-center justify-between"><span className={`${selectedStudyArea.textColor} font-heading font-bold text-xl`}>{topic.name}</span><ChevronRight className="h-5 w-5 text-muted-foreground" /></div>
                            <div className="mt-4 flex items-center justify-between"><span className="text-sm text-muted-foreground">Flashcards</span><TopicBadge topic={topic} /></div>
                        </div>
                    ))}
                    <div className="flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 text-center shadow-3d transition-all duration-300 hover:shadow-3d-hover"><div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-muted"><Plus className="h-6 w-6 text-muted-foreground" /></div><h3 className="font-semibold text-muted-foreground">Novo Tópico</h3></div>
                </div>
            </main>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto space-y-8 px-4 py-8">
        <section className="text-center space-y-4">
          <h2 className="text-balance text-4xl font-bold gradient-bg-primary bg-clip-text text-transparent font-heading">Bem-vindo de volta, João! 🎯</h2>
          <p className="mx-auto max-w-2xl text-lg text-pretty text-muted-foreground">Continue sua jornada de aprendizado. Você está fazendo um ótimo progresso!</p>
        </section>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-border bg-card p-6 shadow-3d"><div className="flex flex-row items-center justify-between space-y-0 pb-2"><h3 className="text-sm font-medium text-muted-foreground">Total de Cards</h3><BookOpen className="h-5 w-5 text-primary" /></div><div><div className="text-3xl font-bold text-primary font-heading">247</div><p className="mt-1 text-xs text-muted-foreground">+12 esta semana</p></div></div>
          <div className="rounded-lg border border-border bg-card p-6 shadow-3d"><div className="flex flex-row items-center justify-between space-y-0 pb-2"><h3 className="text-sm font-medium text-muted-foreground">Progresso Semanal</h3><Target className="h-5 w-5 text-secondary" /></div><div><div className="text-3xl font-bold text-cyan-700 font-heading">78%</div><div className="mt-2 h-2 w-full rounded-full bg-muted"><div className="h-2 rounded-full bg-secondary" style={{ width: '78%' }}></div></div></div></div>
          <div className="rounded-lg border border-border bg-card p-6 shadow-3d"><div className="flex flex-row items-center justify-between space-y-0 pb-2"><h3 className="text-sm font-medium text-muted-foreground">Sequência de Estudos</h3><Zap className="h-5 w-5 text-accent" /></div><div><div className="text-3xl font-bold text-accent-foreground font-heading">15</div><p className="mt-1 text-xs text-muted-foreground">dias consecutivos 🔥</p></div></div>
          <div className="rounded-lg border border-border bg-card p-6 shadow-3d"><div className="flex flex-row items-center justify-between space-y-0 pb-2"><h3 className="text-sm font-medium text-muted-foreground">Próxima Revisão</h3><Clock className="h-5 w-5 text-purple-500" /></div><div><div className="text-3xl font-bold text-purple-600 font-heading">23</div><p className="mt-1 text-xs text-muted-foreground">cards aguardando</p></div></div>
        </section>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-lg border border-border bg-card p-6 shadow-3d">
                <h3 className="flex items-center gap-2 text-xl font-bold font-heading">
                    <Sparkles className="h-6 w-6 text-accent" />
                    Gerar Flashcards com IA
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                    Escolha a área de estudo, defina o tópico e descreva o que quer estudar para a IA criar os flashcards.
                </p>
                
                <form className="mt-6 space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-2">
                        <label htmlFor="study-area" className="text-sm font-medium text-foreground">Área de Estudo *</label>
                        <select id="study-area" className="flex h-10 w-full items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                            <option>Selecione a área de estudo</option>
                            {studyAreas.map(area => <option key={area.id} value={area.id}>{area.name}</option>)}
                        </select>
                        <p className="text-xs text-muted-foreground">Escolha em qual matéria os flashcards serão organizados.</p>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="specific-topic" className="text-sm font-medium text-foreground">Tópico Específico *</label>
                        <input type="text" id="specific-topic" placeholder="Ex: Funções Quadráticas, Independência do Brasil..." className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                        <p className="text-xs text-muted-foreground">Nome do tópico específico dentro da área de estudo selecionada.</p>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="ia-description" className="text-sm font-medium text-foreground">Descrição para a IA *</label>
                        <textarea id="ia-description" rows="4" placeholder="Ex: Detalhar os principais eventos que levaram à Independência do Brasil..." className="flex min-h-[80px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
                        <p className="text-xs text-muted-foreground">Quanto mais detalhes, melhores serão os flashcards.</p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">Número de Flashcards:</label>
                            <span className="rounded-md bg-secondary px-2.5 py-0.5 text-sm font-semibold text-secondary-foreground">{sliderValue} cards</span>
                        </div>
                        <input type="range" min="5" max="20" value={sliderValue} onChange={(e) => setSliderValue(e.target.value)} className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>5</span>
                            <span>20</span>
                        </div>
                    </div>

                    <button type="submit" className="flex w-full h-12 items-center justify-center gap-2 rounded-lg bg-primary text-lg font-semibold text-primary-foreground shadow-3d transition-all duration-300 hover:shadow-3d-hover">
                        <Brain className="h-5 w-5" />
                        Gerar Flashcards
                    </button>
                </form>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 shadow-3d"><h3 className="text-sm font-medium text-muted-foreground">Áreas de Estudo</h3><div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">{studyAreas.map((area) => (<div key={area.id} onClick={() => handleStudyAreaClick(area)} className={`cursor-pointer rounded-xl border p-4 transition-all duration-300 hover:shadow-3d-hover ${area.bgGradient} ${area.borderColor}`}><div className="mb-3 flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-xl shadow-3d"><span className="text-2xl">{area.emoji}</span></div><div><h4 className={`font-bold ${area.textColor} font-heading`}>{area.name}</h4><p className="text-sm text-muted-foreground">{area.totalSets} conjuntos • {area.totalCards} cards</p></div><ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" /></div></div>))}</div></div>
          </div>
          <div className="space-y-6">
            <div className="rounded-lg border border-border bg-card p-6 shadow-3d"><h3 className="flex items-center gap-2 font-bold font-heading"><BarChart3 className="h-5 w-5 text-accent" />Recomendações</h3></div>
            <div className="rounded-lg border border-border bg-card p-6 shadow-3d"><h3 className="flex items-center gap-2 font-bold font-heading"><Settings className="h-5 w-5 text-purple-600" />Configurações Rápidas</h3></div>
          </div>
        </div>
      </main>
    </div>
  );
}

