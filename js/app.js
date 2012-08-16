var Trivia = Em.Application.create({
	ApplicationController: Em.Controller.extend({

	}),
	ApplicationView: Em.View.extend({
		templateName: 'application'
	}),
	GamesView: Em.View.extend({
		templateName:'games',
		classNames: 'select-game-view'.w(),
		selectGameCollectionView:Em.CollectionView.extend({
			classNames: 'select-game-view'.w(),
			tagName:'ul',
			contentBinding:'Trivia.games',
			itemViewClass:Em.View.extend({
				tagName:'li',
				classNames:'answer-view',
				bgStyle:function () {
					if (this.get('content.image')) {
						return 'background-image: url(' + this.get('content.image') + ')';
					}
				}.property('content.image')
				/*
				 didInsertElement: function(){
				 var height = (100 - 2) / this.getPath('parentView.content.length');
				 console.log(height);
				 },
				 */
				/*
				click:function () {
					Trivia.gameController.set('game', this.get('content'));
					Trivia.gameController.set('showGameSelector', false);
				}

				*/
			})
		})

	}),
	GamesController: Em.ObjectController.extend({

	}),
	GameLoadingController: Em.Controller.extend({}),

	GameLoadingView: Em.View.extend({
		templateName: 'game-loading',
		classNames: 'game-loading-view'.w()
	}),
	GameWrapperController: Em.Controller.extend({}),
	GameWrapperView: Em.View.extend({
		templateName: 'game'
	}),
	GameView: Em.View.extend({
		templateName: 'game-in-progress',
		classNames: 'game-view'.w(),
		scoreBinding: 'Trivia.gameController.score',
		questionBinding: 'Trivia.gameController.currentQuestion',


		answersView: Em.CollectionView.extend({
			isVisibleBinding:  "Trivia.router.gameController.showAnswers",
			displayBinding: 'Trivia.router.gameController.gameViewDisplay',

			isVisibleObserver: function(){
				console.log('visibility changed');
				var element = $(this.get('element'));
				if (this.get('isVisible')){
					if (this.get('display') === 'block'){
						element.removeClass('display-box');
						element.addClass('display-block');

					} else if (this.get('display') === 'box'){
						element.removeClass('display-block');
						element.addClass('display-box');
					}
				} else {
					element.removeClass('display-box');
					element.removeClass('display-block');
				}
			}.observes('isVisible'),
			/*
			visibilityObserver: function(){
				console.log('visibility changed');
				var element = $(this.get('element'));

				if (this.get('visibility')){
					element.show();
					element.addClass('display-box');
				} else {
					element.hide();
				}
			}.observes('visibility'),


			didInsertElement: function(){
				this.visibilityObserver();
			},
			*/
			classNames: 'answers-view'.w(),
			tagName: 'ul',
			contentBinding: 'Trivia.router.gameController.currentQuestion.answers',
			itemViewClass: Em.View.extend({
				didInsertElement: function(){
					/*
					setTimeout(function(){
						$('li.answer-view').css({opacity: 0.999999});
						console.log('kek');
					},1000);
					*/

					/*
					console.log($(this.get('element')))
					$(this.get('element')).hide();
					$(this.get('element')).show();
					*/
				},
				classNames: 'answer-view btn',

				click: function(event){

					//see if we already clicked this
					if (this.get('clicked')){
						event.preventDefault();
						return true;
					}


					var element = $(this.get('element'));

					//give the element initial position
					element.css('top', element.position().top + 'px');

					//console.log('top', element.position().top);

					//give the element an explicit height
					element.height(element.height()  + 'px');

					//set element position to relative to make positioning possible
					element.css('position', 'relative');
					//console.log('top', element.position().top)

					//set parent to block
					//element.parent().css('display', 'block');

					element.parent().addClass('display-block');

					$(this.get('element')).addClass('selected');

					if (this.get('content.correct')){
						$(this.get('element')).addClass('btn-success');
					} else {
						$(this.get('element')).addClass('btn-danger');
					}

					element.parent().find('li:not(.selected)').hide();

					element.animate({ top: 0}, 500, function(){
						$('.next-question.btn').fadeIn().css({'display': 'block'});
					});

					this.set('clicked', true);

					Trivia.router.send('checkAnswer', this.get('content'));
					console.log(this.get('content'));
				}
			})
		}),
		mediaView: Em.View.extend({
		}),
		gameStartInstructions: Em.View.extend({

			classNames: 'game-start-instructions'.w(),
			isVisible: function(){
				return !this.get('gameInProgress');
			}.property('gameInProgress'),
			gameInProgressBinding: 'Trivia.router.gameController.gameInProgress',
		}),
		gameFinished: Em.View.extend({
			classNames: 'game-finished'.w(),
			isVisibleBinding: 'Trivia.router.gameController.gameFinished',
			feedbackText: 'Hienoa, muistit kappaleen sanat melko hyvin!',
			successRate: function(){
				return Math.floor(parseInt(this.get('correctAnswers')) / Trivia.get('router.gameController.questions.length') * 100);
			}.property('correctAnswers'),
			correctAnswersBinding: 'Trivia.router.gameController.correctAnswers'

		}),
		instructionContainer: Em.View.extend({
			classNames: 'instructions-box'.w(),
			countdownView: Em.View.extend({
				isVisibleBinding: 'Trivia.router.gameController.countdownViewVisible',
				classNames: 'countdown-view alert'.w(),
				content: 'Valmistaudu vastaamaan!'
			}),
			instructionView: Em.View.extend({
				isVisibleBinding: 'Trivia.router.gameController.instructionViewVisible',
				classNames: 'countdown-view alert-info alert'.w(),
				content: 'Miten kappale jatkuu?'
			}),
			messageView: Em.View.extend({
				isVisibleBinding: 'Trivia.router.gameController.messageViewVisible',
				classNames: 'message-view alert alert-info'.w()
			}),
			gameEndView: Em.View.extend({
				isVisibleBinding: 'Trivia.router.gameController.gameEndViewVisible',
				classNames: 'correct-answer-view alert'.w(),
				content: 'Peli loppui.'
			}),
			correctAnswerView: Em.View.extend({
				isVisibleBinding: 'Trivia.router.gameController.correctAnswerViewVisible',
				classNames: 'correct-answer-view alert alert-success'.w(),
				content: 'Hyvä, vastasit oikein!'
			}),
			wrongAnswerView: Em.View.extend({
				isVisibleBinding: 'Trivia.router.gameController.wrongAnswerViewVisible',
				classNames: 'wrong-answer-view alert alert-error'.w(),
				content: 'Vastasit väärin.'
			})
		}),

		questionView: Em.View.extend({
			classNames: 'question-view'.w(),

			controlsView: Em.View.extend({
				classNames: 'controls-view'.w(),
				playClass: function(){
					if (this.get('mediaState') === 'playing'){
						return 'badge badge-success';
					} else {
						return 'badge badge-warning';
					}
				}.property('mediaState'),
				mediaStateBinding: 'Trivia.router.gameController.mediaState'

			}),
			mediaDisplayView: Em.View.extend({
				classNames: 'media-display-view'.w(),
				//contentBinding: 'Trivia.gameController.game.image',
				contentDidChange: function(){
					console.log('album content changed');
					if (this.get('content')){
						console.log('content changed', this.get('content'));
						console.log('background changed', this.get('element'));
						$(this.get('element')).css({
							'background-image': 'url(' + this.get('content') + ')'
						})
					}
				}.observes('content'),

				didInsertElement: function(){
					//TODO: no idea why the content doesn't get updated automatically but this works as a temp fix
					this.contentDidChange();
				},
				click: function(){
					console.log(this.get('content'))
				}
			})
		})
	}),
	GameController: Em.Controller.extend({

		titleBinding: 'content.name', //Game title eg. Kulkurin valssi
		imageBinding: 'content.image', //Image url eg. assets/kulkurin_valssi.jpg
		captionBinding: 'content.caption', //Copyright info. Not implemented

		mediaPosition: 0, //Media position in milliseconds from the start. Updated on the fly by playInterval()

		gameFinished: false,

		mediaState: 'stopped', //can be either 'stopped' or 'playing'
		gameInProgress: false,
		markerPositions: function(){
			var media = Trivia.medias.findProperty('guid', this.get('currentQuestion').get('mediaId'));
			var positions = this.get('questions').map(
				function(question){
					return question.options.playTo / media.get('res').duration
			});

			return positions;
		}.property('questions').cacheable(),

		questionIndex: 0,
		media: null,

		correctAnswers: 0, //amount of correct answers

		showAnswers: false,
		gameViewDisplay: 'box',

		countdownViewVisible: false,
		instructionViewVisible: false,
		messageViewVisible: false,
		gameEndViewVisible: false,
		correctAnswerViewVisible: false,
		wrongAnswerViewVisible: false,

		setAlertVisible: function(viewName){
			this.set('countdownViewVisible', false);
			this.set('instructionViewVisible', false);
			this.set('messageViewVisible', false);
			this.set('gameEndViewVisible', false);
			this.set('correctAnswerViewVisible', false);
			this.set('wrongAnswerViewVisible', false);
			if (viewName){
				this.set(viewName + 'ViewVisible', true);
			}
		},

		mediaDidChange: function(){

			var mediaId = this.get('currentQuestion.mediaId');
			var self = this;
			var media = Trivia.medias.findProperty('guid', mediaId);
			if (media && media.get('mediaType') === 'mp3'){
				media.reopen({
					res: soundManager.createSound({

						id: 'trivia-' + mediaId,
						url: media.get('url'),
						autoplay: false,
						onload: function(){
							//notify router of finished asset loading
							console.log('onload')
							Trivia.router.send('assetLoadingComplete');
						},
						onplay: function(){
							console.log('playing song', this)
						},
						whileloading: function(){
							console.log('loading');
							self.set('mediaLoadProgress', this.bytesLoaded / this.bytesTotal);
						}


					})
				})
			}

			this.set('media', media);

			console.log('media changed');
		}.observes('currentQuestion.mediaId'),

		/**
		 * plays the current song interval specified by Trivia.Question.media.
		 * @param fromEnd used to replay fromEnd amount of seconds from the end of the interval
		 */
		playInterval: function(fromEnd){
			var startingPosition = 0;

			if (this.get('questionIndex') > 0){
				//get previous question
				var previousQuestion = this.get('questions').objectAt(this.get('questionIndex') - 1);
				startingPosition =  previousQuestion.get('options.playTo');
				if (!startingPosition){
					throw 'no startin position!';
				}
			}

			var playTo = this.get('currentQuestion.options.playTo');

			if (fromEnd){
				startingPosition = playTo - fromEnd;

				if (startingPosition >= 0){
					console.log('playback starts at', fromEnd, '-', playTo);
				} else {
					throw 'trying to seek past the sound file'
				}
			}

			console.log('playing from', startingPosition, 'to', this.get('currentQuestion.options.playTo'));

			if (this.get('media.res')){

				this.get('media.res').play({
					position: startingPosition,
					whileplaying: function(){
						console.log('playing at', this.position);
						Trivia.router.set('gameController.mediaPosition', this.position / this.duration);
						Trivia.router.set('gameController.mediaPlaying', true);
					},
					onstop: function(){
						Trivia.router.set('gameController.mediaPlaying', false);
					}
				}).onPosition(playTo, function(){
					this.stop();
					this.clearOnPosition(playTo);

					Trivia.router.send('finishedPlayingInterval', playTo);
				});

			} else {
				throw 'no media found'
			}
		},

		currentQuestion: function(){
			if (this.get('questions')){
				return this.get('questions').objectAt(this.get('questionIndex'));
			} else {
				return false;
			}
		}.property('questionIndex', 'questions'),

		contentDidChange: function(){
			//get questions

			//console.info('game controller content changed', this.get('content'))
		}.observes('content')
	}),

	/*
	Game1Controller: Em.Controller.extend({}),
	Game1View: Em.View.extend({
		templateName: 'game1'
	}),
	*/
	Router:Ember.Router.extend({
		root:Ember.Route.extend({
			enter:function () {
			},
			index:Ember.Route.extend({
				route:'/',
				enter:function () {
				},
				redirectsTo:'games'
			}),
			games:Ember.Route.extend({
				route:'/games',
				index: Em.Route.extend({
					route: '/',
					connectOutlets: function(router){
						console.log('connecting outlets', router.get('applicationController'));
						router.get('applicationController').connectOutlet('games', Trivia.games);
					},
					startGame: function(router, event){
						router.transitionTo('game', event.context);
						console.log('starting game', router, event, event.context.get('name'));
						//router.set('applicatioinController.gameController.game', event.context);
					}
				}),
				game: Em.Route.extend({
					route: '/:game_id',

					enter: function(){
						console.log('entered game');
					},
					deserialize: function(router, params){
						var game_id = params.game_id;
						return Trivia.games.findProperty('guid', parseInt(game_id))
						//console.log('deserializing', game_id);
					},
					serialize: function(router, context){
						console.log('serializing!', context.get('guid'));
						return {
							game_id: context.get('guid')
						}
						//console.log('serializing', context);
					},
					connectOutlets: function(router, game){

						console.log('connecting outlets');

						//inject game controller to application controller and set the game object as gamecontroller's content
						router.get('applicationController').connectOutlet('game', game);

						var gameController = router.get('gameController');

						//get questions
						var gameId = parseInt(router.get('gameController.content.guid'));
						var questions = Trivia.questions.filterProperty('gameId', gameId);

						router.set('gameController.questions', questions);
						gameController.set('questionIndex', 0);


					},
					back: function(router, context){
						console.log('back');
						router.transitionTo('root.games');
					},
					gameStopped: Em.Route.extend({
						route: '/',
						enter: function(router){
							console.log('game stopped');
							//router.transitionTo('gameStarted');
						},
						connectOutlets: function(router){
							router.get('applicationController').connectOutlet('gameLoading', router.get('gameController.content'));
							//router.get('applicationController').connectOutlet('gameWrapper', router.get('gameController.content'));
						},

						startGame: function(router){
							console.log('starting game');

						},
						assetsPending: Em.Route.extend({
							route: '/',
							enter: function(){
								console.log('assets not loaded');
							},
							startGame: function(){
								console.log('assets not loaded, not starting yet');
							},
							assetLoadingComplete: function(router){
								console.log('asset loading complete');
								router.transitionTo('assetsLoaded');
							}
						}),
						assetsLoaded: Em.Route.extend({
							enter: function(router){
								console.log('assets loaded');
								router.send('startGame');
							},
							connectOutlets: function(router){
								router.send('startGame');
							},
							startGame: function(router){
								console.log('starting game');
								router.transitionTo('gameStarted');
							}
						})
					}),

					gameStarted: Em.Route.extend({
						connectOutlets: function(router, context){
							router.get('applicationController').connectOutlet('game', router.get('gameController.content'));
							console.log('hiding answers');
							router.set('gameController.showAnswers', false);
							router.transitionTo('mediaStopped');
						},

						mediaStopped: Em.Route.extend({
							initialState: 'answerNotChecked',
							enter: function(router){
								console.log('mediaStopped');
								router.set('gameController.mediaState', 'stopped');

							},
							connectOutlets: function(router){
								router.transitionTo('answerNotChecked');
							},

							answerNotChecked: Em.Route.extend({

								enter: function(router){
									console.log('entered not checked');


								},
								start: function(router){
									console.log('playing interval');
									router.get('gameController').playInterval();
									router.transitionTo('mediaPlaying');
									Trivia.set('router.gameController.gameInProgress', true);

								},
								replay: function(router){
									router.get('gameController').playInterval(2000);
								},
								checkAnswer: function(router, answer){
									console.log('checking answer', answer);

									if (answer){
										if (answer.get('correct')){
											router.set('gameController.correctAnswers', router.get('gameController.correctAnswers') + 1);
											router.get('gameController').setAlertVisible('correctAnswer');
											soundManager.getSoundById('tada').play()
										} else {
											router.get('gameController').setAlertVisible('wrongAnswer');
											soundManager.getSoundById('sadtrombone').play()
										}

										router.transitionTo('answerChecked');

									} else {
										throw 'no answer provided';
									}

								}
							}),
							answerChecked: Em.Route.extend({
								enter: function(){
									console.log('entered answerchecked');
								},
								nextQuestion: function(router){

									var gameController = router.get('gameController');


									console.log('next question!');


									$('.next-question.btn').fadeOut(function(){

										//$('.answers-view').hide();


										router.set('gameController.gameViewDisplay', 'box');
										router.gameController.set('showAnswers', false);

										if (parseInt(gameController.get('questionIndex')) + 1  <  gameController.get('questions.length')){
												console.log('next question');
												gameController.set('questionIndex', gameController.get('questionIndex') + 1);

												//$('.answers-view').show();
												console.log('hiding answers');
												router.set('gameController.showAnswers', false);
												router.transitionTo('answerNotChecked');
												router.send('start');
											} else {
												router.transitionTo('gameFinished');
												console.log('out of questions');
											}
									});
								}
							})

						}),
						mediaPlaying: Em.Route.extend({
							enter: function(router){
								console.log('mediaPlaying');
								router.get('gameController').setAlertVisible('countdown');
								router.set('gameController.showAnswers', false);
								router.set('gameController.mediaState', 'playing');
							},
							finishedPlayingInterval: function(router){
								router.set('gameController.showAnswers', true);
								router.transitionTo('mediaStopped');
							}
						}),
						gameFinished: Em.Route.extend({
							enter: function(router){
								console.log('entered game finished');
								router.set('gameController.gameFinished');
								soundManager.getSoundById('winner').play()
								router.get('gameController').setAlertVisible();
							},
							back: function(router){
								router.transitionTo('index');
							}
						})



					})

					/*
					startGame: function(router, event) {
						console.log('starting game')
			          	router.transitionTo('game1', {});
			        },
					*/
					/*
					back: function(router, event) {
						console.log('getting back from game')
			          router.transitionTo('index', {});
			        }
					*/
					/*
					game1: Em.Route.extend({
						route: 'bar',
						enter: function(){
							console.log('entered game 1');
						},
						connectOutlets: function(router){
							router.get('applicationController').connectOutlet('games', {})
							router.get('gamesController').connectOutlet('game1', {})
						},
						back: function(){
							console.log('getting back from game1');
						}
					})
					*/
				})
			})
		})
	})

});
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
        name: 'Kulkurin Valssi I',
        image: 'assets/img/kulkurin_valssi.jpg',
        caption: 'Charlie Champ, “The Tramp”, 1915" - Laura Loveday (lis. CC BY-NC-SA 2.0)'
    }),
    Trivia.Game.create({
        guid: 3,
        name: 'Kulkurin Valssi II',
        image: 'assets/img/kulkurin_valssi.jpg',
        caption: 'Charlie Champ, “The Tramp”, 1915" - Laura Loveday (lis. CC BY-NC-SA 2.0)'
    }),
    Trivia.Game.create({
        guid: 4,
        name: 'Lapsuuden Toverille I',
        image: 'assets/img/lapsuuden_toverille.jpg',
        caption: 'Grandpa`s friends - D Flam (lis. CC BY-NC 2.0)'
    }),
    Trivia.Game.create({
        guid: 5,
        name: 'Lapsuuden Toverille II',
        image: 'assets/img/lapsuuden_toverille.jpg',
        caption: 'Grandpa`s friends - D Flam (lis. CC BY-NC 2.0)'
    }),
    Trivia.Game.create({
        guid: 6,
        name: 'Väliaikainen I',
        image: 'assets/img/valiaikainen.jpg',
        caption: 'Jussivaellus 2012 - Verna Koskinen (lis. CC BY-SA 2.0)'
    }),
    Trivia.Game.create({
        guid: 7,
        name: 'Väliaikainen II',
        image: 'assets/img/valiaikainen.jpg',
        caption: 'Jussivaellus 2012 - Verna Koskinen (lis. CC BY-SA 2.0)'
    }),
    Trivia.Game.create({
        guid: 8,
        name: 'Tulipunaruusut I',
        image: 'assets/img/tulipunaruusut.jpg',
        caption: 'horse+sunset - Ro Irving (lis. CC BY-SA 2.0)'
    }),
    Trivia.Game.create({
        guid: 9,
        name: 'Tulipunaruusut II',
        image: 'assets/img/tulipunaruusut.jpg',
        caption: 'horse+sunset - Ro Irving (lis. CC BY-SA 2.0)'
    }),
    Trivia.Game.create({
        guid: 10,
        name: 'Suutarin emännän kehtolaulu',
        image: 'assets/img/suutarin_emanta.jpg',
        caption: 'Old sewing machine - Petr Kratochvil (Public Domain)'
    }),
    Trivia.Game.create({
        guid: 11,
        name: 'Voi tuota muistia',
        image: 'assets/img/voi_tuota_muistia.jpg',
        caption: '15062007(005) - Mikko Koponen (CC BY 2.0)'
    }),
    Trivia.Game.create({
        guid: 12,
        name: 'Puhelinlangat laulaa',
        image: 'assets/img/puhelinlangat.jpg',
        caption: 'Old Telephone Lines At Dawn - Brad Smith (CC BY-NC 2.0)'
    }),
    Trivia.Game.create({
        guid: 13,
        name: 'Sellanen ol Viipuri',
        image: 'assets/img/viipuri.jpg',
        caption: 'Fortress in Vyborg - Paukrus (CC BY-SA 2.0)'
    }),
    Trivia.Game.create({
        guid: 14,
        name: 'Kotkan poikii ilman siipii',
        image: 'assets/img/kotkan_poikii.jpg',
        caption: 'Sea Eagle - Asbjorn Floden (CC BY-NC 2.0)'
    }),
    Trivia.Game.create({
        guid: 15,
        name: 'Satumaa',
        image: 'assets/img/satumaa.jpg',
        caption: 'North sea sunset - Dolorix (CC BY-NC-SA 2.0)'
    }),
    Trivia.Game.create({
        guid: 16,
        name: 'Vastakohtien yhdistäminen'
    })
];
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
        //options: {playTo: 15750},
		options: {playTo: 1750},
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
        options: {playTo: 3000},
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
        options: {playTo: 5000},
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
        options: {playTo: 6000},
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
        options: {playTo: 7000},
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
        options: {playTo: 8000},
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
        options: {playTo: 9000},
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
            Trivia.Answer.create({ answerText: 'sut kauas minusta' }),
            Trivia.Answer.create({ answerText: 'toisistaan meidätkin' }),
            Trivia.Answer.create({ answerText: 'pois meidät toisistaan', correct:true })
        ]
    }),
    Trivia.Question.create({
        gameId: 6,
        mediaId: 3,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 17500},
        answers: [
            Trivia.Answer.create({ answerText: 'juhlien suurien' }),
            Trivia.Answer.create({ answerText: 'helkkyvien riemuineen', correct: true }),
            Trivia.Answer.create({ answerText: 'kultaisten muistojen' })
        ]
    }),
    Trivia.Question.create({
        gameId: 6,
        mediaId: 3,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 27750},
        answers: [
            Trivia.Answer.create({ answerText: 'sekä sydäntä viiltävä rakkaus' }),
            Trivia.Answer.create({ answerText: 'sekä muistoihin piirtynyt rakkaus' }),
            Trivia.Answer.create({ answerText: 'sekä rinnassa riehuva rakkaus', correct:true })
        ]
    }),
    Trivia.Question.create({
        gameId: 6,
        mediaId: 3,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 39500},
        answers: [
            Trivia.Answer.create({ answerText: 'Tuoksu viehkeinkin kauneimman kukkasen', correct:true }),
            Trivia.Answer.create({ answerText: 'Väri kauneinkin punaisimman kukkasen' }),
            Trivia.Answer.create({ answerText: 'Sävy hohtavin värikkäimmän kukkasen' })
        ]
    }),
    Trivia.Question.create({
        gameId: 6,
        mediaId: 3,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 59000},
        answers: [
            Trivia.Answer.create({ answerText: 'sekä poskien purppurapunerrus'}),
            Trivia.Answer.create({ answerText: 'sekä huulien purppurapunerrus', correct: true }),
            Trivia.Answer.create({ answerText: 'sekä silmien säihkyvä kimallus' })
        ]
    }),
    Trivia.Question.create({
        gameId: 6,
        mediaId: 3,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 87500},
        answers: [
            Trivia.Answer.create({ answerText: 'mi mieltäsi nostattaa', correct:true }),
            Trivia.Answer.create({ answerText: 'se tunnetta nostattaaa' }),
            Trivia.Answer.create({ answerText: 'se mieltäsi kohottaa' })
        ]
    }),
    Trivia.Question.create({
        gameId: 6,
        mediaId: 3,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 95600},
        answers: [
            Trivia.Answer.create({ answerText: 'joka rakkautesi sytyttää'}),
            Trivia.Answer.create({ answerText: 'joka luoksesi kiiruhtaa' }),
            Trivia.Answer.create({ answerText: 'joka helyt meillä ostattaa', correct:true })
        ]
    }),
    Trivia.Question.create({
        gameId: 7,
        mediaId: 3,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 9800},
        answers: [
            Trivia.Answer.create({ answerText: 'huoleton murheeton'}),
            Trivia.Answer.create({ answerText: 'huolineen ja murheineen', correct:true }),
            Trivia.Answer.create({ answerText: 'murheineen ja huolineen' })
        ]
    }),
    Trivia.Question.create({
        gameId: 7,
        mediaId: 3,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 31700},
        answers: [
            Trivia.Answer.create({ answerText: 'ja onnettomuus - totta tosiaan' }),
            Trivia.Answer.create({ answerText: 'ja huolettomuus - totta tosiaan' }),
            Trivia.Answer.create({ answerText: 'ja pettymys tuo - totta tosiaan', correct:true })
        ]
    }),
    Trivia.Question.create({
        gameId: 7,
        mediaId: 3,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 47800},
        answers: [
            Trivia.Answer.create({ answerText: 'kultaisen hellimmän nuoruuden', correct:true }),
            Trivia.Answer.create({ answerText: 'kultaa sen hellimmän nuoruuden' }),
            Trivia.Answer.create({ answerText: 'kultaa sen hellänkin nuoruuden' })
        ]
    }),
    Trivia.Question.create({
        gameId: 7,
        mediaId: 3,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 56600},
        answers: [
            Trivia.Answer.create({ answerText: 'hempeä kauneus', correct:true }),
            Trivia.Answer.create({ answerText: 'viehkeä hempeys' }),
            Trivia.Answer.create({ answerText: 'hehkeä naurahdus' })
        ]
    }),
    Trivia.Question.create({
        gameId: 7,
        mediaId: 3,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 86200},
        answers: [
            Trivia.Answer.create({ answerText: 'hurma seuran...' }),
            Trivia.Answer.create({ answerText: 'hurma viinin...', correct:true }),
            Trivia.Answer.create({ answerText: 'hurma ilon...' })
        ]
    }),
    Trivia.Question.create({
        gameId: 7,
        mediaId: 3,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 105800},
        answers: [
            Trivia.Answer.create({ answerText: 'sekä sydäntä viiltävä rakkaus' }),
            Trivia.Answer.create({ answerText: 'sekä muistoihin piirtynyt rakkaus' }),
            Trivia.Answer.create({ answerText: 'sekä rinnassa riehuva rakkaus', correct:true })
        ]
    }),
    Trivia.Question.create({
        gameId: 8,
        mediaId: 4,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 14600},
        answers: [
            Trivia.Answer.create({ answerText: 'tähdet yli pustan näyttää tien' }),
            Trivia.Answer.create({ answerText: 'ratsuani juoksuun hoputan', correct:true }),
            Trivia.Answer.create({ answerText: 'ratsulleni sinne näytän tien' })
        ]
    }),
    Trivia.Question.create({
        gameId: 8,
        mediaId: 4,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 23800},
        answers: [
            Trivia.Answer.create({ answerText: 'tyttö, jota yksin rakastan', correct:true }),
            Trivia.Answer.create({ answerText: 'tyttö, jonka luokse halajan' }),
            Trivia.Answer.create({ answerText: 'tyttö, jonka muistan ainiaan' })
        ]
    }),
    Trivia.Question.create({
        gameId: 8,
        mediaId: 4,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 39700},
        answers: [
            Trivia.Answer.create({ answerText: 'suukon palkaksi suot mulle', correct:true }),
            Trivia.Answer.create({ answerText: 'hymyn vienon annat mulle' }),
            Trivia.Answer.create({ answerText: 'sydämen suot palkaks mulle' })
        ]
    }),
    Trivia.Question.create({
        gameId: 8,
        mediaId: 4,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 67800},
        answers: [
            Trivia.Answer.create({ answerText: 'suku suur' }),
            Trivia.Answer.create({ answerText: 'kotini' }),
            Trivia.Answer.create({ answerText: 'maja pien', correct:true })
        ]
    }),
    Trivia.Question.create({
        gameId: 8,
        mediaId: 4,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 76300},
        answers: [
            Trivia.Answer.create({ answerText: 'mustan orin lentoon nostan' }),
            Trivia.Answer.create({ answerText: 'ratsun lento on kuin tulta', correct:true }),
            Trivia.Answer.create({ answerText: 'vauhdin hurma on niin hurja' })
        ]
    }),
    Trivia.Question.create({
        gameId: 8,
        mediaId: 4,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 96900},
        answers: [
            Trivia.Answer.create({ answerText: 'mulle suukko, sulle ruusut tulipunaiset', correct:true }),
            Trivia.Answer.create({ answerText: 'sulle ruusut, mulle suukot tulipunaiset' }),
            Trivia.Answer.create({ answerText: 'mulle rakkaus, sulle ruusut tulipunaiset' })
        ]
    }),
    Trivia.Question.create({
        gameId: 9,
        mediaId: 4,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 10070},
        answers: [
            Trivia.Answer.create({ answerText: 'illoin luokse pienen kapakan', correct:true }),
            Trivia.Answer.create({ answerText: 'Hiljan luoksen pienen kapakan' }),
            Trivia.Answer.create({ answerText: 'illoin juoksen pieneen kapakkaan' })
        ]
    }),
    Trivia.Question.create({
        gameId: 9,
        mediaId: 4,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 19100},
        answers: [
            Trivia.Answer.create({ answerText: 'kuiskaa hiljaa arotuuli', correct:true }),
            Trivia.Answer.create({ answerText: 'arotuuli hiljaa kuiskaa' }),
            Trivia.Answer.create({ answerText: 'hiljaa arotuuli kuiskaa' })
        ]
    }),
    Trivia.Question.create({
        gameId: 9,
        mediaId: 4,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 32800},
        answers: [
            Trivia.Answer.create({ answerText: 'meitä varten aina kukkineet' }),
            Trivia.Answer.create({ answerText: 'sua varten vain on kukkineet', correct:true }),
            Trivia.Answer.create({ answerText: 'kauneimmat on meille kukkineet' })
        ]
    }),
    Trivia.Question.create({
        gameId: 9,
        mediaId: 4,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 39700},
        answers: [
            Trivia.Answer.create({ answerText: 'suukon palkaksi suot mulle', correct:true }),
            Trivia.Answer.create({ answerText: 'hymyn vienon annat mulle' }),
            Trivia.Answer.create({ answerText: 'sydämen suot palkaks mulle' })
        ]
    }),
    Trivia.Question.create({
        gameId: 9,
        mediaId: 4,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 69500},
        answers: [
            Trivia.Answer.create({ answerText: 'pustan tuuli näyttää mulle tien' }),
            Trivia.Answer.create({ answerText: 'tähdet pustan yli näyttää tien', correct:true }),
            Trivia.Answer.create({ answerText: 'tähdet näyttää mulle sinne tien' })
        ]
    }),
    Trivia.Question.create({
        gameId: 9,
        mediaId: 4,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 78600},
        answers: [
            Trivia.Answer.create({ answerText: 'taivaan rannan taa kun sinut vien', correct:true }),
            Trivia.Answer.create({ answerText: 'horisonttiin meidät kuljettaa' }),
            Trivia.Answer.create({ answerText: 'halki pustan meidän kuljettaa' })
        ]
    }),
    Trivia.Question.create({
        gameId: 9,
        mediaId: 4,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 96900},
        answers: [
            Trivia.Answer.create({ answerText: 'mulle suukko, sulle ruusut tulipunaiset', correct:true }),
            Trivia.Answer.create({ answerText: 'sulle ruusut, mulle suukot tulipunaiset' }),
            Trivia.Answer.create({ answerText: 'mulle rakkaus, sulle ruusut tulipunaiset' })
        ]
    }),
    Trivia.Question.create({
        gameId: 10,
        mediaId: 5,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 17500},
        answers: [
            Trivia.Answer.create({ answerText: 'kun että muista meitä' }),
            Trivia.Answer.create({ answerText: 'kun en mä tunne teitä', correct:true }),
            Trivia.Answer.create({ answerText: 'ja mistä mä tunnen teidät' })
        ]
    }),
    Trivia.Question.create({
        gameId: 10,
        mediaId: 5,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 30900},
        answers: [
            Trivia.Answer.create({ answerText: 'kenkiänne hakemahan', correct:true }),
            Trivia.Answer.create({ answerText: 'kenkiänne paikkaamahan' }),
            Trivia.Answer.create({ answerText: 'laukkujanne noutamaahan' })
        ]
    }),
    Trivia.Question.create({
        gameId: 10,
        mediaId: 5,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 44400},
        answers: [
            Trivia.Answer.create({ answerText: 'kylälle neulomahan', correct:true }),
            Trivia.Answer.create({ answerText: 'maille muille vierahille' }),
            Trivia.Answer.create({ answerText: 'juhlimaan kaupungille' })
        ]
    }),
    Trivia.Question.create({
        gameId: 10,
        mediaId: 5,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 71250},
        answers: [
            Trivia.Answer.create({ answerText: 'Liisalle mansikoita' }),
            Trivia.Answer.create({ answerText: 'Kaisalle orvokkeja' }),
            Trivia.Answer.create({ answerText: 'Miinalle terveisiä', correct:true })
        ]
    }),
    Trivia.Question.create({
        gameId: 10,
        mediaId: 5,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 81200},
        answers: [
            Trivia.Answer.create({ answerText: 'kenkähylly ulos mennessänne' }),
            Trivia.Answer.create({ answerText: 'piimähinkkiä porstuassa mennessänne', correct:true }),
            Trivia.Answer.create({ answerText: 'maitotonkkaa navetassa käydässänne' })
        ]
    }),
    Trivia.Question.create({
        gameId: 11,
        mediaId: 6,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 17640},
        answers: [
            Trivia.Answer.create({ answerText: 'minnekä eilen retkemme johti', correct:true }),
            Trivia.Answer.create({ answerText: 'missähän eilen vierailimme' }),
            Trivia.Answer.create({ answerText: 'vuosikymmenten muistot mielessä säilyy' })
        ]
    }),
    Trivia.Question.create({
        gameId: 11,
        mediaId: 6,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 36050},
        answers: [
            Trivia.Answer.create({ answerText: 'mielessä ei pysy' }),
            Trivia.Answer.create({ answerText: 'unohtuvat kohta', correct:true }),
            Trivia.Answer.create({ answerText: 'vieraalta kuullostavat' })
        ]
    }),
    Trivia.Question.create({
        gameId: 11,
        mediaId: 6,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 50500},
        answers: [
            Trivia.Answer.create({ answerText: 'Armi Aavikko maailman kaunein nainen' }),
            Trivia.Answer.create({ answerText: 'Kekkonen johtaja, kansa ylväs' }),
            Trivia.Answer.create({ answerText: 'Kinnunen heitti, Vireeni juoksi', correct:true })
        ]
    }),
    Trivia.Question.create({
        gameId: 11,
        mediaId: 6,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 96200},
        answers: [
            Trivia.Answer.create({ answerText: 'matkassa en voi pysyä', correct:true }),
            Trivia.Answer.create({ answerText: 'matkassa yritän pysyä' }),
            Trivia.Answer.create({ answerText: 'tietoverkkojen kautta se selviää' })
        ]
    }),
    Trivia.Question.create({
        gameId: 11,
        mediaId: 6,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 112700},
        answers: [
            Trivia.Answer.create({ answerText: 'piiloonko lienee se mennyt vain' }),
            Trivia.Answer.create({ answerText: 'onko se loppunut kokonaan', correct:true }),
            Trivia.Answer.create({ answerText: 'mistä sen löytäisin uudestaan' })
        ]
    }),
    Trivia.Question.create({
        gameId: 12,
        mediaId: 7,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 19680},
        answers: [
            Trivia.Answer.create({ answerText: 'Ja pilvistä katsoo kuu', correct:true }),
            Trivia.Answer.create({ answerText: 'on onneni verraton' }),
            Trivia.Answer.create({ answerText: 'ja taivasta tuijottelen' })
        ]
    }),
    Trivia.Question.create({
        gameId: 12,
        mediaId: 7,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 36360},
        answers: [
            Trivia.Answer.create({ answerText: 'on kaipaus aivan suunnaton' }),
            Trivia.Answer.create({ answerText: 'kun uniaan hän vetelee', correct:true }),
            Trivia.Answer.create({ answerText: 'muistot mieleen piirtyvät' })
        ]
    }),
    Trivia.Question.create({
        gameId: 12,
        mediaId: 7,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 44900},
        answers: [
            Trivia.Answer.create({ answerText: 'Vapaa kuin taivaan lintu on kulkija huoleton', correct:true }),
            Trivia.Answer.create({ answerText: 'Huoleton kulkijapoika on matkalla kullan luo' }),
            Trivia.Answer.create({ answerText: 'Onnellinen voi olla kun maantietä askelen' })
        ]
    }),
    Trivia.Question.create({
        gameId: 12,
        mediaId: 7,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 101300},
        answers: [
            Trivia.Answer.create({ answerText: 'poluilla kuljeskellen' }),
            Trivia.Answer.create({ answerText: 'reiteillä vierahilla' }),
            Trivia.Answer.create({ answerText: 'maantiellä vihellellen', correct:true })
        ]
    }),
    Trivia.Question.create({
        gameId: 12,
        mediaId: 7,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 120410},
        answers: [
            Trivia.Answer.create({ answerText: 'suurta rakkauttaan' }),
            Trivia.Answer.create({ answerText: 'kaipaus rinnassaan', correct:true }),
            Trivia.Answer.create({ answerText: 'puhelimen pirinää' })
        ]
    }),
    Trivia.Question.create({
        gameId: 13,
        mediaId: 8,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 23500},
        answers: [
            Trivia.Answer.create({ answerText: 'aamuvarhaisella työtä' }),
            Trivia.Answer.create({ answerText: 'illoin riitti puhdetyötä', correct:true }),
            Trivia.Answer.create({ answerText: 'päivin kiristeltiin vöitä' })
        ]
    }),
    Trivia.Question.create({
        gameId: 13,
        mediaId: 8,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 30980},
        answers: [
            Trivia.Answer.create({ answerText: 'karjalaisten kaupungissa', correct:true }),
            Trivia.Answer.create({ answerText: 'linnan suuren kaupungissa' }),
            Trivia.Answer.create({ answerText: 'suomalaisten kaupungissa' })
        ]
    }),
    Trivia.Question.create({
        gameId: 13,
        mediaId: 8,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 58570},
        answers: [
            Trivia.Answer.create({ answerText: 'vei vei vei' }),
            Trivia.Answer.create({ answerText: 'hur mår du' }),
            Trivia.Answer.create({ answerText: 'hem till mej', correct:true })
        ]
    }),
    Trivia.Question.create({
        gameId: 13,
        mediaId: 8,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 70210},
        answers: [
            Trivia.Answer.create({ answerText: 'ystävät kun kantoi puolet', correct:true }),
            Trivia.Answer.create({ answerText: 'usein kaatui baarin tuolit' }),
            Trivia.Answer.create({ answerText: 'oltiin rasavillit nuoret' })
        ]
    }),
    Trivia.Question.create({
        gameId: 13,
        mediaId: 8,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 78080},
        answers: [
            Trivia.Answer.create({ answerText: 'pöydässä niin hilpeässä', correct:true }),
            Trivia.Answer.create({ answerText: 'kapakassa nauravassa' }),
            Trivia.Answer.create({ answerText: 'illan tumman saapuessa' })
        ]
    }),
    Trivia.Question.create({
        gameId: 13,
        mediaId: 8,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 127290},
        answers: [
            Trivia.Answer.create({ answerText: 'viipurlaise rakkaus assuupi vain', correct:true }),
            Trivia.Answer.create({ answerText: 'viipurissa iloista elämä on' }),
            Trivia.Answer.create({ answerText: 'rakkaudest viipuriin iloiseen' })
        ]
    }),
    Trivia.Question.create({
        gameId: 13,
        mediaId: 8,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 142990},
        answers: [
            Trivia.Answer.create({ answerText: 'Linnan muuril me kun illan suussa kohdattiin' }),
            Trivia.Answer.create({ answerText: 'Monrepoos myö kuuta ko niin kahen katseltiin', correct:true }),
            Trivia.Answer.create({ answerText: 'Torkkelissa kauniin kuusen alla suudeltiin' })
        ]
    }),
    Trivia.Question.create({
        gameId: 14,
        mediaId: 9,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 21330},
        answers: [
            Trivia.Answer.create({ answerText: 'muistaa en voi', correct:true }),
            Trivia.Answer.create({ answerText: 'muistoista kai' }),
            Trivia.Answer.create({ answerText: 'minkä minä koin' })
        ]
    }),
    Trivia.Question.create({
        gameId: 14,
        mediaId: 9,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 41950},
        answers: [
            Trivia.Answer.create({ answerText: 'maailman tuulet ne vei' }),
            Trivia.Answer.create({ answerText: 'kohtalo kauas kun vei', correct:true }),
            Trivia.Answer.create({ answerText: 'tunnen sen sydämmessäin' })
        ]
    }),
    Trivia.Question.create({
        gameId: 14,
        mediaId: 9,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 58720},
        answers: [
            Trivia.Answer.create({ answerText: 'nuoruuspäivät', correct:true }),
            Trivia.Answer.create({ answerText: 'muistot kauniit' }),
            Trivia.Answer.create({ answerText: 'hauska päivät' })
        ]
    }),
    Trivia.Question.create({
        gameId: 14,
        mediaId: 9,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 89810},
        answers: [
            Trivia.Answer.create({ answerText: 'tiedän sen itsekin, yksin kun oon' }),
            Trivia.Answer.create({ answerText: 'tässä mä istuskelen yksinään' }),
            Trivia.Answer.create({ answerText: 'muutoin en mä tässä istuisikaan', correct:true })
        ]
    }),
    Trivia.Question.create({
        gameId: 14,
        mediaId: 9,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 149790},
        answers: [
            Trivia.Answer.create({ answerText: 'aivan kuin mainingit sois', correct:true }),
            Trivia.Answer.create({ answerText: 'kun aallokon kuohunta soi' }),
            Trivia.Answer.create({ answerText: 'äänet nuo meren ne on' })
        ]
    }),
    Trivia.Question.create({
        gameId: 14,
        mediaId: 9,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 167960},
        answers: [
            Trivia.Answer.create({ answerText: 'iloni suruni mun' }),
            Trivia.Answer.create({ answerText: 'särkyneet toiveeni mun', correct:true }),
            Trivia.Answer.create({ answerText: 'suurimman kaipaukseni' })
        ]
    }),Trivia.Question.create({
        gameId: 15,
        mediaId: 10,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 32700},
        answers: [
            Trivia.Answer.create({ answerText: 'tunne maan tuon kutsuvan...' }),
            Trivia.Answer.create({ answerText: 'sinne toivon pääseväin...' }),
            Trivia.Answer.create({ answerText: 'siellä huolet huomisen', correct:true })
        ]
    }),
    Trivia.Question.create({
        gameId: 15,
        mediaId: 10,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 45930},
        answers: [
            Trivia.Answer.create({ answerText: 'käydä vois', correct:true }),
            Trivia.Answer.create({ answerText: 'mennä pois' }),
            Trivia.Answer.create({ answerText: 'lentää vois' })
        ]
    }),
    Trivia.Question.create({
        gameId: 15,
        mediaId: 10,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        v: {playTo: 60670},
        answers: [
            Trivia.Answer.create({ answerText: 'vanki olen maan', correct:true }),
            Trivia.Answer.create({ answerText: 'sinne kaipaan vaan' }),
            Trivia.Answer.create({ answerText: 'kotiin jäädä saan' })
        ]
    }),
    Trivia.Question.create({
        gameId: 15,
        mediaId: 10,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 68520},
        answers: [
            Trivia.Answer.create({ answerText: 'siintää satumaa' }),
            Trivia.Answer.create({ answerText: 'sinne käydä saan', correct:true }),
            Trivia.Answer.create({ answerText: 'siellä lentää saan' })
        ]
    }),
    Trivia.Question.create({
        gameId: 15,
        mediaId: 10,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 111920},
        answers: [
            Trivia.Answer.create({ answerText: 'sinne missä mua oma armain...', correct:true }),
            Trivia.Answer.create({ answerText: 'siellä rakkain kultani mun...' }),
            Trivia.Answer.create({ answerText: 'aurinko kun kultaa hetken...' })
        ]
    }),
    Trivia.Question.create({
        gameId: 15,
        mediaId: 10,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 123850},
        answers: [
            Trivia.Answer.create({ answerText: 'linnun liitävän', correct:true }),
            Trivia.Answer.create({ answerText: 'tuulen vinkuvan' }),
            Trivia.Answer.create({ answerText: 'kotkan kiitävän'})
        ]
    }),
    Trivia.Question.create({
        gameId: 15,
        mediaId: 10,
        questionText: 'Kuuntele ote kappaleesta ja arvaa miten sanat jatkuvat',
        options: {playTo: 151460},
        answers: [
            Trivia.Answer.create({ answerText: 'vaan satumaahan kaipaan aina' }),
            Trivia.Answer.create({ answerText: 'vaan siivetönnä en voi lentää', correct:true }),
            Trivia.Answer.create({ answerText: 'halki aavan meren lennän' })
        ]
    }),
    Trivia.Question.create({
        gameId: 16,
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
        gameId: 16,
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
        gameId: 16,
        questionText: 'Mikä on vastakohta: ISO',
        answers: [
            Trivia.Answer.create({ answerText: 'kookas' }),
            Trivia.Answer.create({ answerText: 'painava' }),
            Trivia.Answer.create({ answerText: 'pieni', correct: true }),
            Trivia.Answer.create({ answerText: 'mahtava' })
        ]
    }),
    Trivia.Question.create({
        gameId: 16,
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
        gameId: 16,
        questionText: 'Mikä on vastakohta: KALLIS',
        answers: [
            Trivia.Answer.create({ answerText: 'arvokas' }),
            Trivia.Answer.create({ answerText: 'iso' }),
            Trivia.Answer.create({ answerText: 'pieni' }),
            Trivia.Answer.create({ answerText: 'halpa', correct: true })
        ]
    }),
    Trivia.Question.create({
        gameId: 16,
        questionText: 'Mikä on vastakohta: NOPEA',
        answers: [
            Trivia.Answer.create({ answerText: 'iloinen' }),
            Trivia.Answer.create({ answerText: 'hidas', correct: true }),
            Trivia.Answer.create({ answerText: 'hätäinen' }),
            Trivia.Answer.create({ answerText: 'vauhdikas' })
        ]
    }),
    Trivia.Question.create({
        gameId: 16,
        questionText: 'Mikä on vastakohta: HILPEÄ',
        answers: [
            Trivia.Answer.create({ answerText: 'hauska' }),
            Trivia.Answer.create({ answerText: 'iloinen' }),
            Trivia.Answer.create({ answerText: 'mukava' }),
            Trivia.Answer.create({ answerText: 'synkkä', correct: true })
        ]
    })
];

