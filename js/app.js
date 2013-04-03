var Trivia = Em.Application.create({
	INTERVAL_BUFFER_SIZE_MS: 2000,
    exitUrl: null,
    ready: function() {
        var userId = getURLParameter('userId');
        if (userId && userId != 'null') {
            Trivia.set('router.applicationController.userId', parseInt(userId));
        }
        var source = getURLParameter('source');
        if (source == 'ios') {
            this.set('exitUrl', 'http://pienipiiri.fi/webapp/?userId=' + userId);
        } else if (source == 'null' || !source) {
            this.set('exitUrl', 'http://pienipiiri.fi/mobile/?userId=' + userId);
        }
    },
	ApplicationController: Em.Controller.extend({
        backendHost: 'http://pienipiiri.fi/',
		userId: null
	}),
	ApplicationView: Em.View.extend({
		templateName: 'application'
	}),
	GamesView: Em.View.extend({
		templateName:'games',
		classNames: 'select-game-view'.w(),
		selectGameCollectionView: Em.CollectionView.extend({
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
			})
		})

	}),
	GamesController: Em.Controller.extend({

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
		classNames: 'game-view',
		templateName: 'game'
	}),
	GameNotStartedView: Em.View.extend({
		templateName: 'game-not-started',
		classNames: 'game-not-started-view game-not-started'.w()
	}),

	GameNotStartedPlainView: Em.View.extend({
		templateName: 'game-not-started-plain',
		classNames: 'game-not-started-plain-view game-not-started'.w()
	}),
	GameNotStartedPlainController: Em.View.extend({}),
	GameStartedView: Em.View.extend({
		classNames: 'game-started-view'.w(),
		templateName: 'game-started'
	}),
	GameFinishedView: Em.View.extend({
		templateName: 'game-finished',
		classNames: 'game-finished game-finished-view'.w(),
		feedbackText: function(){
			var successRate = this.get('successRate');
			if (successRate <= 50){
				return 'Harjoitellaan vielä!';
			} else if (successRate <= 70){
				return 'Mainiosti tiedetty!';
			} else if (successRate <= 90){
				return 'Erinomaista työtä!';
			} else {
				return 'Mahtavaa muistamista!';
			}
		}.property('successRate'),
		successRateBinding: 'Trivia.router.gameController.successRate',
		correctAnswersBinding: 'Trivia.router.gameController.correctAnswers',
		proceedView: Em.View.extend({
			tagName: 'button',
			classNames: 'btn btn-primary'.w(),
			template: Handlebars.compile('Joo'),

		})
	}),
	GameFinishedController: Em.Controller.extend({}),

	GameFinishedPlainView: Em.View.extend({
		templateName: 'game-finished-plain',
		classNames: 'game-finished game-finished-plain-view'.w(),
		feedbackText: function(){
			var successRate = this.get('successRate');
            if (successRate <= 50){
                return 'Harjoitellaan vielä!';
            } else if (successRate <= 70){
                return 'Mainiosti tiedetty!';
            } else if (successRate <= 90){
                return 'Erinomaista työtä!';
            } else {
                return 'Mahtavaa muistamista!';
            }
		}.property('successRate'),
		successRateBinding: 'Trivia.router.gameController.successRate',
		correctAnswersBinding: 'Trivia.router.gameController.correctAnswers'
	}),
	GameFinishedPlainController: Em.Controller.extend({}),
	MediaQuestionView: Em.View.extend({
		classNames: 'question-view media-question-view'.w(),
		templateName: 'media-question'
	}),
	PlainQuestionView: Em.View.extend({
		classNames: 'question-view plain-question-view'.w(),
		templateName: 'plain-question'
	}),
	PlainQuestionLabelView: Em.View.extend({
		classNames: 'plain-question-label-view'.w(),
		templateName: 'plain-question-label'
	}),
	PlainQuestionLabelController: Em.Controller.extend({
		questionNumber: function(){
			return (Trivia.get('router.gameController.questionIndex') + 1);
		}.property('questionIndex'),
		questionIndexBinding: 'Trivia.router.gameController.questionIndex',
		questionAmountBinding: 'Trivia.router.gameController.questions.length'

	}),
	PlainQuestionController: Em.Controller.extend({}),
	MediaQuestionController: Em.Controller.extend({}),

	MediaDisplayView: Em.View.extend({
		classNames:'media-display-view'.w(),
		contentBinding: 'Trivia.router.gameController.questionImage',
		contentDidChange:function () {
			if (this.get('content')) {
				console.log('content changed', this.get('content'));
				console.log('background changed', this.get('element'));
				$(this.get('element')).css({
					'background-image':'url(' + this.get('content') + ')'
				})
			}
		}.observes('content'),

		didInsertElement:function () {
			console.warn('element added');
			//TODO: no idea why the content doesn't get updated automatically but this works as a temp fix
			this.contentDidChange();
		}
	}),
	MediaDisplayController: Em.Controller.extend({}),
	MediaControlsView: Em.View.extend({
		templateName: 'media-controls',
		classNames: 'media-controls-view'.w()
	}),
	MediaControlsController: Em.Controller.extend({}),
	AnswersView: Em.View.extend({
		classNames: 'answers-view'.w(),
		templateName: 'answers'
	}),
	MoodmeterView: Em.View.extend({
		templateName: 'moodmeter',
		classNames: 'moodmeter-view'.w()
	}),
	MoodmeterController: Em.Controller.extend({
		value: null
	}),
	AnswersController: Em.Controller.extend({}),
	MediaIndicatorStoppedView: Em.View.extend({
		classNames: 'badge'.w(),
		template: Handlebars.compile('Pysäytetty')
	}),
	MediaIndicatorPlayingView: Em.View.extend({
		classNames: 'badge badge-success'.w(),
		template: Handlebars.compile('Soi')
	}),

	ChoicesView: Em.View.extend({
		classNames: 'choices-view'.w(),
		//contentBinding: 'Trivia.router.gameController.currentQuestion.answers',
		collectionView: Em.CollectionView.extend({
			classNames: 'choices-collection'.w(),
			tagName: 'div',
			itemViewClass: Ember.View.extend({
				classNames: 'btn btn-block'.w(),
				click: function(){

					//piggyback the dom element with the answer so we can hilight and hide the right elements when checking for answer
					var answer = this.get('content');
					answer.reopen({
						element: this.get('element')
					})
					Trivia.router.send('checkAnswer', answer);
				}
			})
		}),
		templateName: 'choices'
	}),
	ChoicesController: Em.Controller.extend({}),

	EmptyView: Em.View.extend({}),
	AlertQuestionView: Em.View.extend({
		templateName: 'alert-question',
		classNames: 'alert alert-warn'.w()
	}),
	AlertQuestionController: Em.Controller.extend({}),

	AlertPlainQuestionView: Em.View.extend({
		templateName: 'alert-plain-question',
		classNames: 'alert alert-warn'.w()
	}),
	AlertPlainQuestionController: Em.View.extend({}),

	AlertCorrectAnswerView: Em.View.extend({
		templateName: 'alert-correct',
		classNames: 'alert alert-success'.w()
	}),
	AlertWrongAnswerView: Em.View.extend({
		templateName: 'alert-wrong',
		classNames: 'alert alert-danger'.w()
	}),
	AlertCountdownView: Em.View.extend({
		templateName: 'alert-countdown',
		content: 'Valmistaudu vastaamaan!',
		classNames: 'alert alert-countdown alert-warning'.w()
	}),
	ProceedButtonView: Em.View.extend({
		classNames: 'btn btn-primary process-button-view'.w(),
		template: Handlebars.compile('Soita seuraava katkelma <i class=" icon-circle-arrow-right"></i>'),
		click: function(){
			Trivia.router.send('nextQuestion');
		}
	}),
	ProceedButtonPlainView: Em.View.extend({
		classNames: 'btn btn-primary process-button-view'.w(),
		template: Handlebars.compile('Seuraava kysymys <i class=" icon-circle-arrow-right"></i>'),
		click: function(){
			Trivia.router.send('nextQuestion');
		}
	}),

	GameStartedController: Em.Controller.extend({}),
	GameController: Em.Controller.extend({
        playedGameId: null,
		instantReplayPlayed: false,
		titleBinding: 'content.name', //Game title eg. Kulkurin valssi
		imageBinding: 'content.image', //Image url eg. assets/kulkurin_valssi.jpg
        gameTitleBinding: 'content.gameIntro',
        gameTypeTitle: 'Valitse pelattava peli',
		questionImage: function(){
			if (this.get('currentQuestion.image')){
				return this.get('currentQuestion.image');
			} else if ( this.get('image')){
				return this.get('image');
			} else {
				return false;
			}
		}.property('image', 'currentQuestion'),

		captionBinding: 'content.caption', //Copyright info. Not implemented
		gameTypeBinding: 'content.gameType',

		isSinglePlayerGame: null,

		mediaState: 'stopped', //can be either 'stopped' or 'playing'
		mediaPosition: 0, //Media position in % from the start. Updated on the fly by playInterval()
		mediaAbsolutePosition: 0,

		moodRatingBinding: 'Trivia.router.moodmeterController.value',

		gameFinished: false,

		secondsToStop: function(){

			var playTo = parseInt(Trivia.router.get('gameController.currentQuestion.options.playTo')) + Trivia.INTERVAL_BUFFER_SIZE_MS * (this.get('questionIndex'));

			var position = this.get('mediaAbsolutePosition') / 1000;

			if (playTo > 0){
				var pos = Math.floor((playTo / 1000) - position);
				if (pos < 0 ){
					return 0;
				}
				return pos;
			}

			return false;

		}.property('mediaAbsolutePosition'),

		successRate: function(){
			return Math.floor(parseInt(this.get('correctAnswers')) / Trivia.get('router.gameController.questions.length') * 100);
		}.property('correctAnswers'),

		gameInProgress: false,
		markerPositions: function(){
			var media = Trivia.medias.findProperty('guid', this.get('currentQuestion.mediaId'));
			if(Em.empty(media)){
				return false;
			}
			var i = 0;

			var positions = this.get('questions').map(
				function(question){
					console.info('mapping markers', i);

					//factor in the delay caused by the 1 second gaps in audio files
					var gapDelay = Trivia.INTERVAL_BUFFER_SIZE_MS * i;


					var marker = (question.options.playTo + gapDelay ) / media.get('res').duration;
					i++;
					return marker

			});

			return positions;
		}.property('questions').cacheable(),

		questionIndex: 0,

		media: null,
		fullMedia: null,

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

        saveGameStart: function() {
            console.log('saving game start to backend');
            if (this.get('content')) {
                var gameId = this.get('content.guid');
                var userId = Trivia.get('router.applicationController.userId');

                console.log('saving game start to backend with parameters gameId: ' + gameId + ' userId: ' + userId);
                if (gameId && userId) {
                    $.ajax({
                        url: '/saveEvent',
                        type: 'POST',
                        data: { type: 'startGame', gameId: gameId, userId: userId },
                        success: function(response) {
                            if (response && !isNaN(response)) {
                                Trivia.set('router.gameController.playedGameId', response);
                            }
                        }
                    });
                }
            }
        },

        saveGameEnd: function() {
            console.log('saving game end to backend');
            var rightAnswers = this.get('correctAnswers');
            var participants = 'unknown';
            console.log('is single player game' + this.get('isSinglePlayerGame'));
            if (this.get('isSinglePlayerGame') === true) {
                participants = 'alone';
            } else if (this.get('isSinglePlayerGame') === false) {
                participants = 'with friend';
            }
            var playedGameId = Trivia.get('router.gameController.playedGameId');
            //var playedGameId = Trivia.GameController.playedGameId;
            if (rightAnswers && participants && playedGameId) {
                console.log('saving game end to backend with parameters rightAnswers: ' + rightAnswers + ' participants: ' + participants + ' playedGameId: ' + playedGameId);
                $.ajax({
                    url:'/saveEvent',
                    type: 'POST',
                    data: { type: 'endGame', rightAnswerAmount: rightAnswers, participants: participants, playedGameId: playedGameId },
                    success: function(response) {

                    }
                });
            }
        },

        saveGameFeedback: function(mood) {
            console.log('saving game feedback to backend');
            var playedGameId = Trivia.get('router.gameController.playedGameId');
            if (playedGameId && mood) {
                var mood = mood;
                //console.log('saving game feedback with parameters playedGameId: ' + playedGameId + ' feedback: ' + mood);
                $.ajax({
                    url: '/saveEvent',
                    type: 'POST',
                    data: { type: 'gameFeedback', playedGameId: playedGameId, feedback: mood },
                    success: function(response) {

                    }
                });
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
						onload: function(status){
							//notify router of finished asset loading
							Trivia.router.send('assetLoadingComplete');
						},
						whileloading: function(){
							self.set('mediaLoadProgress', this.bytesLoaded / this.bytesTotal);
						}
					}),
					gaplessRes: soundManager.createSound({
						id: 'trivia-gapless-' + mediaId,
						url: function(){
							var url = media.get('url');
							var matches = url.match(/(.*)(\..*$)/);
							var filename = matches[1];
							var filetype = matches[2];

							console.warn('gaplessres', filename + '_gapless' + filetype);

							return filename + '_gapless' + filetype;
							//.match(/\.(.*$)/)
						}(),
						autoplay: false,
						onload: function(status){
							//notify router of finished asset loading
							//Trivia.router.send('assetLoadingComplete');
						},
						whileloading: function(){
							//self.set('mediaLoadProgress', this.bytesLoaded / this.bytesTotal);
						}
					})
					/*,
					bRes:
					 */
				})
			}

			this.set('media', media);

			console.log('media changed');
		}.observes('currentQuestion.mediaId'),

		/**
		 * plays the current song interval specified by Trivia.Question.media.
		 * @param fromEnd used to replay fromEnd amount of seconds from the end of the interval
		 */
		fullReplay: function(){
			if (this.get('media.gaplessRes')){
				Trivia.router.send('startedPlaying');
				this.get('media.gaplessRes').play({
					position: 0,
					whileplaying: function(){
						Trivia.router.set('gameController.mediaPosition', this.position / this.duration);
						Trivia.router.set('gameController.mediaAbsolutePosition', this.position);
						Trivia.router.set('gameController.mediaPlaying', true);
					},
					onfinish: function(){
						Trivia.router.set('gameController.mediaPlaying', false);
						Trivia.router.send('finishedPlaying');
					}
				})

			} else {
				throw 'no media found'
			}
		},
		playEnd: function(){
			//get the last item from questions
			var questionIndex = Trivia.router.get('gameController.questions.length');
			var startingPosition = Trivia.router.get('gameController.questions.lastObject.options.playTo') + (Trivia.INTERVAL_BUFFER_SIZE_MS * questionIndex);


			if (this.get('media.res')){

				this.get('media.res').play({
					from: startingPosition,
					whileplaying: function(){
						//console.log('playTo', playTo, this.position);
						Trivia.router.set('gameController.mediaPosition', this.position / this.duration);
						Trivia.router.set('gameController.mediaAbsolutePosition', this.position);
						Trivia.router.set('gameController.mediaPlaying', true);
					},
					onstop: function(){
						Trivia.router.set('gameController.mediaPlaying', false);
						Trivia.router.send('finishedPlaying');

						//console.log('stopped');
					}
				});
				Trivia.router.send('startedPlaying');
			}
		},
		stopPlaying: function(){
			if (this.get('media.res')){
				this.get('media.res').stop();
				Trivia.router.set('gameController.mediaPlaying', false);

			}
		},
		playInterval: function(fromEnd){
			var startingPosition = 0;

			if (this.get('questionIndex') > 0){
				//get previous question
				var previousQuestion = this.get('questions').objectAt(this.get('questionIndex') - 1);

				startingPosition =  previousQuestion.get('options.playTo') ? previousQuestion.get('options.playTo') : 0;

				//count in the silence delay

				startingPosition = startingPosition + this.get('questionIndex') * Trivia.INTERVAL_BUFFER_SIZE_MS;

				/*
				if (!startingPosition){
					throw 'no startin position!';
				}
				*/
			}

			console.info('playing interval', 'original', this.get('currentQuestion.options.playTo'), 'question index', this.get('questionIndex'), 'position', this.get('currentQuestion.options.playTo') + this.get('questionIndex') * Trivia.INTERVAL_BUFFER_SIZE_MS);

			var playTo = this.get('currentQuestion.options.playTo') + this.get('questionIndex') * Trivia.INTERVAL_BUFFER_SIZE_MS;

			if (fromEnd){
				startingPosition = playTo - fromEnd;

				if (startingPosition >= 0){
					//console.log('playback starts at', fromEnd, '-', playTo);
				} else {
					startingPosition = 0;
					//console.log('trying to seek past the sound file, starting from 0');
				}
			}

			//console.log('playing from', startingPosition, 'to', this.get('currentQuestion.options.playTo'));
			var self = this;
			if (this.get('media.res')){

				this.get('media.res').play({
					from: startingPosition,
					//to: playTo,
					whileplaying: function(){
						if (this.position > playTo + 200){
							this.stop();
							return;
						}

						var offset = parseInt(self.get('questionIndex')) * Trivia.INTERVAL_BUFFER_SIZE_MS;

						Trivia.router.set('gameController.mediaPosition', this.position / (this.duration));
						Trivia.router.set('gameController.mediaAbsolutePosition', this.position);
						Trivia.router.set('gameController.mediaPlaying', true);
					},
					onstop: function(){
						//alert('stopped2 ' + playTo + " " + this.position + " " + (this.position - playTo));

						Trivia.router.set('gameController.mediaPlaying', false);
						Trivia.router.send('finishedPlaying', playTo);

						//console.log('stopped');
					}
				});
				/*.onPosition(playTo - 50, function(){
					this.stop();
					this.clearOnPosition(playTo - 50);
					console.log('finished playing', playTo, this.position, this.position - playTo);
					Trivia.router.send('finishedPlaying', playTo);
				});
				*/

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
		}.property('questionIndex', 'questions')
	}),

	Router: Ember.Router.extend({
		enableLogging: false,
		location: 'hash',
		root: Ember.Route.extend({
			index: Ember.Route.extend({
				route: '/',
				redirectsTo: 'games.index'
			}),
			games: Ember.Route.extend({
				route: '/games/:gameType',
				serialize: function(router, context){
					return {
						gameType: router.get('gamesController.gameType')
				  	}
				},
				deserialize: function(router, params){
					console.log('deserializing', params);

					var gameType= params.gameType;

					if (gameType === 'music'){
						router.set('gamesController.gameType', 'music');
                        router.get('gameController').set('gameTypeTitle', 'Valitse soitettava kappale');
					} else {
						router.set('gamesController.gameType', 'plain');
                        router.get('gameController').set('gameTypeTitle', 'Valitse pelattava muistipeli');
					}
				},
				connectOutlets: function(router){
					if (router.get('gamesController.gameType') === 'music'){
						Trivia.set('games', Trivia.gameObjects.music);
					} else {
						Trivia.set('games', Trivia.gameObjects.plain);
					}
				},

				index: Em.Route.extend({
					route: '/',
					connectOutlets: function(router){
						router.get('applicationController').connectOutlet('games');

						//make sure zombie songs stop playing
						soundManager.stopAll();
					},
					back: function(){
                        var userId = Trivia.get('router.applicationController.userId');
                        var exitUrl = Trivia.get('exitUrl');
                        if (userId && exitUrl) {
                            window.location = exitUrl;
                        } else {
						    window.location = "http://pienipiiri.fi/mobile";
                        }
					},
                    finishedPlaying: function() {

                    }
				}),
				game: Em.Route.extend({
					route: '/:game_id',
					initialState: 'notLoaded',
					serialize: function(router, game){
						return {game_id: game.guid};
					},
					deserialize: function(router, params){
						return Trivia.games.findProperty('guid', parseInt(params.game_id));
					},
					connectOutlets: function(router, game){
						console.warn('connecting game outlets', game, game.get('name'));


						router.get('applicationController').connectOutlet('game', game);

						//hook up the questions
						var gameId = parseInt(router.get('gameController.content.guid'));
						var questions = Trivia.questions.filterProperty('gameId', gameId);

						router.set('gameController.questionIndex', 0);
						router.set('gameController.correctAnswers', 0);
						router.set('gameController.moodRating', null);
						router.set('gameController.isSinglePlayerGame', null);

						//randomize the questions if we're not on an audio game
						if (game.get('gameType') !== 'audio'){
							questions = questions.sort(function() {return 0.5 - Math.random()});
						}

						router.set('gameController.questions', questions);
					},
					exit: function(router){
						console.warn('exiting game');
					},
					back: function(router){
						router.transitionTo('root.games.index');
					},
					notLoaded: Em.Route.extend({
						connectOutlets: function(router){
							router.get('gameController').connectOutlet('gameLoading');

							if (!router.get('gameController.media')){
								//proceed further if no media
								router.send('loadingComplete');
							} else if (router.get('gameController.media.res.loaded')){
								router.send('loadingComplete');
							}
						},
						loadingComplete: function(router){
							console.log('loading complete', router.get('gameController.mediaLoadProgress'));
							//router.set('gameController.mediaLoadProgress', 1);
							router.transitionTo('loaded');

						},
						assetLoadingComplete: function(router){
							this.loadingComplete(router);
						},
						back: function(router){
							router.transitionTo('games.index');
						}
					}),
					loaded: Em.Route.extend({

						initialState: 'notStarted',

						notStarted: Em.Route.extend({
							connectOutlets: function(router){
								if (router.get('gameController.content.gameType') === 'audio'){
									console.warn('audio notStarted', router.get('gameController.title'));
									router.get('gameController').connectOutlet('gameNotStarted');
								} else {
									console.warn('plain notStarted');
									router.get('gameController').connectOutlet('gameNotStartedPlain');
								}
							},
							_startGame: function(router){
								router.transitionTo('started');
							},
							startGame1P: function(router){
								router.set('gameController.isSinglePlayerGame', true);

								router.send('_startGame');

								console.log('started 1 player game');

							},
							startGame2P: function(router){
								router.set('gameController.isSinglePlayerGame', false);
								router.send('_startGame');
								console.log('started 2 player game');
							}
						}),
						started: Em.Route.extend({
							_nextQuestion: function(router){
								router.set('gameController.instantReplayPlayed', false);
								console.log('setting next question');


								//TODO: check if we have a question with media or not
								var media = router.get('gameController.media');
								if (media) {
									if (media.mediaType === 'mp3'){
										router.transitionTo('mediaQuestion');
										router.send('playInterval');
									} else {
										throw "unknow media type " + media.mediaType
									}
								} else {
									router.transitionTo('plainQuestion');
								}

							},
							connectOutlets: function(router, context){
                                router.get('gameController').saveGameStart();
								router.get('gameController').connectOutlet('gameStarted');
								router.send('_nextQuestion');

							},
							mediaQuestion: Em.Route.extend({

								connectOutlets: function(router){
									router.get('gameStartedController').connectOutlet('left', 'mediaQuestion');
									router.get('gameStartedController').connectOutlet('right', 'answers');

									router.get('mediaQuestionController').connectOutlet('controls', 'mediaControls');
									router.get('mediaQuestionController').connectOutlet('media', 'mediaDisplay');
								},

								initialState: 'mediaNotStarted',

								mediaNotStarted: Em.Route.extend({


									initialState: 'answerNotChecked',

									connectOutlets: function(router){
										router.get('mediaControlsController').connectOutlet('mediaIndicator', 'mediaIndicatorStopped');
									},
									back: function(router){
										console.log('back!');
										if (confirm('Haluatko varmasti palata takaisin? Peli lopetaan.')){
											router.transitionTo('root.index');
										}
									},
									answerNotChecked: Em.Route.extend({

										connectOutlets: function(router){
											router.get('answersController').connectOutlet('alert', 'empty');
											router.get('answersController').connectOutlet('action', 'empty');
											router.get('answersController').connectOutlet('choices', 'empty');
										},
										showChoices: function(router){
											var question = router.get('gameController.currentQuestion');
											router.get('answersController').connectOutlet('alert', 'alertQuestion', question);
											router.get('answersController').connectOutlet('choices', 'choices', question.get('answers'));
										},
										checkAnswer: function(router, answer){
											$('.choices-collection div.btn').each(function(key, item){
												if (item === answer.element){
													console.log('element found', item);
													if (answer.get('correct')){
														$(item).addClass('btn-success');
													} else {
														$(item).addClass('btn-danger');
													}

												} else {
													$(item).addClass('fade');
												}
												//if (item.id != answer.get('element.id'))
											});

											if (answer.get('correct')){
												console.log('checking answer, correct', answer);

												//add points
												var points = router.get('gameController.correctAnswers');
												router.set('gameController.correctAnswers', parseInt(points) + 1);

                                                router.transitionTo('answerChecked.answeredRight');

											} else {
												console.log('checking answer, wrong');

                                                router.transitionTo('answerChecked.answeredWrong');
											}

										},

										instantReplay: function(router){
											router.get('gameController').playInterval(10000);
											router.set('gameController.instantReplayPlayed', true);
											router.transitionTo('mediaStarted');


										},
										playInterval: function(router){
											//console.log('playing interval');
											router.get('gameController').playInterval();
											router.transitionTo('mediaStarted');
										}
									}),
									answerChecked: Em.Route.extend({

										connectOutlets: function(router, foo, bar){
											console.log('answerChecked', foo, bar, this);
											router.get('answersController').connectOutlet('action', 'proceedButton');
											//router.get('answersController').connectOutlet('choices', 'empty');

										},

										start: Em.Route.extend({

										}),
										answeredWrong: Em.Route.extend({
											connectOutlets: function(router){
												router.get('answersController').connectOutlet('alert', 'alertWrongAnswer');
											}
										}),
										answeredRight: Em.Route.extend({
											connectOutlets: function(router){
												router.get('answersController').connectOutlet('alert', 'alertCorrectAnswer');
											}
										}),
										nextQuestion: function(router){
                                            soundManager.stopAll();
											console.log('setting next question');
											var questionIndex = router.get('gameController.questionIndex');

											var gameController = router.get('gameController');

											if (parseInt(gameController.get('questionIndex')) + 1  <  gameController.get('questions.length')){
												console.log('next question');
												gameController.set('questionIndex', gameController.get('questionIndex') + 1);
												router.send('_nextQuestion');
											} else {
												//gameController.set('questionIndex', gameController.get('questionIndex') + 1);

												router.transitionTo('finished');
												router.send('playEnd');
												console.log('out of questions');
											}
										}
									})
								}),
								mediaStarted: Em.Route.extend({

									initialState: 'mediaPlaying',

									connectOutlets: function(router){
									},
									mediaPlaying: Em.Route.extend({
										connectOutlets: function(router){
											router.get('mediaControlsController').connectOutlet('mediaIndicator', 'mediaIndicatorPlaying');
											router.get('answersController').connectOutlet('alert', 'alertCountdown');
										},
										back: function(router){
											router.get('gameController.media.res').pause();
											router.transitionTo('mediaPaused');
											if (confirm('Haluatko varmasti palata takaisin? Peli lopetaan.')){
												router.transitionTo('root.index');
											} else {
												router.send('resume');
											}
										},
										pause: function(router){
											router.get('gameController.media.res').pause();
											router.transitionTo('mediaPaused');
											router.send('resumeWithAlert');

										},

										finishedPlaying: function(router){
											router.transitionTo('mediaNotStarted');
											router.send('showChoices');
										}
									}),
									mediaPaused: Em.Route.extend({
										connectOutlets: function(router){
											router.get('mediaControlsController').connectOutlet('mediaIndicator', 'mediaIndicatorStopped');
										},
										resumeWithAlert: function(router){
											alert('Paina jatkaaksesi');
											router.get('gameController.media.res').play();
											router.transitionTo('mediaPlaying');
										},
										resume: function(router){
											router.get('gameController.media.res').play();
											router.transitionTo('mediaPlaying');
										}
									})
								})
							}),
							plainQuestion: Em.Route.extend({

								initialState: 'answerNotChecked',
								connectOutlets: function(router){



									router.get('gameStartedController').connectOutlet('left', 'plainQuestion');
									router.get('gameStartedController').connectOutlet('right', 'answers');


									router.get('plainQuestionController').connectOutlet('media', 'mediaDisplay');

								},

								answerNotChecked: Em.Route.extend({
									connectOutlets: function(router){

										var question = router.get('gameController.currentQuestion');

										router.get('plainQuestionController').connectOutlet('question', 'plainQuestionLabel', router.get('gameController.currentQuestion'));

										router.get('answersController').connectOutlet('alert', 'empty');

										router.get('answersController').connectOutlet('choices', 'choices', question.get('answers'));

										//router.get('answersController').connectOutlet('alert', 'empty');
										router.get('answersController').connectOutlet('action', 'empty');
										//router.get('answersController').connectOutlet('choices', 'empty');
									},

									checkAnswer: function(router, answer){
										$('.choices-collection div.btn').each(function(key, item){
											if (item === answer.element){
												console.log('element found', item);
												if (answer.get('correct')){
													$(item).addClass('btn-success');
												} else {
													$(item).addClass('btn-danger');
												}

											} else {
												$(item).addClass('fade');
											}
											//if (item.id != answer.get('element.id'))
										});

										if (answer.get('correct')){
											console.log('checking answer, correct', answer);

											var points = router.get('gameController.correctAnswers');
											router.set('gameController.correctAnswers', parseInt(points) + 1);

                                            router.transitionTo('answerChecked.answeredRight');

										} else {
											console.log('checking answer, wrong');

                                            router.transitionTo('answerChecked.answeredWrong');
										}
									}
								}),
								answerChecked: Em.Route.extend({
									connectOutlets: function(router){

										router.get('answersController').connectOutlet('action', 'proceedButtonPlain');

									},
									start: Em.Route.extend({

									}),
									answeredWrong: Em.Route.extend({
										connectOutlets: function(router){
											router.get('answersController').connectOutlet('alert', 'alertWrongAnswer');
										}
									}),
									answeredRight: Em.Route.extend({
										connectOutlets: function(router){
											router.get('answersController').connectOutlet('alert', 'alertCorrectAnswer');
										}
									}),
									nextQuestion: function(router){
										console.log('setting next question');
										var questionIndex = router.get('gameController.questionIndex');

										var gameController = router.get('gameController');

										if (parseInt(gameController.get('questionIndex')) + 1  <  gameController.get('questions.length')){
											console.log('next question');
											gameController.set('questionIndex', gameController.get('questionIndex') + 1);
											router.send('_nextQuestion');
										} else {
											router.transitionTo('finished');
											console.log('out of questions');
										}
									}
								})
							})
						}),
						finished: Em.Route.extend({
							connectOutlets: function(router, context){

								if (router.get('gameController.content.gameType') === 'audio'){
									router.get('gameStartedController').connectOutlet('right', 'gameFinished');
									router.get('gameFinishedController').connectOutlet('moodmeter', 'moodmeter');

								} else {
									console.log('game finished plain');
									router.get('gameStartedController').connectOutlet('right', 'gameFinishedPlain');
									router.get('gameFinishedPlainController').connectOutlet('moodmeter', 'moodmeter');
								}

								if (router.get('gameController.content.gameType') === 'audio'){
									router.transitionTo('mediaStopped');
								} else {
									router.transitionTo('noMedia');
								}

                                router.get('gameController').saveGameEnd();

							},

							noMedia: Em.Route.extend({

							}),

							mediaStopped: Em.Route.extend({
								connectOutlets: function(router){
									router.get('mediaControlsController').connectOutlet('mediaIndicator', 'mediaIndicatorStopped');
									//router.send('playEnd');
								},
								playEnd: function(router){
									router.get('gameController').playEnd();
								},
								fullReplay: function(router){
									router.get('gameController').fullReplay();
								},
								startedPlaying: function(router){
									router.transitionTo('mediaStarted');
								}
							}),
							mediaStarted: Em.Route.extend({
								connectOutlets: function(router){
									router.get('mediaControlsController').connectOutlet('mediaIndicator', 'mediaIndicatorPlaying');
								},
								fullReplay: function(router){
									router.get('gameController').stopPlaying();
									router.get('gameController').fullReplay();
								},
								finishedPlaying: function(router){
									router.transitionTo('mediaStopped');
								},
								back: function(router){
									router.get('gameController.media.res').stop();
									router.transitionTo('root.games.index');
								},
								startedPlaying: function(router){
									console.warn('started playing');
									//router.transitionTo('mediaStarted');
								}
							}),
							_setMood: function(router, mood){
								console.log('mood set');
								if (mood){
									router.get('moodmeterController').set('value', mood);
                                    router.get('gameController').saveGameFeedback(mood);
								} else {
									throw 'no mood set';
								}


							},
							setMood1: function(router){
								this._setMood(router, 'positive');
							},
							setMood2: function(router){
								this._setMood(router, 'neutral');
							},
							setMood3: function(router){
								this._setMood(router, 'negative');
							}
						})
					})
				})
			})
		})
	})
});
Trivia.Game = Em.Object.extend({
    guid: null,
    name: null,
    image: null,
    caption: null,
	gameType: null
});

