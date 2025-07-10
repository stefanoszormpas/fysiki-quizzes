document.addEventListener('DOMContentLoaded', async function() {
    // Μεταβλητές κατάστασης
    let questions = [];
    let currentQuestionIndex = 0;
    let userAnswers = [];
    let score = 0;
    const urlParams = new URLSearchParams(window.location.search);
const quizId = urlParams.get('quiz') || '1';

// Διαφορετικοί χρόνοι για κάθε quiz (σε δευτερόλεπτα)
const quizTimes = {
    "1": 600,  
    "2": 600,  
    "3": 900   
};

let initialTime = quizTimes[quizId] || 600; // Αν δεν υπάρχει, default 600
let timeLeft = initialTime;
let timer;
let quizCompleted = false;

    // Στοιχεία DOM
    const questionContainer = document.querySelector('.question-container');
    const optionsContainer = document.querySelector('.options-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    const timeSpan = document.getElementById('time');

    // Φόρτωση ερωτήσεων από JSON
    async function loadQuestions() {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const quizId = urlParams.get('quiz') || '1'; // Προεπιλεγμένο quizId = 1
            const response = await fetch(`assets/questions${quizId}.json`);
            
            if (!response.ok) {
                throw new Error('Αποτυχία φόρτωσης ερωτήσεων');
            }
            
            questions = await response.json();
            userAnswers = new Array(questions.length).fill(null); // Αρχικοποίηση πίνακα απαντήσεων
        } catch (error) {
            console.error('Σφάλμα:', error);
            questionContainer.innerHTML = '<p class="error">Πρόβλημα φόρτωσης ερωτήσεων. Παρακαλώ δοκιμάστε ξανά.</p>';
        }
    }

    // Ανακάτεμα ερωτήσεων (shuffle)
    function shuffleQuestions() {
        for (let i = questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questions[i], questions[j]] = [questions[j], questions[i]];
        }
    }

    // Εμφάνιση τρέχουσας ερώτησης
    function showQuestion() {
        if (questions.length === 0) return;

        const question = questions[currentQuestionIndex];
        questionContainer.innerHTML = `<div class="math-display">${question.question}</div>`;
        
        optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');
            optionElement.innerHTML = `<div class="math-display">${option}</div>`;
            
            // Επισήμανση σωστής/λάθος απάντησης (μόνο αν έχει απαντηθεί)
            if (userAnswers[currentQuestionIndex] !== null) {
                if (index === question.correctAnswer) {
                    optionElement.classList.add('correct');
                } else if (userAnswers[currentQuestionIndex] === index && index !== question.correctAnswer) {
                    optionElement.classList.add('incorrect');
                }
            }
            
            optionElement.addEventListener('click', () => selectOption(index));
            optionsContainer.appendChild(optionElement);
        });
        
        updateNavigationButtons();
        renderMath(); // Απόδοση μαθηματικών με MathJax
    }

    // Επιλογή απάντησης από τον χρήστη
    function selectOption(optionIndex) {
        if (quizCompleted) return;
        
        userAnswers[currentQuestionIndex] = optionIndex;
        showQuestion();
    }

    // Ενημέρωση κουμπιών "Προηγούμενη" / "Επόμενη"
    function updateNavigationButtons() {
        prevBtn.disabled = currentQuestionIndex === 0;
        
        if (currentQuestionIndex === questions.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-block';
        } else {
            nextBtn.style.display = 'inline-block';
            submitBtn.style.display = 'none';
        }
    }

    // Μορφοποίηση χρόνου (από δευτερόλεπτα σε MM:SS)
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // Χρονόμετρο
    function startTimer() {
        timeSpan.textContent = formatTime(timeLeft);
        timer = setInterval(() => {
            timeLeft--;
            timeSpan.textContent = formatTime(timeLeft);
            
            if (timeLeft <= 0 && !quizCompleted) {
                clearInterval(timer);
                endQuiz();
            }
        }, 1000);
    }

    // Τερματισμός quiz και υπολογισμός αποτελεσμάτων
    function endQuiz() {
        quizCompleted = true;
        clearInterval(timer);
        
        // Απενεργοποίηση επιλογών
        document.querySelectorAll('.option').forEach(option => {
            option.style.cursor = 'not-allowed';
        });
        
        // Υπολογισμός τελικού score
        score = userAnswers.reduce((total, answer, index) => {
            return total + (answer === questions[index].correctAnswer ? 1 : 0);
        }, 0);
        
        // Αποθήκευση αποτελεσμάτων και ανακατεύθυνση
        const resultsData = {
            score: score,
            totalQuestions: questions.length,
            userAnswers: userAnswers,
            questions: questions
        };
        
        sessionStorage.setItem('quizResults', JSON.stringify(resultsData));
        window.location.href = 'results.html';
    }

    // Απόδοση μαθηματικών εξισώσεων με MathJax
    function renderMath() {
        if (window.MathJax) {
            MathJax.typesetPromise().catch(err => {
                console.error('MathJax error:', err);
                setTimeout(renderMath, 500); // Retry after 500ms
            });
        }
    }

    // Event Listeners
    prevBtn.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showQuestion();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            showQuestion();
        }
    });

    submitBtn.addEventListener('click', endQuiz);

    // Αρχικοποίηση Quiz
    async function initQuiz() {
        await loadQuestions();
        if (questions.length > 0) {
            shuffleQuestions();
            showQuestion();
            startTimer();
        }
    }

    initQuiz();
});
