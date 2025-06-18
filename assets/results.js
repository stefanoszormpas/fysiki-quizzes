document.addEventListener('DOMContentLoaded', function() {
    const resultsContent = document.getElementById('results-content');
    const resultsData = JSON.parse(sessionStorage.getItem('quizResults'));

    if (!resultsData) {
        resultsContent.innerHTML = '<p>Δεν βρέθηκαν αποτελέσματα. <a href="quiz1.html">Προσπαθήστε ξανά</a></p>';
        return;
    }

    let resultsHTML = `
        <h2>Συνοπτικά Αποτελέσματα</h2>
        <p>Σκορ: <strong>${resultsData.score}/${resultsData.totalQuestions}</strong></p>
        <p>Ποσοστό Επιτυχίας: <strong>${Math.round((resultsData.score / resultsData.totalQuestions) * 100)}%</strong></p>
        <h3>Αναλυτική Αξιολόγηση:</h3>
    `;

    resultsData.questions.forEach((question, index) => {
        const userAnswer = resultsData.userAnswers[index];
        const isCorrect = userAnswer === question.correctAnswer;

        resultsHTML += `
            <div class="question-review ${isCorrect ? 'correct' : 'incorrect'}">
                <p><strong>Ερώτηση ${index + 1}:</strong> ${question.question}</p>
                <p>Η απάντησή σας: <span class="${isCorrect ? 'correct' : 'incorrect'}">
                    ${userAnswer !== null ? question.options[userAnswer] : 'Δεν απαντήθηκε'}
                </span></p>
                ${!isCorrect ? `
                    <p>Σωστή απάντηση: <span class="correct">${question.options[question.correctAnswer]}</span></p>
                ` : ''}
                <p class="explanation">${question.explanation}</p>
            </div>
        `;
    });

    resultsContent.innerHTML = resultsHTML;

    // Εφαρμογή MathJax μετά τη δημιουργία του HTML
    if (window.MathJax) {
        MathJax.typesetPromise();
    }
});
