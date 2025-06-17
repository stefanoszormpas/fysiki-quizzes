
const quiz_krouseis = [
  {
    question: "Ποια ποσότητα διατηρείται σε κάθε είδος κρούσης;",
    answers: ["Η κινητική ενέργεια","Η μηχανική ενέργεια","Η ορμή","Η ταχύτητα του κάθε σώματος"],
    correct: 2
  },
  {
    question: "Σε απολύτως ελαστική κρούση διατηρούνται:",
    answers: ["Μόνο η κινητική ενέργεια","Η κινητική ενέργεια και η ορμή","Η δυναμική ενέργεια","Καμία από τις παραπάνω"],
    correct: 1
  },
  {
    question: "Η εξίσωση διατήρησης της ορμής είναι: $m_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2$. Τι εκφράζει;",
    answers: ["Τη διατήρηση ενέργειας","Τη μεταβολή της δύναμης","Τη διατήρηση της ορμής","Τη μεταβολή της ταχύτητας"],
    correct: 2
  },
  {
    question: "Ποια είναι η μονάδα μέτρησης της ορμής στο S.I.;",
    answers: ["N","J","kg·m/s","m/s²"],
    correct: 2
  },
  {
    question: "Στην πλαστική κρούση δύο σωμάτων, η τελική ταχύτητα είναι:",
    answers: ["Μηδέν","Ίδια για τα δύο σώματα","Μεγαλύτερη του ενός σώματος","Αρνητική πάντα"],
    correct: 1
  },
  {
    question: "Πότε δύο σώματα μένουν ενωμένα μετά την κρούση;",
    answers: ["Μόνο αν έχουν την ίδια ταχύτητα πριν","Όταν η κρούση είναι ελαστική","Όταν η κρούση είναι απολύτως πλαστική","Όταν είναι ακίνητα"],
    correct: 2
  },
  {
    question: "Αν $p = mv$, τότε η ορμή σώματος μάζας $2\,\text{kg}$ που κινείται με $3\,\text{m/s}$ είναι:",
    answers: ["$5\,\text{kg·m/s}$","$6\,\text{kg·m/s}$","$1.5\,\text{kg·m/s}$","$3\,\text{kg·m/s}$"],
    correct: 1
  },
  {
    question: "Δύο σώματα μάζας $m$ και $2m$ συγκρούονται πλαστικά. Το $m$ κινείται με ταχύτητα $u$ και το $2m$ είναι ακίνητο. Ποια είναι η τελική ταχύτητα $v$ του συσσωματώματος;",
    answers: ["$\\dfrac{u}{3}$","$\\dfrac{2u}{3}$","$\\dfrac{3u}{2}$","$\\dfrac{u}{2}$"],
    correct: 0
  },
  {
    question: "Αν σε ελαστική κρούση $m_1 = m_2$ και $u_2 = 0$, τότε μετά την κρούση ισχύει:",
    answers: ["$v_1 = 0$, $v_2 = u_1$","$v_1 = u_1$, $v_2 = 0$","$v_1 = v_2$","$v_1 = -u_1$, $v_2 = u_2$"],
    correct: 0
  },
  {
    question: "Αν σε πλαστική κρούση η αρχική κινητική ενέργεια είναι $K_\\text{πριν}$ και η τελική $K_\\text{μετά}$, τότε:",
    answers: ["$K_\\text{μετά} = K_\\text{πριν}$","$K_\\text{μετά} > K_\\text{πριν}$","$K_\\text{μετά} < K_\\text{πριν}$","$K_\\text{μετά} = 0$"],
    correct: 2
  }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 30;

function startTimer() {
  clearInterval(timer);
  timeLeft = 30;
  document.getElementById("time").innerText = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("time").innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      document.getElementById("submitBtn").disabled = true;
      document.getElementById("nextBtn").disabled = false;
    }
  }, 1000);
}

function renderQuestion() {
  const q = quiz_krouseis[currentQuestion];
  const quizContainer = document.getElementById("quiz");
  quizContainer.innerHTML = \`
    <div class="question">
      <p>\${q.question}</p>
      <div class="answers">
        \${q.answers.map((ans, i) => \`
          <label>
            <input type="radio" name="answer" value="\${i}"> \${ans}
          </label>\`).join('')}
      </div>
    </div>
  \`;
  if (window.MathJax) MathJax.typeset();
  document.getElementById("submitBtn").disabled = false;
  document.getElementById("nextBtn").disabled = true;
  startTimer();
}

document.getElementById("submitBtn").addEventListener("click", () => {
  clearInterval(timer);
  const selected = document.querySelector('input[name="answer"]:checked');
  const questionDiv = document.querySelector(".question");
  if (!selected) return;
  if (parseInt(selected.value) === quiz_krouseis[currentQuestion].correct) {
    questionDiv.classList.add("correct");
    score++;
  } else {
    questionDiv.classList.add("incorrect");
  }
  document.getElementById("submitBtn").disabled = true;
  document.getElementById("nextBtn").disabled = false;
});

document.getElementById("nextBtn").addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quiz_krouseis.length) {
    renderQuestion();
  } else {
    document.getElementById("quiz").innerHTML = \`
      <h2>Τέλος!</h2>
      <p>Σωστές: \${score} / \${quiz_krouseis.length}</p>
    \`;
    document.getElementById("controls").style.display = "none";
    document.getElementById("timer").style.display = "none";
  }
});

renderQuestion();


