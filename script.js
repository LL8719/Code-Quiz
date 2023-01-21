var timerEl = document.querySelector('#counter');
var startButtonEl = document.querySelector('#start');
var questionContainerEl = document.querySelector('.q-container');
var titleContainerEl = document.querySelector('.container');
var questionEl = document.querySelector('.question');
var answerEl = document.querySelector('.btns');

var switchQuestions, currentQuestionIndex;

var timer;
var timerCount;

startButtonEl.addEventListener('click', startGame);

function startGame() {
	timerCount = 20;
	startButtonEl.classList.add('hide');
	titleContainerEl.classList.add('hide');
	questionContainerEl.classList.remove('hide');
	switchQuestions = questions.sort(() => Math.random() - 0.5);
	currentQuestionIndex = 0;
	nextQuestion();
	startTimer();
}

function startTimer() {
	timer = setInterval(function () {
		timerCount--;
		timerEl.textContent = timerCount;
		if (timerCount === 0) {
			clearInterval(timer);
		}
	}, 1000);
}

function nextQuestion() {
	resetAnswers();
	revealQuestion(switchQuestions[currentQuestionIndex]);
}

function revealQuestion(question) {
	questionEl.innerText = question.question;
	question.answers.forEach((answer) => {
		var button = document.createElement('button');
		button.innerText = answer.text;
		button.classList.add('btn');
		if (answer.correct) {
			button.dataset.correct = answer.correct;
		}
		button.addEventListener('click', answerSelected); //event for clicking the answers need to link to a function****
		answerEl.appendChild(button);
	});
}

function resetAnswers() {
	while (answerEl.firstChild) {
		answerEl.removeChild(answerEl.firstChild);
	}
}

function answerSelected() {
	//LEFT HERE*********************
}

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
				text: 'stores a series of characters like "John Doe"',
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
];