Trivia.Question = Em.Object.extend({
    guid: null,
    gameId: null,
    image: null,
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
Trivia.gameObjects = {};

Trivia.gameObjects.music = [
    Trivia.Game.create({
        guid: 2,
        name: 'Kulkurin Valssi I',
        image: 'assets/img/kulkurin_valssi.jpg',
		gameType: 'audio',
        caption: 'Charlie Champ, “The Tramp”, 1915" - Laura Loveday (lis. CC BY-NC-SA 2.0)'

    }),
    Trivia.Game.create({
        guid: 3,
        name: 'Kulkurin Valssi II',
        image: 'assets/img/kulkurin_valssi.jpg',
		gameType: 'audio',
        caption: 'Charlie Champ, “The Tramp”, 1915" - Laura Loveday (lis. CC BY-NC-SA 2.0)'
    }),

    Trivia.Game.create({
        guid: 4,
        name: 'Lapsuuden Toverille I',
        image: 'assets/img/lapsuuden_toverille.jpg',
		gameType: 'audio',
        caption: 'Grandpa`s friends - D Flam (lis. CC BY-NC 2.0)'
    }),
    Trivia.Game.create({
        guid: 5,
        name: 'Lapsuuden Toverille II',
        image: 'assets/img/lapsuuden_toverille.jpg',
		gameType: 'audio',
        caption: 'Grandpa`s friends - D Flam (lis. CC BY-NC 2.0)'
    }),
    Trivia.Game.create({
        guid: 6,
        name: 'Väliaikainen I',
        image: 'assets/img/valiaikainen.jpg',
		gameType: 'audio',
        caption: 'Jussivaellus 2012 - Verna Koskinen (lis. CC BY-SA 2.0)'
    }),
    Trivia.Game.create({
        guid: 7,
        name: 'Väliaikainen II',
        image: 'assets/img/valiaikainen.jpg',
		gameType: 'audio',
        caption: 'Jussivaellus 2012 - Verna Koskinen (lis. CC BY-SA 2.0)'
    }),
    Trivia.Game.create({
        guid: 8,
        name: 'Tulipunaruusut I',
        image: 'assets/img/tulipunaruusut.jpg',
		gameType: 'audio',
        caption: 'horse+sunset - Ro Irving (lis. CC BY-SA 2.0)'
    }),
    Trivia.Game.create({
        guid: 9,
        name: 'Tulipunaruusut II',
        image: 'assets/img/tulipunaruusut.jpg',
		gameType: 'audio',
        caption: 'horse+sunset - Ro Irving (lis. CC BY-SA 2.0)'
    }),
    Trivia.Game.create({
        guid: 10,
        name: 'Suutarin emännän kehtolaulu',
        image: 'assets/img/suutarin_emanta.jpg',
		gameType: 'audio',
        caption: 'Old sewing machine - Petr Kratochvil (Public Domain)'
    }),
    Trivia.Game.create({
        guid: 11,
        name: 'Voi tuota muistia',
        image: 'assets/img/voi_tuota_muistia.jpg',
		gameType: 'audio',
        caption: '15062007(005) - Mikko Koponen (CC BY 2.0)'
    }),
    Trivia.Game.create({
        guid: 12,
        name: 'Puhelinlangat laulaa',
        image: 'assets/img/puhelinlangat.jpg',
		gameType: 'audio',
        caption: 'Old Telephone Lines At Dawn - Brad Smith (CC BY-NC 2.0)'
    }),
    Trivia.Game.create({
        guid: 13,
        name: 'Sellanen ol Viipuri',
        image: 'assets/img/viipuri.jpg',
		gameType: 'audio',
        caption: 'Fortress in Vyborg - Paukrus (CC BY-SA 2.0)'
    }),
    Trivia.Game.create({
        guid: 14,
        name: 'Kotkan poikii ilman siipii',
        image: 'assets/img/kotkan_poikii.jpg',
		gameType: 'audio',
        caption: 'Sea Eagle - Asbjorn Floden (CC BY-NC 2.0)'
    }),
    Trivia.Game.create({
        guid: 15,
        name: 'Satumaa',
        image: 'assets/img/satumaa.jpg',
		gameType: 'audio',
        caption: 'North sea sunset - Dolorix (CC BY-NC-SA 2.0)'
    })
];

Trivia.gameObjects.plain = [
	Trivia.Game.create({
		guid:16,
        gameType: 'quiz',
        gameIntro: 'Yhdistä vastakohdat toisiinsa.',
		name:'Vastakohtien yhdistäminen'
	}),
	Trivia.Game.create({
		guid:18,
        gameType: 'quiz',
        gameIntro: 'Lehtivisailu: missä kaupungissa kukin lehti julkaistaan?',
		name:'Lehtivisailu',
		image:'assets/img/lehtivisailu.jpg'
	}),
    Trivia.Game.create({
        guid:20,
        gameType: 'quiz',
        gameIntro: 'Yhdistä oikea kirja kirjailijaan',
        name:'Kirjailijat I',
        image:'assets/img/kirjailijat/kir1.jpg'
    }),
    Trivia.Game.create({
        guid:21,
        gameType: 'quiz',
        gameIntro: 'Yhdistä oikea kirja kirjailijaan',
        image:'assets/img/kirjailijat/kir5.jpg',
        name:'Kirjailijat II'
    }),
    Trivia.Game.create({
        guid:22,
        gameType: 'quiz',
        gameIntro: 'Yhdistä oikea kirja kirjailijaan',
        image:'assets/img/kirjailijat/kir10.jpg',
        name:'Kirjailijat III'
    }),
    Trivia.Game.create({
        guid:23,
        gameType: 'quiz',
        gameIntro: 'Miten eri sananlaskut jatkuvat?',
        image:'assets/img/sananlaskut/san1.jpg',
        name:'Sananlaskut I'
    }),
    Trivia.Game.create({
        guid:24,
        gameType: 'quiz',
        gameIntro: 'Miten eri sananlaskut jatkuvat?',
        image:'assets/img/sananlaskut/san10.jpg',
        name:'Sananlaskut II'
    }),
    Trivia.Game.create({
        guid:25,
        gameType: 'quiz',
        gameIntro: 'Miten eri sananlaskut jatkuvat?',
        image:'assets/img/sananlaskut/san15.jpg',
        name:'Sananlaskut III'
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
        //options: {playTo: 15750},
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
        options: {playTo: 72900},
        answers: [
            Trivia.Answer.create({ answerText: 'raitilla valssiks' }),
            Trivia.Answer.create({ answerText: 'raitilla tanssiks', correct: true }),
            Trivia.Answer.create({ answerText: 'maantiellä juoksuks' })
        ]
    }),
    Trivia.Question.create({
        gameId: 2,
        mediaId: 1,
        questionText: 'Miten kappaleen sanat jatkuvat?',
        options: {playTo: 92900},
        answers: [
            Trivia.Answer.create({ answerText: 'rakastan ja kaihoan ain\'', correct: true }),
            Trivia.Answer.create({ answerText: 'minä aina ikävöin vain' }),
            Trivia.Answer.create({ answerText: 'koskaan mä unhoita en' })
        ]
    }),
    Trivia.Question.create({
        gameId: 2,
        mediaId: 1,
        questionText: 'Miten kappaleen sanat jatkuvat?',
        options: {playTo: 106700},
        answers: [
            Trivia.Answer.create({ answerText: 'unelmat repussaan' }),
            Trivia.Answer.create({ answerText: 'kantaen kohtaloaan', correct: true }),
            Trivia.Answer.create({ answerText: 'odottaen tulevaa' })
        ]
    }),
    Trivia.Question.create({
        gameId: 2,
        mediaId: 1,
        questionText: 'Miten kappaleen sanat jatkuvat?',
        options: {playTo: 144600},
        answers: [
            Trivia.Answer.create({ answerText: 'kiristää vyö', correct: true }),
            Trivia.Answer.create({ answerText: 'ahdistaa työ'}),
            Trivia.Answer.create({ answerText: 'valssiksi lyön' })
        ]
    }),
    Trivia.Question.create({
        gameId: 3,
        mediaId: 11,
        questionText: 'Miten kappaleen sanat jatkuvat?',
        options: {playTo: 20600},
        answers: [
            Trivia.Answer.create({ answerText: 'siel viihdyn suo viini ja samppanja vaan', correct: true }),
            Trivia.Answer.create({ answerText: 'siel viihdyn,  juon viinin ja samppanjaa vain'}),
            Trivia.Answer.create({ answerText: 'siel nautin ja viihdyn kera samppanjan vain' })
        ]
    }),
    Trivia.Question.create({
        gameId: 3,
        mediaId: 11,
        questionText: 'Miten kappaleen sanat jatkuvat?',
        options: {playTo: 52700},
        answers: [
            Trivia.Answer.create({ answerText: 'pöydät ne herkkujaan suo' }),
            Trivia.Answer.create({ answerText: 'kruunut ne valoaan luo', correct: true}),
            Trivia.Answer.create({ answerText: 'neidot ne tanssihin käy' })
        ]
    }),
    Trivia.Question.create({
        gameId: 3,
        mediaId: 11,
        questionText: 'Miten kappaleen sanat jatkuvat?',
        options: {playTo: 67700},
        answers: [
            Trivia.Answer.create({ answerText: 'tanssahtelee' }),
            Trivia.Answer.create({ answerText: 'kans astelee', correct: true}),
            Trivia.Answer.create({ answerText: 'kohdata saa' })
        ]
    }),
    Trivia.Question.create({
        gameId: 3,
        mediaId: 11,
        questionText: 'Miten kappaleen sanat jatkuvat?',
        options: {playTo: 96700},
        answers: [
            Trivia.Answer.create({ answerText: 'maantiellä viihdyn ma vaan', correct: true }),
            Trivia.Answer.create({ answerText: 'maantieltä pois tahdo en' }),
            Trivia.Answer.create({ answerText: 'pois mua sieltä ei saa' })
        ]
    }),
    Trivia.Question.create({
        gameId: 3,
        mediaId: 11,
        questionText: 'Miten kappaleen sanat jatkuvat?',
        options: {playTo: 111900},
        answers: [
            Trivia.Answer.create({ answerText: 'maantiellä, maantiellä tanssin', correct: true }),
            Trivia.Answer.create({ answerText: 'maantiellä, harmaalla tanssin' }),
            Trivia.Answer.create({ answerText: 'maantietä kivistä kuljen' })
        ]
    }),
    Trivia.Question.create({
        gameId: 3,
        mediaId: 11,
        questionText: 'Miten kappaleen sanat jatkuvat?',
        options: {playTo: 136600},
        answers: [
            Trivia.Answer.create({ answerText: 'tien valaisee kulkurilleen' }),
            Trivia.Answer.create({ answerText: 'tien viittana kulkurin on', correct: true }),
            Trivia.Answer.create({ answerText: 'luo tunnelman matkaajalleen' })
        ]
    }),
    Trivia.Question.create({
        gameId: 3,
        mediaId: 11,
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
        options: {playTo: 92000},
        answers: [
            Trivia.Answer.create({ answerText: 'mä muistan lämmöllä' }),
            Trivia.Answer.create({ answerText: 'mä muistan ainiaan', correct: true }),
            Trivia.Answer.create({ answerText: 'luokseni kaipaisin' })
        ]
    }),
    Trivia.Question.create({
        gameId: 5,
        mediaId: 12,
        questionText: 'Miten kappaleen sanat jatkuvat?',
        options: {playTo: 16750},
        answers: [
            Trivia.Answer.create({ answerText: 'äitisi helmoissa' }),
            Trivia.Answer.create({ answerText: 'isäsi majassa', correct: true }),
            Trivia.Answer.create({ answerText: 'siskosi rinnalla' })
        ]
    }),
    Trivia.Question.create({
        gameId: 5,
        mediaId: 12,
        questionText: 'Miten kappaleen sanat jatkuvat?',
        options: {playTo: 22000},
        answers: [
            Trivia.Answer.create({ answerText: 'kuin kukka kaunis suloinen', correct:true }),
            Trivia.Answer.create({ answerText: 'suloinen kukka kedolla'}),
            Trivia.Answer.create({ answerText: 'kuin ruusu soma punainen' })
        ]
    }),
    Trivia.Question.create({
        gameId: 5,
        mediaId: 12,
        questionText: 'Miten kappaleen sanat jatkuvat?',
        options: {playTo: 54000},
        answers: [
            Trivia.Answer.create({ answerText: 'toveri paras kaikista'}),
            Trivia.Answer.create({ answerText: 'ja olit paras ystäväin', correct:true }),
            Trivia.Answer.create({ answerText: 'sä olit luottoystäväin' })
        ]
    }),
    Trivia.Question.create({
        gameId: 5,
        mediaId: 12,
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
        options: {playTo: 95600},
        answers: [
            Trivia.Answer.create({ answerText: 'joka rakkautesi sytyttää'}),
            Trivia.Answer.create({ answerText: 'joka luoksesi kiiruhtaa' }),
            Trivia.Answer.create({ answerText: 'joka helyt meillä ostattaa', correct:true })
        ]
    }),
    Trivia.Question.create({
        gameId: 7,
        mediaId: 13,
        questionText: 'Miten kappaleen sanat jatkuvat?',
        options: {playTo: 9800},
        answers: [
            Trivia.Answer.create({ answerText: 'huoleton murheeton'}),
            Trivia.Answer.create({ answerText: 'huolineen ja murheineen', correct:true }),
            Trivia.Answer.create({ answerText: 'murheineen ja huolineen' })
        ]
    }),
    Trivia.Question.create({
        gameId: 7,
        mediaId: 13,
        questionText: 'Miten kappaleen sanat jatkuvat?',
        options: {playTo: 31700},
        answers: [
            Trivia.Answer.create({ answerText: 'ja onnettomuus - totta tosiaan' }),
            Trivia.Answer.create({ answerText: 'ja huolettomuus - totta tosiaan' }),
            Trivia.Answer.create({ answerText: 'ja pettymys tuo - totta tosiaan', correct:true })
        ]
    }),
    Trivia.Question.create({
        gameId: 7,
        mediaId: 13,
        questionText: 'Miten kappaleen sanat jatkuvat?',
        options: {playTo: 47800},
        answers: [
            Trivia.Answer.create({ answerText: 'kultaisen hellimmän nuoruuden', correct:true }),
            Trivia.Answer.create({ answerText: 'kultaa sen hellimmän nuoruuden' }),
            Trivia.Answer.create({ answerText: 'kultaa sen hellänkin nuoruuden' })
        ]
    }),
    Trivia.Question.create({
        gameId: 7,
        mediaId: 13,
        questionText: 'Miten kappaleen sanat jatkuvat?',
        options: {playTo: 56600},
        answers: [
            Trivia.Answer.create({ answerText: 'hempeä kauneus', correct:true }),
            Trivia.Answer.create({ answerText: 'viehkeä hempeys' }),
            Trivia.Answer.create({ answerText: 'hehkeä naurahdus' })
        ]
    }),
    Trivia.Question.create({
        gameId: 7,
        mediaId: 13,
        questionText: 'Miten kappaleen sanat jatkuvat?',
        options: {playTo: 86200},
        answers: [
            Trivia.Answer.create({ answerText: 'hurma seuran...' }),
            Trivia.Answer.create({ answerText: 'hurma viinin...', correct:true }),
            Trivia.Answer.create({ answerText: 'hurma ilon...' })
        ]
    }),
    Trivia.Question.create({
        gameId: 7,
        mediaId: 13,
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
        options: {playTo: 96900},
        answers: [
            Trivia.Answer.create({ answerText: 'mulle suukko, sulle ruusut tulipunaiset', correct:true }),
            Trivia.Answer.create({ answerText: 'sulle ruusut, mulle suukot tulipunaiset' }),
            Trivia.Answer.create({ answerText: 'mulle rakkaus, sulle ruusut tulipunaiset' })
        ]
    }),
    Trivia.Question.create({
        gameId: 9,
        mediaId: 14,
        questionText: 'Miten kappaleen sanat jatkuvat?',
        options: {playTo: 10070},
        answers: [
            Trivia.Answer.create({ answerText: 'illoin luokse pienen kapakan', correct:true }),
            Trivia.Answer.create({ answerText: 'Hiljan luoksen pienen kapakan' }),
            Trivia.Answer.create({ answerText: 'illoin juoksen pieneen kapakkaan' })
        ]
    }),
    Trivia.Question.create({
        gameId: 9,
        mediaId: 14,
        questionText: 'Miten kappaleen sanat jatkuvat?',
        options: {playTo: 19100},
        answers: [
            Trivia.Answer.create({ answerText: 'kuiskaa hiljaa arotuuli', correct:true }),
            Trivia.Answer.create({ answerText: 'arotuuli hiljaa kuiskaa' }),
            Trivia.Answer.create({ answerText: 'hiljaa arotuuli kuiskaa' })
        ]
    }),
    Trivia.Question.create({
        gameId: 9,
        mediaId: 14,
        questionText: 'Miten kappaleen sanat jatkuvat?',
        options: {playTo: 32800},
        answers: [
            Trivia.Answer.create({ answerText: 'meitä varten aina kukkineet' }),
            Trivia.Answer.create({ answerText: 'sua varten vain on kukkineet', correct:true }),
            Trivia.Answer.create({ answerText: 'kauneimmat on meille kukkineet' })
        ]
    }),
    Trivia.Question.create({
        gameId: 9,
        mediaId: 14,
        questionText: 'Miten kappaleen sanat jatkuvat?',
        options: {playTo: 39700},
        answers: [
            Trivia.Answer.create({ answerText: 'suukon palkaksi suot mulle', correct:true }),
            Trivia.Answer.create({ answerText: 'hymyn vienon annat mulle' }),
            Trivia.Answer.create({ answerText: 'sydämen suot palkaks mulle' })
        ]
    }),
    Trivia.Question.create({
        gameId: 9,
        mediaId: 14,
        questionText: 'Miten kappaleen sanat jatkuvat?',
        options: {playTo: 69500},
        answers: [
            Trivia.Answer.create({ answerText: 'pustan tuuli näyttää mulle tien' }),
            Trivia.Answer.create({ answerText: 'tähdet pustan yli näyttää tien', correct:true }),
            Trivia.Answer.create({ answerText: 'tähdet näyttää mulle sinne tien' })
        ]
    }),
    Trivia.Question.create({
        gameId: 9,
        mediaId: 14,
        questionText: 'Miten kappaleen sanat jatkuvat?',
        options: {playTo: 78600},
        answers: [
            Trivia.Answer.create({ answerText: 'taivaan rannan taa kun sinut vien', correct:true }),
            Trivia.Answer.create({ answerText: 'horisonttiin meidät kuljettaa' }),
            Trivia.Answer.create({ answerText: 'halki pustan meidän kuljettaa' })
        ]
    }),
    Trivia.Question.create({
        gameId: 9,
        mediaId: 14,
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
        options: {playTo: 83200},
        answers: [
            Trivia.Answer.create({ answerText: 'kenkähylly ulos mennessänne' }),
            Trivia.Answer.create({ answerText: 'piimähinkkiä porstuassa mennessänne', correct:true }),
            Trivia.Answer.create({ answerText: 'maitotonkkaa navetassa käydässänne' })
        ]
    }),
    Trivia.Question.create({
        gameId: 11,
        mediaId: 6,
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
        options: {playTo: 167960},
        answers: [
            Trivia.Answer.create({ answerText: 'iloni suruni mun' }),
            Trivia.Answer.create({ answerText: 'särkyneet toiveeni mun', correct:true }),
            Trivia.Answer.create({ answerText: 'suurimman kaipaukseni' })
        ]
    }),Trivia.Question.create({
        gameId: 15,
        mediaId: 10,
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
        options: {playTo: 60670},
        answers: [
            Trivia.Answer.create({ answerText: 'vanki olen maan', correct:true }),
            Trivia.Answer.create({ answerText: 'sinne kaipaan vaan' }),
            Trivia.Answer.create({ answerText: 'kotiin jäädä saan' })
        ]
    }),
    Trivia.Question.create({
        gameId: 15,
        mediaId: 10,
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
        questionText: 'Miten kappaleen sanat jatkuvat?',
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
    }),
	Trivia.Question.create({
		questionText: 'Vaaleaorakas on?',
        gameId: 17,
		answers: [
			Trivia.Answer.create({ answerText: 'Kissarotu' }),
			Trivia.Answer.create({ answerText: 'Kukka' }),
			Trivia.Answer.create({ answerText: 'Sieni', correct: true }),
			Trivia.Answer.create({ answerText: 'Tammenterho' })
		]
	}),
	Trivia.Question.create({
	 gameId: 17,
	 mediaId: 8,
	 questionText: 'Miten kappaleen sanat jatkuvat?',
	 options: {playTo: 127290},
	 answers: [
		 Trivia.Answer.create({ answerText: 'viipurlaise rakkaus assuupi vain', correct:true }),
		 Trivia.Answer.create({ answerText: 'viipurissa iloista elämä on' }),
		 Trivia.Answer.create({ answerText: 'rakkaudest viipuriin iloiseen' })
	 ]
 	}),
	Trivia.Question.create({
		questionText: 'Alaston ase -elokuvien pääroolia näytteli?',
        gameId: 17,
		answers: [
			Trivia.Answer.create({ answerText: 'Leslie Nielsen', correct: true  }),
			Trivia.Answer.create({ answerText: 'Sean Connery' }),
			Trivia.Answer.create({ answerText: 'Tom Cruise' }),
			Trivia.Answer.create({ answerText: 'Tom Hanks' })
		]
	}),
	Trivia.Question.create({
     gameId: 17,
     mediaId: 8,
     questionText: 'Miten kappaleen sanat jatkuvat?',
     options: {playTo: 78080},
     answers: [
         Trivia.Answer.create({ answerText: 'pöydässä niin hilpeässä', correct:true }),
         Trivia.Answer.create({ answerText: 'kapakassa nauravassa' }),
         Trivia.Answer.create({ answerText: 'illan tumman saapuessa' })
     ]
	 }),
	Trivia.Question.create({
		questionText: 'Lapatossu-elokuvassa rakennetaan?',
        gameId: 17,
		answers: [
			Trivia.Answer.create({ answerText: 'Kirkkoa' }),
			Trivia.Answer.create({ answerText: 'Omakotitaloa' }),
			Trivia.Answer.create({ answerText: 'Rautatietä', correct: true }),
			Trivia.Answer.create({ answerText: 'Satamaa' })
		]
	}),
	Trivia.Question.create({
		questionText: 'Minkä automerkin automalli on Xantia?',
        gameId: 17,
		answers: [
			Trivia.Answer.create({ answerText: 'Audin' }),
			Trivia.Answer.create({ answerText: 'BMW:n' }),
			Trivia.Answer.create({ answerText: 'Citroenin', correct: true }),
			Trivia.Answer.create({ answerText: 'Dodgen' })
		]
	}),
	 Trivia.Question.create({
		 gameId: 17,
		 mediaId: 8,
		 questionText: 'Miten kappaleen sanat jatkuvat?',
		 options: {playTo: 142990},
		 answers: [
			 Trivia.Answer.create({ answerText: 'Linnan muuril me kun illan suussa kohdattiin' }),
			 Trivia.Answer.create({ answerText: 'Monrepoos myö kuuta ko niin kahen katseltiin', correct:true }),
			 Trivia.Answer.create({ answerText: 'Torkkelissa kauniin kuusen alla suudeltiin' })
		 ]
	 }),
    Trivia.Question.create({
        questionText: 'Missä kaupungissa Aamulehti julkaistaan?',
        gameId: 18,
        image: 'assets/img/aamulehti.png',
        answers: [
            Trivia.Answer.create({ answerText: 'Pori' }),
            Trivia.Answer.create({ answerText: 'Kouvola' }),
            Trivia.Answer.create({ answerText: 'Tampere', correct: true }),
            Trivia.Answer.create({ answerText: 'Jyväskylä' })
        ]
    }),
    Trivia.Question.create({
        questionText: 'Missä kaupungissa Kainuun Sanomat julkaistaan?',
        gameId: 18,
        image: 'assets/img/kainuunsanomat.jpg',
        answers: [
            Trivia.Answer.create({ answerText: 'Rovaniemi' }),
            Trivia.Answer.create({ answerText: 'Oulu' }),
            Trivia.Answer.create({ answerText: 'Kouvola'}),
            Trivia.Answer.create({ answerText: 'Kajaani', correct: true })
        ]
    }),
    Trivia.Question.create({
        questionText: 'Missä kaupungissa julkaistaan Lapin Kansa?',
        gameId: 18,
        image: 'assets/img/lapinkansa.jpg',
        answers: [
            Trivia.Answer.create({ answerText: 'Rovaniemi', correct:true }),
            Trivia.Answer.create({ answerText: 'Oulu' }),
            Trivia.Answer.create({ answerText: 'Kuusamo' }),
            Trivia.Answer.create({ answerText: 'Kajaani' })
        ]
    }),
    Trivia.Question.create({
        questionText: 'Missä kaupungissa julkaistaan Koillismaa?',
        gameId: 18,
        image: 'assets/img/koillismaa.jpg',
        answers: [
            Trivia.Answer.create({ answerText: 'Rovaniemi' }),
            Trivia.Answer.create({ answerText: 'Oulu' }),
            Trivia.Answer.create({ answerText: 'Kuusamo' , correct:true }),
            Trivia.Answer.create({ answerText: 'Joensuu' })
        ]
    }),
    Trivia.Question.create({
        questionText: 'Missä kaupungissa Hufvudstadsbladet julkaistaan?',
        gameId: 18,
        image: 'assets/img/hufvudstadsbladet.gif',
        answers: [
            Trivia.Answer.create({ answerText: 'Oulu' }),
            Trivia.Answer.create({ answerText: 'Helsinki', correct: true }),
            Trivia.Answer.create({ answerText: 'Jyväskylä' }),
            Trivia.Answer.create({ answerText: 'Porvoo' })
        ]
    }),
    Trivia.Question.create({
        questionText: 'Missä kaupungissa Borgåbladet julkaistaan?',
        gameId: 18,
        image: 'assets/img/bargo.jpg',
        answers: [
            Trivia.Answer.create({ answerText: 'Tampere' }),
            Trivia.Answer.create({ answerText: 'Helsinki' }),
            Trivia.Answer.create({ answerText: 'Turku'}),
            Trivia.Answer.create({ answerText: 'Porvoo', correct: true })
        ]
    }),
    Trivia.Question.create({
        questionText: 'Missä kaupungissa Kaleva julkaistaan?',
        gameId: 18,
        image: 'assets/img/kalevala.jpg',
        answers: [
            Trivia.Answer.create({ answerText: 'Rovaniemi' }),
            Trivia.Answer.create({ answerText: 'Oulu', correct: true }),
            Trivia.Answer.create({ answerText: 'Kouvola'}),
            Trivia.Answer.create({ answerText: 'Jyväskylä' })
        ]
    }),
    Trivia.Question.create({
        questionText: 'Missä kaupungissa Keskisuomalainen julkaistaan?',
        gameId: 18,
        image: 'assets/img/keskisuomalainen.jpg',
        answers: [
            Trivia.Answer.create({ answerText: 'Pori' }),
            Trivia.Answer.create({ answerText: 'Kuopio' }),
            Trivia.Answer.create({ answerText: 'Jyväskylä', correct: true }),
            Trivia.Answer.create({ answerText: 'Kajaani' })
        ]
    }),
    Trivia.Question.create({
        questionText: 'Missä kaupungissa julkaistaan Satakunnan Kansa?',
        gameId: 18,
        image: 'assets/img/satakunnankansa.jpg',
        answers: [
            Trivia.Answer.create({ answerText: 'Porvoo' }),
            Trivia.Answer.create({ answerText: 'Turku' }),
            Trivia.Answer.create({ answerText: 'Joensuu'}),
            Trivia.Answer.create({ answerText: 'Pori', correct: true })
        ]
    }),
    Trivia.Question.create({
        questionText: 'Missä maassa ilmestyy Svenska Dagbladet?',
        gameId: 18,
        image: 'assets/img/svenskadagbladet.jpg',
        answers: [
            Trivia.Answer.create({ answerText: 'Suomi' }),
            Trivia.Answer.create({ answerText: 'Ruotsi', correct: true }),
            Trivia.Answer.create({ answerText: 'Norja'}),
            Trivia.Answer.create({ answerText: 'Tanska' })
        ]
    }),
    Trivia.Question.create({
        questionText: 'Missä maassa ilmestyy Le Monde?',
        gameId: 18,
        image: 'assets/img/monde.jpg',
        answers: [
            Trivia.Answer.create({ answerText: 'Englanti' }),
            Trivia.Answer.create({ answerText: 'Hollanti'}),
            Trivia.Answer.create({ answerText: 'Ranska', correct: true }),
            Trivia.Answer.create({ answerText: 'Kanada' })
        ]
    }),
    Trivia.Question.create({
        questionText: 'Missä maassa ilmestyy Dagens Nyheter?',
        gameId: 18,
        image: 'assets/img/dagensnyheter.jpg',
        answers: [
            Trivia.Answer.create({ answerText: 'Islanti' }),
            Trivia.Answer.create({ answerText: 'Ruotsi', correct: true }),
            Trivia.Answer.create({ answerText: 'Suomi'}),
            Trivia.Answer.create({ answerText: 'Tanska' })
        ]
    }),
    Trivia.Question.create({
        questionText: 'Missä maassa ilmestyy New York Times?',
        gameId: 18,
        image: 'assets/img/newyorktimes.jpg',
        answers: [
            Trivia.Answer.create({ answerText: 'Yhdysvallat', correct: true }),
            Trivia.Answer.create({ answerText: 'Australia' }),
            Trivia.Answer.create({ answerText: 'Uusi-Seelanti'}),
            Trivia.Answer.create({ answerText: 'Englanti' })
        ]
    }),
    Trivia.Question.create({
        questionText: 'Missä maassa ilmestyi Deutsche Allgemeine Zeitung',
        gameId: 18,
        image: 'assets/img/Deutscheallgemeinezeitung.jpg',
        answers: [
            Trivia.Answer.create({ answerText: 'Suomi' }),
            Trivia.Answer.create({ answerText: 'Hollanti'}),
            Trivia.Answer.create({ answerText: 'Ranska' }),
            Trivia.Answer.create({ answerText: 'Saksa', correct: true  })
        ]
    }),
    Trivia.Question.create({
        questionText: 'Missä maassa ilmestyy Pravda?',
        gameId: 18,
        image: 'assets/img/pravda.jpg',
        answers: [
            Trivia.Answer.create({ answerText: 'Venäjä', correct: true }),
            Trivia.Answer.create({ answerText: 'Tsekki' }),
            Trivia.Answer.create({ answerText: 'Viro' }),
            Trivia.Answer.create({ answerText: 'Valkovenäjä' })
        ]
    }),
	Trivia.Question.create({
     gameId: 19,
     mediaId: 1,
     questionText: 'Miten kappaleen sanat jatkuvat?',
     options: {playTo: 1000},
     answers: [
         Trivia.Answer.create({ answerText: 'rakastan ja kaihoan ain\'', correct: true }),
         Trivia.Answer.create({ answerText: 'minä aina ikävöin vain' }),
         Trivia.Answer.create({ answerText: 'koskaan mä unhoita en' })
     ]
 }),
    Trivia.Question.create({
        gameId: 20,
        image: 'assets/img/kirjailijat/kir1.jpg',
        questionText: 'Mikä kirjoista on Mika Waltarin kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Sinuhe Egyptiläinen', correct:true }),
            Trivia.Answer.create({ answerText: 'Nummisuutarit' }),
            Trivia.Answer.create({ answerText: 'Ihmisen osa' })
        ]
    }),
    Trivia.Question.create({
        gameId: 20,
        image: 'assets/img/kirjailijat/kir2.jpg',
        questionText: 'Mikä kirjoista on Mika Waltarin kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Mikael Karvajalka', correct:true }),
            Trivia.Answer.create({ answerText: 'Onnellinen mies' }),
            Trivia.Answer.create({ answerText: 'Täällä Pohjan tähden alla' })
        ]
    }),
    Trivia.Question.create({
        gameId: 20,
        image: 'assets/img/kirjailijat/kir3.jpg',
        questionText: 'Mikä kirjoista on Mika Waltarin kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Taikatalvi' }),
            Trivia.Answer.create({ answerText: 'Hurskas kurjuus' }),
            Trivia.Answer.create({ answerText: 'Turms Kuolematon', correct:true })
        ]
    }),
    Trivia.Question.create({
        gameId: 20,
        image: 'assets/img/kirjailijat/kir4.jpg',
        questionText: 'Mikä kirjoista on Väinö Linnan kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Muumipappa ja meri' }),
            Trivia.Answer.create({ answerText: 'Tuntematon sotilas', correct:true }),
            Trivia.Answer.create({ answerText: 'Seitsemän Veljestä' })
        ]
    }),
    Trivia.Question.create({
        gameId: 20,
        image: 'assets/img/kirjailijat/kir5.jpg',
        questionText: 'Mikä kirjoista on Väinö Linnan kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Veitikka' }),
            Trivia.Answer.create({ answerText: 'Ihmisiä suviyössä' }),
            Trivia.Answer.create({ answerText: 'Täällä Pohjan tähden alla', correct:true })
        ]
    }),
    Trivia.Question.create({
        gameId: 20,
        image: 'assets/img/kirjailijat/kir6.jpg',
        questionText: 'Mikä kirjoista on Aleksis Kiven kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Iisakin kirkko' }),
            Trivia.Answer.create({ answerText: 'Seitsemän Veljestä', correct:true }),
            Trivia.Answer.create({ answerText: 'Hurskas kurjuus' })
        ]
    }),
    Trivia.Question.create({
        gameId: 20,
        image: 'assets/img/kirjailijat/kir7.jpg',
        questionText: 'Mikä kirjoista on Aleksis Kiven kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Nummisuutarit', correct:true  }),
            Trivia.Answer.create({ answerText: 'Taikatalvi' }),
            Trivia.Answer.create({ answerText: 'Tuntematon sotilas' })
        ]
    }),
    Trivia.Question.create({
        gameId: 20,
        image: 'assets/img/kirjailijat/kir8.jpg',
        questionText: 'Mikä kirjoista on Aleksis Kiven kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Jumalan sana' }),
            Trivia.Answer.create({ answerText: 'Ihmisen osa' }),
            Trivia.Answer.create({ answerText: 'Kihlaus', correct:true })
        ]
    }),
    Trivia.Question.create({
        gameId: 20,
        image: 'assets/img/kirjailijat/kir9.jpg',
        questionText: 'Mikä kirjoista on Aleksis Kiven kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Lea', correct:true  }),
            Trivia.Answer.create({ answerText: 'Turms Kuolematon' }),
            Trivia.Answer.create({ answerText: 'Veitikka' })
        ]
    }),
    Trivia.Question.create({
        gameId: 20,
        image: 'assets/img/kirjailijat/kir10.jpg',
        questionText: 'Mikä kirjoista on Veikko Huovisen kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Punainen Lanka'  }),
            Trivia.Answer.create({ answerText: 'Havukka-ahon ajattelija', correct:true }),
            Trivia.Answer.create({ answerText: 'Kauppa-Lopo' })
        ]
    }),
    Trivia.Question.create({
        gameId: 20,
        image: 'assets/img/kirjailijat/kir11.jpg',
        questionText: 'Mikä kirjoista on Veikko Huovisen kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Lampaan syöjät', correct:true  }),
            Trivia.Answer.create({ answerText: 'Komisario Palmu' }),
            Trivia.Answer.create({ answerText: 'Nummisuutarit' })
        ]
    }),
    Trivia.Question.create({
        gameId: 20,
        image: 'assets/img/kirjailijat/kir12.jpg',
        questionText: 'Mikä kirjoista on Veikko Huovisen kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Nummisuutarit'  }),
            Trivia.Answer.create({ answerText: 'Veitikka', correct:true }),
            Trivia.Answer.create({ answerText: 'Onnellinen mies' })
        ]
    }),
    Trivia.Question.create({
        gameId: 20,
        image: 'assets/img/kirjailijat/kir13.jpg',
        questionText: 'Mikä kirjoista on Veikko Huovisen kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Taikatalvi'  }),
            Trivia.Answer.create({ answerText: 'Onnellinen mies' }),
            Trivia.Answer.create({ answerText: 'Rasvamaksa', correct:true })
        ]
    }),
    Trivia.Question.create({
        gameId: 20,
        image: 'assets/img/kirjailijat/kir14.jpg',
        questionText: 'Mikä kirjoista on Veikko Huovisen kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Konsta Pylkkänen etsii kortteeria', correct:true  }),
            Trivia.Answer.create({ answerText: 'Papin Rouva' }),
            Trivia.Answer.create({ answerText: 'Seitsemän veljestä' })
        ]
    }),
    Trivia.Question.create({
        gameId: 21,
        image: 'assets/img/kirjailijat/kir1.jpg',
        questionText: 'Mikä kirjoista on Mika Waltarin kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Nuori Johannes', correct:true  }),
            Trivia.Answer.create({ answerText: 'Seitsemän veljestä' }),
            Trivia.Answer.create({ answerText: 'Muumipappa ja meri' })
        ]
    }),
    Trivia.Question.create({
        gameId: 21,
        image: 'assets/img/kirjailijat/kir1.jpg',
        questionText: 'Mikä kirjoista on Mika Waltarin kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Komisario Palmun erehdys', correct:true  }),
            Trivia.Answer.create({ answerText: 'Hurskas kurjuus' }),
            Trivia.Answer.create({ answerText: 'Nummisuutarit' })
        ]
    }),
    Trivia.Question.create({
        gameId: 21,
        image: 'assets/img/kirjailijat/kir18.jpg',
        questionText: 'Mikä kirjoista on Arto Paasilinnan kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Taikatalvi' }),
            Trivia.Answer.create({ answerText: 'Veitikka' }),
            Trivia.Answer.create({ answerText: 'Onnellinen mies', correct:true })
        ]
    }),
    Trivia.Question.create({
        gameId: 21,
        image: 'assets/img/kirjailijat/kir19.jpg',
        questionText: 'Mikä kirjoista on Arto Paasilinnan kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Stalinin lehmät' }),
            Trivia.Answer.create({ answerText: 'Jäniksen vuosi', correct:true }),
            Trivia.Answer.create({ answerText: 'Nummisuutarit' })
        ]
    }),
    Trivia.Question.create({
        gameId: 21,
        image: 'assets/img/kirjailijat/kir20.jpg',
        questionText: 'Mikä kirjoista on Sofi Oksasen kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Puhdistus', correct:true }),
            Trivia.Answer.create({ answerText: 'Hurskas kurjuus' }),
            Trivia.Answer.create({ answerText: 'Onnellinen mies' })
        ]
    }),
    Trivia.Question.create({
        gameId: 21,
        image: 'assets/img/kirjailijat/kir21.jpg',
        questionText: 'Mikä kirjoista on Reijo Mäen kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Sheriffi', correct:true }),
            Trivia.Answer.create({ answerText: 'Tuomiopäivän aurinko nousee' }),
            Trivia.Answer.create({ answerText: 'Taikatalvi' })
        ]
    }),
    Trivia.Question.create({
        gameId: 21,
        image: 'assets/img/kirjailijat/kir23.jpg',
        questionText: 'Mikä kirjoista on Henning Mankelin kijoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Maailman paras kylä' }),
            Trivia.Answer.create({ answerText: 'Likainen enkeli', correct:true }),
            Trivia.Answer.create({ answerText: 'Seitsemän päivää' })
        ]
    }),
    Trivia.Question.create({
        gameId: 21,
        image: 'assets/img/kirjailijat/kir24.jpg',
        questionText: 'Mikä kirjoista on Jari Tervon kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Layla', correct:true }),
            Trivia.Answer.create({ answerText: 'Hurkas kurjuus' }),
            Trivia.Answer.create({ answerText: 'Nummisuutarit' })
        ]
    }),
    Trivia.Question.create({
        gameId: 21,
        image: 'assets/img/kirjailijat/kir25.jpg',
        questionText: 'Mikä kirjoista on Eeva Joenpellon kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Aatami ja Eeva' }),
            Trivia.Answer.create({ answerText: 'Onnellinen mies' }),
            Trivia.Answer.create({ answerText: 'Vetää kaikista ovista', correct:true })
        ]
    }),
    Trivia.Question.create({
        gameId: 21,
        image: 'assets/img/kirjailijat/kir26.jpg',
        questionText: 'Mikä kirjoista on Seppo Jokisen kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Hurskas kurjuus' }),
            Trivia.Answer.create({ answerText: 'Ajomies', correct:true }),
            Trivia.Answer.create({ answerText: 'Taikatalvi' })
        ]
    }),
    Trivia.Question.create({
        gameId: 21,
        image: 'assets/img/kirjailijat/kir27.jpg',
        questionText: 'Mikä kirjoista on Antti Tuurin kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Onnellinen mies' }),
            Trivia.Answer.create({ answerText: 'Nummisuutarit' }),
            Trivia.Answer.create({ answerText: 'Ikitie', correct:true })
        ]
    }),
    Trivia.Question.create({
        gameId: 21,
        image: 'assets/img/kirjailijat/kir20.jpg',
        questionText: 'Mikä kirjoista on Sofi Oksasen kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Kun kyyhkyset katosivat', correct:true }),
            Trivia.Answer.create({ answerText: 'Neitosten karkuretki' }),
            Trivia.Answer.create({ answerText: 'Onnellinen mies' })
        ]
    }),
    Trivia.Question.create({
        gameId: 21,
        image: 'assets/img/kirjailijat/kir28.jpg',
        questionText: 'Mikä kirjoista on Agatha Christien kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Tapaus Bruus ja muita kertomuksia' }),
            Trivia.Answer.create({ answerText: 'Kuolema Niilillä', correct:true }),
            Trivia.Answer.create({ answerText: 'Taikatalvi' })
        ]
    }),
    Trivia.Question.create({
        gameId: 22,
        image: 'assets/img/kirjailijat/kir30.jpg',
        questionText: 'Mikä kirjoista on Kaari Utrion kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Leijat Helsingin yllä' }),
            Trivia.Answer.create({ answerText: 'Oppinut neiti', correct:true }),
            Trivia.Answer.create({ answerText: 'Nummisuutarit' })
        ]
    }),
    Trivia.Question.create({
        gameId: 22,
        image: 'assets/img/kirjailijat/kir31.jpg',
        questionText: 'Mikä kirjoista on Virpi-Hämeenanttilan kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Railo', correct:true }),
            Trivia.Answer.create({ answerText: 'Ikitie' }),
            Trivia.Answer.create({ answerText: 'Onnellinen mies' })
        ]
    }),
    Trivia.Question.create({
        gameId: 22,
        image: 'assets/img/kirjailijat/kir32.jpg',
        questionText: 'Mikä kirjoista on Antti Tuurin kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Ajomies' }),
            Trivia.Answer.create({ answerText: 'Surmanpelto', correct: true }),
            Trivia.Answer.create({ answerText: 'Taikatalvi' })
        ]
    }),
    Trivia.Question.create({
        gameId: 22,
        image: 'assets/img/kirjailijat/kir33.jpg',
        questionText: 'Mikä kirjoista on Laila Hietaniemen kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Seisemän veljestä' }),
            Trivia.Answer.create({ answerText: 'Nummisuutarit' }),
            Trivia.Answer.create({ answerText: 'Kallis kotimaa', correct:true })
        ]
    }),
    Trivia.Question.create({
        gameId: 22,
        image: 'assets/img/kirjailijat/kir34.jpg',
        questionText: 'Mikä kirjoista on Kjell Westön kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Missä Kuljimme kerran', correct:true }),
            Trivia.Answer.create({ answerText: 'Seitsemän veljestä' }),
            Trivia.Answer.create({ answerText: 'Taikatalvi' })
        ]
    }),
    Trivia.Question.create({
        gameId: 22,
        image: 'assets/img/kirjailijat/kir35.jpg',
        questionText: 'Mikä kirjoista on Herman Melvillen kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Aukko taivaassa' }),
            Trivia.Answer.create({ answerText: 'Tuulen puolella' }),
            Trivia.Answer.create({ answerText: 'Valkoinen valas', correct:true })
        ]
    }),
    Trivia.Question.create({
        gameId: 22,
        image: 'assets/img/kirjailijat/kir36.jpg',
        questionText: 'Mikä kirjoista on Matti Yrjänä Joensuun kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Rannalla' }),
            Trivia.Answer.create({ answerText: 'Harjunpää ja ahdistelija', correct:true }),
            Trivia.Answer.create({ answerText: 'Uhrilehto' })
        ]
    }),
    Trivia.Question.create({
        gameId: 22,
        image: 'assets/img/kirjailijat/kir37.jpg',
        questionText: 'Mikä kirjoista on Anja Snellmanin kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Lemmikkikaupan tytöt', correct: true }),
            Trivia.Answer.create({ answerText: 'Ilkeät sisarpuolet' }),
            Trivia.Answer.create({ answerText: 'Uhkapelimerkit' })
        ]
    }),
    Trivia.Question.create({
        gameId: 22,
        image: 'assets/img/kirjailijat/kir38.jpg',
        questionText: 'Mikä kirjoista on Reino Lehväslaihon kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Raja' }),
            Trivia.Answer.create({ answerText: 'Kosto' }),
            Trivia.Answer.create({ answerText: 'Seesjärven sissit', correct:true })
        ]
    }),
    Trivia.Question.create({
        gameId: 22,
        image: 'assets/img/kirjailijat/kir39.jpg',
        questionText: 'Mikä kirjoista on Antti Hyryn kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Uuni', correct:true }),
            Trivia.Answer.create({ answerText: 'Taivaspaikka' }),
            Trivia.Answer.create({ answerText: 'Tuulen varjo' })
        ]
    }),
    Trivia.Question.create({
        gameId: 22,
		image: 'assets/img/kirjailijat/stieg_larsson.jpg',
        questionText: 'Mikä kirjoista on Stieg Larssonin kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Voitonmerkki' }),
            Trivia.Answer.create({ answerText: 'Miehet, jotka vihaavat naisia', correct:true }),
            Trivia.Answer.create({ answerText: 'Takatalvi' })
        ]
    }),
    Trivia.Question.create({
        gameId: 22,
        image: 'assets/img/kirjailijat/kir41.jpg',
        questionText: 'Mikä kirjoista on John Grishamin kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Henkivartija' }),
            Trivia.Answer.create({ answerText: 'Valkoinen kääpiö' }),
            Trivia.Answer.create({ answerText: 'Avustaja', correct:true })
        ]
    }),
    Trivia.Question.create({
        gameId: 22,
		image: 'assets/img/kirjailijat/stieg_larsson.jpg',
        questionText: 'Mikä kirjoista on Stieg Larssonin kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Tyttö, joka leikki tulella', correct:true }),
            Trivia.Answer.create({ answerText: 'Hylynryöstäjä' }),
            Trivia.Answer.create({ answerText: 'Silminnäkijä' })
        ]
    }),
    Trivia.Question.create({
        gameId: 22,
        image: 'assets/img/kirjailijat/kir43.jpg',
        questionText: 'Mikä kirjoista on Kalle Päätalon kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Syksyksi kotiin' }),
            Trivia.Answer.create({ answerText: 'Kallen inttivuosi' }),
            Trivia.Answer.create({ answerText: 'Kannaksen lomajuna', correct:true })
        ]
    }),
    Trivia.Question.create({
        gameId: 23,
        image: 'assets/img/sananlaskut/san1.jpg',
        questionText: 'Parempi pyy pivossa',
        answers: [
            Trivia.Answer.create({ answerText: 'kuin naapurin padassa' }),
            Trivia.Answer.create({ answerText: 'kuin puun latvassa' }),
            Trivia.Answer.create({ answerText: 'kuin kymmenen oksalla', correct:true })
        ]
    }),
    Trivia.Question.create({
        gameId: 23,
        image: 'assets/img/sananlaskut/san2.jpg',
        questionText: 'Parempi myöhään',
        answers: [
            Trivia.Answer.create({ answerText: 'kuin ei milloinkaan', correct:true }),
            Trivia.Answer.create({ answerText: 'kuin liian aikaisin' }),
            Trivia.Answer.create({ answerText: 'kuin aamulla varhain' })
        ]
    }),
    Trivia.Question.create({
        gameId: 23,
        image: 'assets/img/sananlaskut/san3.jpg',
        questionText: 'Minkä lapsena oppii',
        answers: [
            Trivia.Answer.create({ answerText: 'sen vanhana unohtaa' }),
            Trivia.Answer.create({ answerText: 'sen vanhana taitaa', correct:true }),
            Trivia.Answer.create({ answerText: 'sen vanhana opettaa' })
        ]
    }),
    Trivia.Question.create({
        gameId: 23,
        image: 'assets/img/sananlaskut/san4.jpg',
        questionText: 'Ei kukko',
        answers: [
            Trivia.Answer.create({ answerText: 'kiekumaan käy' }),
            Trivia.Answer.create({ answerText: 'kävele' }),
            Trivia.Answer.create({ answerText: 'käskien laula', correct:true })
        ]
    }),
    Trivia.Question.create({
        gameId: 23,
        image: 'assets/img/sananlaskut/san5.jpg',
        questionText: 'Odottaa',
        answers: [
            Trivia.Answer.create({ answerText: 'kuin hepo heinää' }),
            Trivia.Answer.create({ answerText: 'kuin hepo kesää', correct:true }),
            Trivia.Answer.create({ answerText: 'kuin hepo kuumaa puuroa' })
        ]
    }),
    Trivia.Question.create({
        gameId: 23,
        image: 'assets/img/sananlaskut/san6.jpg',
        questionText: 'Kiertää',
        answers: [
            Trivia.Answer.create({ answerText: 'kuin kissa kuumaa puuroa', correct:true }),
            Trivia.Answer.create({ answerText: 'kuin koira kopissa' }),
            Trivia.Answer.create({ answerText: 'kuin kissa kartanolla' })
        ]
    }),
    Trivia.Question.create({
        gameId: 23,
        image: 'assets/img/sananlaskut/san7.jpg',
        questionText: 'Hyvä antaa vähästäänkin',
        answers: [
            Trivia.Answer.create({ answerText: 'paha ei paljon piittaa' }),
            Trivia.Answer.create({ answerText: 'paha päälle sylkee' }),
            Trivia.Answer.create({ answerText: 'paha ei paljostaan', correct:true })
        ]
    }),
    Trivia.Question.create({
        gameId: 23,
        image: 'assets/img/sananlaskut/san8.jpg',
        questionText: 'Pienilläkin',
        answers: [
            Trivia.Answer.create({ answerText: 'korvat kuulee' }),
            Trivia.Answer.create({ answerText: 'on silmät päässä' }),
            Trivia.Answer.create({ answerText: 'on korvat', correct:true })
        ]
    }),
    Trivia.Question.create({
        gameId: 23,
        image: 'assets/img/sananlaskut/san9.jpg',
        questionText: 'Alku aina hankalaa',
        answers: [
            Trivia.Answer.create({ answerText: 'lopussa kiitos seisoo', correct:true }),
            Trivia.Answer.create({ answerText: 'loppu vielä hankalampaa' }),
            Trivia.Answer.create({ answerText: 'kaikesta kuitenkin selvitään' })
        ]
    }),
    Trivia.Question.create({
        gameId: 23,
        image: 'assets/img/sananlaskut/san10.jpg',
        questionText: 'Mikä laulaen tulee',
        answers: [
            Trivia.Answer.create({ answerText: 'se helposti tulee' }),
            Trivia.Answer.create({ answerText: 'se viheltäen menee', correct:true }),
            Trivia.Answer.create({ answerText: 'on pian kulutettu' })
        ]
    }),
    Trivia.Question.create({
        gameId: 23,
        image: 'assets/img/sananlaskut/san11.jpg',
        questionText: 'Parempi on katsoa',
        answers: [
            Trivia.Answer.create({ answerText: 'kuin katua', correct:true }),
            Trivia.Answer.create({ answerText: 'kuin kaatua' }),
            Trivia.Answer.create({ answerText: 'ja kuunnella' })
        ]
    }),
    Trivia.Question.create({
        gameId: 23,
        image: 'assets/img/sananlaskut/san12.jpg',
        questionText: 'Kel\' onni on',
        answers: [
            Trivia.Answer.create({ answerText: 'sen kaikille kertokoon' }),
            Trivia.Answer.create({ answerText: 'sen sydän riemuitsee' }),
            Trivia.Answer.create({ answerText: 'se onnen kätkeköön', correct:true })
        ]
    }),
    Trivia.Question.create({
        gameId: 23,
        image: 'assets/img/sananlaskut/san13.jpg',
        questionText: 'Ei niin pahaa',
        answers: [
            Trivia.Answer.create({ answerText: 'ettei syödä voisi' }),
            Trivia.Answer.create({ answerText: 'ettei jotain hyvääkin', correct:true }),
            Trivia.Answer.create({ answerText: 'kuin luulisi' })
        ]
    }),
    Trivia.Question.create({
        gameId: 23,
        image: 'assets/img/sananlaskut/san14.jpg',
        questionText: 'Sitä kuusta kuuleminen',
        answers: [
            Trivia.Answer.create({ answerText: 'jonka juurella asuvi', correct:true }),
            Trivia.Answer.create({ answerText: 'jonka oksia sahaa' }),
            Trivia.Answer.create({ answerText: 'jonka jouluna koristelee' })
        ]
    }),
    Trivia.Question.create({
        gameId: 23,
        image: 'assets/img/sananlaskut/san15.jpg',
        questionText: 'Jos ei nyt',
        answers: [
            Trivia.Answer.create({ answerText: 'niin milloin?' }),
            Trivia.Answer.create({ answerText: 'niin ainakin ensi vuonna' }),
            Trivia.Answer.create({ answerText: 'niin ei milloinkaan', correct:true })
        ]
    }),
    Trivia.Question.create({
        gameId: 24,
        image: 'assets/img/sananlaskut/san16.jpg',
        questionText: 'Niin metsä vastaa',
        answers: [
            Trivia.Answer.create({ answerText: 'kuin itse tahtoo' }),
            Trivia.Answer.create({ answerText: 'kuin siltä kysytään' }),
            Trivia.Answer.create({ answerText: 'kuin sinne huudetaan', correct:true })
        ]
    }),
    Trivia.Question.create({
        gameId: 24,
        image: 'assets/img/sananlaskut/san17.jpg',
        questionText: 'Työmies on paikkansa',
        answers: [
            Trivia.Answer.create({ answerText: 'ansainnut', correct:true }),
            Trivia.Answer.create({ answerText: 'arvoinen' }),
            Trivia.Answer.create({ answerText: 'mittainen' })
        ]
    }),
    Trivia.Question.create({
        gameId: 24,
        image: 'assets/img/sananlaskut/san18.jpg',
        questionText: 'Kenen leipää syöt',
        answers: [
            Trivia.Answer.create({ answerText: 'sen käskyjä kuuntelet' }),
            Trivia.Answer.create({ answerText: 'sitä ruuasta kiität' }),
            Trivia.Answer.create({ answerText: 'sen lauluja laulat', correct:true })
        ]
    }),
    Trivia.Question.create({
        gameId: 24,
        image: 'assets/img/sananlaskut/san19.jpg',
        questionText: 'Onni yksillä',
        answers: [
            Trivia.Answer.create({ answerText: 'murhe muilla' }),
            Trivia.Answer.create({ answerText: 'kesä kaikilla', correct:true }),
            Trivia.Answer.create({ answerText: 'taivaanranta kaikilla' })
        ]
    }),
    Trivia.Question.create({
        gameId: 24,
        image: 'assets/img/sananlaskut/san20.jpg',
        questionText: 'Ei yö niin pitkä',
        answers: [
            Trivia.Answer.create({ answerText: 'kuin unettomasta tuntuu' }),
            Trivia.Answer.create({ answerText: 'ettei aamu sarasta' }),
            Trivia.Answer.create({ answerText: 'ettei päivä perässä', correct:true })
        ]
    }),
    Trivia.Question.create({
        gameId: 24,
        image: 'assets/img/sananlaskut/san21.jpg',
        questionText: 'Ei suuret sanat',
        answers: [
            Trivia.Answer.create({ answerText: 'suuta halkaise', correct:true }),
            Trivia.Answer.create({ answerText: 'suuta sulje' }),
            Trivia.Answer.create({ answerText: 'vaan suuret teot' })
        ]
    }),
    Trivia.Question.create({
        gameId: 24,
        image: 'assets/img/sananlaskut/san22.jpg',
        questionText: 'Uni ja ruoka maittaa',
        answers: [
            Trivia.Answer.create({ answerText: 'mutta työ sitä haittaa' }),
            Trivia.Answer.create({ answerText: 'mutta työ on kuin tervaa', correct:true }),
            Trivia.Answer.create({ answerText: 'mutta aika päälle painaa' })
        ]
    }),
    Trivia.Question.create({
        gameId: 24,
        image: 'assets/img/sananlaskut/san23.jpg',
        questionText: 'Ahkeruus',
        answers: [
            Trivia.Answer.create({ answerText: 'aina palkitaan' }),
            Trivia.Answer.create({ answerText: 'on onnen äiti' }),
            Trivia.Answer.create({ answerText: 'kovankin onnen voittaa', correct:true })
        ]
    }),
    Trivia.Question.create({
        gameId: 24,
        image: 'assets/img/sananlaskut/san24.jpg',
        questionText: 'Ei vara',
        answers: [
            Trivia.Answer.create({ answerText: 'venettä kaada', correct:true }),
            Trivia.Answer.create({ answerText: 'pankkeja kaada' }),
            Trivia.Answer.create({ answerText: 'ole vaaraksi' })
        ]
    }),
    Trivia.Question.create({
        gameId: 24,
        image: 'assets/img/sananlaskut/san25.jpg',
        questionText: 'Hätä',
        answers: [
            Trivia.Answer.create({ answerText: 'lukee lakia' }),
            Trivia.Answer.create({ answerText: 'keinot keksii', correct:true }),
            Trivia.Answer.create({ answerText: 'keinot karkottaa' })
        ]
    }),
    Trivia.Question.create({
        gameId: 24,
        image: 'assets/img/sananlaskut/san26.jpg',
        questionText: 'Suo siellä',
        answers: [
            Trivia.Answer.create({ answerText: 'vettä täällä' }),
            Trivia.Answer.create({ answerText: 'kangasmetsä täällä' }),
            Trivia.Answer.create({ answerText: 'vetelä täällä', correct:true })
        ]
    }),
    Trivia.Question.create({
        gameId: 24,
        image: 'assets/img/sananlaskut/san27.jpg',
        questionText: 'Jos haluat rauhaa',
        answers: [
            Trivia.Answer.create({ answerText: 'valmistaudu sotaan', correct:true }),
            Trivia.Answer.create({ answerText: 'rakenna sopu' }),
            Trivia.Answer.create({ answerText: 'älä jännitä joustasi' })
        ]
    }),
    Trivia.Question.create({
        gameId: 24,
        image: 'assets/img/sananlaskut/san28.jpg',
        questionText: 'Myöhäistä on tuoda vettä',
        answers: [
            Trivia.Answer.create({ answerText: 'kun jano on sammunut' }),
            Trivia.Answer.create({ answerText: 'kun talo on palanut', correct:true }),
            Trivia.Answer.create({ answerText: 'kun kiuas on kylmennyt' })
        ]
    }),
    Trivia.Question.create({
        gameId: 24,
        image: 'assets/img/sananlaskut/san29.jpg',
        questionText: 'Seinilläkin on',
        answers: [
            Trivia.Answer.create({ answerText: 'kovaääniset' }),
            Trivia.Answer.create({ answerText: 'kaiuttimet' }),
            Trivia.Answer.create({ answerText: 'korvat', correct:true })
        ]
    }),
    Trivia.Question.create({
        gameId: 24,
        image: 'assets/img/sananlaskut/san30.jpg',
        questionText: 'Kaikki tiet vievät',
        answers: [
            Trivia.Answer.create({ answerText: 'Roomaan', correct:true }),
            Trivia.Answer.create({ answerText: 'perille' }),
            Trivia.Answer.create({ answerText: 'sinne minne jalkasi osoittavat' })
        ]
    }),
    Trivia.Question.create({
        gameId: 25,
        image: 'assets/img/sananlaskut/san31.jpg',
        questionText: 'Anna sen kiven olla',
        answers: [
            Trivia.Answer.create({ answerText: 'joka taloasi kannattaa' }),
            Trivia.Answer.create({ answerText: 'jota et jaksa kantaa', correct:true }),
            Trivia.Answer.create({ answerText: 'joka kirkkauttaan kiiltää' })
        ]
    }),
    Trivia.Question.create({
        gameId: 25,
        image: 'assets/img/sananlaskut/san32.jpg',
        questionText: 'Jokainen on oman',
        answers: [
            Trivia.Answer.create({ answerText: 'kohtalonsa vanki' }),
            Trivia.Answer.create({ answerText: 'onnensa onkija' }),
            Trivia.Answer.create({ answerText: 'onnensa seppä', correct:true })
        ]
    }),
    Trivia.Question.create({
        gameId: 25,
        image: 'assets/img/sananlaskut/san33.jpg',
        questionText: 'Joka toiselle kuoppaa kaivaa',
        answers: [
            Trivia.Answer.create({ answerText: 'se itse siihen lankeaa', correct:true }),
            Trivia.Answer.create({ answerText: 'se mieltä myöhemmin vaivaa' }),
            Trivia.Answer.create({ answerText: 'se omaa onneansa raivaa' })
        ]
    }),
    Trivia.Question.create({
        gameId: 25,
        image: 'assets/img/sananlaskut/san34.jpg',
        questionText: 'Arvaa oma tilasi',
        answers: [
            Trivia.Answer.create({ answerText: 'ja korjaa pahat pilasi' }),
            Trivia.Answer.create({ answerText: 'anna arvo toisillekin', correct:true }),
            Trivia.Answer.create({ answerText: 'tunne omat vikasi' })
        ]
    }),
    Trivia.Question.create({
        gameId: 25,
        image: 'assets/img/sananlaskut/san35.jpg',
        questionText: 'Pata kattilaa soimaa',
        answers: [
            Trivia.Answer.create({ answerText: 'samat hiilet kummallakin' }),
            Trivia.Answer.create({ answerText: 'sama keitto kummassakin' }),
            Trivia.Answer.create({ answerText: 'musta kylki kummallakin', correct:true })
        ]
    }),
    Trivia.Question.create({
        gameId: 25,
        image: 'assets/img/sananlaskut/san36.jpg',
        questionText: 'Itku',
        answers: [
            Trivia.Answer.create({ answerText: 'pitkästä ilosta', correct:true }),
            Trivia.Answer.create({ answerText: 'suuresta surusta' }),
            Trivia.Answer.create({ answerText: 'mielen parantaa' })
        ]
    }),
    Trivia.Question.create({
        gameId: 25,
        image: 'assets/img/sananlaskut/san37.jpg',
        questionText: 'Nauru',
        answers: [
            Trivia.Answer.create({ answerText: 'ilon pirttiin tuopi' }),
            Trivia.Answer.create({ answerText: 'pidentää ikää', correct:true }),
            Trivia.Answer.create({ answerText: 'on itkun kääntöpuoli' })
        ]
    }),
    Trivia.Question.create({
        gameId: 25,
        image: 'assets/img/sananlaskut/san38.jpg',
        questionText: 'Oma apu',
        answers: [
            Trivia.Answer.create({ answerText: 'onnen tuopi' }),
            Trivia.Answer.create({ answerText: 'aina lähellä' }),
            Trivia.Answer.create({ answerText: 'paras apu', correct:true })
        ]
    }),
    Trivia.Question.create({
        gameId: 25,
        image: 'assets/img/sananlaskut/san39.jpg',
        questionText: 'Joka tuuleen kylvää',
        answers: [
            Trivia.Answer.create({ answerText: 'se myrskyä niittää', correct:true }),
            Trivia.Answer.create({ answerText: 'se myrskyssä seilaa' }),
            Trivia.Answer.create({ answerText: 'sen ei sielu tyventä löydä' })
        ]
    }),
    Trivia.Question.create({
        gameId: 25,
        image: 'assets/img/sananlaskut/san40.jpg',
        questionText: 'Sanasta miestä',
        answers: [
            Trivia.Answer.create({ answerText: 'hännästä hevosta' }),
            Trivia.Answer.create({ answerText: 'sarvista härkää', correct:true }),
            Trivia.Answer.create({ answerText: 'liekistä lohikäärmettä' })
        ]
    }),
    Trivia.Question.create({
        gameId: 25,
        image: 'assets/img/sananlaskut/san41.jpg',
        questionText: 'Älä usko',
        answers: [
            Trivia.Answer.create({ answerText: 'ennen kuin todistetaan' }),
            Trivia.Answer.create({ answerText: 'ennen kuin kuulet uutisista' }),
            Trivia.Answer.create({ answerText: 'ennen kuin näet', correct:true })
        ]
    }),
    Trivia.Question.create({
        gameId: 25,
        image: 'assets/img/sananlaskut/san42.jpg',
        questionText: 'Varmaa on se',
        answers: [
            Trivia.Answer.create({ answerText: 'mikä on kädessä', correct:true }),
            Trivia.Answer.create({ answerText: 'mikä on sydämessä' }),
            Trivia.Answer.create({ answerText: 'mikä lukee lehdessä' })
        ]
    }),
    Trivia.Question.create({
        gameId: 25,
        image: 'assets/img/sananlaskut/san43.jpg',
        questionText: 'Ei kettu sovi tuomariksi',
        answers: [
            Trivia.Answer.create({ answerText: 'kanalan kahakkaan' }),
            Trivia.Answer.create({ answerText: 'hanhen oikeusjuttuun', correct:true }),
            Trivia.Answer.create({ answerText: 'korpin puolesta puhujaksi' })
        ]
    }),
    Trivia.Question.create({
        gameId: 25,
        image: 'assets/img/sananlaskut/san44.jpg',
        questionText: 'Ei yksi pääsky',
        answers: [
            Trivia.Answer.create({ answerText: 'kesää aloita' }),
            Trivia.Answer.create({ answerText: 'suvea soita' }),
            Trivia.Answer.create({ answerText: 'kesää tee', correct:true })
        ]
    }),
    Trivia.Question.create({
        gameId: 25,
        image: 'assets/img/sananlaskut/san45.jpg',
        questionText: 'Joka miekkaan tarttuu',
        answers: [
            Trivia.Answer.create({ answerText: 'se miekkaan kaatuu', correct:true }),
            Trivia.Answer.create({ answerText: 'se ei rauhaa rakasta' }),
            Trivia.Answer.create({ answerText: 'ei kunnian kujalla kävele' })
        ]
    }),
    Trivia.Question.create({
        gameId: 25,
        image: 'assets/img/sananlaskut/san46.jpg',
        questionText: 'Sanoista',
        answers: [
            Trivia.Answer.create({ answerText: 'sovinto syntyy' }),
            Trivia.Answer.create({ answerText: 'sodat tulevat', correct:true }),
            Trivia.Answer.create({ answerText: 'rauha rakentuu' })
        ]
    }),
    Trivia.Question.create({
        gameId: 25,
        image: 'assets/img/sananlaskut/san47.jpg',
        questionText: 'Hullu paljon työtä tekee',
        answers: [
            Trivia.Answer.create({ answerText: 'laiskajaakko ei laisinkaan' }),
            Trivia.Answer.create({ answerText: 'vaikka ei ois paikka' }),
            Trivia.Answer.create({ answerText: 'viisas pääsee vähemmällä', correct:true })
        ]
    }),
    Trivia.Question.create({
        gameId: 25,
        image: 'assets/img/sananlaskut/san48.jpg',
        questionText: 'Työ tekijäänsä',
        answers: [
            Trivia.Answer.create({ answerText: 'kiittää', correct:true }),
            Trivia.Answer.create({ answerText: 'neuvoo' }),
            Trivia.Answer.create({ answerText: 'elättää' })
        ]
    }),
    Trivia.Question.create({
        gameId: 25,
        image: 'assets/img/sananlaskut/san49.jpg',
        questionText: 'Ei kaikki ole sitä',
        answers: [
            Trivia.Answer.create({ answerText: 'mitä tilaat' }),
            Trivia.Answer.create({ answerText: 'miltä näyttää', correct:true }),
            Trivia.Answer.create({ answerText: 'eikä tätä' })
        ]
    }),
    Trivia.Question.create({
        gameId: 25,
        image: 'assets/img/sananlaskut/san50.jpg',
        questionText: 'Ei sota yhtä',
        answers: [
            Trivia.Answer.create({ answerText: 'juhlaa ole' }),
            Trivia.Answer.create({ answerText: 'eikä toistakaan' }),
            Trivia.Answer.create({ answerText: 'miestä kaipaa', correct:true })
        ]
    })

];

