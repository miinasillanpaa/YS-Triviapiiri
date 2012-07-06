var Trivia = Em.Application.create();

Trivia.Game = Em.Object.extend({
    guid: null,
    name: null,
    image: null,
    caption: null
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
        name: 'Visailu 1 (testi)'
    }),
    Trivia.Game.create({
        guid: 2,
        name: 'Yhteinen Sävel - Kulkurin Valssi I',
        image: '/triviapiiri/assets/img/kulkurin_valssi.jpg',
        caption: 'Charlie Champ, “The Tramp”, 1915" - Laura Loveday (lis. CC BY-NC-SA 2.0)'
    }),
    Trivia.Game.create({
        guid: 3,
        name: 'Yhteinen Sävel - Kulkurin Valssi II',
        image: '/triviapiiri/assets/img/kulkurin_valssi.jpg',
        caption: 'Charlie Champ, “The Tramp”, 1915" - Laura Loveday (lis. CC BY-NC-SA 2.0)'
    }),
    Trivia.Game.create({
        guid: 4,
        name: 'Yhteinen Sävel - Lapsuuden Toverille I',
        image: '/triviapiiri/assets/img/lapsuuden_toverille.jpg',
        caption: 'Grandpa`s friends - D Flam (lis. CC BY-NC 2.0)'
    }),
    Trivia.Game.create({
        guid: 5,
        name: 'Yhteinen Sävel - Lapsuuden Toverille II',
        image: '/triviapiiri/assets/img/lapsuuden_toverille.jpg',
        caption: 'Grandpa`s friends - D Flam (lis. CC BY-NC 2.0)'
    }),
    Trivia.Game.create({
        guid: 6,
        name: 'Vastakohtien yhdistäminen'
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
            })
        }),
        Trivia.Media.create({
            guid: 2,
            mediaType: 'mp3',
            media: soundManager.createSound({
                id: 'lapsuuden toverille',
                url: '/triviapiiri/assets/Lapsuudentoverille.mp3',
                whileplaying: Trivia.gameController.whileMediaPlaying
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
    }),
    Trivia.Question.create({
        gameId: 3,
        mediaId: 1,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 20600},
        answers: [
            Trivia.Answer.create({ answerText: 'siel viihdyn suo viini ja samppanja vaan', correct: true }),
            Trivia.Answer.create({ answerText: 'siel viihdyn,  juon viinin ja samppanjaa vain'}),
            Trivia.Answer.create({ answerText: 'siel nautin ja viihdyn kera samppanjan vain' })
        ]
    }),
    Trivia.Question.create({
        gameId: 3,
        mediaId: 1,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 52700},
        answers: [
            Trivia.Answer.create({ answerText: 'pöydät ne herkkujaan suo' }),
            Trivia.Answer.create({ answerText: 'kruunut ne valoaan luo', correct: true}),
            Trivia.Answer.create({ answerText: 'neidot ne tanssihin käy' })
        ]
    }),
    Trivia.Question.create({
        gameId: 3,
        mediaId: 1,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 67700},
        answers: [
            Trivia.Answer.create({ answerText: 'tanssahtelee' }),
            Trivia.Answer.create({ answerText: 'kans astelee', correct: true}),
            Trivia.Answer.create({ answerText: 'kohdata saa' })
        ]
    }),
    Trivia.Question.create({
        gameId: 3,
        mediaId: 1,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 96700},
        answers: [
            Trivia.Answer.create({ answerText: 'maantiellä viihdyn ma vaan', correct: true }),
            Trivia.Answer.create({ answerText: 'maantieltä pois tahdo en' }),
            Trivia.Answer.create({ answerText: 'pois mua sieltä ei saa' })
        ]
    }),
    Trivia.Question.create({
        gameId: 3,
        mediaId: 1,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 111900},
        answers: [
            Trivia.Answer.create({ answerText: 'maantiellä, maantiellä tanssin', correct: true }),
            Trivia.Answer.create({ answerText: 'maantiellä, harmaalla tanssin' }),
            Trivia.Answer.create({ answerText: 'maantietä kivistä kuljen' })
        ]
    }),
    Trivia.Question.create({
        gameId: 3,
        mediaId: 1,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 136600},
        answers: [
            Trivia.Answer.create({ answerText: 'tien valaisee kulkurilleen' }),
            Trivia.Answer.create({ answerText: 'tien viittana kulkurin on', correct: true }),
            Trivia.Answer.create({ answerText: 'luo tunnelman matkaajalleen' })
        ]
    }),
    Trivia.Question.create({
        gameId: 3,
        mediaId: 1,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 147150},
        answers: [
            Trivia.Answer.create({ answerText: 'poikkean taas talohon', correct: true }),
            Trivia.Answer.create({ answerText: 'tanssahtelen iloiten' }),
            Trivia.Answer.create({ answerText: 'työtä ma kaihda en' })
        ]
    }),
    Trivia.Question.create({
        gameId: 4,
        mediaId: 2,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 27500},
        answers: [
            Trivia.Answer.create({ answerText: 'vehreellä nurmella' }),
            Trivia.Answer.create({ answerText: 'vihreellä nurmella', correct: true }),
            Trivia.Answer.create({ answerText: 'kosteella nurmella' })
        ]
    }),
    Trivia.Question.create({
        gameId: 4,
        mediaId: 2,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 48750},
        answers: [
            Trivia.Answer.create({ answerText: 'sä pidit hoivassa' }),
            Trivia.Answer.create({ answerText: 'yhdessä riemuiten' }),
            Trivia.Answer.create({ answerText: 'sä leikit kanssani', correct: true })
        ]
    }),
    Trivia.Question.create({
        gameId: 4,
        mediaId: 2,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 59500},
        answers: [
            Trivia.Answer.create({ answerText: 'ja ainoo iloni', correct: true }),
            Trivia.Answer.create({ answerText: 'kallein aarteeni' }),
            Trivia.Answer.create({ answerText: 'ja armas läheisin' })
        ]
    }),
    Trivia.Question.create({
        gameId: 4,
        mediaId: 2,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 75750},
        answers: [
            Trivia.Answer.create({ answerText: 'maailma sitten vieroitti', correct: true }),
            Trivia.Answer.create({ answerText: 'maailma meidät erotti' }),
            Trivia.Answer.create({ answerText: 'maailma meitä pyöritti' })
        ]
    }),
    Trivia.Question.create({
        gameId: 4,
        mediaId: 2,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 92000},
        answers: [
            Trivia.Answer.create({ answerText: 'mä muistan lämmöllä' }),
            Trivia.Answer.create({ answerText: 'mä muistan ainiaan', correct: true }),
            Trivia.Answer.create({ answerText: 'luokseni kaipaisin' })
        ]
    }),
    Trivia.Question.create({
        gameId: 5,
        mediaId: 2,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 16750},
        answers: [
            Trivia.Answer.create({ answerText: 'äitisi helmoissa' }),
            Trivia.Answer.create({ answerText: 'isäsi majassa', correct: true }),
            Trivia.Answer.create({ answerText: 'siskosi rinnalla' })
        ]
    }),
    Trivia.Question.create({
        gameId: 5,
        mediaId: 2,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 22000},
        answers: [
            Trivia.Answer.create({ answerText: 'kuin kukka kaunis suloinen', correct:true }),
            Trivia.Answer.create({ answerText: 'suloinen kukka kedolla'}),
            Trivia.Answer.create({ answerText: 'kuin ruusu soma punainen' })
        ]
    }),
    Trivia.Question.create({
        gameId: 5,
        mediaId: 2,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 54000},
        answers: [
            Trivia.Answer.create({ answerText: 'toveri paras kaikista'}),
            Trivia.Answer.create({ answerText: 'ja olit paras ystäväin', correct:true }),
            Trivia.Answer.create({ answerText: 'sä olit luottoystäväin' })
        ]
    }),
    Trivia.Question.create({
        gameId: 5,
        mediaId: 2,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 81250},
        answers: [
            Trivia.Answer.create({ answerText: 'sut kauas minusta'}),
            Trivia.Answer.create({ answerText: 'toisistaan meidätkin'}),
            Trivia.Answer.create({ answerText: 'pois meidät toisistaan', correct:true })
        ]
    }),
    Trivia.Question.create({
        gameId: 6,
        questionText: 'Mikä on vastakohta: MATALA',
        answers: [
            Trivia.Answer.create({ answerText: 'laaja' }),
            Trivia.Answer.create({ answerText: 'pieni' }),
            Trivia.Answer.create({ answerText: 'korkea', correct: true }),
            Trivia.Answer.create({ answerText: 'syvä' }),
            Trivia.Answer.create({ answerText: 'avara' })
        ]
    }),
    Trivia.Question.create({
        gameId: 6,
        questionText: 'Mikä on vastakohta: PAINAVA',
        answers: [
            Trivia.Answer.create({ answerText: 'raskas' }),
            Trivia.Answer.create({ answerText: 'kova' }),
            Trivia.Answer.create({ answerText: 'rautainen' }),
            Trivia.Answer.create({ answerText: 'kookas' }),
            Trivia.Answer.create({ answerText: 'kevyt', correct: true })
        ]
    }),
    Trivia.Question.create({
        gameId: 6,
        questionText: 'Mikä on vastakohta: ISO',
        answers: [
            Trivia.Answer.create({ answerText: 'kookas' }),
            Trivia.Answer.create({ answerText: 'painava' }),
            Trivia.Answer.create({ answerText: 'pieni', correct: true }),
            Trivia.Answer.create({ answerText: 'mahtava' })
        ]
    }),
    Trivia.Question.create({
        gameId: 6,
        questionText: 'Mikä on vastakohta: TUMMA',
        answers: [
            Trivia.Answer.create({ answerText: 'musta' }),
            Trivia.Answer.create({ answerText: 'synkkä' }),
            Trivia.Answer.create({ answerText: 'iloinen' }),
            Trivia.Answer.create({ answerText: 'vaalea', correct: true }),
            Trivia.Answer.create({ answerText: 'valkoinen' })
        ]
    }),
    Trivia.Question.create({
        gameId: 6,
        questionText: 'Mikä on vastakohta: KALLIS',
        answers: [
            Trivia.Answer.create({ answerText: 'arvokas' }),
            Trivia.Answer.create({ answerText: 'iso' }),
            Trivia.Answer.create({ answerText: 'pieni' }),
            Trivia.Answer.create({ answerText: 'halpa', correct: true })
        ]
    }),
    Trivia.Question.create({
        gameId: 6,
        questionText: 'Mikä on vastakohta: NOPEA',
        answers: [
            Trivia.Answer.create({ answerText: 'iloinen' }),
            Trivia.Answer.create({ answerText: 'hidas', correct: true }),
            Trivia.Answer.create({ answerText: 'hätäinen' }),
            Trivia.Answer.create({ answerText: 'vauhdikas' })
        ]
    }),
    Trivia.Question.create({
        gameId: 6,
        questionText: 'Mikä on vastakohta: HILPEÄ',
        answers: [
            Trivia.Answer.create({ answerText: 'hauska' }),
            Trivia.Answer.create({ answerText: 'iloinen' }),
            Trivia.Answer.create({ answerText: 'mukava' }),
            Trivia.Answer.create({ answerText: 'synkkä', correct: true })
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
	}),
    mediaView: Em.View.extend({
        click: function() {
            Trivia.gameController.playMedia();
        }
    })
});

