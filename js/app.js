var Trivia = Em.Application.create();

Trivia.Game = Em.Object.extend({
    guid: null,
    name: null
});

Trivia.Question = Em.Object.extend({
    guid: null,
    gameId: null,
    mediaId: null,
    options: [],
	questionText: null,
	answers: [],
	correctAnswer: null
});

Trivia.Media = Em.Object.extend({
    guid: null,
    media: null,
    mediaType: null
});

Trivia.Answer = Em.Object.extend({
    guid: null,
    questionId: null,
	answerText: null,
	answered: false,
	correct: false
});

Trivia.games = [
    Trivia.Game.create({
        guid: 1,
        name: 'Visailu 1'
    }),
    Trivia.Game.create({
        guid: 2,
        name: 'Yhteinen Sävel - Kulkurin Valssi I'
    })
];

soundManager.onready(function() {
    Trivia.medias = [
        Trivia.Media.create({
            guid: 1,
            mediaType: 'mp3',
            media: soundManager.createSound({
                    id: 'kulkurin valssi',
                    url: '/triviapiiri/assets/Kulkurinvalssi.mp3',
                    whileplaying: Trivia.gameController.whileMediaPlaying
                    /*whileplaying: function() {
                        if (mySound.position >= intervals[nextStopInterval]) {
                            mySound.stop();
                            nextStopInterval++;
                            $('#status').html('<br/>Soitto lopetettu kohtaan ' + mySound.position + 'ms <a href="javascript: void(0);" onclick="continuePlay('+mySound.position+')">Jatka seuraavaan kohtaan</a>');
                        }
                    }*/
            })
        })
    ];
});

