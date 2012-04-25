var Trivia = Em.Application.create();

Trivia.MyView = Em.View.extend({
  mouseDown: function() {
    window.alert("hello world!");
  }
});


Trivia.Question = Em.Object.extend({
	questionText: null,
	answers: [],
	correctAnswer: null
});

Trivia.Answer = Em.Object.extend({
	answerText: null,
	answered: false,
	correct: false
});



Trivia.questions = [
	Trivia.Question.create({
		questionText: 'Vaaleaorakas on?',
		answers: [
			Trivia.Answer.create({ answerText: 'Kissarotu' }),
			Trivia.Answer.create({ answerText: 'Kukka' }),
			Trivia.Answer.create({ answerText: 'Sieni', correct: true }),
			Trivia.Answer.create({ answerText: 'Tammenterho' })
		]
	}),
	Trivia.Question.create({
		questionText: 'Alaston ase -elokuvien pääroolia näytteli?',
		answers: [
			Trivia.Answer.create({ answerText: 'Leslie Nielsen', correct: true  }),
			Trivia.Answer.create({ answerText: 'Sean Connery' }),
			Trivia.Answer.create({ answerText: 'Tom Cruise' }),
			Trivia.Answer.create({ answerText: 'Tom Hanks' })
		]
	}),
	Trivia.Question.create({
		questionText: 'Lapatossu-elokuvassa rakennetaan?',
		answers: [
			Trivia.Answer.create({ answerText: 'Kirkkoa' }),
			Trivia.Answer.create({ answerText: 'Omakotitaloa' }),
			Trivia.Answer.create({ answerText: 'Rautatietä', correct: true }),
			Trivia.Answer.create({ answerText: 'Satamaa' })
		]
	}),
	Trivia.Question.create({
		questionText: 'Minkä automerkin automalli on Xantia?',
		answers: [
			Trivia.Answer.create({ answerText: 'Audin' }),
			Trivia.Answer.create({ answerText: 'BMW:n' }),
			Trivia.Answer.create({ answerText: 'Citroenin', correct: true }),
			Trivia.Answer.create({ answerText: 'Dodgen' })
		]
	}),
	Trivia.Question.create({
		questionText: 'Jive on?',
		answers: [
			Trivia.Answer.create({ answerText: 'Lyhytelokuva' }),
			Trivia.Answer.create({ answerText: 'Satukertomus' }),
			Trivia.Answer.create({ answerText: 'Tanssi', correct: true }),
			Trivia.Answer.create({ answerText: 'Ääniala' })
		]
	}),
	Trivia.Question.create({
		questionText: 'Ars Fennica on?',
		answers: [
			Trivia.Answer.create({ answerText: 'Ilmastovyöhyke' }),
			Trivia.Answer.create({ answerText: 'Jäänmurtaja' }),
			Trivia.Answer.create({ answerText: 'Kuvataidepalkinto', correct: true }),
			Trivia.Answer.create({ answerText: 'Mika Waltarin romaani' })
		]
	}),
	Trivia.Question.create({
		questionText: 'Vimpa on?',
		answers: [
			Trivia.Answer.create({ answerText: 'Kalanpyydys' }),
			Trivia.Answer.create({ answerText: 'Kutupaikka' }),
			Trivia.Answer.create({ answerText: 'Lohikala'}),
			Trivia.Answer.create({ answerText: 'Särkikala', correct: true })
		]
	}),
	Trivia.Question.create({
		questionText: 'John Wayne tunnetaan erityisesti?',
		answers: [
			Trivia.Answer.create({ answerText: 'Dokumenttielokuvista' }),
			Trivia.Answer.create({ answerText: 'Komediaelokuvista' }),
			Trivia.Answer.create({ answerText: 'Lastenelokuvista'}),
			Trivia.Answer.create({ answerText: 'Lännenelokuvista', correct: true })
		]
	}),
	Trivia.Question.create({
		questionText: 'Akvamariini on?',
		answers: [
			Trivia.Answer.create({ answerText: 'Akvaariokala' }),
			Trivia.Answer.create({ answerText: 'Jalokivi', correct: true }),
			Trivia.Answer.create({ answerText: 'Kalanviljelylaitos'}),
			Trivia.Answer.create({ answerText: 'Kalastusalus' })
		]
	}),
	Trivia.Question.create({
		questionText: 'Ruokasuola on pääasiassa?',
		answers: [
			Trivia.Answer.create({ answerText: 'Kalsiumia' }),
			Trivia.Answer.create({ answerText: 'Natriumkloridia', correct: true }),
			Trivia.Answer.create({ answerText: 'Otsonia'}),
			Trivia.Answer.create({ answerText: 'Typpioksidia' })
		]
	})
];

Trivia.AppView = Em.View.extend({
	templateName: 'app',
	scoreBinding: 'Trivia.gameController.score',
	questionBinding: 'Trivia.gameController.question',
	questionView: Em.View.extend({
		contentBinding: 'parentView.question'
	}),
	answersView: Em.CollectionView.extend({
		tagName: 'ul',
		contentBinding: 'parentView.question.answers',
		itemViewClass: Em.View.extend({
			tagName: 'li',
			classNames: 'answer-view btn',
			click: function(){
				
				if (Trivia.gameController.checkAnswer(this.get('content'))){
					$(this.get('element')).addClass('btn-success');
				} else {
					$(this.get('element')).addClass('btn-danger');
				}
				console.log(this.get('content'));
			}
		})
	})
})


Trivia.gameController = Em.Object.create({
	init: function(){
		console.log('gamecontroller started');
		this.set('question', Trivia.questions.objectAt(this.get('questionIndex')))

	},
	questionIndex: 0,
	question: null,
	score: 0,
	answerReward: 10,
	nextQuestion: function(){

		if (this.get('questionIndex') < Trivia.questions.length - 1){
			this.set('questionIndex', parseInt(this.get('questionIndex')) + 1);
			this.set('question', Trivia.questions.objectAt(this.get('questionIndex')));
			return true;
		} else {
			return false;
		}

	},
	checkAnswer: function(answer){
		console.log('answered', answer);
		var self = this;
		setTimeout(function(){
			console.log('hojo!')
			self.nextQuestion();

		}, 500);

		if (answer.get('correct')){
			console.log('correct!');
			//this.nextQuestion();
			this.set('score', this.get('score') + this.get('answerReward'));
			return true;

		} else {
			console.log('false')
			return false;
		}

	}
})