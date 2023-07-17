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

// Function to render the quiz questions
function renderQuestions() {
  const quizContainer = document.getElementById("quiz-container");

  // Check if there is progress stored in session storage
  const savedProgress = sessionStorage.getItem("progress");
  let progress = savedProgress ? JSON.parse(savedProgress) : {};

  questions.forEach((question, index) => {
    const questionElement = document.createElement("div");
    questionElement.className = "question";

    const questionText = document.createElement("h3");
    questionText.textContent = `${index + 1}. ${question.question}`;
    questionElement.appendChild(questionText);

    const choicesContainer = document.createElement("div");
    question.choices.forEach((choice, choiceIndex) => {
      const choiceElement = document.createElement("div");
      choiceElement.className = "choice";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${index}`;
      input.value = choice;
      input.checked = progress[index] === choice; // Check if this choice was selected previously

      input.addEventListener("change", (event) => {
        const selectedChoice = event.target.value;

        // Store the selected choice in session storage
        progress[index] = selectedChoice;
        sessionStorage.setItem("progress", JSON.stringify(progress));
      });

      const label = document.createElement("label");
      label.textContent = choice;
      choiceElement.appendChild(input);
      choiceElement.appendChild(label);

      choicesContainer.appendChild(choiceElement);
    });

    questionElement.appendChild(choicesContainer);
    quizContainer.appendChild(questionElement);
  });
}

// Render the quiz questions
renderQuestions();

// Function to calculate the score and display it
function calculateScore() {
  const quizContainer = document.getElementById("quiz-container");

  // Remove the quiz questions
  while (quizContainer.firstChild) {
    quizContainer.removeChild(quizContainer.firstChild);
  }

  // Get the saved progress from session storage
  const savedProgress = sessionStorage.getItem("progress");
  const progress = savedProgress ? JSON.parse(savedProgress) : {};

  let score = 0;

  questions.forEach((question, index) => {
    const selectedChoice = progress[index];
    const isCorrect = selectedChoice === question.answer;

    if (isCorrect) {
      score++;
    }

    const questionElement = document.createElement("div");
    questionElement.className = "question";

    const questionText = document.createElement("h3");
    questionText.textContent = `${index + 1}. ${question.question}`;
    questionElement.appendChild(questionText);

    const selectedChoiceElement = document.createElement("p");
    selectedChoiceElement.textContent = `Your answer: ${selectedChoice}`;
    questionElement.appendChild(selectedChoiceElement);

    const isCorrectElement = document.createElement("p");
    isCorrectElement.textContent = `Correct answer: ${question.answer}`;
    questionElement.appendChild(isCorrectElement);

    quizContainer.appendChild(questionElement);
  });

  const scoreElement = document.createElement("p");
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;

  // Store the score in local storage
  localStorage.setItem("score", score);

  quizContainer.appendChild(scoreElement);
}

// Call calculateScore function when the user clicks on the submit button
document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.getElementById("submit-button");
  submitButton.addEventListener("click", calculateScore);
});