Trivia.GameCompletedView = Em.View.extend({
    templateName: 'gameCompleted',
    newGameView: Em.View.extend({
        newGameLabel: 'Valitse uusi peli',
        click: function() {
            Trivia.gameController.resetTrivia();
        }
    })
});

Trivia.gameController = Em.Object.create({
	init: function(){
		console.log('gamecontroller started');
	},
    populateQuestions: function() {
        if (this.get('game')) {
            var questions = Trivia.questions.filterProperty('gameId', this.get('game').get('guid'));
            this.set('questions', questions);
            this.set('currentQuestion', this.get('questions').objectAt(this.get('questionIndex')));

         /*  if(this.get('game').get('guid') == 1,5 ){
                ('.question-view h1').css("padding-top","200px");
           }*/

            this.set('image', this.get('game').get('image'));
            this.set('caption', this.get('game').get('caption'));


            if (this.get('currentQuestion').get('mediaId')) {
                var media = Trivia.medias.findProperty('guid', this.get('currentQuestion').get('mediaId'));
                this.set('media', media);
                this.set('showMediaView', true);
                //this.get('media').get('media').play();
            } else {
                this.set('showAnswers', true);
                this.set('showMediaView', false);
            }
        }
    }.observes('game'),
    showGameSelector: true,
    continueMediaFrom: 0,
    media: null,
    playLabel: 'Soita',
    game: false,
	questionIndex: 0,
    questions: null,
	currentQuestion: null,
    showAnswers: false,
    showMediaView: false,
    gameCompleted: false,
	score: 0,
	answerReward: 10,
    image:null,
    caption:null,
	nextQuestion: function(){
		if (this.get('questionIndex') < this.get('questions').length - 1){
			this.set('questionIndex', parseInt(this.get('questionIndex')) + 1);

            if (this.get('questionIndex') == this.get('questions').length-1) {
                console.log('game completed!');
                this.set('gameCompleted', true);
                this.set('game', false);
            }

			this.set('currentQuestion', this.get('questions').objectAt(this.get('questionIndex')));
            if (this.get('currentQuestion').get('mediaId')) {
                var media = Trivia.medias.findProperty('guid', this.get('currentQuestion').get('mediaId'));
                this.set('media', media);
                //this.get('media').get('media').play({position:this.get('continueMediaFrom')});
                this.set('showAnswers', false);
                this.set('showMediaView', true);
            } else {
                this.set('showAnswers', true);
                this.set('showMediaView', false);
            }
			return true;
		} else {
			return false;
		}

	},
    playMedia: function() {
        if (this.get('media')) {
            if (this.get('media').get('mediaType') == 'mp3') {
                if (this.get('media').get('media').playState == 0) {
                    this.set('playLabel', 'Odota taukoa...');
                    this.get('media').get('media').play({position: this.get('continueMediaFrom')});
                }
            }
        }
    },
    whileMediaPlaying: function() {
        console.log(Trivia.gameController.get('media').get('media').position);
        if (Trivia.gameController.get('media').get('media').position >= Trivia.gameController.get('currentQuestion').get('options').playTo) {
            Trivia.gameController.set('playLabel', 'Jatka');
            Trivia.gameController.get('media').get('media').stop();
            Trivia.gameController.set('continueMediaFrom', Trivia.gameController.get('media').get('media').position);
            Trivia.gameController.set('showAnswers', true);
        }
    },
    onMediaStop: function() {
        this.set('playLabel', 'Soita');
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

	},
    resetTrivia: function() {
        this.set('game', false);
        this.set('score', 0);
        this.set('gameCompleted', false);
        this.set('showAnswers', false);
        this.set('showGameSelector', true);
        Trivia.gameController.set('playLabel', 'Soita');
    }
})