Trivia.medias = [
        Trivia.Media.create({
            guid: 1,
            mediaType: 'mp3',
			url: 'http://pienipiiri.s3.amazonaws.com/trivia/assets/Kulkurinvalssi.mp3'
        }),
        Trivia.Media.create({
            guid: 2,
            mediaType: 'mp3',
			url: 'http://pienipiiri.s3.amazonaws.com/trivia/assets/Lapsuudentoverille.mp3'
        }),
        Trivia.Media.create({
            guid: 3,
            mediaType: 'mp3',
			url: 'http://pienipiiri.s3.amazonaws.com/trivia/assets/Valiaikainen.mp3'
        }),
        Trivia.Media.create({
            guid: 4,
            mediaType: 'mp3',
			url: 'http://pienipiiri.s3.amazonaws.com/trivia/assets/Tulipunaruusut.mp3'
        }),
        Trivia.Media.create({
            guid: 5,
			mediaType: 'mp3',
			url: 'http://pienipiiri.s3.amazonaws.com/trivia/assets/Suutarinemannankehtolaulu.mp3'
        }),
        Trivia.Media.create({
            guid: 6,
            mediaType: 'mp3',
			url: 'http://pienipiiri.s3.amazonaws.com/trivia/assets/Voituotamuistia.mp3'
        }),
        Trivia.Media.create({
            guid: 7,
            mediaType: 'mp3',
			url: 'http://pienipiiri.s3.amazonaws.com/trivia/assets/Puhelinlangatlaulaa.mp3'
        }),
        Trivia.Media.create({
            guid: 8,
            mediaType: 'mp3',
			url: 'http://pienipiiri.s3.amazonaws.com/trivia/assets/Sellanenolviipuri.mp3'
        }),
        Trivia.Media.create({
            guid: 9,
            mediaType: 'mp3',
			url: 'http://pienipiiri.s3.amazonaws.com/trivia/assets/Kotkanpoikiiilmansiipii.mp3'
        }),
        Trivia.Media.create({
            guid: 10,
            mediaType: 'mp3',
			url: 'http://pienipiiri.s3.amazonaws.com/trivia/assets/Satumaa.mp3'
        })
    ];

