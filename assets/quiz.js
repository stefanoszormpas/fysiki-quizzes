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
        "3": 900,
        "4": 600,
        "5": 900,
        "6": 900,
        "7": 900,
        "8":1200,
        "9":1200,
        "10":1200,
        "11":1200,
        "12":1200,
        "13":1200,
        "14":1200,
        "15":1200,
        "16":1200,
        "17":1200,
        "18":1200,
        "19":1200,
        "20":1200,
        "21":1200,
        "22":1200
    };

    let initialTime = quizTimes[quizId] || 600;
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
            const response = await fetch(`assets/questions${quizId}.json`);
            
            if (!response.ok) {
                throw new Error('Αποτυχία φόρτωσης ερωτήσεων');
            }
            
            questions = await response.json();
            userAnswers = new Array(questions.length).fill(null);
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
        const questionType = question.type || "multiple-choice";
        
        questionContainer.innerHTML = "";

        const questionText = document.createElement("div");
        questionText.className = "math-display";
        questionText.innerHTML = question.question;
        questionContainer.appendChild(questionText);

        // Αν υπάρχει εικόνα, πρόσθεσέ την
        if (question.image) {
            const image = document.createElement("img");
            image.src = question.image;
            image.alt = "Εικόνα ερώτησης";
            image.classList.add("quiz-image");
            questionContainer.appendChild(image);
        }

        optionsContainer.innerHTML = '';

        // Έλεγχος τύπου ερώτησης
        if (questionType === "true-false-multiple") {
            showTrueFalseQuestion(question);
        } else {
            showMultipleChoiceQuestion(question);
        }

        // Ενημέρωση αριθμού ερώτησης
        document.getElementById("current-number").textContent = currentQuestionIndex + 1;
        document.getElementById("total-number").textContent = questions.length;

        updateNavigationButtons();
        renderMath();
        
        // Ενημέρωση progress bar
        const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
        document.getElementById("progress-bar-fill").style.width = `${progress}%`;
    }

    // Εμφάνιση multiple choice ερώτησης
    function showMultipleChoiceQuestion(question) {
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');
            optionElement.innerHTML = `<div class="math-display">${option}</div>`;
            
            if (userAnswers[currentQuestionIndex] !== null && !Array.isArray(userAnswers[currentQuestionIndex])) {
                if (index === question.correctAnswer) {
                    optionElement.classList.add('correct');
                } else if (userAnswers[currentQuestionIndex] === index && index !== question.correctAnswer) {
                    optionElement.classList.add('incorrect');
                }
            }

            optionElement.addEventListener('click', () => selectOption(index));
            optionsContainer.appendChild(optionElement);
        });
    }

    // Εμφάνιση Σωστό-Λάθος ερώτησης
    function showTrueFalseQuestion(question) {
        const statementsContainer = document.createElement('div');
        statementsContainer.className = 'true-false-container';
        
        question.statements.forEach((statement, index) => {
            const statementDiv = document.createElement('div');
            statementDiv.className = 'true-false-statement';
            
            const statementText = document.createElement('div');
            statementText.className = 'statement-text math-display';
            statementText.innerHTML = `${index + 1}. ${statement}`;
            
            const buttonsDiv = document.createElement('div');
            buttonsDiv.className = 'tf-buttons';
            
            const trueBtn = document.createElement('button');
            trueBtn.className = 'tf-button';
            trueBtn.textContent = 'Σωστό';
            trueBtn.dataset.value = 'true';
            
            const falseBtn = document.createElement('button');
            falseBtn.className = 'tf-button';
            falseBtn.textContent = 'Λάθος';
            falseBtn.dataset.value = 'false';
            
            // Έλεγχος αν έχει απαντηθεί
            const currentAnswers = userAnswers[currentQuestionIndex];
            if (currentAnswers && currentAnswers[index] !== undefined) {
                if (currentAnswers[index]) {
                    trueBtn.classList.add('selected');
                } else {
                    falseBtn.classList.add('selected');
                }
                
                // Εμφάνιση σωστής/λάθος απάντησης
                if (quizCompleted) {
                    if (question.correctAnswers[index] === true) {
                        trueBtn.classList.add('correct');
                    } else {
                        falseBtn.classList.add('correct');
                    }
                    
                    if (currentAnswers[index] !== question.correctAnswers[index]) {
                        if (currentAnswers[index]) {
                            trueBtn.classList.add('incorrect');
                        } else {
                            falseBtn.classList.add('incorrect');
                        }
                    }
                }
            }
            
            trueBtn.addEventListener('click', () => selectTrueFalse(index, true));
            falseBtn.addEventListener('click', () => selectTrueFalse(index, false));
            
            buttonsDiv.appendChild(trueBtn);
            buttonsDiv.appendChild(falseBtn);
            
            statementDiv.appendChild(statementText);
            statementDiv.appendChild(buttonsDiv);
            statementsContainer.appendChild(statementDiv);
        });
        
        optionsContainer.appendChild(statementsContainer);
    }

    // Επιλογή απάντησης από τον χρήστη (multiple choice)
    function selectOption(optionIndex) {
        if (quizCompleted) return;
        
        userAnswers[currentQuestionIndex] = optionIndex;
        showQuestion();
    }

    // Επιλογή Σωστού-Λάθους
    function selectTrueFalse(statementIndex, value) {
        if (quizCompleted) return;
        
        if (!Array.isArray(userAnswers[currentQuestionIndex])) {
            const question = questions[currentQuestionIndex];
            userAnswers[currentQuestionIndex] = new Array(question.statements.length).fill(null);
        }
        
        userAnswers[currentQuestionIndex][statementIndex] = value;
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
            const question = questions[index];
            const questionType = question.type || "multiple-choice";
            
            if (questionType === "true-false-multiple") {
                if (Array.isArray(answer) && answer.every((ans, i) => ans === question.correctAnswers[i])) {
                    return total + 1;
                }
            } else {
                if (answer === question.correctAnswer) {
                    return total + 1;
                }
            }
            return total;
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
                setTimeout(renderMath, 500);
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