Trivia.questions = [
	Trivia.Question.create({
		questionText: 'Vaaleaorakas on?',
        gameId: 1,
		answers: [
			Trivia.Answer.create({ answerText: 'Kissarotu' }),
			Trivia.Answer.create({ answerText: 'Kukka' }),
			Trivia.Answer.create({ answerText: 'Sieni', correct: true }),
			Trivia.Answer.create({ answerText: 'Tammenterho' })
		]
	}),
	Trivia.Question.create({
		questionText: 'Alaston ase -elokuvien pääroolia näytteli?',
        gameId: 1,
		answers: [
			Trivia.Answer.create({ answerText: 'Leslie Nielsen', correct: true  }),
			Trivia.Answer.create({ answerText: 'Sean Connery' }),
			Trivia.Answer.create({ answerText: 'Tom Cruise' }),
			Trivia.Answer.create({ answerText: 'Tom Hanks' })
		]
	}),
	Trivia.Question.create({
		questionText: 'Lapatossu-elokuvassa rakennetaan?',
        gameId: 1,
		answers: [
			Trivia.Answer.create({ answerText: 'Kirkkoa' }),
			Trivia.Answer.create({ answerText: 'Omakotitaloa' }),
			Trivia.Answer.create({ answerText: 'Rautatietä', correct: true }),
			Trivia.Answer.create({ answerText: 'Satamaa' })
		]
	}),
	Trivia.Question.create({
		questionText: 'Minkä automerkin automalli on Xantia?',
        gameId: 1,
		answers: [
			Trivia.Answer.create({ answerText: 'Audin' }),
			Trivia.Answer.create({ answerText: 'BMW:n' }),
			Trivia.Answer.create({ answerText: 'Citroenin', correct: true }),
			Trivia.Answer.create({ answerText: 'Dodgen' })
		]
	}),
	Trivia.Question.create({
		questionText: 'Jive on?',
        gameId: 1,
		answers: [
			Trivia.Answer.create({ answerText: 'Lyhytelokuva' }),
			Trivia.Answer.create({ answerText: 'Satukertomus' }),
			Trivia.Answer.create({ answerText: 'Tanssi', correct: true }),
			Trivia.Answer.create({ answerText: 'Ääniala' })
		]
	}),
	Trivia.Question.create({
		questionText: 'Ars Fennica on?',
        gameId: 1,
		answers: [
			Trivia.Answer.create({ answerText: 'Ilmastovyöhyke' }),
			Trivia.Answer.create({ answerText: 'Jäänmurtaja' }),
			Trivia.Answer.create({ answerText: 'Kuvataidepalkinto', correct: true }),
			Trivia.Answer.create({ answerText: 'Mika Waltarin romaani' })
		]
	}),
	Trivia.Question.create({
		questionText: 'Vimpa on?',
        gameId: 1,
		answers: [
			Trivia.Answer.create({ answerText: 'Kalanpyydys' }),
			Trivia.Answer.create({ answerText: 'Kutupaikka' }),
			Trivia.Answer.create({ answerText: 'Lohikala'}),
			Trivia.Answer.create({ answerText: 'Särkikala', correct: true })
		]
	}),
	Trivia.Question.create({
		questionText: 'John Wayne tunnetaan erityisesti?',
        gameId: 1,
		answers: [
			Trivia.Answer.create({ answerText: 'Dokumenttielokuvista' }),
			Trivia.Answer.create({ answerText: 'Komediaelokuvista' }),
			Trivia.Answer.create({ answerText: 'Lastenelokuvista'}),
			Trivia.Answer.create({ answerText: 'Lännenelokuvista', correct: true })
		]
	}),
	Trivia.Question.create({
		questionText: 'Akvamariini on?',
        gameId: 1,
		answers: [
			Trivia.Answer.create({ answerText: 'Akvaariokala' }),
			Trivia.Answer.create({ answerText: 'Jalokivi', correct: true }),
			Trivia.Answer.create({ answerText: 'Kalanviljelylaitos'}),
			Trivia.Answer.create({ answerText: 'Kalastusalus' })
		]
	}),
	Trivia.Question.create({
		questionText: 'Ruokasuola on pääasiassa?',
        gameId: 1,
		answers: [
			Trivia.Answer.create({ answerText: 'Kalsiumia' }),
			Trivia.Answer.create({ answerText: 'Natriumkloridia', correct: true }),
			Trivia.Answer.create({ answerText: 'Otsonia'}),
			Trivia.Answer.create({ answerText: 'Typpioksidia' })
		]
	}),

    Trivia.Question.create({
        gameId: 2,
        mediaId: 1,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 15750},
        answers: [
            Trivia.Answer.create({ answerText: 'on morsiamell\' kruunattu pää', correct: true }),
            Trivia.Answer.create({ answerText: 'on morsian ja sulhanen tääl'}),
            Trivia.Answer.create({ answerText: 'morsiamell\' on palmikoitu pää'})
        ]
    }),
    Trivia.Question.create({
        gameId: 2,
        mediaId: 1,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 25800},
        answers: [
            Trivia.Answer.create({ answerText: 'miten hauskaa voi olla tää vaan' }),
            Trivia.Answer.create({ answerText: 'sydän kylmä voi olla kuin jää', correct: true }),
            Trivia.Answer.create({ answerText: 'kylmään sydämmeen lämpöä tuo'})
        ]
    }),
    Trivia.Question.create({
        gameId: 2,
        mediaId: 1,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 56000},
        answers: [
            Trivia.Answer.create({ answerText: 'ja loistettaan välkehtii' }),
            Trivia.Answer.create({ answerText: 'lasit kristallin välkehtii' }),
            Trivia.Answer.create({ answerText: 'ja kristallit kimaltelee', correct: true})
        ]
    }),
    Trivia.Question.create({
        gameId: 2,
        mediaId: 1,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 112900},
        answers: [
            Trivia.Answer.create({ answerText: 'raitilla valssiks' }),
            Trivia.Answer.create({ answerText: 'raitilla tanssiks', correct: true }),
            Trivia.Answer.create({ answerText: 'maantiellä juoksuks' })
        ]
    }),
    Trivia.Question.create({
        gameId: 2,
        mediaId: 1,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 132900},
        answers: [
            Trivia.Answer.create({ answerText: 'rakastan ja kaihoan ain\'', correct: true }),
            Trivia.Answer.create({ answerText: 'minä aina ikävöin vain' }),
            Trivia.Answer.create({ answerText: 'koskaan mä unhoita en' })
        ]
    }),
    Trivia.Question.create({
        gameId: 2,
        mediaId: 1,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 146700},
        answers: [
            Trivia.Answer.create({ answerText: 'unelmat repussaan' }),
            Trivia.Answer.create({ answerText: 'kantaen kohtaloaan', correct: true }),
            Trivia.Answer.create({ answerText: 'odottaen tulevaa' })
        ]
    }),
    Trivia.Question.create({
        gameId: 2,
        mediaId: 1,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 224600},
        answers: [
            Trivia.Answer.create({ answerText: 'kiristää vyö', correct: true }),
            Trivia.Answer.create({ answerText: 'ahdistaa työ'}),
            Trivia.Answer.create({ answerText: 'valssiksi lyön' })
        ]
    })
];

