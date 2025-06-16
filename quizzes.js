console.log("✅ quizzes.js φορτώθηκε");
const quiz_krouseis = [
  {
    question: "1. Ποια ποσότητα διατηρείται σε κάθε είδος κρούσης;",
    options: [
      "Η κινητική ενέργεια",
      "Η μηχανική ενέργεια",
      "Η ορμή",
      "Η ταχύτητα του κάθε σώματος"
    ],
    answer: 2
  },
  {
    question: "2. Σε απολύτως ελαστική κρούση διατηρούνται:",
    options: [
      "Μόνο η κινητική ενέργεια",
      "Η κινητική ενέργεια και η ορμή",
      "Η δυναμική ενέργεια",
      "Καμία από τις παραπάνω"
    ],
    answer: 1
  },
  {
    question: "3. Η εξίσωση διατήρησης της ορμής είναι: $m_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2$. Τι εκφράζει;",
    options: [
      "Τη διατήρηση ενέργειας",
      "Τη μεταβολή της δύναμης",
      "Τη διατήρηση της ορμής",
      "Τη μεταβολή της ταχύτητας"
    ],
    answer: 2
  },
  {
    question: "4. Ποια είναι η μονάδα μέτρησης της ορμής στο S.I.;",
    options: [
      "N",
      "J",
      "kg·m/s",
      "m/s²"
    ],
    answer: 2
  },
  {
    question: "5. Στην πλαστική κρούση δύο σωμάτων, η τελική ταχύτητα είναι:",
    options: [
      "Μηδέν",
      "Ίδια για τα δύο σώματα",
      "Μεγαλύτερη του ενός σώματος",
      "Αρνητική πάντα"
    ],
    answer: 1
  },
  {
    question: "6. Πότε δύο σώματα μένουν ενωμένα μετά την κρούση;",
    options: [
      "Μόνο αν έχουν την ίδια ταχύτητα πριν",
      "Όταν η κρούση είναι ελαστική",
      "Όταν η κρούση είναι απολύτως πλαστική",
      "Όταν είναι ακίνητα"
    ],
    answer: 2
  },
  {
    question: "7. Αν $p = mv$, τότε η ορμή σώματος μάζας $2\\,\\text{kg}$ που κινείται με $3\\,\\text{m/s}$ είναι:",
    options: [
      "$5\\,\\text{kg·m/s}$",
      "$6\\,\\text{kg·m/s}$",
      "$1.5\\,\\text{kg·m/s}$",
      "$3\\,\\text{kg·m/s}$"
    ],
    answer: 1
  },
  {
    question: "8. Δύο σώματα μάζας $m$ και $2m$ συγκρούονται πλαστικά. Το $m$ κινείται με ταχύτητα $u$ και το $2m$ είναι ακίνητο. Ποια είναι η τελική ταχύτητα $v$ του συσσωματώματος;",
    options: [
      "$\\dfrac{u}{3}$",
      "$\\dfrac{2u}{3}$",
      "$\\dfrac{3u}{2}$",
      "$\\dfrac{u}{2}$"
    ],
    answer: 0
  },
  {
    question: "9. Αν σε ελαστική κρούση $m_1 = m_2$ και $u_2 = 0$, τότε μετά την κρούση ισχύει:",
    options: [
      "$v_1 = 0$, $v_2 = u_1$",
      "$v_1 = u_1$, $v_2 = 0$",
      "$v_1 = v_2$",
      "$v_1 = -u_1$, $v_2 = u_2$"
    ],
    answer: 0
  },
  {
    question: "10. Αν σε πλαστική κρούση η αρχική κινητική ενέργεια είναι $K_\\text{πριν}$ και η τελική $K_\\text{μετά}$, τότε:",
    options: [
      "$K_\\text{μετά} = K_\\text{πριν}$",
      "$K_\\text{μετά} > K_\\text{πριν}$",
      "$K_\\text{μετά} < K_\\text{πριν}$",
      "$K_\\text{μετά} = 0$"
    ],
    answer: 2
  }
];

// Globals
let shuffledQuiz = [];
const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const submitBtn = document.getElementById("submit");
const restartBtn = document.getElementById("restart");

function shuffleArray(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function renderQuiz() {
  quizContainer.innerHTML = "";
  shuffledQuiz = shuffleArray(quiz_krouseis);

  shuffledQuiz.forEach((q, index) => {
    const div = document.createElement("div");
    div.classList.add("question-block");

    const p = document.createElement("p");
    p.classList.add("question");
    p.innerHTML = q.question;
    div.appendChild(p);

    q.options.forEach((option, i) => {
      const label = document.createElement("label");
      label.innerHTML = `
        <input type="radio" name="q${index}" value="${i}">
        ${option}
      `;
      div.appendChild(label);
      div.appendChild(document.createElement("br"));
    });

    quizContainer.appendChild(div);
  });

  if (window.MathJax) MathJax.typeset();
}

function showResult() {
  let score = 0;
  shuffledQuiz.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected && parseInt(selected.value) === q.answer) {
      score++;
    }
  });
  resultContainer.innerText = `Σκορ: ${score} / ${shuffledQuiz.length}`;
}

function resetQuiz() {
  renderQuiz();
  resultContainer.innerText = "";
}

// Event listeners
submitBtn.addEventListener("click", showResult);
restartBtn.addEventListener("click", resetQuiz);

// Initial render
window.onload = () => {
  renderQuiz();
};


