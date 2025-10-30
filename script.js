const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Hyperlinks and Text Markup Language", correct: false },
      { text: "Home Tool Markup Language", correct: false },
      { text: "Hyper Transfer Markup Language", correct: false }
    ]
  },
  {
    question: "Which language is used for styling web pages?",
    answers: [
      { text: "HTML", correct: false },
      { text: "CSS", correct: true },
      { text: "Python", correct: false },
      { text: "Java", correct: false }
    ]
  },
  {
    question: "Inside which HTML element do we put JavaScript?",
    answers: [
      { text: "<script>", correct: true },
      { text: "<js>", correct: false },
      { text: "<javascript>", correct: false },
      { text: "<scripting>", correct: false }
    ]
  },
  {
    question: "Which of the following is not a programming language?",
    answers: [
      { text: "Python", correct: false },
      { text: "C++", correct: false },
      { text: "HTML", correct: true },
      { text: "Java", correct: false }
    ]
  }
];

const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answersContainer = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result");
const quizContainer = document.getElementById("quiz");
const scoreElement = document.getElementById("score");
const summaryElement = document.getElementById("summary");
const restartButton = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let score = 0;
let results = [];

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  results = [];
  nextButton.textContent = "Next ➡️";
  resultContainer.classList.add("hide");
  quizContainer.classList.remove("hide");
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(button, answer));
    answersContainer.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answersContainer.firstChild) {
    answersContainer.removeChild(answersContainer.firstChild);
  }
}

function selectAnswer(button, answer) {
  const correct = answer.correct;
  if (correct) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
  }

  results.push({
    question: questions[currentQuestionIndex].question,
    correct: correct
  });

  Array.from(answersContainer.children).forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === questions[currentQuestionIndex].answers.find(a => a.correct).text) {
      btn.classList.add("correct");
    }
  });

  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quizContainer.classList.add("hide");
  resultContainer.classList.remove("hide");
  scoreElement.textContent = `Your Score: ${score}/${questions.length}`;
  summaryElement.innerHTML = results
    .map(
      (r, i) =>
        `<p>Q${i + 1}: ${r.question} — ${
          r.correct ? "✅ Correct" : "❌ Wrong"
        }</p>`
    )
    .join("");
}

restartButton.addEventListener("click", startQuiz);

startQuiz();
