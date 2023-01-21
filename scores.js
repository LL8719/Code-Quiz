var userScores = JSON.parse(localStorage.getItem('highScores')) || [];
var ulEl = document.querySelector('#saved-scores');
var clearEl = document.querySelector('#clear-scores');

clearEl.addEventListener('click', function () {
	localStorage.setItem('highScores', null);
	window.location.href = './index.html';
});

for (var i = 0; i < userScores.length; i++) {
	var li = document.createElement('li');
	li.textContent = `${userScores[i].initials}: ${userScores[i].score}`;
	ulEl.appendChild(li);
}