Trivia.medias = [
        Trivia.Media.create({
            guid: 1,
            mediaType: 'mp3',
			url: 'https://pienipiiri.s3.amazonaws.com/trivia/assets/new/kulkurinvalssi1.mp3'
        }),
        Trivia.Media.create({
            guid: 2,
            mediaType: 'mp3',
			url: 'https://pienipiiri.s3.amazonaws.com/trivia/assets/new/lapsuudentoverille1.mp3'
        }),
        Trivia.Media.create({
            guid: 3,
            mediaType: 'mp3',
			url: 'https://pienipiiri.s3.amazonaws.com/trivia/assets/new/valiaikainen1.mp3'
        }),
        Trivia.Media.create({
            guid: 4,
            mediaType: 'mp3',
			url: 'https://pienipiiri.s3.amazonaws.com/trivia/assets/new/tulipunaruusut1.mp3'
        }),
        Trivia.Media.create({
            guid: 5,
			mediaType: 'mp3',
			url: 'https://pienipiiri.s3.amazonaws.com/trivia/assets/new/suutarinemannankehtolaulu.mp3'
        }),
        Trivia.Media.create({
            guid: 6,
            mediaType: 'mp3',
			url: 'https://pienipiiri.s3.amazonaws.com/trivia/assets/new/voituotamuistia.mp3'
        }),
        Trivia.Media.create({
            guid: 7,
            mediaType: 'mp3',
			url: 'https://pienipiiri.s3.amazonaws.com/trivia/assets/new/puhelinlangatlaulaa.mp3'
        }),
        Trivia.Media.create({
            guid: 8,
            mediaType: 'mp3',
			url: 'https://pienipiiri.s3.amazonaws.com/trivia/assets/new/sellanenolviipuri.mp3'
        }),
        Trivia.Media.create({
            guid: 9,
            mediaType: 'mp3',
			url: 'https://pienipiiri.s3.amazonaws.com/trivia/assets/new/kotkanpoikiiilmansiipii.mp3'
        }),
        Trivia.Media.create({
            guid: 10,
            mediaType: 'mp3',
			url: 'https://pienipiiri.s3.amazonaws.com/trivia/assets/new/satumaa.mp3'
        }),
		Trivia.Media.create({
	            guid: 11,
	            mediaType: 'mp3',
				url: 'https://pienipiiri.s3.amazonaws.com/trivia/assets/new/kulkurinvalssi2.mp3'
		}),
		Trivia.Media.create({
			guid: 12,
			mediaType: 'mp3',
			url:'https://pienipiiri.s3.amazonaws.com/trivia/assets/new/lapsuudentoverille2.mp3'
		}),
		Trivia.Media.create({
			guid: 13,
			mediaType: 'mp3',
			url:'https://pienipiiri.s3.amazonaws.com/trivia/assets/new/valiaikainen2.mp3'
		}),
		Trivia.Media.create({
			guid: 14,
			mediaType: 'mp3',
			url:'https://pienipiiri.s3.amazonaws.com/trivia/assets/new/tulipunaruusut2.mp3'
		})

    ];

