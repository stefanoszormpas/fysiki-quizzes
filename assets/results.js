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
        const questionType = question.type || "multiple-choice";
        const userAnswer = resultsData.userAnswers[index];
        
        if (questionType === "true-false-multiple") {
            // Ερώτηση Σωστού-Λάθους
            const allCorrect = Array.isArray(userAnswer) && 
                              userAnswer.every((ans, i) => ans === question.correctAnswers[i]);
            
            resultsHTML += `
                <div class="question-review ${allCorrect ? 'correct' : 'incorrect'}">
                    <p><strong>Ερώτηση ${index + 1}:</strong> <span class="math-display">${question.question}</span></p>
            `;
            
            // Εμφάνιση κάθε πρότασης
            question.statements.forEach((statement, i) => {
                const userAns = userAnswer && userAnswer[i] !== undefined ? userAnswer[i] : null;
                const correctAns = question.correctAnswers[i];
                const isStatementCorrect = userAns === correctAns;
                
                resultsHTML += `
                    <div class="statement-review ${isStatementCorrect ? 'statement-correct' : 'statement-incorrect'}">
                        <p class="statement-text math-display"><strong>${i + 1}.</strong> ${statement}</p>
                        <p>Η απάντησή σας: <span class="${isStatementCorrect ? 'correct' : 'incorrect'}">
                            ${userAns !== null ? (userAns ? 'Σωστό' : 'Λάθος') : 'Δεν απαντήθηκε'}
                        </span></p>
                        ${!isStatementCorrect ? `
                            <p>Σωστή απάντηση: <span class="correct">${correctAns ? 'Σωστό' : 'Λάθος'}</span></p>
                        ` : ''}
                    </div>
                `;
            });
            
            resultsHTML += `
                    <p class="explanation">${question.explanation}</p>
                </div>
            `;
            
        } else {
            // Ερώτηση Multiple Choice (παλιό format)
            const isCorrect = userAnswer === question.correctAnswer;
            
            resultsHTML += `
                <div class="question-review ${isCorrect ? 'correct' : 'incorrect'}">
                    <p><strong>Ερώτηση ${index + 1}:</strong> <span class="math-display">${question.question}</span></p>
                    <p>Η απάντησή σας: <span class="${isCorrect ? 'correct' : 'incorrect'} math-display">
                        ${userAnswer !== null ? question.options[userAnswer] : 'Δεν απαντήθηκε'}
                    </span></p>
                    ${!isCorrect ? `
                        <p>Σωστή απάντηση: <span class="correct math-display">${question.options[question.correctAnswer]}</span></p>
                    ` : ''}
                    <p class="explanation math-display">${question.explanation}</p>
                </div>
            `;
        }
    });
    
    resultsContent.innerHTML = resultsHTML;
    
    // Εφαρμογή MathJax μετά τη δημιουργία του HTML
    if (window.MathJax) {
        MathJax.typesetPromise().catch(err => {
            console.error('MathJax error:', err);
        });
    }
});
