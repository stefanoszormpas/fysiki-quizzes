document.addEventListener('DOMContentLoaded', function() {
    // Οι ερωτήσεις του quiz
    const questions = [
    {
        question: "Κρούση στη μηχανική είναι ένα φαινόμενο κατά το οποίο τα σώματα:",
        options: [
            "έρχονται οπωσδήποτε σε επαφή.",
            "αλληλεπιδρούν με σχετικά μεγάλες δυνάμεις για πολύ μικρό χρονικό διάστημα.",
            "ανταλλάσσουν τις κινητικές τους ενέργειες και τις ορμές.",
            "αλλάζουν οπωσδήποτε κατεύθυνση κίνησης μετά την κρούση."
        ],
        correctAnswer: 1,
        explanation: "α)Δεν είναι αναγκαία η επαφή όπως στη σκέδαση , γ) μόνο στις ελαστικές ίσων μαζών , δ) στην κεντρική κρούση δεν αλλαζουν κατεύθυνση   "
    },
    {
        question: "Σκέδαση ονομάζουμε:",
        options: [
            "το φαινόμενο της κρούσης στο μακρόκοσμο.",
            "το φαινόμενο της πλαστικής κρούσης στο μικρόκοσμο.",
            "το φαινόμενο του μικρόκοσμου στο οποίο τα σώματα αλληλεπιδρούν με σχετικά μεγάλες δυνάμεις για πολύ μικρό χρονικό διάστημα.",
            "το φαινόμενο της κρούσης στο οποίο τα σώματα έρχονται σε επαφή."
        ],
        correctAnswer: 2,
        explanation: "Στον μικρόκοσμο δεν έχω επαφή και έχω αλληλεπίδραση από απόσταση "
    },
    {
        question: "Ένα σύστημα δύο σωμάτων που κάνουν μεταφορική κίνηση θεωρείται απομονωμένο όταν:",
        options: [
            "η συνισταμένη των εξωτερικών δυνάμεων είναι σταθερή.",
            "η συνισταμένη των εξωτερικών δυνάμεων είναι μηδέν.",
            "η συνισταμένη των εσωτερικών δυνάμεων είναι μηδέν.",
            "η ορμή του συστήματος είναι μηδέν."
        ],
        correctAnswer: 1,
        explanation: "α) θέλω να είναι μηδέν και όχι μόνο σταθερή , γ) οι εσωτερικές δυνάμεις είναι δράσης - αντίδρασης και δεν δημιουργούν συνισταμένη , δ) δεν είναι αναγκαίο η ορμή να είναι μηδενική"
    },
    {
        question: "Σε μια κεντρική κρούση δύο σωμάτων:",
        options: [
            "Οι ταχύτητες των κέντρων μάζας των σωμάτων πριν από την κρούση είναι στην ίδια ευθεία.",
            "Οι ταχύτητες των κέντρων μάζας των σωμάτων πριν από την κρούση έχουν αντίθετες κατευθύνσεις.",
            "Η κινητική ενέργεια του συστήματος διατηρείται σταθερή.",
            "Οι ταχύτητες των κέντρων μάζας των σωμάτων πριν από την κρούση έχουν παράλληλες διευθύνσεις."
        ],
        correctAnswer: 0,
        explanation: "Εξ ορισμού είναι σωστό το (α)"
    },
    {
        question: "Σε μια έκκεντρη κρούση δύο σωμάτων:",
        options: [
            "Οι ταχύτητες των κέντρων μάζας των σωμάτων πριν από την κρούση είναι στην ίδια ευθεία.",
            "Οι ταχύτητες των κέντρων μάζας των σωμάτων πριν από την κρούση έχουν αντίθετες κατευθύνσεις.",
            "Η κινητική ενέργεια του συστήματος διατηρείται σταθερή.",
            "Οι ταχύτητες των κέντρων μάζας των σωμάτων πριν από την κρούση έχουν παράλληλες διευθύνσεις."
        ],
        correctAnswer: 3,
        explanation: "Εξ ορισμού σωστό το (δ)"
    },
    
    {
        question: "Δύο σφαίρες Α και Β συγκρούονται πάνω στο τραπέζι του μπιλιάρδου. Διατηρείται σταθερή η ορμή:",
        options: [
            "της σφαίρας Α.",
            "της σφαίρας Β.",
            "του συστήματος των δύο σφαιρών.",
            "του συστήματος των δύο σφαιρών, μόνο αν η κρούση είναι ελαστική."
        ],
        correctAnswer: 2,
        explanation: "Πάντα διατηρείται η ορμή του συστήματος , όχι των επιμέρους σωμάτων"
    },
    {
        question: "Σε κάθε κρούση δύο σωμάτων, που αποτελούν μονωμένο σύστημα:",
        options: [
            "διατηρείται η ορμή του κάθε σώματος.",
            "ισχύει η αρχή διατήρησης της ενέργειας.",
            "ισχύει η αρχή διατήρησης της ορμής του συστήματος, μόνο αν διατηρείται ταυτόχρονα και η κινητική ενέργεια του συστήματος.",
            "διατηρείται η κινητική ενέργεια του συστήματος."
        ],
        correctAnswer: 1,
        explanation: "α) η ορμή κάθε σώματος αλλάζει γ) δεν έχει σχέση η ΑΔΟ με την ΑΔΕ δ) μόνο στις ελαστικές κρούσεις"
    },
    {
        question: "Σε μια ελαστική κρούση δύο σωμάτων διατηρείται:",
        options: [
            "μόνο η ορμή του συστήματος των σωμάτων.",
            "η ορμή και η κινητική ενέργεια του κάθε σώματος.",
            "η ορμή και η κινητική ενέργεια του συστήματος των σωμάτων.",
            "η ορμή του συστήματος και η κινητική ενέργεια του κάθε σώματος."
        ],
        correctAnswer: 2,
        explanation: "Κρούση = ΑΔΟ και ελαστική = ΑΔΕ "
    },
    
    {
        question: "Η ορμή ενός απομονωμένου συστήματος σωμάτων διατηρείται:",
        options: [
            "μόνο στις ελαστικές κρούσεις.",
            "μόνο στις κεντρικές κρούσεις.",
            "μόνο στις ανελαστικές κρούσεις.",
            "σε όλες τις κρούσεις."
        ],
        correctAnswer: 3,
        explanation: "Βάση της ΑΔΟ"
    },
    {
        question: "Η διατήρηση της κινητικής ενέργειας ενός απομονωμένου συστήματος σωμάτων ισχύει:",
        options: [
            "σε κάθε κρούση.",
            "μόνο στις μετωπικές και ελαστικές κρούσεις.",
            "στις πλαστικές και μετωπικές κρούσεις.",
            "μόνο στις ελαστικές κρούσεις."
        ],
        correctAnswer: 3,
        explanation: "Για αυτό λέγονται ελαστικές "
    },
    {
    "question": "Δύο σφαίρες με μάζες \\( m_1, m_2 \\) κινούνται στην ίδια ευθεία με ταχύτητες \\( υ_1, υ_2 \\) με \\( υ_1 > υ_2 \\) αντιστοίχως, προς την ίδια κατεύθυνση και συγκρούονται μετωπικά και ελαστικά. Οι ταχύτητες μετά την κρούση είναι:",
    "options": [
        "V_1 = \\( \\frac{(m_1 - m_2)υ_1 + 2m_2υ_2}{m_1 + m_2} \\), V_2 = \\( \\frac{(m_2 - m_1)υ_2 + 2m_1υ_1}{m_1 + m_2} \\)",
        "V_1 = \\( \\frac{(m_1 - m_2)υ_1 + 2m_1υ_1}{m_1 + m_2} \\), V_2 = \\( \\frac{(m_2 - m_1)υ_2 + 2m_2υ_2}{m_1 + m_2} \\)"
    ],
    "correctAnswer": 0,
    "explanation": ""
}

];

    // Μεταβλητές κατάστασης
    let currentQuestionIndex = 0;
    let userAnswers = new Array(questions.length).fill(null);
    let score = 0;
    let timeLeft = 60;
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
        renderMath();
    }

    // Επιλογή απάντησης
    function selectOption(optionIndex) {
        if (quizCompleted) return;
        
        userAnswers[currentQuestionIndex] = optionIndex;
        
        const question = questions[currentQuestionIndex];
        if (optionIndex === question.correctAnswer) {
            score++;
        }
        
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
        
        const options = document.querySelectorAll('.option');
        options.forEach(option => {
            option.style.cursor = 'not-allowed';
        });
        
        showResults();
    }

    // Εμφάνιση αποτελεσμάτων
   function showResults() {
    const resultsData = {
        score: score,
        totalQuestions: questions.length,
        userAnswers: userAnswers,
        questions: questions.map(q => ({
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation
        }))
    };

    // Αποθήκευση στο sessionStorage
    sessionStorage.setItem('quizResults', JSON.stringify(resultsData));
    
    // Ανακατεύθυνση στη σελίδα αποτελεσμάτων
    window.location.href = 'results.html';
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

    // Εκ νέου απόδοση μαθηματικών τύπων
    function renderMath() {
        if (window.MathJax) {
            MathJax.typesetPromise().catch(err => {
                console.error('MathJax typesetting error:', err);
                // Επανάληψη αν αποτύχει η πρώτη προσπάθεια
                setTimeout(renderMath, 500);
            });
        }
    }

    // Event listeners
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
