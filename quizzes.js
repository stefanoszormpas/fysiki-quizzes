const quiz_krouseis = [
  {
    question: "Ποια ποσότητα διατηρείται σε κάθε είδος κρούσης;",
    answers: ["Η κινητική ενέργεια", "Η μηχανική ενέργεια", "Η ορμή", "Η ταχύτητα του κάθε σώματος"],
    correct: 2
  },
  {
    question: "Σε απολύτως ελαστική κρούση διατηρούνται:",
    answers: ["Μόνο η κινητική ενέργεια", "Η κινητική ενέργεια και η ορμή", "Η δυναμική ενέργεια", "Καμία από τις παραπάνω"],
    correct: 1
  },
  {
    question: "Η εξίσωση διατήρησης της ορμής είναι: $m_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2$. Τι εκφράζει;",
    answers: ["Τη διατήρηση ενέργειας", "Τη μεταβολή της δύναμης", "Τη διατήρηση της ορμής", "Τη μεταβολή της ταχύτητας"],
    correct: 2
  },
  {
    question: "Ποια είναι η μονάδα μέτρησης της ορμής στο S.I.;",
    answers: ["N", "J", "kg·m/s", "m/s²"],
    correct: 2
  },
  {
    question: "Στην πλαστική κρούση δύο σωμάτων, η τελική ταχύτητα είναι:",
    answers: ["Μηδέν", "Ίδια για τα δύο σώματα", "Μεγαλύτερη του ενός σώματος", "Αρνητική πάντα"],
    correct: 1
  },
  {
    question: "Πότε δύο σώματα μένουν ενωμένα μετά την κρούση;",
    answers: ["Μόνο αν έχουν την ίδια ταχύτητα πριν", "Όταν η κρούση είναι ελαστική", "Όταν η κρούση είναι απολύτως πλαστική", "Όταν είναι ακίνητα"],
    correct: 2
  },
  {
    question: "Αν $p = mv$, τότε η ορμή σώματος μάζας $2\,\text{kg}$ που κινείται με $3\,\text{m/s}$ είναι:",
    answers: ["$5\,\text{kg·m/s}$", "$6\,\text{kg·m/s}$", "$1.5\,\text{kg·m/s}$", "$3\,\text{kg·m/s}$"],
    correct: 1
  },
  {
    question: "Δύο σώματα μάζας $m$ και $2m$ συγκρούονται πλαστικά. Το $m$ κινείται με ταχύτητα $u$ και το $2m$ είναι ακίνητο. Ποια είναι η τελική ταχύτητα $v$ του συσσωματώματος;",
    answers: ["$\\dfrac{u}{3}$", "$\\dfrac{2u}{3}$", "$\\dfrac{3u}{2}$", "$\\dfrac{u}{2}$"],
    correct: 0
  },
  {
    question: "Αν σε ελαστική κρούση $m_1 = m_2$ και $u_2 = 0$, τότε μετά την κρούση ισχύει:",
    answers: ["$v_1 = 0$, $v_2 = u_1$", "$v_1 = u_1$, $v_2 = 0$", "$v_1 = v_2$", "$v_1 = -u_1$, $v_2 = u_2$"],
    correct: 0
  },
  {
    question: "Αν σε πλαστική κρούση η αρχική κινητική ενέργεια είναι $K_\\text{πριν}$ και η τελική $K_\\text{μετά}$, τότε:",
    answers: ["$K_\\text{μετά} = K_\\text{πριν}$", "$K_\\text{μετά} > K_\\text{πριν}$", "$K_\\text{μετά} < K_\\text{πριν}$", "$K_\\text{μετά} = 0$"],
    correct: 2
  }
];

let quizData = shuffleArray(quiz_krouseis);
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 30;

function renderQuestion() {
  const q = quizData[currentQuestion];
  const quizContainer = document.getElementById("quiz");
  quizContainer.innerHTML = `
    <div class="question">
      <p>${q.question}</p>
      <div class="answers">
        ${q.answers.map((ans, i) => `<label><input type="radio" name="answer" value="${i}"> ${ans}</label>`).join("")}
      </div>
    </div>
  `;
  if (window.MathJax) MathJax.typeset();
  document.getElementById("submitBtn").disabled = false;
  document.getElementById("nextBtn").disabled = true;
  resetTimer();
}

function submitAnswer() {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) return;
  document.getElementById("submitBtn").disabled = true;
  const answer = parseInt(selected.value);
  const allLabels = document.querySelectorAll(".answers label");
  allLabels.forEach((label, i) => {
    if (i === quizData[currentQuestion].correct) {
      label.classList.add("correct");
    }
    if (i === answer && i !== quizData[currentQuestion].correct) {
      label.classList.add("incorrect");
    }
  });
  if (answer === quizData[currentQuestion].correct) score++;
  document.getElementById("result").innerText = `Σκορ: ${score} / ${quizData.length}`;
  document.getElementById("nextBtn").disabled = false;
  clearInterval(timer);
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion >= quizData.length) {
    document.getElementById("quiz").innerHTML = "<h2>Τέλος Quiz!</h2>";
    document.getElementById("controls").style.display = "none";
    document.getElementById("timer").style.display = "none";
    return;
  }
  renderQuestion();
}

function shuffleArray(array) {
  return array.map(a => ({ sort: Math.random(), value: a }))
              .sort((a, b) => a.sort - b.sort)
              .map(a => a.value);
}

function resetTimer() {
  timeLeft = 30;
  document.getElementById("time").innerText = timeLeft;
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("time").innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      submitAnswer();
    }
  }, 1000);
}

document.getElementById("submitBtn").addEventListener("click", submitAnswer);
document.getElementById("nextBtn").addEventListener("click", nextQuestion);

renderQuestion();

