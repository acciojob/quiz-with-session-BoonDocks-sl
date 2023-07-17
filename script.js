// Define the quiz questions
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

// Retrieve saved progress from session storage or initialize an empty array
const progress = JSON.parse(sessionStorage.getItem("progress")) || [];

// Create an array to store user answers
const userAnswers = [];

// Get the questions container element
const questionsElement = document.getElementById("questions");

// Display the quiz questions and choices
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

      // Check if the user has previously answered this question
      if (progress[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }

      // Event listener for storing user answers
      choiceElement.addEventListener("change", function () {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }

    questionsElement.appendChild(questionElement);
  }
}

renderQuestions();

// Get the submit button and score element
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Event listener for submitting the quiz
submitButton.addEventListener("click", function () {
  const score = calculateScore();
  localStorage.setItem("score", score);
  scoreElement.textContent = `Your score is ${score} out of 5.`;
});

// Function to calculate the user's score
function calculateScore() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    if (userAnswers[i] === question.answer) {
      score++;
    }
  }
  return score;
}