soundManager.defaultOptions = {
	autoLoad: true,
	preferFlash: false,
	autoPlay: false,
	stream: false
}
soundManager.setupOptions = {
	preferFlash: false
}

Trivia.ProgressbarView = Em.View.extend({
	templateName: 'progressbarView',
	classNames: 'progressbar-view'.w(),
	valueDidChange: function(){
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
			var markerElement = $('<div class="marker"></div>').css({
				left: marker * 100 + '%'
			})
			wrapper.append(markerElement);
		});

	}.observes('markerPositions'),
	activeDidChange: function(){
	}.observes('active')
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

function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}

$(document).ready(function(){
	new FastClick(document.body);
	Trivia.initialize();
});

$(window).unload(function() {
    var sounds = ['tada', 'sadtrombone', 'winner'];
    for (var i = 0; i < sounds.length; i++) {
        soundManager.destroySound(sounds[i]);
    }
    if (Trivia.medias.length) {
        for (var i = 0; i < Trivia.medias.length; i++) {
            var media = Trivia.medias[i];
            soundManager.destroySound('trivia-'+media.get('guid'));
        }
    }
});

$(document).ready(resizeText);
$(window).resize(resizeText);


$('body').on('touchstart', '*[data-ember-action]', function(a,b,c){
	console.log('setting active class');
	var self = this;
	$(this).addClass('active');

	setTimeout(function(){
		$(self).removeClass('active');
	}, 300);
});