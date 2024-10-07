document.getElementById('start-quiz-button').addEventListener('click', startQuiz);
document.getElementById('next-button').addEventListener('click', showNextQuestion);
document.getElementById('submit-button').addEventListener('click', submitQuiz);
const questions = [
    {
        question: "Where will the 2024 Olympics be held?",
        options: ["Paris", "Los Angeles", "Tokyo", "London"],
        answer: "Paris"
    },
    {
        question: "Which sport will be added to the 2024 Olympics?",
        options: ["Skateboarding", "Surfing", "Breakdancing", "Karate"],
        answer: "Breakdancing"
    },
    {
        question: "Which country will host the 2024 Summer Olympics?",
        options: ["France", "USA", "Japan", "UK"],
        answer: "France"
    },
    {
        question: "How many sports will be featured in the 2024 Olympics?",
        options: ["28", "32", "33", "35"],
        answer: "32"
    },
    {
        question: "Which new sport will debut at the 2024 Olympics?",
        options: ["Breakdancing", "Baseball", "Softball", "Cricket"],
        answer: "Breakdancing"
    },
    {
        question: "When will the 2024 Summer Olympics begin?",
        options: ["July 26", "August 1", "July 20", "August 5"],
        answer: "July 26"
    },
    {
        question: "When will the 2024 Summer Olympics end?",
        options: ["August 11", "August 10", "August 8", "August 9"],
        answer: "August 11"
    },
    {
        question: "Which of these sports will return to the 2024 Olympics?",
        options: ["Surfing", "Cricket", "Rugby", "Golf"],
        answer: "Surfing"
    },
    {
        question: "How many athletes are expected to participate in the 2024 Olympics?",
        options: ["10,500", "11,000", "12,000", "13,000"],
        answer: "10,500"
    }
];

let currentQuestionIndex = 0;
let userAnswers = [];

///Starts the quiz by displaying the quiz popup and showing the first question.

function startQuiz() {
    document.getElementById('quiz-popup').classList.remove('hidden');
    showQuestion();
}

///Displays the current question and its options in the question container.

function showQuestion() {
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = '';

    const question = questions[currentQuestionIndex];
    const questionElement = document.createElement('div');
    questionElement.textContent = question.question;
    questionContainer.appendChild(questionElement);

    question.options.forEach(option => {
        const optionElement = document.createElement('div');
        const inputElement = document.createElement('input');
        inputElement.type = 'radio';
        inputElement.name = 'option';
        inputElement.value = option;
        optionElement.appendChild(inputElement);

        const labelElement = document.createElement('label');
        labelElement.textContent = option;
        optionElement.appendChild(labelElement);

        questionContainer.appendChild(optionElement);
    });

    document.getElementById('next-button').classList.toggle('hidden', currentQuestionIndex === questions.length - 1);
    document.getElementById('submit-button').classList.toggle('hidden', currentQuestionIndex !== questions.length - 1);
}

/// Advances to the next question if an option is selected, otherwise alerts the user.
function showNextQuestion() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        userAnswers[currentQuestionIndex] = selectedOption.value;
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        }
    } else {
        alert('Please select an option.');
    }
}

///Submits the quiz, saves the user's answers, and calculates the score.

function submitQuiz() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        userAnswers[currentQuestionIndex] = selectedOption.value;
        localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
        calculateScore();
    } else {
        alert('Please select an option.');
    }
}

/// Calculates the user's score and displays the results. 
function calculateScore() {
    let correctAnswers = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === questions[index].answer) {
            correctAnswers++;
        }
    });

    const resultContainer = document.getElementById('result-container');
    resultContainer.innerHTML = ''; // Clear previous results

    const correctAnswersList = document.createElement('ul');
    questions.forEach((question, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Q: ${question.question} - A: ${question.answer}`;
        correctAnswersList.appendChild(listItem);
    });
    resultContainer.appendChild(correctAnswersList);

    const score = (correctAnswers / questions.length) * 100;
    const roundedScore = Math.round(score);
    const scoreText = document.createElement('p');
    scoreText.textContent = `You scored ${roundedScore}%`;
    resultContainer.appendChild(scoreText);

    resultContainer.classList.remove('hidden');
    document.getElementById('quiz-popup').classList.add('hidden');
}