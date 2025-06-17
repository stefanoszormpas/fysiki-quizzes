// Quiz data με μαθηματικές εκφράσεις και εικόνες
const quizData = [
    {
        question: "Σε μια ελαστική κρούση μεταξύ δύο σωμάτων μάζας $m_1 = 2kg$ και $m_2 = 3kg$, αν η αρχική ταχύτητα του πρώτου είναι $v_1 = 5m/s$ και του δεύτερου $v_2 = 0$, ποια είναι η τελική ταχύτητα του πρώτου σώματος;",
        image: null,
        answers: [
            "$v_1' = 1m/s$",
            "$v_1' = -1m/s$", 
            "$v_1' = 2m/s$",
            "$v_1' = 3m/s$"
        ],
        correct: 1
    },
    {
        question: "Ποια από τις παρακάτω σχέσεις ισχύει για την ανελαστική κρούση;",
        image: null,
        answers: [
            "Διατηρείται η κινητική ενέργεια",
            "Διατηρείται μόνο η ορμή",
            "Διατηρούνται και η ορμή και η κινητική ενέργεια", 
            "Δεν διατηρείται τίποτα"
        ],
        correct: 1
    },
    {
        question: "Δύο σώματα μάζας $m$ το καθένα κινούνται με ταχύτητες $v$ και $-v$ αντίστοιχα. Μετά από ελαστική κρούση, οι ταχύτητές τους γίνονται:",
        image: null,
        answers: [
            "$v$ και $-v$",
            "$-v$ και $v$",
            "$0$ και $0$",
            "$2v$ και $-2v$"
        ],
        correct: 1
    },
    {
        question: "Ο συντελεστής επαναφοράς για μια τελείως ανελαστική κρούση είναι:",
        image: null,
        answers: [
            "$e = 1$",
            "$e = 0$",
            "$e = -1$",
            "$e = 0.5$"
        ],
        correct: 1
    },
    {
        question: "Σε μια κρούση μεταξύ δύο σωμάτων, αν $e = 0.8$, τότε η κρούση είναι:",
        image: null,
        answers: [
            "Τελείως ελαστική",
            "Τελείως ανελαστική",
            "Μερικώς ελαστική",
            "Αδύνατη"
        ],
        correct: 2
    },
    {
        question: "Η ορμή ενός σώματος μάζας $m = 2kg$ που κινείται με ταχύτητα $v = 10m/s$ είναι:",
        image: null,
        answers: [
            "$p = 5 kg \\cdot m/s$",
            "$p = 20 kg \\cdot m/s$",
            "$p = 12 kg \\cdot m/s$",
            "$p = 8 kg \\cdot m/s$"
        ],
        correct: 1
    },
    {
        question: "Στο παρακάτω διάγραμα, ποια είναι η σχέση μεταξύ των ταχυτήτων πριν και μετά την κρούση;",
        image: "https://via.placeholder.com/400x200/5a67d8/ffffff?text=Κρούση+Διάγραμμα",
        answers: [
            "$v_1' + v_2' = v_1 + v_2$",
            "$v_1' - v_2' = -(v_1 - v_2)$",
            "$v_1' \\cdot v_2' = v_1 \\cdot v_2$",
            "Όλες οι παραπάνω"
        ],
        correct: 1
    },
    {
        question: "Η κινητική ενέργεια που χάνεται σε μια ανελαστική κρούση μετατρέπεται σε:",
        image: null,
        answers: [
            "Θερμότητα",
            "Ήχο", 
            "Παραμόρφωση",
            "Όλα τα παραπάνω"
        ],
        correct: 3
    },
    {
        question: "Δύο σφαίρες μάζας $m_1 = 1kg$ και $m_2 = 2kg$ κινούνται με ταχύτητες $v_1 = 6m/s$ και $v_2 = 2m/s$ στην ίδια κατεύθυνση. Αν συγκρουστούν ανελαστικά, η κοινή τους ταχύτητα είναι:",
        image: null,
        answers: [
            "$v = 2m/s$",
            "$v = 3m/s$",
            "$v = 4m/s$",
            "$v = \\frac{10}{3}m/s$"
        ],
        correct: 3
    },
    {
        question: "Η μονάδα μέτρησης της ορμής στο SI είναι:",
        image: null,
        answers: [
            "$kg \\cdot m/s^2$",
            "$kg \\cdot m/s$",
            "$N \\cdot s$",
            "Β και Γ"
        ],
        correct: 3
    }
];

