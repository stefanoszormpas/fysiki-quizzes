const quiz_krouseis = [
  {
    question: "Ποια ποσότητα διατηρείται σε κάθε είδος κρούσης;",
    answers: [
      "Η κινητική ενέργεια",
      "Η μηχανική ενέργεια",
      "Η ορμή",
      "Η ταχύτητα του κάθε σώματος"
    ],
    correct: 2
  },
  {
    question: "Σε απολύτως ελαστική κρούση διατηρούνται:",
    answers: [
      "Μόνο η κινητική ενέργεια",
      "Η κινητική ενέργεια και η ορμή",
      "Η δυναμική ενέργεια",
      "Καμία από τις παραπάνω"
    ],
    correct: 1
  },
  {
    question: "Η εξίσωση διατήρησης της ορμής είναι: $$m_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2$$. Τι εκφράζει;",
    answers: [
      "Τη διατήρηση ενέργειας",
      "Τη μεταβολή της δύναμης",
      "Τη διατήρηση της ορμής",
      "Τη μεταβολή της ταχύτητας"
    ],
    correct: 2
  },
  {
    question: "Ποια είναι η μονάδα μέτρησης της ορμής στο S.I.;",
    answers: [
      "N",
      "J",
      "kg·m/s",
      "m/s²"
    ],
    correct: 2
  }
];

let quizData = shuffleArray(quiz_krouseis);
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 30;

const quizContainer = document.getElementById("quiz");
const submitBtn = document.getElementById("submitBtn");
const nextBtn = document.getElementById("nextBtn");
const resultContainer = document.getElementById("result");
const timerDisplay = document.getElementById("time");

function renderQuestion() {
  clearInterval(timer);
  timeLeft = 30;
  timerDisplay.textContent = timeLeft;
  timer = setInterval(countdown, 1000);

  const q = quizData[currentQuestion];
  quizContainer.innerHTML = `
    <div class="question" id="questionBox">
      <p>${currentQuestion + 1}. ${q.question}</p>
      <div class="answers">
        ${q.answers
          .map(
            (ans, i) => `
            <label>
              <input type="radio" name="q" value="${i}" />
              ${ans}
            </label>`
          )
          .join("")}
      </div>
    </div>
  `;

  // Κάλεσε τη MathJax αφού προστέθηκε η νέα ερώτηση
  if (window.MathJax) MathJax.typesetPromise();
}

function countdown() {
  timeLeft--;
  timerDisplay.textContent = timeLeft;
  if (timeLeft === 0) {
    clearInterval(timer);
    checkAnswer();
  }
}

submitBtn.addEventListener("click", checkAnswer);
nextBtn.addEventListener("click", nextQuestion);

function checkAnswer() {
  clearInterval(timer);
  const selected = document.querySelector(`input[name="q"]:checked`);
  const questionBox = document.getElementById("questionBox");
  if (selected) {
    if (parseInt(selected.value) === quizData[currentQuestion].correct) {
      score++;
      questionBox.classList.add("correct");
    } else {
      questionBox.classList.add("wrong");
    }
  } else {
    questionBox.classList.add("wrong");
  }
  submitBtn.disabled = true;
  nextBtn.disabled = false;
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion >= quizData.length) {
    showResult();
  } else {
    renderQuestion();
    submitBtn.disabled = false;
    nextBtn.disabled = true;
  }
}

function showResult() {
  quizContainer.innerHTML = "";
  resultContainer.innerText = `Τελικό σκορ: ${score} / ${quizData.length}`;
  document.getElementById("controls").style.display = "none";
  document.getElementById("timer").style.display = "none";
}

function shuffleArray(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

renderQuestion();


renderQuestion();
