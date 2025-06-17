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
    // Shuffle questions for random order
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
    
    // Update question counter and progress
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    const progress = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;
    progressBar.style.width = progress + '%';
    
    // Show question text
    questionText.innerHTML = question.question;
    
    // Show image if exists
    if (question.image) {
        questionImg.src = question.image;
        questionImage.style.display = 'block';
    } else {
        questionImage.style.display = 'none';
    }
    
    // Show answers
    answersContainer.innerHTML = '';
    question.answers.forEach((answer, index) => {
        const answerElement = document.createElement('div');
        answerElement.className = 'answer-option';
        answerElement.innerHTML = `
            <span class="answer-label">${String.fromCharCode(65 + index)}</span>
            <span class="answer-text">${answer}</span>
        `;
        answerElement.addEventListener('click', () => selectAnswer(index));
        answersContainer.appendChild(answerElement);
    });
    
    // Reset timer
    timeLeft = 30;
    updateTimer();
    startTimer();
    
    // Hide next button
    nextQuestionBtn.style.display = 'none';
    
    // Render math expressions
    if (window.MathJax && MathJax.typesetPromise) {
        MathJax.typesetPromise([questionText, answersContainer]).then(() => {
            console.log('Math rendered successfully');
        }).catch((err) => {
            console.log('MathJax error:', err);
        });
    } else {
        // Fallback - try to render after a short delay
        setTimeout(() => {
            if (window.MathJax && MathJax.typesetPromise) {
                MathJax.typesetPromise([questionText, answersContainer]).catch((err) => {
                    console.log('MathJax delayed error:', err);
                });
            }
        }, 100);
    }
}

// Select answer
function selectAnswer(selectedIndex) {
    const question = shuffledQuestions[currentQuestionIndex];
    const answerOptions = document.querySelectorAll('.answer-option');
    
    // Disable all options
    answerOptions.forEach(option => {
        option.classList.add('disabled');
        option.style.pointerEvents = 'none';
    });
    
    // Stop timer
    clearInterval(timer);
    
    // Mark selected answer
    answerOptions[selectedIndex].classList.add('selected');
    
    // Show correct/incorrect
    setTimeout(() => {
        answerOptions.forEach((option, index) => {
            if (index === question.correct) {
                option.classList.add('correct');
            } else if (index === selectedIndex && selectedIndex !== question.correct) {
                option.classList.add('incorrect');
            }
        });
        
        // Update score
        if (selectedIndex === question.correct) {
            score++;
        }
        
        // Store user answer
        userAnswers.push({
            questionIndex: currentQuestionIndex,
            originalIndex: question.originalIndex,
            selectedAnswer: selectedIndex,
            correctAnswer: question.correct,
            isCorrect: selectedIndex === question.correct,
            timeLeft: timeLeft
        });
        
        // Show next button
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
        
        if (timeLeft <= 10) {
            timerSpan.classList.add('warning');
        }
        
        if (timeLeft <= 0) {
            // Time's up - auto select no answer
            selectAnswer(-1); // -1 indicates timeout
        }
    }, 1000);
}

// Update timer display
function updateTimer() {
    timerSpan.textContent = timeLeft;
    if (timeLeft <= 10) {
        timerSpan.classList.add('warning');
    } else {
        timerSpan.classList.remove('warning');
    }
}

// Show results
function showResults() {
    showScreen('results-screen');
    
    // Calculate results
    const totalQuestions = shuffledQuestions.length;
    const correctAnswers = score;
    const wrongAnswers = totalQuestions - correctAnswers;
    const percentage = Math.round((score / totalQuestions) * 100);
    const totalTimeMs = Date.now() - quizStartTime;
    const totalTimeFormatted = formatTime(totalTimeMs);
    
    // Update results display
    finalScoreSpan.textContent = correctAnswers;
    scorePercentageSpan.textContent = percentage + '%';
    correctAnswersSpan.textContent = correctAnswers;
    wrongAnswersSpan.textContent = wrongAnswers;
    totalTimeSpan.textContent = totalTimeFormatted;
    
    // Performance message
    let performanceClass = '';
    let performanceText = '';
    
    if (percentage >= 90) {
        performanceClass = 'excellent';
        performanceText = '🎉 Εξαιρετικά! Έχετε εξαιρετική κατανόηση των κρούσεων!';
    } else if (percentage >= 75) {
        performanceClass = 'good';
        performanceText = '👍 Πολύ καλά! Έχετε καλή κατανόηση του θέματος!';
    } else if (percentage >= 50) {
        performanceClass = 'needs-improvement';
        performanceText = '📚 Χρειάζεται βελτίωση. Μελετήστε περισσότερο τις κρούσεις!';
    } else {
        performanceClass = 'poor';
        performanceText = '💪 Συνεχίστε την προσπάθεια! Επαναλάβετε το μάθημα και δοκιμάστε ξανά!';
    }
    
    performanceMessageDiv.className = 'performance-message ' + performanceClass;
    performanceMessageDiv.textContent = performanceText;
}

