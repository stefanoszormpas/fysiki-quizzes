document.addEventListener('DOMContentLoaded', function() {
    // Οι ερωτήσεις του quiz (μπορείτε να δημιουργήσετε διαφορετικά αρχεία js για κάθε quiz)
    const questions = [
        {
            question: "Ποια είναι η τιμή του \( x \) στην εξίσωση \( 2x + 3 = 7 \);",
            options: [
                "1",
                "2",
                "3",
                "4"
            ],
            correctAnswer: 1,
            explanation: "Λύση: \( 2x + 3 = 7 \) ⇒ \( 2x = 7 - 3 \) ⇒ \( 2x = 4 \) ⇒ \( x = 2 \)"
        },
        {
            question: "Ποιο είναι το εμβαδόν ενός κύκλου με ακτίνα \( r = 5 \);",
            options: [
                "\( 10\pi \)",
                "\( 25\pi \)",
                "\( 50\pi \)",
                "\( 100\pi \)"
            ],
            correctAnswer: 1,
            explanation: "Ο τύπος για το εμβαδόν είναι \( E = \pi r^2 \). Για \( r = 5 \), \( E = \pi \times 5^2 = 25\pi \)"
        },
        {
            question: "Ποια είναι η παράγωγος της συνάρτησης \( f(x) = 3x^2 + 2x - 5 \);",
            options: [
                "\( 6x + 2 \)",
                "\( 3x + 2 \)",
                "\( 6x - 5 \)",
                "\( 3x^2 + 2 \)"
            ],
            correctAnswer: 0,
            explanation: "Η παράγωγος του \( 3x^2 \) είναι \( 6x \), του \( 2x \) είναι \( 2 \), και της σταθεράς -5 είναι 0. Άρα \( f'(x) = 6x + 2 \)"
        }
    ];

    // Μεταβλητές κατάστασης
    let currentQuestionIndex = 0;
    let userAnswers = new Array(questions.length).fill(null);
    let score = 0;
    let timeLeft = 60; // 60 δευτερόλεπτα
    let timer;
    let quizCompleted = false;

    // Στοιχεία DOM
    const questionContainer = document.querySelector('.question-container');
    const optionsContainer = document.querySelector('.options-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    const resultsDiv = document.querySelector('.results');
    const timeSpan = document.getElementById('time');

    // Αρχικοποίηση quiz
    function initQuiz() {
        shuffleQuestions();
        showQuestion();
        startTimer();
    }

    // Ανακάτεμα ερωτήσεων
    function shuffleQuestions() {
        for (let i = questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questions[i], questions[j]] = [questions[j], questions[i]];
        }
    }

    // Εμφάνιση ερώτησης
    function showQuestion() {
        const question = questions[currentQuestionIndex];
        questionContainer.innerHTML = `<div class="math-display">${question.question}</div>`;
        
        optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');
            optionElement.innerHTML = `<div class="math-display">${option}</div>`;
            
            // Ελέγχουμε αν έχει απαντηθεί η ερώτηση
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
        
        // Ενημέρωση κουμπιών navigation
        updateNavigationButtons();
        
        // Ενημέρωση MathJax
        if (window.MathJax) {
            MathJax.typesetPromise();
        }
    }

    // Επιλογή απάντησης
    function selectOption(optionIndex) {
        if (quizCompleted) return;
        
        userAnswers[currentQuestionIndex] = optionIndex;
        
        // Έλεγχος αν η απάντηση είναι σωστή
        const question = questions[currentQuestionIndex];
        if (optionIndex === question.correctAnswer) {
            score++;
        }
        
        // Εμφάνιση σωστής/λάθος απάντησης
        showQuestion();
    }

    // Ενημέρωση κουμπιών navigation
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

    // Χρονόμετρο
    function startTimer() {
        timeSpan.textContent = timeLeft;
        timer = setInterval(() => {
            timeLeft--;
            timeSpan.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                endQuiz();
            }
        }, 1000);
    }

    // Τερματισμός quiz
    function endQuiz() {
        quizCompleted = true;
        clearInterval(timer);
        
        // Απενεργοποίηση όλων των επιλογών
        const options = document.querySelectorAll('.option');
        options.forEach(option => {
            option.style.cursor = 'not-allowed';
        });
        
        // Εμφάνιση αποτελεσμάτων
        showResults();
    }

    // Εμφάνιση αποτελεσμάτων
    function showResults() {
        let resultsHTML = `<h2>Αποτελέσματα</h2>`;
        resultsHTML += `<p>Σκορ: ${score} / ${questions.length}</p>`;
        resultsHTML += `<p>Ποσοστό: ${Math.round((score / questions.length) * 100)}%</p>`;
        
        resultsHTML += `<h3>Αναλυτική Αξιολόγηση:</h3>`;
        questions.forEach((question, index) => {
            resultsHTML += `<div class="question-review ${userAnswers[index] === question.correctAnswer ? 'correct' : 'incorrect'}">`;
            resultsHTML += `<p><strong>Ερώτηση ${index + 1}:</strong> ${question.question}</p>`;
            
            if (userAnswers[index] !== null) {
                const userAnswer = question.options[userAnswers[index]];
                const correctAnswer = question.options[question.correctAnswer];
                
                resultsHTML += `<p>Η απάντησή σας: <span class="${userAnswers[index] === question.correctAnswer ? 'correct' : 'incorrect'}">${userAnswer}</span></p>`;
                
                if (userAnswers[index] !== question.correctAnswer) {
                    resultsHTML += `<p>Σωστή απάντηση: <span class="correct">${correctAnswer}</span></p>`;
                }
            } else {
                resultsHTML += `<p>Δεν απαντήσατε</p>`;
                resultsHTML += `<p>Σωστή απάντηση: <span class="correct">${question.options[question.correctAnswer]}</span></p>`;
            }
            
            resultsHTML += `<p class="explanation">${question.explanation}</p>`;
            resultsHTML += `</div>`;
        });
        
        resultsHTML += `<button id="restart-btn">Ξανά ξεκίνα το Quiz</button>`;
        resultsDiv.innerHTML = resultsHTML;
        resultsDiv.style.display = 'block';
        
        document.getElementById('restart-btn').addEventListener('click', restartQuiz);
        
        // Ενημέρωση MathJax
        if (window.MathJax) {
            MathJax.typesetPromise();
        }
    }

    // Επανεκκίνηση quiz
    function restartQuiz() {
        currentQuestionIndex = 0;
        userAnswers = new Array(questions.length).fill(null);
        score = 0;
        timeLeft = 60;
        quizCompleted = false;
        
        resultsDiv.style.display = 'none';
        shuffleQuestions();
        showQuestion();
        clearInterval(timer);
        startTimer();
    }

    // Event listeners για τα κουμπιά
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

    // Αρχικοποίηση quiz
    initQuiz();
});
