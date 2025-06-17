const quizData = [
  {
    question: "Σε μια κεντρική ελαστική κρούση δύο σωμάτων με μάζες \( m_1 \) και \( m_2 \), ποια ποσότητα διατηρείται;",
    answers: [
      "Μόνο η ορμή",
      "Μόνο η κινητική ενέργεια",
      "Και η ορμή και η κινητική ενέργεια",
      "Καμία από τις παραπάνω"
    ],
    correct: 2
  },
  {
    question: "Η σχέση για την ορμή είναι \( p = m \cdot v \). Αν διπλασιαστεί η ταχύτητα, η ορμή θα:",
    answers: [
      "Διπλασιαστεί",
      "Τριπλασιαστεί",
      "Τετραπλασιαστεί",
      "Μειωθεί στο μισό"
    ],
    correct: 0
  }
];

let currentQuestion = 0;
let timer;
let timeLeft = 30;

const quizEl = document.getElementById("quiz");
const submitBtn = document.getElementById("submitBtn");
const nextBtn = document.getElementById("nextBtn");
const timerEl = document.getElementById("time");

function loadQuestion() {
  clearInterval(timer);
  timeLeft = 30;
  timerEl.textContent = timeLeft;
  timer = setInterval(countdown, 1000);

  const q = quizData[currentQuestion];
  quizEl.innerHTML = `
    <div class="question">$${q.question}$</div>
    <div class="answers">
      ${q.answers.map((a, i) => `
        <label><input type="radio" name="answer" value="${i}"> ${a}</label>
      `).join('')}
    </div>
  `;
  MathJax.typesetPromise();
  submitBtn.disabled = false;
  nextBtn.disabled = true;
}

function countdown() {
  timeLeft--;
  timerEl.textContent = timeLeft;
  if (timeLeft === 0) {
    clearInterval(timer);
    checkAnswer(true);
  }
}

function checkAnswer(timeOut = false) {
  clearInterval(timer);
  const selected = document.querySelector('input[name="answer"]:checked');
  const labels = document.querySelectorAll('.answers label');
  
  labels.forEach((label, index) => {
    if (index === quizData[currentQuestion].correct) {
      label.classList.add("correct");
    }
  });

  if (selected) {
    if (parseInt(selected.value) === quizData[currentQuestion].correct) {
      selected.parentElement.classList.add("correct");
    } else {
      selected.parentElement.classList.add("incorrect");
    }
  } else if (!timeOut) {
    alert("Επίλεξε μια απάντηση!");
    return;
  }

  submitBtn.disabled = true;
  nextBtn.disabled = false;
}

submitBtn.addEventListener("click", () => checkAnswer());
nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    quizEl.innerHTML = "<h2>Το quiz ολοκληρώθηκε!</h2>";
    document.getElementById("controls").style.display = "none";
    clearInterval(timer);
  }
});

loadQuestion();