Trivia.SelectGameView = Em.View.extend({
    templateName: 'selectGameView',
    selectGameCollectionView: Em.CollectionView.extend({
        tagName: 'ul',
        contentBinding: 'Trivia.games',
        itemViewClass: Em.View.extend({
            tagName: 'li',
            classNames: 'answer-view btn',
            click: function() {
                Trivia.gameController.set('game', this.get('content'));
                Trivia.gameController.set('showGameSelector', false);
            }
        })
   })
});


Trivia.GameView = Em.View.extend({
	templateName: 'game',
	scoreBinding: 'Trivia.gameController.score',
	questionBinding: 'Trivia.gameController.currentQuestion',
	questionView: Em.View.extend({
		contentBinding: 'Trivia.gameController.currentQuestion'
	}),
	answersView: Em.CollectionView.extend({
		tagName: 'ul',
		contentBinding: 'Trivia.gameController.currentQuestion.answers',
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
	},
    populateQuestions: function() {
        var questions = Trivia.questions.filterProperty('gameId', this.get('game').get('guid'));
        this.set('questions', questions);
        this.set('currentQuestion', this.get('questions').objectAt(this.get('questionIndex')));

        if (this.get('currentQuestion').get('mediaId')) {
            var media = Trivia.medias.findProperty('guid', this.get('currentQuestion').get('mediaId'));
            this.set('media', media);
            this.get('media').get('media').play();
        } else {
            this.set('showAnswers', true);
        }

    }.observes('game'),
    showGameSelector: true,
    continueMediaFrom: null,
    media: null,
    game: false,
	questionIndex: 0,
    questions: null,
	currentQuestion: null,
    showAnswers: false,
	score: 0,
	answerReward: 10,
	nextQuestion: function(){
		if (this.get('questionIndex') < this.get('questions').length - 1){
			this.set('questionIndex', parseInt(this.get('questionIndex')) + 1);
			this.set('currentQuestion', this.get('questions').objectAt(this.get('questionIndex')));
            if (this.get('currentQuestion').get('mediaId')) {
                var media = Trivia.medias.findProperty('guid', this.get('currentQuestion').get('mediaId'));
                this.set('media', media);
                this.get('media').get('media').play({position:this.get('continueMediaFrom')});
                this.set('showAnswers', false);
            } else {
                this.set('showAnswers', true);
            }
			return true;
		} else {
			return false;
		}

	},
    whileMediaPlaying: function() {
        console.log(Trivia.gameController.get('media').get('media').position);
        if (Trivia.gameController.get('media').get('media').position >= Trivia.gameController.get('currentQuestion').get('options').playTo) {
            Trivia.gameController.get('media').get('media').stop();
            Trivia.gameController.set('continueMediaFrom', Trivia.gameController.get('media').get('media').position);
            Trivia.gameController.set('showAnswers', true);
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