// Show review
function showReview() {
    showScreen('review-screen');
    
    reviewContainer.innerHTML = '';
    
    userAnswers.forEach((userAnswer, index) => {
        const question = shuffledQuestions[userAnswer.questionIndex];
        const reviewItem = document.createElement('div');
        reviewItem.className = `review-item ${userAnswer.isCorrect ? 'correct' : 'incorrect'}`;
        
        const statusIcon = userAnswer.isCorrect ? '✅' : '❌';
        const statusText = userAnswer.isCorrect ? 'Σωστή απάντηση' : 'Λάθος απάντηση';
        
        reviewItem.innerHTML = `
            <div class="review-header">
                <h3>${statusIcon} Ερώτηση ${index + 1} - ${statusText}</h3>
            </div>
            <div class="review-question">${question.question}</div>
            <div class="review-answers">
                ${question.answers.map((answer, answerIndex) => {
                    let classes = 'review-answer';
                    if (answerIndex === userAnswer.selectedAnswer) {
                        classes += ' user-selected';
                        if (!userAnswer.isCorrect) {
                            classes += ' incorrect';
                        }
                    }
                    if (answerIndex === question.correct) {
                        classes += ' correct-answer';
                    }
                    
                    let prefix = '';
                    if (answerIndex === userAnswer.selectedAnswer) {
                        prefix = userAnswer.isCorrect ? '✅ Η επιλογή σας: ' : '❌ Η επιλογή σας: ';
                    } else if (answerIndex === question.correct) {
                        prefix = '✅ Σωστή απάντηση: ';
                    } else {
                        prefix = String.fromCharCode(65 + answerIndex) + '. ';
                    }
                    
                    return `<div class="${classes}">${prefix}${answer}</div>`;
                }).join('')}
            </div>
        `;
        
        reviewContainer.appendChild(reviewItem);
    });
    
    // Render math expressions in review
    if (window.MathJax && MathJax.typesetPromise) {
        MathJax.typesetPromise([reviewContainer]).then(() => {
            console.log('Review math rendered successfully');
        }).catch((err) => {
            console.log('MathJax review error:', err);
        });
    } else {
        // Fallback
        setTimeout(() => {
            if (window.MathJax && MathJax.typesetPromise) {
                MathJax.typesetPromise([reviewContainer]).catch((err) => {
                    console.log('MathJax review delayed error:', err);
                });
            }
        }, 100);
    }
}

// Restart quiz
function restartQuiz() {
    showScreen('welcome-screen');
    
    // Reset all variables
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    shuffledQuestions = [];
    
    // Clear timer
    if (timer) {
        clearInterval(timer);
    }
}

// Format time
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Handle page visibility change (pause timer when tab is not active)
document.addEventListener('visibilitychange', () => {
    if (document.hidden && timer) {
        clearInterval(timer);
    } else if (!document.hidden && timeLeft > 0 && currentQuestionIndex < shuffledQuestions.length) {
        startTimer();
    }
});

// Prevent context menu on images
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

// Handle window beforeunload
window.addEventListener('beforeunload', (e) => {
    if (timer && currentQuestionIndex < shuffledQuestions.length) {
        e.preventDefault();
        e.returnValue = 'Είστε σίγουροι ότι θέλετε να φύγετε; Η πρόοδός σας θα χαθεί.';
    }
});

// Auto-focus functionality
document.addEventListener('keydown', (e) => {
    if (quizScreen.classList.contains('active')) {
        // Handle number keys 1-4 for answer selection during quiz
        if (e.key >= '1' && e.key <= '4') {
            const answerIndex = parseInt(e.key) - 1;
            const answerOptions = document.querySelectorAll('.answer-option');
            if (answerIndex < answerOptions.length && !answerOptions[answerIndex].classList.contains('disabled')) {
                selectAnswer(answerIndex);
            }
        }
        // Handle Enter key for next question
        else if (e.key === 'Enter' && nextQuestionBtn.style.display === 'block') {
            nextQuestion();
        }
    }
});

console.log('Quiz System Loaded Successfully! 🎯');
console.log('Features: Timer, Random Questions, Math Support, Review Mode');
