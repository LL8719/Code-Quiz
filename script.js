var timerEl = document.querySelector('#counter');
var startButtonEl = document.querySelector('#start');
var questionContainerEl = document.querySelector('.q-container');
var titleContainerEl = document.querySelector('.container');
var questionEl = document.querySelector('.question');
var answerEl = document.querySelector('.btns');
var resultEl = document.querySelector('#result');
var theEndEl = document.querySelector('.the-end');
var finalScoreEl = document.querySelector('#final-score');
var submitEl = document.querySelector('#submit');
var initialsEl = document.querySelector('#initials');

var switchQuestions, currentQuestionIndex;

var timer;
var timerCount;
var userScores = JSON.parse(localStorage.getItem('highScores')) || [];

//Event listener to start game
startButtonEl.addEventListener('click', startGame);
submitEl.addEventListener('click', viewHighScores);

//Starts Game
function startGame() {
	timerCount = 90;
	startButtonEl.classList.add('hide');
	titleContainerEl.classList.add('hide');
	questionContainerEl.classList.remove('hide');
	switchQuestions = questions.sort(() => Math.random() - 0.5);
	currentQuestionIndex = 0;
	nextQuestion();
	startTimer();
}
// Starts timer
function startTimer() {
	timer = setInterval(function () {
		timerCount--;
		timerEl.textContent = timerCount;
		if (timerCount === 0) {
			clearInterval(timer);
			endQuiz();
		}
	}, 1000);
}
//Renders the next question
function nextQuestion() {
	resetAnswers();
	revealQuestion(switchQuestions[currentQuestionIndex]);
}
//Renders question onto the screen
function revealQuestion(question) {
	questionEl.innerText = question.question;
	question.answers.forEach((answer) => {
		var button = document.createElement('button');
		button.innerText = answer.text;
		button.classList.add('btn');
		if (answer.correct) {
			button.dataset.correct = answer.correct;
		}
		button.addEventListener('click', answerSelected);
		answerEl.appendChild(button);
	});
}

function resetAnswers() {
	while (answerEl.firstChild) {
		answerEl.removeChild(answerEl.firstChild);
	}
}

//Event after clicking one of the answers
function answerSelected(e) {
	var selectedButton = e.target;
	var correct = selectedButton.dataset.correct;
	if (!correct) {
		timerCount -= 15;
		if (timerCount < 0) {
			timerCount = 0;
		}
		timerEl.textContent = timerCount;
		resultEl.textContent = 'Wrong!';
		resultEl.style.fontSize = '4em';
	} else {
		resultEl.textContent = 'Correct!';
		resultEl.style.fontSize = '4em';
	}

	resultEl.setAttribute('class', 'result');
	setTimeout(function () {
		resultEl.setAttribute('class', 'result hide');
	}, 1000);
	//goes to next Question
	currentQuestionIndex++;
	//checks if there is more questions or ends quiz***Not working

	if (currentQuestionIndex === questions.length) {
		endQuiz();
	} else {
		nextQuestion();
	}
}

//End Game
function endQuiz() {
	clearInterval(timer);
	questionContainerEl.setAttribute('class', 'hide');
	theEndEl.removeAttribute('class');
	finalScoreEl.textContent = timerCount;
}

function viewHighScores() {
	var data = {
		score: timerCount,
		initials: initialsEl.value,
	};

	userScores.push(data);
	localStorage.setItem('highScores', JSON.stringify(userScores));

	window.location.href = './scores.html';
}

// Questions
var questions = [
	{
		question: 'What is a variable?',
		answers: [
			{
				text: 'They are containers for storing data ',
				correct: true,
			},
			{
				text: 'They are callback functions',
				correct: false,
			},
			{
				text: 'They are loops to iterate over',
				correct: false,
			},
		],
	},
	{
		question: 'What is a callback function?',
		answers: [
			{
				text: 'is a function passed as an argument to another function',
				correct: true,
			},
			{
				text: 'is a function passed as a parameter to another function',
				correct: false,
			},
			{
				text: 'is an argument passed as a parameter to another function',
				correct: false,
			},
		],
	},
	{
		question: 'What is a string?',
		answers: [
			{
				text: 'object used to represent and manipulate a sequence of characters',
				correct: true,
			},
			{
				text: 'is an object passed to a function',
				correct: false,
			},
			{
				text: 'is the index of an array',
				correct: false,
			},
		],
	},
	{
		question: 'What does HTML stands for?',
		answers: [
			{
				text: 'hyper tone markup language',
				correct: false,
			},
			{
				text: 'hyper text markup language',
				correct: true,
			},
			{
				text: 'Hot Topic Multiple Language',
				correct: false,
			},
		],
	},
	{
		question: 'What is the function of CSS?',
		answers: [
			{
				text: 'It links the files',
				correct: false,
			},
			{
				text: 'It animates the webpage',
				correct: false,
			},
			{
				text: 'It adds styling to the webpage',
				correct: true,
			},
		],
	},
];