// Quiz state
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timer = null;
let quizStartTime = null;
let userAnswers = [];
let shuffledQuestions = [];

// DOM elements
const welcomeScreen = document.getElementById('welcome-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const reviewScreen = document.getElementById('review-screen');

const startQuizBtn = document.getElementById('start-quiz');
const questionText = document.getElementById('question-text');
const questionImage = document.getElementById('question-image');
const questionImg = document.getElementById('question-img');
const answersContainer = document.getElementById('answers-container');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const timerSpan = document.getElementById('timer');
const progressBar = document.getElementById('progress');
const nextQuestionBtn = document.getElementById('next-question');

const finalScoreSpan = document.getElementById('final-score');
const maxScoreSpan = document.getElementById('max-score');
const scorePercentageSpan = document.getElementById('score-percentage');
const performanceMessageDiv = document.getElementById('performance-message');
const correctAnswersSpan = document.getElementById('correct-answers');
const wrongAnswersSpan = document.getElementById('wrong-answers');
const totalTimeSpan = document.getElementById('total-time');

const restartQuizBtn = document.getElementById('restart-quiz');
const reviewAnswersBtn = document.getElementById('review-answers');
const backToResultsBtn = document.getElementById('back-to-results');
const reviewContainer = document.getElementById('review-container');

// Event listeners
startQuizBtn.addEventListener('click', startQuiz);
nextQuestionBtn.addEventListener('click', nextQuestion);
restartQuizBtn.addEventListener('click', restartQuiz);
reviewAnswersBtn.addEventListener('click', showReview);
backToResultsBtn.addEventListener('click', showResults);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    totalQuestionsSpan.textContent = quizData.length;
    maxScoreSpan.textContent = quizData.length;
});

// Shuffle array function
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Start quiz
function startQuiz() {
    shuffledQuestions = shuffleArray(quizData.map((q, index) => ({ ...q, originalIndex: index })));
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    quizStartTime = Date.now();
    showScreen('quiz-screen');
    showQuestion();
}

// Show screen
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Show question
function showQuestion() {
    const question = shuffledQuestions[currentQuestionIndex];
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    const progress = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;
    progressBar.style.width = progress + '%';
    questionText.innerHTML = question.question;

    if (question.image) {
        questionImg.src = question.image;
        questionImage.style.display = 'block';
    } else {
        questionImage.style.display = 'none';
    }

    answersContainer.innerHTML = '';
    question.answers.forEach((answer, index) => {
        const answerElement = document.createElement('div');
        answerElement.className = 'answer-option';
        answerElement.innerHTML = `<span class="answer-label">${String.fromCharCode(65 + index)}</span><span class="answer-text">${answer}</span>`;
        answerElement.addEventListener('click', () => selectAnswer(index));
        answersContainer.appendChild(answerElement);
    });

    timeLeft = 30;
    updateTimer();
    startTimer();
    nextQuestionBtn.style.display = 'none';

   if (window.MathJax && MathJax.typesetPromise) {
    MathJax.typesetPromise([questionText]);
}

    }
}

// Select answer
function selectAnswer(selectedIndex) {
    const question = shuffledQuestions[currentQuestionIndex];
    const answerOptions = document.querySelectorAll('.answer-option');
    answerOptions.forEach(option => {
        option.classList.add('disabled');
        option.style.pointerEvents = 'none';
    });
    clearInterval(timer);
    answerOptions[selectedIndex]?.classList.add('selected');

    setTimeout(() => {
        answerOptions.forEach((option, index) => {
            if (index === question.correct) {
                option.classList.add('correct');
            } else if (index === selectedIndex && selectedIndex !== question.correct) {
                option.classList.add('incorrect');
            }
        });

        if (selectedIndex === question.correct) {
            score++;
        }

        userAnswers.push({
            questionIndex: currentQuestionIndex,
            originalIndex: question.originalIndex,
            selectedAnswer: selectedIndex,
            correctAnswer: question.correct,
            isCorrect: selectedIndex === question.correct,
            timeLeft: timeLeft
        });

        nextQuestionBtn.style.display = 'block';
    }, 500);
}

// Next question
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

// Start timer
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
            selectAnswer(-1);
        }
    }, 1000);
}

// Update timer
function updateTimer() {
    timerSpan.textContent = timeLeft;
}