soundManager.defaultOptions = {
	autoLoad: true,
	preferFlash: false,
	autoPlay: false,
	stream: false,
	onstop: function(){
		Trivia.gameController.onMediaStop()
	}
}
soundManager.setupOptions = {
	preferFlash: false,
}
soundManager.onready(function() {
	soundManager.createSound({
		url: 'assets/sound/tada.mp3',
		id: 'tada'
	})
	soundManager.createSound({
		url: 'assets/sound/sadtrombone.mp3',
		id: 'sadtrombone'
	})
	soundManager.createSound({
		url: 'assets/sound/winner.wav',
		id: 'winner'
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

Trivia.ProgressbarView = Em.View.extend({
	templateName: 'progressbarView',
	classNames: 'progressbar-view'.w(),
	valueDidChange: function(){
		console.log('progress bar value changed', this.get('value'))
		$(this.get('element')).find('.progress .bar').css({width: this.get('value') * 100 + '%'});
	}.observes('value'),
	didInsertElement: function(){
		//TODO: no idea why the content doesn't get updated automatically but this works as a temp fix
		this.markerPositionsDidChange();
	},
	markerPositionsDidChange: function(){

		var markers = this.get('markerPositions');
		if (!markers){
			return;
		}


		var wrapper = $(this.get('element')).find('.markers').html('');

		markers.forEach(function(marker){
			console.log(marker)
			var markerElement = $('<div class="marker"></div>').css({
				left: marker * 100 + '%'
			})
			wrapper.append(markerElement);
		});

		/*
		for (var i = 0; i < markers.length; i++) {

		}
		*/
	}.observes('markerPositions'),
	activeDidChange: function(){
	}.observes('active')
})

Trivia.gameController = Em.Object.create({
	init: function(){
		console.log('gamecontroller started');
	},
		populateQuestions: function() {
			return;
        if (this.get('game')) {
            var questions = Trivia.questions.filterProperty('gameId', this.get('game').get('guid'));


            this.set('questions', questions);
            this.set('currentQuestion', this.get('questions').objectAt(this.get('questionIndex')));

            this.set('image', this.get('game').get('image'));
            this.set('caption', this.get('game').get('caption'));


            if (this.get('currentQuestion').get('mediaId')) {

                var media = Trivia.medias.findProperty('guid', this.get('currentQuestion').get('mediaId'));
                this.set('media', media);
                this.set('showMediaView', true);
                //this.get('media').get('media').play();

				console.log('duration', media.get('media').duration);

			var markerPositions = questions.map(
				function(question){
					return question.options.playTo / media.get('media').duration
			})
				this.set('markerPositions', markerPositions);

				this.playMedia();


            } else {
                this.set('showAnswers', true);
                this.set('showMediaView', false);
            }
        }
    }.observes('game'),
	gameName: function(value){
		var value = this.get('game.name');
		if (value){
			return value;
		}
	}.property('game.name'),
    showGameSelector: true,
    continueMediaFrom: 0,
    media: null,
    playLabel: 'Soita',
    gameBinding: 'Trivia.router.gameController.content',
	questionIndex: 0,
    questions: null,
	currentQuestion: null,
    showAnswers: false,
	mediaPlaying: false,
    showMediaView: false,
    gameCompleted: false,
	score: 0,

	setVisible: function(viewName){
		this.set('countdownViewVisible', false);
		this.set('instructionViewVisible', false);
		this.set('messageViewVisible', false);
		this.set('gameEndViewVisible', false);
		this.set('correctAnswerViewVisible', false);
		this.set('wrongAnswerViewVisible', false);
		this.set(viewName, true);
	},
	countdownViewVisible: false,
	instructionViewVisible: false,
	messageViewVisible: false,
	gameEndViewVisible: false,
	correctAnswerViewVisible: false,
	wrongAnswerViewVisible: false,

	answerReward: 10,
    image:null,
    caption:null,
	next: function(){
		this.nextQuestion();
		this.playMedia();
	},
	nextQuestion: function(){
		if (this.get('questionIndex') <= this.get('questions').length){
			this.set('questionIndex', parseInt(this.get('questionIndex')) + 1);

            if (this.get('questionIndex') == this.get('questions').length) {
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
		console.log('playing media')
		this.setVisible('countdownViewVisible');

        if (this.get('media')) {
            if (this.get('media').get('mediaType') == 'mp3') {
                if (this.get('media').get('media').playState == 0) {
                    //this.set('playLabel', 'Odota taukoa...');
                    this.get('media').get('media').play({position: this.get('continueMediaFrom')});
                }
            }
        }
    },
    whileMediaPlaying: function() {
		var position = Trivia.gameController.get('media').get('media').position / Trivia.gameController.get('media').get('media').duration;
		Trivia.gameController.set('position', position);
		Trivia.gameController.set('mediaPlaying', true);
        //console.log(Trivia.gameController.get('media').get('media').position, Trivia.gameController.get('media').get('media').duration);
        if (Trivia.gameController.get('media').get('media').position >= Trivia.gameController.get('currentQuestion').get('options').playTo) {
            Trivia.gameController.set('playLabel', 'Jatka');
            Trivia.gameController.get('media').get('media').stop();
            Trivia.gameController.set('continueMediaFrom', Trivia.gameController.get('media').get('media').position);
            Trivia.gameController.set('showAnswers', true);
        }
    },
    onMediaStop: function() {
		console.log('media stopped');
		this.setVisible('instructionViewVisible')
		//Trivia.gameController.set('mediaPlaying', false);




        //this.set('playLabel', 'Soita');
    },
	checkAnswer: function(answer){
		console.log('answered', answer);
		var self = this;

		/*
		setTimeout(function(){
			self.nextQuestion();

		}, 500);
		*/

		console.log(answer);
		$('.collection-wrapper ul li');
		//answer.set('classNames', 'selected'.w())



		if (answer.get('correct')){

			console.log('correct!');



			this.setVisible('correctAnswerViewVisible');

			//this.nextQuestion();

			this.set('score', this.get('score') + this.get('answerReward'));
			return true;

		} else {
			console.log('false');
			this.setVisible('wrongAnswerViewVisible');
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

var resizeText = function(){
	var win = $(window);
		var width = win.innerWidth();
		var height = win.innerHeight();
		var fontSize;

		if (width < height) {
			fontSize = width*0.02;
		} else {
			fontSize = height * 0.02;
		}
		fontSize = width*0.02;
		$('body').css('fontSize', fontSize);
		$('html').css('fontSize', fontSize);

}

var setLineHeights = function(){
	console.log('setting heights');
	$('.lh').each(function(key, item){
		var element = $(item);
		element.css('line-height', element.height() + 'px');
	})
}


$(document).ready(function(){
	setTimeout(function(){
		Trivia.initialize();
	},500);

});
soundManager.onready = function(){
	console.log('soundManager ready')
}

//Trivia.initialize();

$(document).ready(resizeText);
$(window).resize(resizeText);

/*
$(document).ready(setLineHeights);
$(window).resize(setLineHeights);
*/


/*
onresize=onload=function(){


	document.body.style.fontSize=window.innerWidth*0.02+"px";
	//document.body.style.lineHeight=window.innerWidth*0.02+"px"
}
*/