document.addEventListener('DOMContentLoaded', async function() {
    let questions = [];

    async function loadQuestions() {
        const urlParams = new URLSearchParams(window.location.search);
        const quizId = urlParams.get('quiz') || '1';
        const response = await fetch(`assets/questions${quizId}.json`);
        questions = await response.json();
    }

    await loadQuestions();

    let currentQuestionIndex = 0;
    let userAnswers = new Array(questions.length).fill(null);
    let score = 0;
    let initialTime = 600;
    let timeLeft = initialTime;
    let timer;
    let quizCompleted = false;

    const questionContainer = document.querySelector('.question-container');
    const optionsContainer = document.querySelector('.options-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    const resultsDiv = document.querySelector('.results');
    const timeSpan = document.getElementById('time');

    function initQuiz() {
        shuffleQuestions();
        showQuestion();
        startTimer();
    }

    function shuffleQuestions() {
        for (let i = questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questions[i], questions[j]] = [questions[j], questions[i]];
        }
    }

    function showQuestion() {
        const question = questions[currentQuestionIndex];
        questionContainer.innerHTML = `<div class="math-display">${question.question}</div>`;

        optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');
            optionElement.innerHTML = `<div class="math-display">${option}</div>`;

            // Αν το quiz έχει ολοκληρωθεί, κάνουμε χρωματισμό
            if (quizCompleted) {
                let correctIndices = [];

                if (question.correctAnswer !== undefined) {
                    correctIndices = [question.correctAnswer];
                } else if (question.correctAnswers !== undefined) {
                    correctIndices = question.correctAnswers;
                }

                if (correctIndices.includes(index)) {
                    optionElement.classList.add('correct');
                }

                let userSelected = userAnswers[currentQuestionIndex];
                if (userSelected !== null) {
                    if (!Array.isArray(userSelected)) {
                        userSelected = [userSelected];
                    }
                    if (userSelected.includes(index) && !correctIndices.includes(index)) {
                        optionElement.classList.add('incorrect');
                    }
                }
            } else {
                // Στις ερωτήσεις που δεν έχουν ακόμα υποβληθεί
                let userSelected = userAnswers[currentQuestionIndex];
                if (userSelected !== null) {
                    if (!Array.isArray(userSelected)) {
                        userSelected = [userSelected];
                    }
                    if (userSelected.includes(index)) {
                        optionElement.classList.add('selected');
                    }
                }
            }

            optionElement.addEventListener('click', () => selectOption(index));
            optionsContainer.appendChild(optionElement);
        });

        updateNavigationButtons();
        renderMath();
    }

    function selectOption(optionIndex) {
        if (quizCompleted) return;

        const question = questions[currentQuestionIndex];

        if (question.correctAnswers !== undefined) {
            if (userAnswers[currentQuestionIndex] === null) {
                userAnswers[currentQuestionIndex] = [];
            }
            let userSelected = userAnswers[currentQuestionIndex];
            if (userSelected.includes(optionIndex)) {
                userAnswers[currentQuestionIndex] = userSelected.filter(i => i !== optionIndex);
            } else {
                userSelected.push(optionIndex);
            }
        } else {
            userAnswers[currentQuestionIndex] = optionIndex;
        }

        showQuestion();
    }

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

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    function startTimer() {
        timeSpan.textContent = formatTime(timeLeft);
        timer = setInterval(() => {
            timeLeft--;
            timeSpan.textContent = formatTime(timeLeft);
            if (timeLeft <= 0) {
                clearInterval(timer);
                endQuiz();
            }
        }, 1000);
    }

    function endQuiz() {
        quizCompleted = true;
        clearInterval(timer);
        calculateScore();
        showQuestion(); // Για να βαφτούν σωστά
        showResults();
    }

    function calculateScore() {
        score = 0;
        questions.forEach((question, index) => {
            let correctIndices = [];

            if (question.correctAnswer !== undefined) {
                correctIndices = [question.correctAnswer];
            } else if (question.correctAnswers !== undefined) {
                correctIndices = question.correctAnswers;
            }

            let userSelected = userAnswers[index];
            if (userSelected === null) return;

            if (!Array.isArray(userSelected)) {
                userSelected = [userSelected];
            }

            // Αν ο χρήστης επέλεξε ακριβώς όλα τα σωστά (και μόνο αυτά)
            const isCorrect = correctIndices.length === userSelected.length &&
                              correctIndices.every(val => userSelected.includes(val));

            if (isCorrect) {
                score++;
            }
        });
    }

    function showResults() {
        const resultsData = {
            score: score,
            totalQuestions: questions.length,
            userAnswers: userAnswers,
            questions: questions.map(q => ({
                question: q.question,
                options: q.options,
                correctAnswer: q.correctAnswer,
                correctAnswers: q.correctAnswers,
                explanation: q.explanation
            }))
        };

        sessionStorage.setItem('quizResults', JSON.stringify(resultsData));
        window.location.href = 'results.html';
    }

    function renderMath() {
        if (window.MathJax) {
            MathJax.typesetPromise().catch(err => {
                console.error('MathJax typesetting error:', err);
                setTimeout(renderMath, 500);
            });
        }
    }

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

    initQuiz();
});

