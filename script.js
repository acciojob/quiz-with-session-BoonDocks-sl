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

    // Append a default radio button option for each question
    const defaultChoiceElement = document.createElement("input");
    defaultChoiceElement.setAttribute("type", "radio");
    defaultChoiceElement.setAttribute("name", `question-${i}`);
    defaultChoiceElement.setAttribute("value", "");
    defaultChoiceElement.setAttribute("checked", true);
    defaultChoiceElement.style.display = "none";
    questionElement.appendChild(defaultChoiceElement);

    questionsElement.appendChild(questionElement);
  }
}

renderQuestions();
