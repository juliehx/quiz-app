var quiz = {
	questions: [
		{
			q: "What is Aang's ethnicity?",
			a: ["Fire Nation", "Water Tribe", "Air Nomad", "Earth Kingdom", "Spirit World"]
		},
		{
			q: "What is Katara's ethnicity?",
			a: ["Fire Nation", "Water Tribe", "Air Nomad", "Earth Kingdom", "Spirit World"]
		},
		{
			q: "What is Zuko's ethnicity?",
			a: ["Fire Nation", "Water Tribe", "Air Nomad", "Earth Kingdom", "Spirit World"]
		},
		{
			q: "What is Toph Beifong's ethnicity?",
			a: ["Fire Nation", "Water Tribe", "Air Nomad", "Earth Kingdom", "Spirit World"]
		},
		{
			q: "Zuko learned this advanced firebending technique from Uncle Iroh.",
			a: ["Bloodbending", "MetalBending", "Lightning Generation", "Spiritual Projection", "Lightning Redirection"]
		},
		{
			q: "Katara was forced to subdue Hama with this sub-skill of waterbending in order to protect her friends.",
			a: ["Bloodbending", "MetalBending", "Lightning Generation", "Spiritual Projection", "Lightning Redirection"]
		},
		{
			q: "Toph shares this ability with badgermoles.",
			a: ["Spiritual Projection", "MetalBending", "LavaBending", "Seismic Sense", "Healing"]
		},
		{
			q: "Among Sokka's traits and abilities, which one does he NOT possess?",
			a: ["Intelligence", "WaterBending", "Weapon Proficiency", "Humor", "Justice"]
		},
		{
			q: "Who was the last Avatar before Aang?",
			a: ["Korra", "Roku", "Kyoshi", "Kuruk", "Yangchen"]
		},
		{
			q: "Long ago, the four nations lived together in harmony. Then, everything changed when -",
			a: ["Roku vanished", "a hundred years passed", "Shymalan made the live action", "Ong was discovered", "the Fire Nation attacked"]
		}
	],
	correctAnswers: [2, 1, 0, 3, 4, 0, 3, 1, 1, 4]
};

var state = {
	answers: [],
	questionCount: 0,
	incorrect: 0,
	correct: 0
};

var addAnswer = function(state, ans) {
	state.answers.push(ans);
	state.questionCount++;
};

var checkAnswer = function(state, quiz, ans) {
	var questionIndex = state.questionCount;
	if(ans == quiz.correctAnswers[state.questionCount]) {
		state.correct++;
	}
	else {
		state.incorrect++;
	}
};

var renderChoices = function(questionIndex, state, quiz) {
	var questionChoices = '';
	for(var i = 0; i < quiz.questions[questionIndex].a.length; ++i) {
		questionChoices += '<input type="radio" name="answer-choice" class="js-mc-question-choices" value="' + i + '"><label for="choice-' + i + '"> ' + quiz.questions[questionIndex].a[i] + '<br></label>';
	}
	return questionChoices;
};

var renderQuestion = function(state, quiz, element, progElem) {
	var begin = '<label class="question-content" for="question">';
	var questionNum = '<h3 class="js-question-number">Question ' + (state.questionCount+1) +'</h3>';
	var questionCon = '<p class="js-question-content">' + quiz.questions[state.questionCount].q + '</p>';
	var questionChoices = renderChoices(state.questionCount, state, quiz);
	var end = '</label><button class="js-submit-button" type="button">Submit</button>';
	element.html(begin + questionNum + questionCon + questionChoices + end);
	progElem.html("Question " + (state.questionCount+1) + " of 10");
};

var updateProgress = function(state, incorElem, corElem) {
	incorElem.html("Incorrect: " + state.incorrect);
	corElem.html("Correct: " + state.correct);
	state.questionCount+=1;
}

var renderFinish = function(state, element) {
	var congrats = '<h2 class="quiz-title">Congratulations!</h2>';
	var msg = '<p>You scored <b>' + state.correct + '/10</b></p>';
	var button = '<a href="/"><button class="js-submit-button" type="button">Retake Quiz</button></a>';
	element.html(congrats+msg+button);
}


$('.js-container').hide();

$('.js-start-button').click(function(event) {
	event.preventDefault();
	renderQuestion(state, quiz, $('.question-form'), $('question-count'));
	$('.js-container').show();
	$(this).hide();
	$('.js-quiz-title').hide();
});

$('.question-form').on('click', '.js-submit-button', function(event) {
	event.preventDefault();
	var answer = $("input[type='radio'][class='js-mc-question-choices']:checked").val();
	checkAnswer(state, quiz, answer);
	updateProgress(state, $('.incorrect'), $('.correct'));
	if(state.questionCount < 10) {
		renderQuestion(state, quiz, $('.question-form'), $('.question-count'));
	}
	else {
		renderFinish(state, $('.js-container'));
	}
});
