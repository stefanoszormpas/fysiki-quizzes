const quizData = [
  {
    question: "1. Τι διατηρείται σε μια ελαστική κρούση;",
    options: ["Μόνο η κινητική ενέργεια", "Μόνο η ορμή", "Και η κινητική ενέργεια και η ορμή", "Μόνο η ενέργεια δυναμικού"],
    answer: 2
  },
  {
    question: "2. Ποια ποσότητα ΔΕΝ διατηρείται σε μία πλαστική κρούση;",
    options: ["Η ορμή", "Η συνολική ενέργεια", "Η κινητική ενέργεια", "Η μάζα"],
    answer: 2
  },
  // ... ΠΡΟΣΘΕΣΕ άλλες 18 ερωτήσεις εδώ με το ίδιο format
];

// Shuffle array (Fisher-Yates)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function renderQuiz() {
  const quizContainer = document.getElementById("quiz");
  quizContainer.innerHTML = '';
  shuffle(quizData);
  quizData.forEach((item, index) => {
    const qDiv = document.createElement("div");
    qDiv.className = "quiz-question";
    qDiv.innerHTML = `<h3>${item.question}</h3>`;
    item.options.forEach((option, i) => {
      qDiv.innerHTML += `
        <label><input type="radio" name="q${index}" value="${i}"> ${option}</label><br>`;
    });
    quizContainer.appendChild(qDiv);
  });
}

function submitQuiz() {
  let score = 0;
  quizData.forEach((item, index) => {
    const radios = document.getElementsByName("q" + index);
    radios.forEach(r => {
      if (r.checked && parseInt(r.value) === item.answer) {
        score++;
      }
    });
  });

  document.getElementById("result").innerText = `Βαθμολογία: ${score} / ${quizData.length}`;
}

function resetQuiz() {
  renderQuiz();
  document.getElementById("result").innerText = '';
}

window.onload = renderQuiz;
