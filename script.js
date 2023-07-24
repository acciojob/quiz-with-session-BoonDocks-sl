// Quiz questions
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Retrieve user progress from session storage
let userAnswers = sessionStorage.getItem("progress");
if (userAnswers) {
  userAnswers = JSON.parse(userAnswers);
} else {
  userAnswers = [];
}

// Display the quiz questions and choices
const questionsElement = document.getElementById("questions");

function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }
    questionsElement.appendChild(questionElement);
  }
}
renderQuestions();

// Save user progress to session storage when an option is selected
questionsElement.addEventListener("change", function (event) {
  const selectedChoice = event.target.value;
  const questionIndex = event.target.getAttribute("name").split("-")[1];
  userAnswers[questionIndex] = selectedChoice;
  sessionStorage.setItem("progress", JSON.stringify(userAnswers));
});

// Submit the quiz and calculate the score
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

submitButton.addEventListener("click", function () {
  const correctAnswers = questions.map((question) => question.answer);
  let score = 0;
  for (let i = 0; i < correctAnswers.length; i++) {
    if (userAnswers[i] === correctAnswers[i]) {
      score++;
    }
  }
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
});