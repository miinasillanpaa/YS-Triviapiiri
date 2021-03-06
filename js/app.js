var Trivia = Em.Application.create({
	INTERVAL_BUFFER_SIZE_MS: 2000,
    exitUrl: null,
    ready: function() {

        // var userId = getURLParameter('userId');
        // if (userId && userId != 'null') {
        //     Trivia.set('router.applicationController.userId', parseInt(userId));
        // }
        // var source = getURLParameter('source');
        // if (source == 'ios') {
        //     this.set('exitUrl', 'http://pienipiiri.fi/webapp/?userId=' + userId);
        // } else if (source == 'null' || !source) {
        //     this.set('exitUrl', 'http://pienipiiri.fi/mobile/?userId=' + userId);
        // }
    },
	ApplicationController: Em.Controller.extend({
        backendHost: 'http://pienipiiri.fi/',
		userId: null
	}),
	ApplicationView: Em.View.extend({
		templateName: 'application'
	}),

	PreSelectGameView: Em.View.extend({
		templateName: 'pre-select-game',
		classNames: 'select-game-view pre-select-game-view'.w(),

		preSelectGameCollectionView: Em.CollectionView.extend({
			tagName: 'ul',
			classNames: 'select-game-view pre-select-game-view'.w(),
			contentBinding: 'Trivia.gameTypes',
			itemViewClass: Em.View.extend({
				tagName: 'li',
				classNames:'answer-view',
				bgStyle: function(){
					if (this.get('content.image')) {
						return 'background-image: url(' + this.get('content.image') + ')';
					}
				}.property('content.image')
			})
		})


	}),

	PreSelectGameController: Em.Controller.extend({

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
	GameNotStartedActionView: Em.View.extend({
		templateName: 'game-not-started-action',
		classNames: 'game-not-started game-not-started-action'.w()
	}),
	GameNotStartedActionController: Em.Controller.extend({}),

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
			template: Handlebars.compile('Joo')

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


	MediaCaptionView: Em.View.extend({
		classNames: 'media-caption-view'.w(),
		contentBinding: 'Trivia.router.gameController.questionImageCaption',
		contentDidChange: function(){
			if(this.get('content')){
				$(this.get('element')).html('<span>kuva: ' + this.get('content') + '</span>');
			}
		}.observes('content'),
		didInsertElement:function () {
			//TODO: no idea why the content doesn't get updated automatically but this works as a temp fix
			this.contentDidChange();
		}
	}),
	MediaCaptionController: Em.Controller.extend({}),

	MediaDisplayView: Em.View.extend({
		classNames:'media-display-view'.w(),
		contentBinding: 'Trivia.router.gameController.questionImage',
		contentDidChange:function () {
			if (this.get('content')) {
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
	ProceedButtonLorutView: Em.View.extend({
		classNames: 'btn btn-primary process-button-view'.w(),
		template: Handlebars.compile('Jatka lorua <i class=" icon-circle-arrow-right"></i>'),
		click: function(){
			Trivia.router.send('nextQuestion');
		}
	}),

	//action game stuff
	//ActionGameStartedController: Em.Controller.extend({}),
	ActionGameStartedView: Em.View.extend({
		classNames: 'action-game-started-view'.w(),
		templateName: 'action-game-started',
		contentBinding: 'Trivia.router.gameController.questionImage',
		contentDidChange:function () {
			if (this.get('content')) {
				// console.log('content changed', this.get('content'));
				// console.log('background changed', this.get('element'));
				$(this.get('element')).css({
					'background-image':'url(' + this.get('content') + ')'
				})
			}
		}.observes('content'),

		didInsertElement:function () {
			// console.warn('element added');
			if(Trivia.router.get('gameController.media.mediaType') !== 'mp3'){
				$('button#next-question').removeClass('hidden');
			}

			//TODO: no idea why the content doesn't get updated automatically but this works as a temp fix
			this.contentDidChange();
		}
	}),
	ActionSubtitleController: Em.Controller.extend({}),
	ActionSubtitleView: Em.View.extend({
		templateName: 'action-subtitle',
		classNames: 'subtitle'.w(),
		contentBinding: 'content.questionText',
		subsDidChange: function() {
			if(this.get('content')) {
				return this.get('content.questionText');

			}
		}.observes('content'),
		didInsertElement: function() {
			console.warn('subs init');
			this.subsDidChange();
		}
	}),
	ActionVideoGameStartedView: Em.View.extend({
		templateName: 'action-video-game-started',
		classNames: 'action-video'.w(),
		contentBinding: 'content.videoUrl',
		videoUrlDidChange: function(){
			if(this.get('content')) {
				// console.log( this.get('content'));
				return this.get('content.videoUrl')
			}
		}.observes('content')
	}),
	GameFinishedActionController: Em.Controller.extend({}),
	GameFinishedActionView: Em.View.extend({
		templateName: 'game-finished-action',
		classNames: 'game-finished game-finished-action-view'.w(),
		didInsertElement: function(){
			if(Trivia.router.get('gameController.content.guid') === 37 || Trivia.router.get('gameController.content.guid') === 38 ){
				$('.feedback-text').text('Miten jumppa sujui tänään?');
			}else if(Trivia.router.get('gameController.content.guid') === 39 || Trivia.router.get('gameController.content.guid') === 40 ){
				$('.feedback-text').text('Jumppaa myös musiikin mukana!')
			}else if(Trivia.router.get('gameController.content.guid') === 30 || Trivia.router.get('gameController.content.guid') === 31 ){
				$('.feedback-text').text('Miltä laulaminen tuntui tänään?')
			}
		}
	}),

	// end of action game stuff

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

		getCurrentQuestion: function(){
			if(this.get('currentQuestion')){
				return this.get('currentQuestion');
			}else{
				return false;
			}
		},

		questionImageCaption: function(){
			//console.log('question image caption', this.get('currentQuestion'));
			//console.log('game image caption', this.get('content.caption'));
			if(this.get('currentQuestion.caption')){
				// console.log('found question image caption', this.get('currentQuestion.caption'));
				return this.get('currentQuestion.caption');
			}else if(this.get('content.caption')){
				// console.log('found game image caption', this.get('content.caption'));
				return this.get('content.caption');
			}else{
				return false;
			}
		}.property('caption', 'currentQuestion'),

		questionText: function(){
			if(this.get('currentQuestion.questionText')){
				return this.get('currentQuestion.questionText')
			}else{
				return false;
			}
		}.property('questionText','currentQuestion'),

		captionBinding: 'content.caption', // Copyright info
		gameTypeBinding: 'content.gameType',

		isSinglePlayerGame: null,
		isActionGame: false,
		isLorutGame: false,
		backVisible: false,

		mediaState: 'stopped', //can be either 'stopped' or 'playing'
		mediaPosition: 0, //Media position in % from the start. Updated on the fly by playInterval()
		mediaAbsolutePosition: 0,

		moodRatingBinding: 'Trivia.router.moodmeterController.value',

		gameFinished: false,

		gameCredits: function(){
			if (Trivia.router.get('gameController.content.credits')){
				return Trivia.router.get('gameController.content.credits');
			}

		}.property('playedGameId'),

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
		videoUrl: null,
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
					// console.log('saveGameStart - no backend for web version');
            // console.log('saving game start to backend');
            // if (this.get('content')) {
            //     var gameId = this.get('content.guid');
            //     var userId = Trivia.get('router.applicationController.userId');


                // console.log('saving game start to backend with parameters gameId: ' + gameId + ' userId: ' + userId);
                // if (gameId && userId) {
                //     $.ajax({
                //         url: '/saveEvent',
                //         type: 'POST',
                //         data: { type: 'startGame', gameId: gameId, userId: userId },
                //         success: function(response) {
                //             if (response && !isNaN(response)) {
                //                 Trivia.set('router.gameController.playedGameId', response);
                //             }
                //         }
                //     });
                // }
            // }
        },

        saveGameEnd: function() {

            var rightAnswers = this.get('correctAnswers');
            // console.log('saving game end to backend', rightAnswers+'/'+this.get('questions').length);
            var participants = 'unknown';
            // console.log('is single player game' + this.get('isSinglePlayerGame'));
            if (this.get('isSinglePlayerGame') === true) {
                participants = 'alone';
            } else if (this.get('isSinglePlayerGame') === false) {
                participants = 'with friend';
            }
            var playedGameId = Trivia.get('router.gameController.playedGameId');

            //save actiongame result to backend also
            if(Trivia.router.get('gamesController.gameType') === 'action'){
				rightAnswers = 1000;
            }

						// console.log('no backend for web version');
            // if (rightAnswers && participants && playedGameId) {
            //     console.log('saving game end to backend with parameters rightAnswers: ' + rightAnswers + ' participants: ' + participants + ' playedGameId: ' + playedGameId);
            //     $.ajax({
            //         url:'/saveEvent',
            //         type: 'POST',
            //         data: { type: 'endGame', rightAnswerAmount: rightAnswers, participants: participants, playedGameId: playedGameId },
            //         success: function(response) {
						//
            //         }
            //     });
            // }
        },

        saveGameFeedback: function(mood) {
					// console.log('no backend for web version');
            // console.log('saving game feedback to backend');
            // var playedGameId = Trivia.get('router.gameController.playedGameId');
            // if (playedGameId && mood) {
            //     var mood = mood;
            //     //console.log('saving game feedback with parameters playedGameId: ' + playedGameId + ' feedback: ' + mood);
            //     $.ajax({
            //         url: '/saveEvent',
            //         type: 'POST',
            //         data: { type: 'gameFeedback', playedGameId: playedGameId, feedback: mood },
            //         success: function(response) {
						//
            //         }
            //     });
            // }
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

							// console.warn('gaplessres', filename + '_gapless' + filetype);

							return filename + '_gapless' + filetype;
							//.match(/\.(.*$)/)
						}(),
						autoplay: false,
						onload: function(status){
							//notify router of finished asset loading
							Trivia.router.send('assetLoadingComplete');
						},
						whileloading: function(){
							self.set('mediaLoadProgress', this.bytesLoaded / this.bytesTotal);
						}
					})
					/*,
					bRes:
					 */
				})
			}

			this.set('media', media);

			// console.log('media changed');
		}.observes('currentQuestion.mediaId'),

		/**
		 * plays the current song interval specified by Trivia.Question.media.
		 * @param fromEnd used to replay fromEnd amount of seconds from the end of the interval
		 */
		fullReplay: function(){
			if (this.get('media.gaplessRes')){
				Trivia.router.send('startedPlaying');
				var that = this;
				if( Trivia.router.get('gameController.currentQuestion.options.changeAt') !== "pressed"){
					setTimeout(function(){
						that.get('media.gaplessRes').play({
							position: 0,

							whileplaying: function(){
								Trivia.router.set('gameController.mediaPosition', that.position / that.duration);
								Trivia.router.set('gameController.mediaAbsolutePosition', that.position);
								Trivia.router.set('gameController.mediaPlaying', true);
								//console.log(Trivia.router.get('gameController.currentQuestion.options.showAt'))

								if ( this.position > Trivia.router.get('gameController.currentQuestion.options.changeAt') ) {
									//console.log('next');
									Trivia.router.send('nextQuestion');
								}
							},
							onfinish: function(){
								Trivia.router.set('gameController.mediaPlaying', false);
								Trivia.router.send('finishedPlaying');
							}
						})
					},1000)

				}else{
					console.log('expecting pressing');
				}

			} else {
				throw 'no media found'
			}
		},
		playEnd: function(){
			//get the last item from questions
			var questionIndex = Trivia.router.get('gameController.questions.length');
			var startingPosition = Trivia.router.get('gameController.questions.lastObject.options.playTo') + (Trivia.INTERVAL_BUFFER_SIZE_MS * questionIndex);



			if (this.get('media.res')){

				console.log('song left', this.get('media.res'), this.get('media.res').duration - this.get('media.res').position);
				var songLeft = this.get('media.res').duration - this.get('media.res').position;

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
				Trivia.router.send('startedPlaying', songLeft);
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
				//todo if gametype is undefined goto /games
				route: '/',
				redirectsTo: 'preSelectGame'
			}),


			preSelectGame: Ember.Route.extend({
				route: '/games',

				connectOutlets: function(router){
					router.get('gameController').set('backVisible', false);
					router.get('applicationController').connectOutlet('preSelectGame');
					router.get('gameController').set('isActionGame', false);
				},

				selectGametype: function(router, event, data){
					var target = event.view.content.target;
					router.set('gamesController.gameType', target);
					router.transitionTo('root.games.index');
				}

			}),

			games: Ember.Route.extend({
				route: '/games/:gameType',

				serialize: function(router, context){
					return {
						gameType: router.get('gamesController.gameType')
					}
				},

				deserialize: function(router, params){

				},
				connectOutlets: function(router){
					if (router.get('gamesController.gameType') === 'music'){
						Trivia.set('games', Trivia.gameObjects.music);
						router.get('gameController').set('gameTypeTitle', 'Valitse soitettava kappale');
						router.get('gameController').set('isActionGame', false);

					} else if(router.get('gamesController.gameType') === 'lorut') {
						Trivia.set('games', Trivia.gameObjects.lorut);
						router.get('gameController').set('gameTypeTitle', 'Tunnetko lorut?');
						router.get('gameController').set('isActionGame', false);

					} else if(router.get('gamesController.gameType') === 'action') {
						Trivia.set('games', Trivia.gameObjects.action);
						router.get('gameController').set('gameTypeTitle', 'Valitse musiikki tai jumppa');
                        router.get('gameController').set('isActionGame', true);

					}else{
						Trivia.set('games', Trivia.gameObjects.plain);
						router.get('gameController').set('gameTypeTitle', 'Valitse pelattava muistipeli');
						router.get('gameController').set('isActionGame', false);
					}
				},

				index: Em.Route.extend({
					route: '/',
					connectOutlets: function(router){
						router.get('gameController').set('backVisible', true);
						router.get('applicationController').connectOutlet('games');

						//make sure zombie songs stop playing
						soundManager.stopAll();
					},

					back: function(router){
						router.transitionTo('root.index');
					},
                    finishedPlaying: function() {

                    },
                    loadingComplete: function() {

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
						if(game && game.get('videoUrl')){
							window.videoUrl = game.get('videoUrl');
						}

						console.warn('connecting game outlets', game, game.get('name'));


						router.get('applicationController').connectOutlet('game', game);

						//hook up the questions
						var gameId = parseInt(router.get('gameController.content.guid'));
						var questions = Trivia.questions.filterProperty('gameId', gameId);

						router.set('gameController.questionIndex', 0);
						router.set('gameController.correctAnswers', 0);
						router.set('gameController.moodRating', null);
						router.set('gameController.isSinglePlayerGame', null);

						//previously this was done in savegamestart function.
						//needed so that gameCredits update correctly
						router.set('gameController.playedGameId', gameId);

						//randomize the questions if we're not on an audio game
						if (game.get('gameType') === 'plain'){
							questions = questions.sort(function() {return 0.5 - Math.random()});
						}else if(game.get('gameType') === 'redirectToLorut'){
							//todo smarter way to navigate to root of lorut?
							// console.log('redirect')
							router.set('gamesController.gameType', 'lorut');
							Trivia.set('games', Trivia.gameObjects.lorut);
							router.transitionTo('root.games.index');
							return false;
							//window.location = 'http://pienipiiri.fi/triviapiiri/#/games/lorut/'
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
							// console.log('notLoaded');
							router.get('gameController').connectOutlet('gameLoading');
							// console.log(router.get('gameController'));

							if (!router.get('gameController.media') || router.get('gameController.media.mediaType') === "no-sound" || router.get('gameController.content.gameType') === "video"){

								if(router.get('gameController.media.mediaType') === "no-sound"){
									var questions = router.get('gameController.questions');
									for(var i=0; i<questions.length; i++) {
										if(questions[i].image){
											preloadImage(questions[i].image);
										}
									}
								}

								//proceed further if no media
								console.log('no media');
								router.send('loadingComplete');

							} else if ( router.get('gamesController.gameType') !== 'action' && router.get('gameController.media') && router.get('gameController.media.res.loaded') ){
								console.log('sending loading completed res');
								router.send('loadingComplete');

							} else if(router.get('gamesController.gameType') === 'action' && router.get('gameController.media') && router.get('gameController.media.gaplessRes.loaded') ){
								console.log('sending loading completes gapless res');
								router.send('loadingComplete');

								var questions = router.get('gameController.questions');
								for(var i=0; i<questions.length; i++) {
									if(questions[i].image){
										preloadImage(questions[i].image);
									}
								}
							}
						},
						loadingComplete: function(router){
							// console.log('loading complete', router.get('gameController.mediaLoadProgress'));
							//router.set('gameController.mediaLoadProgress', 1);
							router.transitionTo('loaded');

						},
						assetLoadingComplete: function(router){
							if(router.get('gamesController.gameType') === "action"){
								var questions = router.get('gameController.questions');
								for(var i=0; i<questions.length; i++) {
									if(questions[i].image){
										preloadImage(questions[i].image);
									}
								}
							}

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
								if(router.get('gamesController.gameType') === 'action'){
									console.log('action notstarted');
									router.get('gameController').connectOutlet('gameNotStartedAction');

								}else{
									if (router.get('gameController.content.gameType') === 'audio'){
										// console.warn('audio notStarted', router.get('gameController.title'));
										router.get('gameController').connectOutlet('gameNotStarted');

									} else if( router.get('gameController.content.gameType') === 'video') {
										// console.warn('video notStarted');
										router.get('gameController').connectOutlet('gameNotStarted');

									} else {
										// console.warn('plain notStarted');
										router.get('gameController').connectOutlet('gameNotStartedPlain');
									}
								}
							},
							_startGame: function(router){
								router.transitionTo('started');
							},
							startGame1P: function(router){
								router.set('gameController.isSinglePlayerGame', true);

								router.send('_startGame');

								// console.log('started 1 player game');

							},
							startGame2P: function(router){
								router.set('gameController.isSinglePlayerGame', false);
								router.send('_startGame');
								// console.log('started 2 player game');
							},
							assetLoadingComplete: function(router){
								// console.log('asset loading complete');
							},
						}),
						started: Em.Route.extend({
							_nextQuestion: function(router){
								router.set('gameController.instantReplayPlayed', false);
								// console.log('setting next question');
								// console.log(router.get('gameController.currentQuestion'));

								//TODO: check if we have a question with media or not
								var media = router.get('gameController.media');
								// console.log(media);
								if (media) {
									if (media.mediaType === 'mp3') {
										//music game or Lorut started from plain games
										if (router.get('gamesController.gameType') === 'music' || router.get('gamesController.gameType') === 'lorut') {
											router.transitionTo('mediaQuestion');
											router.send('playInterval');
										} else {
											router.transitionTo('actionQuiz');
											if(router.get('gameController.mediaState') !== "playing"){
												router.send('fullReplay');
											}
										}
									} else if(media.mediaType === 'no-sound') {
										router.transitionTo('actionQuiz');

									} else {
										throw "unknown media type " + media.mediaType
									}
								}else if(router.get('gameController.content.gameType') === 'video'){
									//check if video
									// console.log('video action quiz');
									router.transitionTo('actionQuizVideo');

								} else {
									router.transitionTo('plainQuestion');
								}

							},
							connectOutlets: function(router, context){
                                router.get('gameController').saveGameStart();
								if( router.get('gamesController.gameType') === 'action' ){
									router.get('gameController').connectOutlet('actionGameStarted');
								}else{
									router.get('gameController').connectOutlet('gameStarted');
								}

								router.send('_nextQuestion');

							},
							actionQuizVideo: Em.Route.extend({
								connectOutlets: function(router, game){
								},
								initialState: 'videoStarted',

								videoStarted: Em.Route.extend({
									initialState: 'videoPlaying',
									connectOutlets: function(router){
										loadYT();
										// console.log('videoStarted');
										router.get('gameController').connectOutlet('actionVideoGameStarted');
										router.transitionTo('videoPlaying');
									}
								}),
								videoPlaying: Em.Route.extend({
									connectOutlets: function(router){

										//console.log(router.get('gameController'));
									},
									back: function(router){
										$('.test-modal').removeClass('hidden');
										pauseVideo();
										router.transitionTo('videoPaused');
									},
									pause: function(router){
										router.transitionTo('videoPaused');
										router.send('resumeWithAlert');
									},
									finishedPlaying: function(router){
										router.transitionTo('finished');
										//router.send('showChoices');
									},
									startedPlaying: function(router){
										router.transitionTo('videoPlaying');
									},
									resume: function(router){
										$('.test-modal').addClass('hidden');
										playVideo();
										router.transitionTo('videoPlaying');
									},
									quit: function(router){
										$('.test-modal').addClass('hidden');
										router.transitionTo('root.games.index');
									},
								}),
								videoPaused: Em.Route.extend({
									connectOutlets: function(router){
									},
									resumeWithAlert: function(router){
										router.transitionTo('videoPlaying');
									},
									resume: function(router){
										$('.test-modal').addClass('hidden');
										playVideo();
										router.transitionTo('videoPlaying');
									},
									quit: function(router){
										$('.test-modal').addClass('hidden');
										router.transitionTo('root.games.index');
									},
								})
							}),
							actionQuiz: Em.Route.extend({

								connectOutlets: function(router){
								},
								initialState: 'mediaStarted',

								mediaStarted: Em.Route.extend({
									initialState: 'mediaPlaying',
									connectOutlets: function(router){
										//console.log(router.get('gameController.currentQuestion'));

										router.get('gameController').connectOutlet('subtitle','actionSubtitle');
									},
									fullReplay: function(router){

										router.get('gameController').fullReplay();
										router.transitionTo('mediaStarted');
									},

									mediaPlaying: Em.Route.extend({
										connectOutlets: function(router){

										},
										back: function(router){
											if(router.get('gameController.media.mediaType') === 'mp3'){
												router.get('gameController.media.gaplessRes').pause();
											}
											router.transitionTo('mediaPaused');
											if (confirm('Haluatko varmasti palata takaisin? Peli lopetaan.')){
												router.transitionTo('root.games.index');
											} else {
												router.send('resume');
											}
										},
										pause: function(router){
											if(router.get('gameController.media.mediaType') === 'mp3'){
												router.get('gameController.media.gaplessRes').pause();
											}
											router.transitionTo('mediaPaused');
											router.send('resumeWithAlert');
										},
										nextQuestion: function(router){
											//soundManager.stopAll();
											// console.log('setting next lyrics');
											var questionIndex = router.get('gameController.questionIndex');
											var gameController = router.get('gameController');

											if (parseInt(gameController.get('questionIndex')) + 1  <  gameController.get('questions.length')){
												// console.log('next lyrics');
												gameController.set('questionIndex', gameController.get('questionIndex') + 1);
												router.send('_nextQuestion');
											} else {
												router.transitionTo('finished');
												// console.log('out of questions');
											}
										},
										startedPlaying: function(router){
											router.transitionTo('mediaPlaying');
										},
										assetLoadingComplete: function(router){
											// console.log('asset loading complete')
										},
										finishedPlaying: function(router){
											router.transitionTo('finished');
										}

									}),
									mediaPaused: Em.Route.extend({
										connectOutlets: function(router){
											router.get('mediaControlsController').connectOutlet('mediaIndicator', 'mediaIndicatorStopped');
										},
										resumeWithAlert: function(router){
											alert('Paina jatkaaksesi');
											if(router.get('gameController.media.mediaType') === 'mp3'){
												router.get('gameController.media.gaplessRes').play();
											}
											router.transitionTo('mediaPlaying');
										},
										resume: function(router){
											if(router.get('gameController.media.mediaType') === 'mp3'){
												router.get('gameController.media.gaplessRes').play();
											}
											router.transitionTo('mediaPlaying');
										}
									})
								})
							}),
							//end of action quiz
							mediaQuestion: Em.Route.extend({

								connectOutlets: function(router){

									router.get('gameStartedController').connectOutlet('left', 'mediaQuestion');
									router.get('gameStartedController').connectOutlet('right', 'answers');

									router.get('mediaQuestionController').connectOutlet('controls', 'mediaControls');
									router.get('mediaQuestionController').connectOutlet('media', 'mediaDisplay');
									router.get('mediaQuestionController').connectOutlet('caption', 'mediaCaption')
								},

								initialState: 'mediaNotStarted',

								mediaNotStarted: Em.Route.extend({


									initialState: 'answerNotChecked',

									connectOutlets: function(router){
										router.get('mediaControlsController').connectOutlet('mediaIndicator', 'mediaIndicatorStopped');
									},
									back: function(router){
										if (confirm('Haluatko varmasti palata takaisin? Peli lopetaan.')){
											router.transitionTo('root.games.index');
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
													// console.log('element found', item);
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
												// console.log('checking answer, correct', answer);

												//add points
												var points = router.get('gameController.correctAnswers');
												router.set('gameController.correctAnswers', parseInt(points) + 1);
												// console.warn('corrects', router.get('gameController.correctAnswers'));
                        router.transitionTo('answerChecked.answeredRight');

											} else {
												// console.log('checking answer, wrong');
												// console.warn('corrects', router.get('gameController.correctAnswers'));
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
											// console.log('answerChecked', foo, bar, this);
											if(router.get('gameController.isLorutGame')){
												router.get('answersController').connectOutlet('action', 'proceedButtonLorut');
											}else{
												router.get('answersController').connectOutlet('action', 'proceedButton');
											}

											//router.get('answersController').connectOutlet('choices', 'empty');

										},

										start: Em.Route.extend({

										}),
										answeredWrong: Em.Route.extend({
											connectOutlets: function(router){
												router.get('answersController').connectOutlet('alert', 'alertWrongAnswer');
											},
											checkAnswer: function(){
												return;
											},
											playEnd: function(router){
												router.get('gameController').playEnd();
											},
											startedPlaying: function(router, waitTime){
												$('.answers-view').html('<div class="alert-outlet"><div class="alert alert-warning"><h3">Kuuntele loppuun</h3></div></div>')
												router.transitionTo('mediaStarted');
												setTimeout(function(){
													router.transitionTo('finished');
												},waitTime-1000);
											}
										}),
										answeredRight: Em.Route.extend({
											connectOutlets: function(router){
												router.get('answersController').connectOutlet('alert', 'alertCorrectAnswer');
											},
											checkAnswer: function(){
												return;
											},
											playEnd: function(router){
												router.get('gameController').playEnd();
											},
											startedPlaying: function(router, waitTime){
												$('.answers-view').html('<div class="alert-outlet"><div class="alert alert-warning"><h3">Kuuntele loppuun</h3></div></div>')
												router.transitionTo('mediaStarted');
												setTimeout(function(){
													router.transitionTo('finished');
												},waitTime-1000);
											}
										}),
										nextQuestion: function(router){
                                            soundManager.stopAll();
											// console.log('setting next question');
											var questionIndex = router.get('gameController.questionIndex');

											var gameController = router.get('gameController');

											if (parseInt(gameController.get('questionIndex')) + 1  <  gameController.get('questions.length')){
												// console.log('next question');
												gameController.set('questionIndex', gameController.get('questionIndex') + 1);
												router.send('_nextQuestion');
											} else {
												router.send('playEnd');
												console.log('out of questions - play to end');
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
												router.transitionTo('root.games.index');
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
									router.get('plainQuestionController').connectOutlet('caption', 'mediaCaption')


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
												// console.log('element found', item);
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
											// console.log('checking answer, correct', answer);

											var points = router.get('gameController.correctAnswers');
											router.set('gameController.correctAnswers', parseInt(points) + 1);
											// console.warn('corrects', router.get('gameController.correctAnswers'));
                      router.transitionTo('answerChecked.answeredRight');

										} else {
											// console.log('checking answer, wrong');
											// console.warn('corrects', router.get('gameController.correctAnswers'));
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
										},
										checkAnswer: function(){
											return;
										}
									}),
									answeredRight: Em.Route.extend({
										connectOutlets: function(router){
											router.get('answersController').connectOutlet('alert', 'alertCorrectAnswer');
										},
										checkAnswer: function(){
											return;
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
								console.log('finished');
								console.log(router.get('gameController'));

								if (router.get('gameController.content.gameType') === 'audio' && router.get('gamesController.gameType') !== 'action'){
									console.log('audio game finished')
									router.get('gameStartedController').connectOutlet('right', 'gameFinished');
									//router.get('gameFinishedController').connectOutlet('moodmeter', 'moodmeter');

								} else if( ( router.get('gameController.content.gameType') === 'audio' || router.get('gameController.content.gameType') === 'video' ) && router.get('gamesController.gameType') === 'action'){
									console.log('action game finished');
									router.get('gameController').connectOutlet('gameFinishedAction');
									//router.get('gameFinishedActionController').connectOutlet('moodmeter','moodmeter');

								} else {
									console.log('game finished plain');
									router.get('gameStartedController').connectOutlet('right', 'gameFinishedPlain');
									//router.get('gameFinishedPlainController').connectOutlet('moodmeter', 'moodmeter');
								}


								if (router.get('gameController.content.gameType') === 'audio'){
									router.transitionTo('mediaStopped');
								} else {
									router.transitionTo('noMedia');
								}

                //router.get('gameController').saveGameEnd();

							},

							noMedia: Em.Route.extend({

							}),

							mediaStopped: Em.Route.extend({
								connectOutlets: function(router){
									console.log('media stopped');
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

Trivia.Gametype = Em.Object.extend({
	guid: null,
	name: null, 	//eg. Musiikkiharjoitukset
	target: null, //eg. audio
	image: 'assets/img/default.jpg'
})

Trivia.Game = Em.Object.extend({
    guid: null,
    name: null,
    image: 'assets/img/default.jpg',
    caption: null,
	gameType: null,
	videoUrl: null,
	credits: null //Credits for game content / music / stuffs
});

Trivia.Question = Em.Object.extend({
    guid: null,
    gameId: null,
    image: null,
    mediaId: null,
    options: [],
	questionText: null,
	answers: [],
	correctAnswer: null,
	caption: null
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

Trivia.gameTypes = [
	Trivia.Gametype.create({
		guid: 1,
		name: 'Kielelliset harjoitukset',
		target: 'plain',
		//image: '' use default
	}),
	Trivia.Gametype.create({
		guid: 2,
		name: 'Musiikilliset harjoitukset',
		target: 'music',
		image: 'assets/img/grammari.jpg'
	}),
	Trivia.Gametype.create({
		guid: 3,
		name: 'Toiminnalliset harjoitukset',
		target: 'action',
		image: 'assets/img/ikkuna.jpg'
	})
]


Trivia.gameObjects = {};

Trivia.gameObjects.music = [
    Trivia.Game.create({
        guid: 2,
        name: 'Kulkurin Valssi I',
        image: 'assets/img/kulkurin_valssi.jpg',
		gameType: 'audio',
        caption: 'Charlie Champ, “The Tramp”, 1915" - Laura Loveday (lis. CC BY-NC-SA 2.0)',
				credits: 'Ruotsalainen kansansävellys, sanoitus J. A. Tanner, esittäjä Markus Bäckman. Pianoa ja harmonikkaa soittaa Matti Kallio, lyömäsoittimia Pekka Nyman, viulua Heikki Kangasniemi, kitaroita ja mandoliinia Markku Perttilä. Taustalla laulavat Markku Perttilä, Sari Laitinen ja Tarja Merivirta.'
    }),
    Trivia.Game.create({
        guid: 3,
        name: 'Kulkurin Valssi II',
        image: 'assets/img/kulkurin_valssi.jpg',
		gameType: 'audio',
        caption: 'Charlie Champ, “The Tramp”, 1915" - Laura Loveday (lis. CC BY-NC-SA 2.0)',
				credits: 'Ruotsalainen kansansävellys, sanoitus J. A. Tanner, esittäjä Markus Bäckman. Pianoa ja harmonikkaa soittaa Matti Kallio, lyömäsoittimia Pekka Nyman, viulua Heikki Kangasniemi, kitaroita ja mandoliinia Markku Perttilä. Taustalla laulavat Markku Perttilä, Sari Laitinen ja Tarja Merivirta.'
    }),
    Trivia.Game.create({
        guid: 4,
        name: 'Lapsuuden Toverille I',
        image: 'assets/img/lapsuuden_toverille.jpg',
		gameType: 'audio',
        caption: 'Grandpa`s friends - D Flam (lis. CC BY-NC 2.0)',
				credits: 'Esittäjä Markus Bäckman. Pianoa ja harmonikkaa soittaa Matti Kallio, lyömäsoittimia Pekka Nyman, viulua Heikki Kangasniemi, kitaroita ja mandoliinia Markku Perttilä. Taustalla laulavat Markku Perttilä, Sari Laitinen ja Tarja Merivirta.'
    }),
    Trivia.Game.create({
        guid: 5,
        name: 'Lapsuuden Toverille II',
        image: 'assets/img/lapsuuden_toverille.jpg',
		gameType: 'audio',
        caption: 'Grandpa`s friends - D Flam (lis. CC BY-NC 2.0)',
				credits: 'Esittäjä Markus Bäckman. Pianoa ja harmonikkaa soittaa Matti Kallio, lyömäsoittimia Pekka Nyman, viulua Heikki Kangasniemi, kitaroita ja mandoliinia Markku Perttilä. Taustalla laulavat Markku Perttilä, Sari Laitinen ja Tarja Merivirta.'
    }),
    Trivia.Game.create({
        guid: 6,
        name: 'Väliaikainen I',
        image: 'assets/img/valiaikainen.jpg',
		gameType: 'audio',
        caption: 'Jussivaellus 2012 - Verna Koskinen (lis. CC BY-SA 2.0)',
				credits: 'Sävellys M. Jurva, sanoitus T. Pekkarinen, esittäjä Markus Bäckman. Pianoa ja harmonikkaa soittaa Matti Kallio, lyömäsoittimia Pekka Nyman, viulua Heikki Kangasniemi, kitaroita ja mandoliinia Markku Perttilä. Taustalla laulavat Markku Perttilä, Sari Laitinen ja Tarja Merivirta.'
    }),
    Trivia.Game.create({
        guid: 7,
        name: 'Väliaikainen II',
        image: 'assets/img/valiaikainen.jpg',
		gameType: 'audio',
        caption: 'Jussivaellus 2012 - Verna Koskinen (lis. CC BY-SA 2.0)',
				credits: 'Sävellys M. Jurva, sanoitus T. Pekkarinen, esittäjä Markus Bäckman. Pianoa ja harmonikkaa soittaa Matti Kallio, lyömäsoittimia Pekka Nyman, viulua Heikki Kangasniemi, kitaroita ja mandoliinia Markku Perttilä. Taustalla laulavat Markku Perttilä, Sari Laitinen ja Tarja Merivirta.'
    }),
    Trivia.Game.create({
        guid: 8,
        name: 'Tulipunaruusut I',
        image: 'assets/img/tulipunaruusut.jpg',
		gameType: 'audio',
        caption: 'horse+sunset - Ro Irving (lis. CC BY-SA 2.0)',
				credits: 'Sävellys ja sanoitus U. Kemppi, esittäjä Markus Bäckman. Pianoa ja harmonikkaa soittaa Matti Kallio, lyömäsoittimia Pekka Nyman, viulua Heikki Kangasniemi, kitaroita ja mandoliinia Markku Perttilä. Taustalla laulavat Markku Perttilä, Sari Laitinen ja Tarja Merivirta.'
    }),
    Trivia.Game.create({
        guid: 9,
        name: 'Tulipunaruusut II',
        image: 'assets/img/tulipunaruusut.jpg',
		gameType: 'audio',
        caption: 'horse+sunset - Ro Irving (lis. CC BY-SA 2.0)',
				credits: 'Sävellys ja sanoitus U. Kemppi, esittäjä Markus Bäckman. Pianoa ja harmonikkaa soittaa Matti Kallio, lyömäsoittimia Pekka Nyman, viulua Heikki Kangasniemi, kitaroita ja mandoliinia Markku Perttilä. Taustalla laulavat Markku Perttilä, Sari Laitinen ja Tarja Merivirta.'
    }),
    Trivia.Game.create({
        guid: 10,
        name: 'Suutarin emännän kehtolaulu',
        image: 'assets/img/suutarin_emanta.jpg',
		gameType: 'audio',
        caption: 'Old sewing machine - Petr Kratochvil (Public Domain)',
				credits: 'Esittäjät Tarja Merivirta ja Markus Bäckman.  Pianoa ja harmonikkaa soittaa Matti Kallio, lyömäsoittimia Pekka Nyman, viulua Heikki Kangasniemi, kitaroita ja mandoliinia Markku Perttilä. Taustalla laulavat Markku Perttilä, Sari Laitinen ja Tarja Merivirta.'
    }),
    Trivia.Game.create({
        guid: 11,
        name: 'Voi tuota muistia',
        image: 'assets/img/voi_tuota_muistia.jpg',
		gameType: 'audio',
        caption: '15062007(005) - Mikko Koponen (CC BY 2.0)',
				credits: 'Kappaleen sävellys ja sanoitus A. Tarkki, esittäjä Aarre Tarkki. Pianoa ja harmonikkaa soittaa Matti Kallio, lyömäsoittimia Pekka Nyman, viulua Heikki Kangasniemi, kitaroita ja mandoliinia Markku Perttilä. Taustalla laulavat Markku Perttilä, Sari Laitinen ja Tarja Merivirta.'
    }),
];

Trivia.gameObjects.plain = [
	Trivia.Game.create({
		guid:16,
        gameType: 'quiz',
        gameIntro: 'Yhdistä vastakohdat toisiinsa.',
		name:'Vastakohtien yhdistäminen',
		image: 'assets/img/vastakohdat.jpg',
		credits: 'Kysymysten suunnittelu: Sirpa Marna',
		caption: 'Abstract Art Face - Ian L (Public domain)'
	}),
	Trivia.Game.create({
		guid:18,
        gameType: 'quiz',
        gameIntro: 'Lehtivisailu: missä kaupungissa kukin lehti julkaistaan?',
		name:'Lehtivisailu',
		image:'assets/img/lehtikuvat/newspapers.jpg',
		credits: 'Kysymysten suunnittelu: Sirpa Marna'
	}),
    Trivia.Game.create({
        guid:20,
        gameType: 'quiz',
        gameIntro: 'Yhdistä oikea kirja kirjailijaan',
        name:'Kirjailijat I',
        image:'assets/img/kirjailijat/kir-default.jpg',
				credits: 'Kysymysten suunnittelu: Sirpa Marna'
    }),
    Trivia.Game.create({
        guid:21,
        gameType: 'quiz',
        gameIntro: 'Yhdistä oikea kirja kirjailijaan',
        image:'assets/img/kirjailijat/kir10.jpg',
        name:'Kirjailijat II',
				credits: 'Kysymysten suunnittelu: Sirpa Marna'
    }),
    Trivia.Game.create({
        guid:23,
        gameType: 'quiz',
        gameIntro: 'Miten eri sananlaskut jatkuvat?',
        image:'assets/img/sananlaskut/san1.jpg',
        name:'Sananlaskut I',
				credits: 'Kysymysten suunnittelu: Sirpa Marna'
    }),
    Trivia.Game.create({
        guid:24,
        gameType: 'quiz',
        gameIntro: 'Miten eri sananlaskut jatkuvat?',
        image:'assets/img/sananlaskut/san2.jpg',
        name:'Sananlaskut II',
				credits: 'Kysymysten suunnittelu: Sirpa Marna'
    }),
    Trivia.Game.create({
        guid:25,
        gameType: 'quiz',
        gameIntro: 'Miten eri sananlaskut jatkuvat?',
        image:'assets/img/sananlaskut/san3.jpg',
        name:'Sananlaskut III',
				credits: 'Kysymysten suunnittelu: Sirpa Marna'
    }),
	Trivia.Game.create({
		guid:26,
		gameType: 'quiz',
		gameIntro: 'Mitä seuraavat sivistyssanat tarkoittavat?',
		image: 'assets/img/sivistyssanat/siv1.jpg',
		name: 'Sivistyssanat',
		credits: 'Kysymysten suunnittelu: Kristiina Sarmas'
	}),
	Trivia.Game.create({
		guid:27,
		gameType: 'quiz',
		gameIntro: 'Valitse oikea vaihtoehto',
		image: 'assets/img/mat/mat2.jpg',
		name: 'Matemaattisia käsitteitä',
		credits: 'Kysymysten suunnittelu: Kristiina Sarmas',
		caption: 'Sari Laitinen'
	}),
	Trivia.Game.create({
		guid:28,
		gameType: 'quiz',
		gameIntro: 'Valitse oikea vaihtoehto',
		image: 'assets/img/eurooppa1/aloitus-piaf-lennon-nurmi.jpg',
		name: 'Eurooppa I',
		credits: 'Kysymysten suunnittelu: Kristiina Sarmas'
	}),
	Trivia.Game.create({
		guid:29,
		gameType: 'quiz',
		gameIntro: 'Valitse oikea vaihtoehto',
		image: 'assets/img/eurooppa2/aloitus-tonava.jpg',
		name: 'Eurooppa II',
		credits: 'Kysymysten suunnittelu: Kristiina Sarmas'
	}),
	Trivia.Game.create({
		guid: 41,
		gameType: 'quiz',
		gameIntro: 'Valitse oikea vaihtoehto',
		name: 'Suomi I',
		credits: 'Kysymysten suunnittelu: Kristiina Sarmas',
		caption: 'New Blue Door - Andrew Beeston CC BY 2.0'
	}),
	Trivia.Game.create({
		guid: 42,
		gameType: 'quiz',
		gameIntro: 'Valitse oikea vaihtoehto',
		name: 'Suomi II',
		image: 'assets/img/ikkuna.jpg',
		credits: 'Kysymysten suunnittelu: Kristiina Sarmas'
	}),
	Trivia.Game.create({
		guid: 58,
		gameType: 'redirectToLorut',
		name: 'Lorut',
		image: 'assets/img/lorut/lorut15.jpg',
		credits: 'Toteutus ja suunnittelu: Kristiina Sarmas'
	})
];

Trivia.gameObjects.action = [
	Trivia.Game.create({
		guid:30,
		gameType: 'audio',
		gameIntro: 'Kuulet kohta kappaleen. Laulun sanat näkyvät ruudulla. Laula mukana!',
		name: 'Karaoke: Voi tuota muistia',
		image: 'assets/img/pilvi.jpg',
		credits: 'Toteutus ja suunnittelu: Sari Laitinen. Kappaleen sävellys ja sanoitus A. Tarkki, esittäjä Aarre Tarkki. Pianoa ja harmonikkaa soittaa Matti Kallio, lyömäsoittimia Pekka Nyman, viulua Heikki Kangasniemi, kitaroita ja mandoliinia Markku Perttilä. Taustalla laulavat Markku Perttilä, Sari Laitinen ja Tarja Merivirta.'
	}),
	Trivia.Game.create({
		guid:31,
		gameType: 'audio',
		gameIntro: 'Kuulet kohta kappaleen. Laulun sanat näkyvät ruudulla. Laula mukana!',
		name: 'Karaoke: Laulun mahti',
		image: 'assets/img/grammari.jpg',
		credits: 'Toteutus ja suunnittelu: Sari Laitinen. Sävellys ja sanoitus A. Tarkki, esittäjä Aarre Tarkki. Pianoa ja harmonikkaa soittaa Matti Kallio, lyömäsoittimia Pekka Nyman, viulua Heikki Kangasniemi, kitaroita ja mandoliinia Markku Perttilä. Taustalla laulavat Markku Perttilä, Sari Laitinen ja Tarja Merivirta.'
	}),
	Trivia.Game.create({
		guid:32,
		gameType: 'audio',
		gameIntro: 'Tässä harjoituksessa kuulet rentoutusohjeet ja musiikkia. Musiikkina on Marais’n Les Folies d´Espagne ja Tárregan Recuerdos de la Alhambra. Harjoitus kestää 7 ja puoli minuuttia.',
		name: 'Yksilörentoutus',
		image: 'assets/img/rentoutus/ren2.jpg',
		credits: 'Ohjaus ja suunnittelu: Sari Laitinen. Soittajat: Kirsi Jokela: huilu, Laura Airola: viulu, Hannu Perttilä: oboe ja Markku Perttilä: klassinen kitara. Kuvitus: Marketta Leppänen.'
	}),
	Trivia.Game.create({
		guid:33,
		gameType: 'audio',
		gameIntro: 'Tässä harjoituksessa kuulet rentoutusohjeet ja musiikkia. Aloittakaa rentoutus istuutumalla tukevasti selkänojalliselle tuolille. Musiikkina on Tárregan Lágrima, Händelin Largo, Corellin Preludio ja Bachin Siciliano. Kesto 10 ja puoli minuuttia.',
		name: 'Parirentoutus',
		image: 'assets/img/rentoutus/ren3.jpg',
		credits: 'Ohjaus ja suunnittelu: Sari Laitinen. Soittajat: Kirsi Jokela: huilu,	Laura Airola: viulu, Hannu Perttilä: oboe ja Markku Perttilä: klassinen kitara. Kuvitus: Marketta Leppänen.'
	}),
	Trivia.Game.create({
		guid:37,
		gameType: 'video',
		videoUrl: '0hE2RMqNFQo',
		gameIntro: 'Jumppaa videon mukana!',
		name: 'Jumppavideo valssin tahtiin',
		image: 'assets/img/jumppa/valssicover.png ',
		credits: 'Suunnittelu ja Toteutus: Sari Laitinen. Jumppaamassa Sirkka ja Tapio.'
	}),
	Trivia.Game.create({
		guid:38,
		gameType: 'video',
		videoUrl: 'vIZOskaYfLM',
		gameIntro: 'Jumppaa videon mukana!',
		name: 'Jumppavideo jenkan tahtiin',
		image: 'assets/img/jumppa/jenkkacover.png',
		credits: 'Suunnittelu ja Toteutus: Sari Laitinen. Jumppaamassa Sirkka ja Tapio.'
	}),
	Trivia.Game.create({
		guid: 39,
		gameType: 'audio',
		gameIntro: 'Harjoittele jumppaliikkeet rauhassa kuvien kanssa. Paina Seuraava-painiketta päästäksesi seuraavaan jumppaliikkeeseen.',
		name: 'Jumppaliikkeet: valssi',
		image: 'assets/img/jumppa/aamu/1.jpg',
		credits: 'Suunnittelu ja Toteutus: Sari Laitinen. Jumppaamassa Keijo ja Inkeri.'
	}),
	Trivia.Game.create({
		guid: 40,
		gameType: 'audio',
		gameIntro: 'Harjoittele jumppaliikkeet rauhassa kuvien kanssa. Paina Seuraava-painiketta päästäksesi seuraavaan jumppaliikkeeseen.',
		name: 'Jumppaliikkeet: jenkka',
		image: 'assets/img/jumppa/jenkka/1-cover.jpg',
		credits: 'Suunnittelu ja Toteutus: Sari Laitinen. Jumppaamassa Keijo ja Inkeri.'
	})
];

Trivia.gameObjects.lorut = [
	Trivia.Game.create({
			guid: 43,
			gameType: 'audio',
			gameIntro: 'Kuulet kohta lorun. Kun loru pysähtyy, valitse vaihtoehdoista sanat, joilla loru jatkuu.',
			name: 'Veetään nuottaa',
			image: 'assets/img/lorut/lorut1.jpg',
			caption: 'Miina Sillanpään Säätiö',
			credits: 'Toteutus ja suunnittelu: Kristiina Sarmas'
	}),
	Trivia.Game.create({
			guid: 44,
			gameType: 'audio',
			gameIntro: 'Kuulet kohta lorun. Kun loru pysähtyy, valitse vaihtoehdoista sanat, joilla loru jatkuu.',
			name: 'Peukaloputti',
			image: 'assets/img/lorut/lorut2.jpg',
			caption: 'Miina Sillanpään Säätiö',
			credits: 'Toteutus ja suunnittelu: Kristiina Sarmas'
	}),
	Trivia.Game.create({
			guid: 45,
			gameType: 'audio',
			gameIntro: 'Kuulet kohta lorun. Kun loru pysähtyy, valitse vaihtoehdoista sanat, joilla loru jatkuu.',
			name: 'Entten tentten',
			image: 'assets/img/lorut/lorut14.jpg',
			caption: 'Miina Sillanpään Säätiö',
			credits: 'Toteutus ja suunnittelu: Kristiina Sarmas'
	}),
	Trivia.Game.create({
			guid: 46,
			gameType: 'audio',
			gameIntro: 'Kuulet kohta lorun. Kun loru pysähtyy, valitse vaihtoehdoista sanat, joilla loru jatkuu.',
			name: 'Maalari maalasi',
			image: 'assets/img/lorut/lorut4.jpg',
			caption: 'Miina Sillanpään Säätiö',
			credits: 'Toteutus ja suunnittelu: Kristiina Sarmas'
	}),
	Trivia.Game.create({
			guid: 47,
			gameType: 'audio',
			gameIntro: 'Kuulet kohta lorun. Kun loru pysähtyy, valitse vaihtoehdoista sanat, joilla loru jatkuu.',
			name: 'Yks kaks kolme',
			image: 'assets/img/lorut/lorut5.jpg',
			caption: 'Miina Sillanpään Säätiö',
			credits: 'Toteutus ja suunnittelu: Kristiina Sarmas'
	}),
	Trivia.Game.create({
			guid: 48,
			gameType: 'audio',
			gameIntro: 'Kuulet kohta lorun. Kun loru pysähtyy, valitse vaihtoehdoista sanat, joilla loru jatkuu.',
			name: 'Kis kis kissanpoika',
			image: 'assets/img/lorut/lorut13.jpg',
			caption: 'Miina Sillanpään Säätiö',
			credits: 'Toteutus ja suunnittelu: Kristiina Sarmas'
	}),
	Trivia.Game.create({
			guid: 49,
			gameType: 'audio',
			gameIntro: 'Kuulet kohta lorun. Kun loru pysähtyy, valitse vaihtoehdoista sanat, joilla loru jatkuu.',
			name: 'Lennä lennä leppäkerttu',
			image: 'assets/img/lorut/lorut7.jpg',
			caption: 'Miina Sillanpään Säätiö',
			credits: 'Toteutus ja suunnittelu: Kristiina Sarmas'
	}),
	Trivia.Game.create({
			guid: 50,
			gameType: 'audio',
			gameIntro: 'Kuulet kohta lorun. Kun loru pysähtyy, valitse vaihtoehdoista sanat, joilla loru jatkuu.',
			name: 'Kuu kiurusta',
			image: 'assets/img/lorut/lorut8.jpg',
			caption: 'Miina Sillanpään Säätiö',
			credits: 'Toteutus ja suunnittelu: Kristiina Sarmas'
	}),
	Trivia.Game.create({
			guid: 51,
			gameType: 'audio',
			gameIntro: 'Kuulet kohta lorun. Kun loru pysähtyy, valitse vaihtoehdoista sanat, joilla loru jatkuu.',
			name: 'Mistä on pienet tehty',
			image: 'assets/img/lorut/lorut12.jpg',
			caption: 'Miina Sillanpään Säätiö',
			credits: 'Toteutus ja suunnittelu: Kristiina Sarmas'
	}),
	Trivia.Game.create({
			guid: 52,
			gameType: 'audio',
			gameIntro: 'Kuulet kohta lorun. Kun loru pysähtyy, valitse vaihtoehdoista sanat, joilla loru jatkuu.',
			name: 'Viikonloppu',
			image: 'assets/img/lorut/lorut9.jpg',
			caption: 'Miina Sillanpään Säätiö',
			credits: 'Toteutus ja suunnittelu: Kristiina Sarmas'
	}),
	Trivia.Game.create({
			guid: 53,
			gameType: 'audio',
			gameIntro: 'Kuulet kohta lorun. Kun loru pysähtyy, valitse vaihtoehdoista sanat, joilla loru jatkuu.',
			name: 'Ulle dulle',
			image: 'assets/img/lorut/lorut10.jpg',
			caption: 'Miina Sillanpään Säätiö',
			credits: 'Toteutus ja suunnittelu: Kristiina Sarmas'
	}),
	Trivia.Game.create({
			guid: 54,
			gameType: 'audio',
			gameIntro: 'Kuulet kohta lorun. Kun loru pysähtyy, valitse vaihtoehdoista sanat, joilla loru jatkuu.',
			name: 'Tuu tuu tupakkirulla',
			image: 'assets/img/lorut/lorut11.jpg',
			caption: 'Miina Sillanpään Säätiö',
			credits: 'Toteutus ja suunnittelu: Kristiina Sarmas'
	}),
	Trivia.Game.create({
			guid: 55,
			gameType: 'audio',
			gameIntro: 'Kuulet kohta lorun. Kun loru pysähtyy, valitse vaihtoehdoista sanat, joilla loru jatkuu.',
			name: 'Körö körö kirkkoon',
			image: 'assets/img/lorut/lorut15.jpg',
			caption: 'Miina Sillanpään Säätiö',
			credits: 'Toteutus ja suunnittelu: Kristiina Sarmas'
	}),
	Trivia.Game.create({
			guid: 56,
			gameType: 'audio',
			gameIntro: 'Kuulet kohta lorun. Kun loru pysähtyy, valitse vaihtoehdoista sanat, joilla loru jatkuu.',
			name: 'Mennään maata',
			image: 'assets/img/lorut/lorut6.jpg',
			caption: 'Miina Sillanpään Säätiö',
			credits: 'Toteutus ja suunnittelu: Kristiina Sarmas'
	}),
	Trivia.Game.create({
			guid: 57,
			gameType: 'audio',
			gameIntro: 'Kuulet kohta lorun. Kun loru pysähtyy, valitse vaihtoehdoista sanat, joilla loru jatkuu.',
			name: 'Hus sika metsään',
			image: 'assets/img/lorut/lorut3.jpg',
			caption: 'Miina Sillanpään Säätiö',
			credits: 'Toteutus ja suunnittelu: Kristiina Sarmas'
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
            Trivia.Answer.create({ answerText: 'kenkähyllyä ulos mennessänne' }),
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
        image: 'assets/img/vastakohdat.jpg',
        questionText: 'Mikä on vastakohta: MATALA',
        answers: [
            Trivia.Answer.create({ answerText: 'laaja' }),
            Trivia.Answer.create({ answerText: 'pieni' }),
            Trivia.Answer.create({ answerText: 'korkea', correct: true }),
            Trivia.Answer.create({ answerText: 'suuri' }),
            Trivia.Answer.create({ answerText: 'avara' })
        ]
    }),
    Trivia.Question.create({
        gameId: 16,
        image: 'assets/img/vastakohdat.jpg',
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
        image: 'assets/img/vastakohdat.jpg',
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
        image: 'assets/img/vastakohdat.jpg',
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
        image: 'assets/img/vastakohdat.jpg',
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
        image: 'assets/img/vastakohdat.jpg',
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
        image: 'assets/img/vastakohdat.jpg',
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
        image: 'assets/img/lehtikuvat/andrys.jpg',
        answers: [
            Trivia.Answer.create({ answerText: 'Pori' }),
            Trivia.Answer.create({ answerText: 'Kouvola' }),
            Trivia.Answer.create({ answerText: 'Tampere', correct: true }),
            Trivia.Answer.create({ answerText: 'Jyväskylä' })
        ],
				caption: 'Andrys (Public domain)'
    }),
    Trivia.Question.create({
        questionText: 'Missä kaupungissa Kainuun Sanomat julkaistaan?',
        gameId: 18,
        image: 'assets/img/lehtikuvat/newspapers.jpg',
        answers: [
            Trivia.Answer.create({ answerText: 'Rovaniemi' }),
            Trivia.Answer.create({ answerText: 'Oulu' }),
            Trivia.Answer.create({ answerText: 'Kouvola'}),
            Trivia.Answer.create({ answerText: 'Kajaani', correct: true })
        ],
				caption: 'stevepb (Public domain)'
    }),
    Trivia.Question.create({
        questionText: 'Missä kaupungissa julkaistaan Lapin Kansa?',
        gameId: 18,
        image: 'assets/img/lehtikuvat/old-newspaper.jpg',
        answers: [
            Trivia.Answer.create({ answerText: 'Rovaniemi', correct:true }),
            Trivia.Answer.create({ answerText: 'Oulu' }),
            Trivia.Answer.create({ answerText: 'Kuusamo' }),
            Trivia.Answer.create({ answerText: 'Kajaani' })
        ],
				caption: 'Old newspaper - Chris_pluta (Public domain)'
    }),
    Trivia.Question.create({
        questionText: 'Missä kaupungissa julkaistaan Koillismaa?',
        gameId: 18,
        image: 'assets/img/lehtikuvat/andrys.jpg',
        answers: [
            Trivia.Answer.create({ answerText: 'Rovaniemi' }),
            Trivia.Answer.create({ answerText: 'Oulu' }),
            Trivia.Answer.create({ answerText: 'Kuusamo' , correct:true }),
            Trivia.Answer.create({ answerText: 'Joensuu' })
        ],
				caption: 'Andrys (Public domain)'
    }),
    Trivia.Question.create({
        questionText: 'Missä kaupungissa Hufvudstadsbladet julkaistaan?',
        gameId: 18,
        image: 'assets/img/lehtikuvat/newspapers.jpg',
        answers: [
            Trivia.Answer.create({ answerText: 'Oulu' }),
            Trivia.Answer.create({ answerText: 'Helsinki', correct: true }),
            Trivia.Answer.create({ answerText: 'Jyväskylä' }),
            Trivia.Answer.create({ answerText: 'Porvoo' })
        ],
				caption: 'stevepb (Public domain)'
    }),
    Trivia.Question.create({
        questionText: 'Missä kaupungissa Borgåbladet julkaistaan?',
        gameId: 18,
        image: 'assets/img/lehtikuvat/old-newspaper.jpg',
        answers: [
            Trivia.Answer.create({ answerText: 'Tampere' }),
            Trivia.Answer.create({ answerText: 'Helsinki' }),
            Trivia.Answer.create({ answerText: 'Turku'}),
            Trivia.Answer.create({ answerText: 'Porvoo', correct: true })
        ],
				caption: 'Old newspaper - Chris_pluta (Public domain)'
    }),
    Trivia.Question.create({
        questionText: 'Missä kaupungissa Kaleva julkaistaan?',
        gameId: 18,
        image: 'assets/img/lehtikuvat/andrys.jpg',
        answers: [
            Trivia.Answer.create({ answerText: 'Rovaniemi' }),
            Trivia.Answer.create({ answerText: 'Oulu', correct: true }),
            Trivia.Answer.create({ answerText: 'Kouvola'}),
            Trivia.Answer.create({ answerText: 'Jyväskylä' })
        ],
				caption: 'Andrys (Public domain)'
    }),
    Trivia.Question.create({
        questionText: 'Missä kaupungissa Keskisuomalainen julkaistaan?',
        gameId: 18,
        image: 'assets/img/lehtikuvat/newspapers.jpg',
        answers: [
            Trivia.Answer.create({ answerText: 'Pori' }),
            Trivia.Answer.create({ answerText: 'Kuopio' }),
            Trivia.Answer.create({ answerText: 'Jyväskylä', correct: true }),
            Trivia.Answer.create({ answerText: 'Kajaani' })
        ],
				caption: 'stevepb (Public domain)'
    }),
    Trivia.Question.create({
        questionText: 'Missä kaupungissa julkaistaan Satakunnan Kansa?',
        gameId: 18,
        image: 'assets/img/lehtikuvat/old-newspaper.jpg',
        answers: [
            Trivia.Answer.create({ answerText: 'Porvoo' }),
            Trivia.Answer.create({ answerText: 'Turku' }),
            Trivia.Answer.create({ answerText: 'Joensuu'}),
            Trivia.Answer.create({ answerText: 'Pori', correct: true })
        ],
				caption: 'Old newspaper - Chris_pluta (Public domain)'
    }),
    Trivia.Question.create({
        questionText: 'Missä maassa ilmestyy Svenska Dagbladet?',
        gameId: 18,
        image: 'assets/img/lehtikuvat/andrys.jpg',
        answers: [
            Trivia.Answer.create({ answerText: 'Suomi' }),
            Trivia.Answer.create({ answerText: 'Ruotsi', correct: true }),
            Trivia.Answer.create({ answerText: 'Norja'}),
            Trivia.Answer.create({ answerText: 'Tanska' })
        ],
				caption: 'Andrys (Public domain)'
    }),
    Trivia.Question.create({
        questionText: 'Missä maassa ilmestyy Le Monde?',
        gameId: 18,
        image: 'assets/img/lehtikuvat/newspapers.jpg',
        answers: [
            Trivia.Answer.create({ answerText: 'Englanti' }),
            Trivia.Answer.create({ answerText: 'Hollanti'}),
            Trivia.Answer.create({ answerText: 'Ranska', correct: true }),
            Trivia.Answer.create({ answerText: 'Kanada' })
        ],
				caption: 'stevepb (Public domain)'
    }),
    Trivia.Question.create({
        questionText: 'Missä maassa ilmestyy Dagens Nyheter?',
        gameId: 18,
        image: 'assets/img/lehtikuvat/old-newspaper.jpg',
        answers: [
            Trivia.Answer.create({ answerText: 'Islanti' }),
            Trivia.Answer.create({ answerText: 'Ruotsi', correct: true }),
            Trivia.Answer.create({ answerText: 'Suomi'}),
            Trivia.Answer.create({ answerText: 'Tanska' })
        ],
				caption: 'Old newspaper - Chris_pluta (Public domain)'
    }),
    Trivia.Question.create({
        questionText: 'Missä maassa ilmestyy New York Times?',
        gameId: 18,
        image: 'assets/img/lehtikuvat/andrys.jpg',
        answers: [
            Trivia.Answer.create({ answerText: 'Yhdysvallat', correct: true }),
            Trivia.Answer.create({ answerText: 'Australia' }),
            Trivia.Answer.create({ answerText: 'Uusi-Seelanti'}),
            Trivia.Answer.create({ answerText: 'Englanti' })
        ],
				caption: 'Andrys (Public domain)'
    }),
    Trivia.Question.create({
        questionText: 'Missä maassa ilmestyi Deutsche Allgemeine Zeitung',
        gameId: 18,
        image: 'assets/img/lehtikuvat/newspapers.jpg',
        answers: [
            Trivia.Answer.create({ answerText: 'Suomi' }),
            Trivia.Answer.create({ answerText: 'Hollanti'}),
            Trivia.Answer.create({ answerText: 'Ranska' }),
            Trivia.Answer.create({ answerText: 'Saksa', correct: true  })
        ],
				caption: 'stevepb (Public domain)'
    }),
    Trivia.Question.create({
        questionText: 'Missä maassa ilmestyy Pravda?',
        gameId: 18,
        image: 'assets/img/lehtikuvat/old-newspaper.jpg',
        answers: [
            Trivia.Answer.create({ answerText: 'Venäjä', correct: true }),
            Trivia.Answer.create({ answerText: 'Tsekki' }),
            Trivia.Answer.create({ answerText: 'Viro' }),
            Trivia.Answer.create({ answerText: 'Valkovenäjä' })
        ],
				caption: 'Old newspaper - Chris_pluta (Public domain)'
    }),

 	//Kirjailijat I
    Trivia.Question.create({
        gameId: 20,
        image: 'assets/img/kirjailijat/kir-default.jpg',
        questionText: 'Mikä kirjoista on Mika Waltarin kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Sinuhe Egyptiläinen', correct:true }),
            Trivia.Answer.create({ answerText: 'Nummisuutarit' }),
            Trivia.Answer.create({ answerText: 'Ihmisen osa' })
        ],
				caption: 'Antique books - Peter Häger (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 20,
        image: 'assets/img/kirjailijat/kir-default.jpg',
        questionText: 'Mikä kirjoista on Väinö Linnan kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Muumipappa ja meri' }),
            Trivia.Answer.create({ answerText: 'Tuntematon sotilas', correct:true }),
            Trivia.Answer.create({ answerText: 'Seitsemän Veljestä' })
        ],
				caption: 'Antique books - Peter Häger (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 20,
        image: 'assets/img/kirjailijat/kir-default.jpg',
        questionText: 'Mikä kirjoista on Aleksis Kiven kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Nummisuutarit', correct:true  }),
            Trivia.Answer.create({ answerText: 'Taikatalvi' }),
            Trivia.Answer.create({ answerText: 'Tuntematon sotilas' })
        ],
				caption: 'Antique books - Peter Häger (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 20,
        image: 'assets/img/kirjailijat/kir-default.jpg',
        questionText: 'Mikä kirjoista on Aleksis Kiven kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Jumalan sana' }),
            Trivia.Answer.create({ answerText: 'Ihmisen osa' }),
            Trivia.Answer.create({ answerText: 'Kihlaus', correct:true })
        ],
				caption: 'Antique books - Peter Häger (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 20,
        image: 'assets/img/kirjailijat/kir10.jpg',
        questionText: 'Mikä kirjoista on Veikko Huovisen kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Punainen Lanka'  }),
            Trivia.Answer.create({ answerText: 'Havukka-ahon ajattelija', correct:true }),
            Trivia.Answer.create({ answerText: 'Kauppa-Lopo' })
        ],
				caption: "Urpo Lankinen - CC BY 3.0"
    }),
    Trivia.Question.create({
        gameId: 20,
        image: 'assets/img/kirjailijat/kir10.jpg',
        questionText: 'Mikä kirjoista on Veikko Huovisen kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Lampaan syöjät', correct:true  }),
            Trivia.Answer.create({ answerText: 'Komisario Palmu' }),
            Trivia.Answer.create({ answerText: 'Nummisuutarit' })
        ],
				caption: "Urpo Lankinen - CC BY 3.0"
    }),
    Trivia.Question.create({
        gameId: 20,
        image: 'assets/img/kirjailijat/kir10.jpg',
        questionText: 'Mikä kirjoista on Veikko Huovisen kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Konsta Pylkkänen etsii kortteeria', correct:true  }),
            Trivia.Answer.create({ answerText: 'Papin Rouva' }),
            Trivia.Answer.create({ answerText: 'Seitsemän veljestä' })
        ],
				caption: "Urpo Lankinen - CC BY 3.0"
    }),
    Trivia.Question.create({
        gameId: 20,
        image: 'assets/img/kirjailijat/kir-default.jpg',
        questionText: 'Mikä kirjoista on Mika Waltarin kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Nuori Johannes', correct:true  }),
            Trivia.Answer.create({ answerText: 'Seitsemän veljestä' }),
            Trivia.Answer.create({ answerText: 'Muumipappa ja meri' })
        ],
				caption: 'Antique books - Peter Häger (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 20,
        image: 'assets/img/kirjailijat/kir18.jpg',
        questionText: 'Mikä kirjoista on Arto Paasilinnan kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Taikatalvi' }),
            Trivia.Answer.create({ answerText: 'Veitikka' }),
            Trivia.Answer.create({ answerText: 'Onnellinen mies', correct:true })
        ],
				caption: "BFF - CC BY-SA 2.5"
    }),
    Trivia.Question.create({
        gameId: 20,
        image: 'assets/img/kirjailijat/kir18.jpg',
        questionText: 'Mikä kirjoista on Arto Paasilinnan kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Stalinin lehmät' }),
            Trivia.Answer.create({ answerText: 'Jäniksen vuosi', correct:true }),
            Trivia.Answer.create({ answerText: 'Nummisuutarit' })
        ],
				caption: "BFF - CC BY-SA 2.5"
    }),
    Trivia.Question.create({
        gameId: 20,
        image: 'assets/img/kirjailijat/kir20.jpg',
        questionText: 'Mikä kirjoista on Sofi Oksasen kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Puhdistus', correct:true }),
            Trivia.Answer.create({ answerText: 'Hurskas kurjuus' }),
            Trivia.Answer.create({ answerText: 'Onnellinen mies' })
        ],
				caption: "Teemu Rajala - CC BY 3.0"
    }),
    Trivia.Question.create({
        gameId: 20,
        image: 'assets/img/kirjailijat/kir21.jpg',
        questionText: 'Mikä kirjoista on Reijo Mäen kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Sheriffi', correct:true }),
            Trivia.Answer.create({ answerText: 'Tuomiopäivän aurinko nousee' }),
            Trivia.Answer.create({ answerText: 'Taikatalvi' })
        ],
				caption: 'Matti Järvinen - CC BY-SA 2.5'
    }),
    Trivia.Question.create({
        gameId: 20,
        image: 'assets/img/kirjailijat/kir23.jpg',
        questionText: 'Mikä kirjoista on Henning Mankelin kijoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Maailman paras kylä' }),
            Trivia.Answer.create({ answerText: 'Likainen enkeli', correct:true }),
            Trivia.Answer.create({ answerText: 'Seitsemän päivää' })
        ],
				caption: 'David Shankbone - CC BY 3.0'
    }),
    Trivia.Question.create({
        gameId: 20,
        image: 'assets/img/kirjailijat/kir24.jpg',
        questionText: 'Mikä kirjoista on Jari Tervon kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Layla', correct:true }),
            Trivia.Answer.create({ answerText: 'Hurkas kurjuus' }),
            Trivia.Answer.create({ answerText: 'Nummisuutarit' })
        ],
				caption: "Soppakanuuna - CC BY-SA 2.5"
    }),

    // Kirjailijat II
    Trivia.Question.create({
        gameId: 21,
        image: 'assets/img/kirjailijat/kir-default.jpg',
        questionText: 'Mikä kirjoista on Eeva Joenpellon kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Aatami ja Eeva' }),
            Trivia.Answer.create({ answerText: 'Onnellinen mies' }),
            Trivia.Answer.create({ answerText: 'Vetää kaikista ovista', correct:true })
        ],
				caption: 'Antique books - Peter Häger (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 21,
        image: 'assets/img/kirjailijat/kir27.jpg',
        questionText: 'Mikä kirjoista on Antti Tuurin kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Onnellinen mies' }),
            Trivia.Answer.create({ answerText: 'Nummisuutarit' }),
            Trivia.Answer.create({ answerText: 'Ikitie', correct:true })
        ],
				caption: 'Soppakanuuna - CC BY-SA 2.5'
    }),
    Trivia.Question.create({
        gameId: 21,
        image: 'assets/img/kirjailijat/kir-default.jpg',
        questionText: 'Mikä kirjoista on Agatha Christien kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Tapaus Bruus ja muita kertomuksia' }),
            Trivia.Answer.create({ answerText: 'Kuolema Niilillä', correct:true }),
            Trivia.Answer.create({ answerText: 'Taikatalvi' })
        ],
				caption: 'Antique books - Peter Häger (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 21,
        image: 'assets/img/kirjailijat/kir30.jpg',
        questionText: 'Mikä kirjoista on Kaari Utrion kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Leijat Helsingin yllä' }),
            Trivia.Answer.create({ answerText: 'Oppinut neiti', correct:true }),
            Trivia.Answer.create({ answerText: 'Nummisuutarit' })
        ],
				caption: 'Matti Järvinen - CC BY-SA 2.5'
    }),
    Trivia.Question.create({
        gameId: 21,
        image: 'assets/img/kirjailijat/kir31.jpg',
        questionText: 'Mikä kirjoista on Virpi-Hämeenanttilan kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Railo', correct:true }),
            Trivia.Answer.create({ answerText: 'Ikitie' }),
            Trivia.Answer.create({ answerText: 'Onnellinen mies' })
        ],
				caption: 'Matti Järvinen - CC BY-SA 2.5'
    }),
    Trivia.Question.create({
        gameId: 21,
        image: 'assets/img/kirjailijat/kir33.jpg',
        questionText: 'Mikä kirjoista on Laila Hietaniemen kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Seitsemän veljestä' }),
            Trivia.Answer.create({ answerText: 'Nummisuutarit' }),
            Trivia.Answer.create({ answerText: 'Kallis kotimaa', correct:true })
        ],
				caption: 'Spektri - CC BY-SA 2.5'
    }),
    Trivia.Question.create({
        gameId: 21,
        image: 'assets/img/kirjailijat/kir34.jpg',
        questionText: 'Mikä kirjoista on Kjell Westön kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Missä Kuljimme kerran', correct:true }),
            Trivia.Answer.create({ answerText: 'Seitsemän veljestä' }),
            Trivia.Answer.create({ answerText: 'Taikatalvi' })
        ],
				caption: 'Soppakanuuna - CC BY-SA 2.5'
    }),
    Trivia.Question.create({
        gameId: 21,
        image: 'assets/img/kirjailijat/kir36.jpg',
        questionText: 'Mikä kirjoista on Matti Yrjänä Joensuun kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Rannalla' }),
            Trivia.Answer.create({ answerText: 'Harjunpää ja ahdistelija', correct:true }),
            Trivia.Answer.create({ answerText: 'Uhrilehto' })
        ],
				caption: 'Soppakanuuna - CC BY-SA 2.5'
    }),
    Trivia.Question.create({
        gameId: 21,
        image: 'assets/img/kirjailijat/kir37.jpg',
        questionText: 'Mikä kirjoista on Anja Snellmanin kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Lemmikkikaupan tytöt', correct: true }),
            Trivia.Answer.create({ answerText: 'Ilkeät sisarpuolet' }),
            Trivia.Answer.create({ answerText: 'Uhkapelimerkit' })
        ],
				caption: 'Anneli Salo - CC BY-SA 2.5'
    }),
    Trivia.Question.create({
        gameId: 21,
        image: 'assets/img/kirjailijat/kir38.jpg',
        questionText: 'Mikä kirjoista on Reino Lehväslaihon kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Raja' }),
            Trivia.Answer.create({ answerText: 'Kosto' }),
            Trivia.Answer.create({ answerText: 'Seesjärven sissit', correct:true })
        ],
				caption: 'Anneli Salo - CC BY-SA 2.5'
    }),
    Trivia.Question.create({
        gameId: 21,
        image: 'assets/img/kirjailijat/kir39.jpg',
        questionText: 'Mikä kirjoista on Antti Hyryn kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Uuni', correct:true }),
            Trivia.Answer.create({ answerText: 'Taivaspaikka' }),
            Trivia.Answer.create({ answerText: 'Tuulen varjo' })
        ],
				caption: 'Teemu Rajala - CC BY-SA 2.5'
    }),
    Trivia.Question.create({
        gameId: 21,
		image: 'assets/img/kirjailijat/kir-default.jpg',
        questionText: 'Mikä kirjoista on Stieg Larssonin kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Tyttö, joka leikki tulella', correct:true }),
            Trivia.Answer.create({ answerText: 'Hylynryöstäjä' }),
            Trivia.Answer.create({ answerText: 'Silminnäkijä' })
        ],
				caption: 'Antique books - Peter Häger (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 21,
        image: 'assets/img/kirjailijat/kir43.jpg',
        questionText: 'Mikä kirjoista on Kalle Päätalon kirjoittama?',
        answers: [
            Trivia.Answer.create({ answerText: 'Syksyksi kotiin' }),
            Trivia.Answer.create({ answerText: 'Kallen inttivuosi' }),
            Trivia.Answer.create({ answerText: 'Kannaksen lomajuna', correct:true })
        ],
				caption: 'JNiemenmaa - CC BY-SA 2.5'
    }),
	//Sananlaskut
    Trivia.Question.create({
        gameId: 23,
        image: 'assets/img/sananlaskut/san1.jpg',
        questionText: 'Parempi pyy pivossa',
        answers: [
            Trivia.Answer.create({ answerText: 'kuin naapurin padassa' }),
            Trivia.Answer.create({ answerText: 'kuin puun latvassa' }),
            Trivia.Answer.create({ answerText: 'kuin kymmenen oksalla', correct:true })
        ],
				caption: 'wobogre (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 23,
        image: 'assets/img/sananlaskut/san2.jpg',
        questionText: 'Parempi myöhään',
        answers: [
            Trivia.Answer.create({ answerText: 'kuin ei milloinkaan', correct:true }),
            Trivia.Answer.create({ answerText: 'kuin liian aikaisin' }),
            Trivia.Answer.create({ answerText: 'kuin aamulla varhain' })
        ],
				caption: 'werner22brigitte (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 23,
        image: 'assets/img/sananlaskut/san3.jpg',
        questionText: 'Minkä lapsena oppii',
        answers: [
            Trivia.Answer.create({ answerText: 'sen vanhana unohtaa' }),
            Trivia.Answer.create({ answerText: 'sen vanhana taitaa', correct:true }),
            Trivia.Answer.create({ answerText: 'sen vanhana opettaa' })
        ],
				caption: 'Simon (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 23,
        image: 'assets/img/sananlaskut/san4.jpg',
        questionText: 'Ei kukko',
        answers: [
            Trivia.Answer.create({ answerText: 'kiekumaan käy' }),
            Trivia.Answer.create({ answerText: 'kävele' }),
            Trivia.Answer.create({ answerText: 'käskien laula', correct:true })
        ],
				caption: 'werner22brigitte (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 23,
        image: 'assets/img/sananlaskut/san5.jpg',
        questionText: 'Odottaa',
        answers: [
            Trivia.Answer.create({ answerText: 'kuin hepo heinää' }),
            Trivia.Answer.create({ answerText: 'kuin hepo kesää', correct:true }),
            Trivia.Answer.create({ answerText: 'kuin hepo kuumaa puuroa' })
        ],
				caption: 'jarmoluk (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 23,
        image: 'assets/img/sananlaskut/san6.jpg',
        questionText: 'Kiertää',
        answers: [
            Trivia.Answer.create({ answerText: 'kuin kissa kuumaa puuroa', correct:true }),
            Trivia.Answer.create({ answerText: 'kuin koira kopissa' }),
            Trivia.Answer.create({ answerText: 'kuin kissa kartanolla' })
        ],
				caption: 'MartinStr (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 23,
        image: 'assets/img/sananlaskut/san7.jpg',
        questionText: 'Hyvä antaa vähästäänkin',
        answers: [
            Trivia.Answer.create({ answerText: 'paha ei paljon piittaa' }),
            Trivia.Answer.create({ answerText: 'paha päälle sylkee' }),
            Trivia.Answer.create({ answerText: 'paha ei paljostakaan', correct:true })
        ],
				caption: 'Nhelia (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 23,
        image: 'assets/img/sananlaskut/san8.jpg',
        questionText: 'Seinilläkin',
        answers: [
            Trivia.Answer.create({ answerText: 'korvat kuulee' }),
            Trivia.Answer.create({ answerText: 'on silmät päässä' }),
            Trivia.Answer.create({ answerText: 'on korvat', correct:true })
        ],
				caption: 'moorpheus (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 23,
        image: 'assets/img/sananlaskut/san9.jpg',
        questionText: 'Alku aina hankalaa',
        answers: [
            Trivia.Answer.create({ answerText: 'lopussa kiitos seisoo', correct:true }),
            Trivia.Answer.create({ answerText: 'loppu vielä hankalampaa' }),
            Trivia.Answer.create({ answerText: 'kaikesta kuitenkin selvitään' })
        ],
				caption: 'cocoparisienne (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 23,
        image: 'assets/img/sananlaskut/san1.jpg',
        questionText: 'Mikä laulaen tulee',
        answers: [
            Trivia.Answer.create({ answerText: 'se helposti tulee' }),
            Trivia.Answer.create({ answerText: 'se viheltäen menee', correct:true }),
            Trivia.Answer.create({ answerText: 'on pian kulutettu' })
        ],
				caption: 'wobogre (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 23,
        image: 'assets/img/sananlaskut/san2.jpg',
        questionText: 'Parempi on katsoa',
        answers: [
            Trivia.Answer.create({ answerText: 'kuin katua', correct:true }),
            Trivia.Answer.create({ answerText: 'kuin kaatua' }),
            Trivia.Answer.create({ answerText: 'ja kuunnella' })
        ],
				caption: 'werner22brigitte (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 23,
        image: 'assets/img/sananlaskut/san3.jpg',
        questionText: 'Kel\' onni on',
        answers: [
            Trivia.Answer.create({ answerText: 'sen kaikille kertokoon' }),
            Trivia.Answer.create({ answerText: 'sen sydän riemuitsee' }),
            Trivia.Answer.create({ answerText: 'se onnen kätkeköön', correct:true })
        ],
				caption: 'Simon (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 23,
        image: 'assets/img/sananlaskut/san4.jpg',
        questionText: 'Ei niin pahaa',
        answers: [
            Trivia.Answer.create({ answerText: 'ettei syödä voisi' }),
            Trivia.Answer.create({ answerText: 'ettei jotain hyvääkin', correct:true }),
            Trivia.Answer.create({ answerText: 'kuin luulisi' })
        ],
				caption: 'werner22brigitte (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 23,
        image: 'assets/img/sananlaskut/san5.jpg',
        questionText: 'Sitä kuusta kuuleminen',
        answers: [
            Trivia.Answer.create({ answerText: 'jonka juurella asunto', correct:true }),
            Trivia.Answer.create({ answerText: 'jonka oksia sahaa' }),
            Trivia.Answer.create({ answerText: 'jonka jouluna koristelee' })
        ],
				caption: 'jarmoluk (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 23,
        image: 'assets/img/sananlaskut/san6.jpg',
        questionText: 'Jos ei nyt',
        answers: [
            Trivia.Answer.create({ answerText: 'niin milloin?' }),
            Trivia.Answer.create({ answerText: 'niin ainakin ensi vuonna' }),
            Trivia.Answer.create({ answerText: 'niin ei milloinkaan', correct:true })
        ],
				caption: 'MartinStr (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 24,
        image: 'assets/img/sananlaskut/san7.jpg',
        questionText: 'Niin metsä vastaa',
        answers: [
            Trivia.Answer.create({ answerText: 'kuin itse tahtoo' }),
            Trivia.Answer.create({ answerText: 'kuin siltä kysytään' }),
            Trivia.Answer.create({ answerText: 'kuin sinne huudetaan', correct:true })
        ],
				caption: 'Nhelia (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 24,
        image: 'assets/img/sananlaskut/san8.jpg',
        questionText: 'Työmies on palkkansa',
        answers: [
            Trivia.Answer.create({ answerText: 'ansainnut', correct:true }),
            Trivia.Answer.create({ answerText: 'arvoinen' }),
            Trivia.Answer.create({ answerText: 'mittainen' })
        ],
				caption: 'moorpheus (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 24,
        image: 'assets/img/sananlaskut/san9.jpg',
        questionText: 'Kenen leipää syöt',
        answers: [
            Trivia.Answer.create({ answerText: 'sen käskyjä kuuntelet' }),
            Trivia.Answer.create({ answerText: 'sitä ruuasta kiität' }),
            Trivia.Answer.create({ answerText: 'sen lauluja laulat', correct:true })
        ],
				caption: 'cocoparisienne (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 24,
        image: 'assets/img/sananlaskut/san1.jpg',
        questionText: 'Onni yksillä',
        answers: [
            Trivia.Answer.create({ answerText: 'murhe muilla' }),
            Trivia.Answer.create({ answerText: 'kesä kaikilla', correct:true }),
            Trivia.Answer.create({ answerText: 'taivaanranta kaikilla' })
        ],
				caption: 'wobogre (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 24,
        image: 'assets/img/sananlaskut/san2.jpg',
        questionText: 'Ei yö niin pitkä',
        answers: [
            Trivia.Answer.create({ answerText: 'kuin unettomasta tuntuu' }),
            Trivia.Answer.create({ answerText: 'ettei aamu sarasta' }),
            Trivia.Answer.create({ answerText: 'ettei päivä perässä', correct:true })
        ],
				caption: 'werner22brigitte (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 24,
        image: 'assets/img/sananlaskut/san3.jpg',
        questionText: 'Ei suuret sanat',
        answers: [
            Trivia.Answer.create({ answerText: 'suuta halkaise', correct:true }),
            Trivia.Answer.create({ answerText: 'suuta sulje' }),
            Trivia.Answer.create({ answerText: 'vaan suuret teot' })
        ],
				caption: 'Simon (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 24,
        image: 'assets/img/sananlaskut/san4.jpg',
        questionText: 'Uni ja ruoka maittaa',
        answers: [
            Trivia.Answer.create({ answerText: 'mutta työ sitä haittaa' }),
            Trivia.Answer.create({ answerText: 'mutta työ on kuin tervaa', correct:true }),
            Trivia.Answer.create({ answerText: 'mutta aika päälle painaa' })
        ],
				caption: 'werner22brigitte (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 24,
        image: 'assets/img/sananlaskut/san5.jpg',
        questionText: 'Ahkeruus',
        answers: [
            Trivia.Answer.create({ answerText: 'aina palkitaan' }),
            Trivia.Answer.create({ answerText: 'on onnen äiti' }),
            Trivia.Answer.create({ answerText: 'kovankin onnen voittaa', correct:true })
        ],
				caption: 'jarmoluk (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 24,
        image: 'assets/img/sananlaskut/san6.jpg',
        questionText: 'Ei vara',
        answers: [
            Trivia.Answer.create({ answerText: 'venettä kaada', correct:true }),
            Trivia.Answer.create({ answerText: 'pankkeja kaada' }),
            Trivia.Answer.create({ answerText: 'ole vaaraksi' })
        ],
				caption: 'MartinStr (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 24,
        image: 'assets/img/sananlaskut/san7.jpg',
        questionText: 'Hätä',
        answers: [
            Trivia.Answer.create({ answerText: 'lukee lakia' }),
            Trivia.Answer.create({ answerText: 'keinot keksii', correct:true }),
            Trivia.Answer.create({ answerText: 'keinot karkottaa' })
        ],
				caption: 'Nhelia (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 24,
        image: 'assets/img/sananlaskut/san8.jpg',
        questionText: 'Suo siellä',
        answers: [
            Trivia.Answer.create({ answerText: 'vettä täällä' }),
            Trivia.Answer.create({ answerText: 'kangasmetsä täällä' }),
            Trivia.Answer.create({ answerText: 'vetelä täällä', correct:true })
        ],
				caption: 'moorpheus (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 24,
        image: 'assets/img/sananlaskut/san9.jpg',
        questionText: 'Jos haluat rauhaa',
        answers: [
            Trivia.Answer.create({ answerText: 'valmistaudu sotaan', correct:true }),
            Trivia.Answer.create({ answerText: 'rakenna sopu' }),
            Trivia.Answer.create({ answerText: 'älä jännitä joustasi' })
        ],
				caption: 'cocoparisienne (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 24,
        image: 'assets/img/sananlaskut/san1.jpg',
        questionText: 'Myöhäistä on tuoda vettä',
        answers: [
            Trivia.Answer.create({ answerText: 'kun jano on sammunut' }),
            Trivia.Answer.create({ answerText: 'kun talo on palanut', correct:true }),
            Trivia.Answer.create({ answerText: 'kun kiuas on kylmennyt' })
        ],
				caption: 'wobogre (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 24,
        image: 'assets/img/sananlaskut/san2.jpg',
        questionText: 'Seinilläkin on',
        answers: [
            Trivia.Answer.create({ answerText: 'kovaääniset' }),
            Trivia.Answer.create({ answerText: 'kaiuttimet' }),
            Trivia.Answer.create({ answerText: 'korvat', correct:true })
        ],
				caption: 'werner22brigitte (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 24,
        image: 'assets/img/sananlaskut/san3.jpg',
        questionText: 'Kaikki tiet vievät',
        answers: [
            Trivia.Answer.create({ answerText: 'Roomaan', correct:true }),
            Trivia.Answer.create({ answerText: 'perille' }),
            Trivia.Answer.create({ answerText: 'sinne minne jalkasi osoittavat' })
        ],
				caption: 'Simon (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 25,
        image: 'assets/img/sananlaskut/san4.jpg',
        questionText: 'Anna sen kiven olla',
        answers: [
            Trivia.Answer.create({ answerText: 'joka taloasi kannattaa' }),
            Trivia.Answer.create({ answerText: 'jota et jaksa kantaa', correct:true }),
            Trivia.Answer.create({ answerText: 'joka kirkkauttaan kiiltää' })
        ],
				caption: 'werner22brigitte (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 25,
        image: 'assets/img/sananlaskut/san5.jpg',
        questionText: 'Jokainen on oman',
        answers: [
            Trivia.Answer.create({ answerText: 'kohtalonsa vanki' }),
            Trivia.Answer.create({ answerText: 'onnensa onkija' }),
            Trivia.Answer.create({ answerText: 'onnensa seppä', correct:true })
        ],
				caption: 'jarmoluk (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 25,
        image: 'assets/img/sananlaskut/san6.jpg',
        questionText: 'Joka toiselle kuoppaa kaivaa',
        answers: [
            Trivia.Answer.create({ answerText: 'se itse siihen lankeaa', correct:true }),
            Trivia.Answer.create({ answerText: 'se mieltä myöhemmin vaivaa' }),
            Trivia.Answer.create({ answerText: 'se omaa onneansa raivaa' })
        ],
				caption: 'MartinStr (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 25,
        image: 'assets/img/sananlaskut/san7.jpg',
        questionText: 'Arvaa oma tilasi',
        answers: [
            Trivia.Answer.create({ answerText: 'ja korjaa pahat pilasi' }),
            Trivia.Answer.create({ answerText: 'anna arvo toisillekin', correct:true }),
            Trivia.Answer.create({ answerText: 'tunne omat vikasi' })
        ],
				caption: 'Nhelia (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 25,
        image: 'assets/img/sananlaskut/san8.jpg',
        questionText: 'Pata kattilaa soimaa',
        answers: [
            Trivia.Answer.create({ answerText: 'samat hiilet kummallakin' }),
            Trivia.Answer.create({ answerText: 'sama keitto kummassakin' }),
            Trivia.Answer.create({ answerText: 'musta kylki kummallakin', correct:true })
        ],
				caption: 'moorpheus (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 25,
        image: 'assets/img/sananlaskut/san9.jpg',
        questionText: 'Itku',
        answers: [
            Trivia.Answer.create({ answerText: 'pitkästä ilosta', correct:true }),
            Trivia.Answer.create({ answerText: 'suuresta surusta' }),
            Trivia.Answer.create({ answerText: 'mielen parantaa' })
        ],
				caption: 'cocoparisienne (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 25,
        image: 'assets/img/sananlaskut/san1.jpg',
        questionText: 'Nauru',
        answers: [
            Trivia.Answer.create({ answerText: 'ilon pirttiin tuopi' }),
            Trivia.Answer.create({ answerText: 'pidentää ikää', correct:true }),
            Trivia.Answer.create({ answerText: 'on itkun kääntöpuoli' })
        ],
				caption: 'wobogre (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 25,
        image: 'assets/img/sananlaskut/san2.jpg',
        questionText: 'Oma apu',
        answers: [
            Trivia.Answer.create({ answerText: 'onnen tuopi' }),
            Trivia.Answer.create({ answerText: 'aina lähellä' }),
            Trivia.Answer.create({ answerText: 'paras apu', correct:true })
        ],
				caption: 'werner22brigitte (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 25,
        image: 'assets/img/sananlaskut/san3.jpg',
        questionText: 'Joka tuuleen kylvää',
        answers: [
            Trivia.Answer.create({ answerText: 'se myrskyä niittää', correct:true }),
            Trivia.Answer.create({ answerText: 'se myrskyssä seilaa' }),
            Trivia.Answer.create({ answerText: 'sen ei sielu tyventä löydä' })
        ],
				caption: 'Simon (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 25,
        image: 'assets/img/sananlaskut/san4.jpg',
        questionText: 'Sanasta miestä',
        answers: [
            Trivia.Answer.create({ answerText: 'hännästä hevosta' }),
            Trivia.Answer.create({ answerText: 'sarvista härkää', correct:true }),
            Trivia.Answer.create({ answerText: 'liekistä lohikäärmettä' })
        ],
				caption: 'werner22brigitte (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 25,
        image: 'assets/img/sananlaskut/san5.jpg',
        questionText: 'Älä usko',
        answers: [
            Trivia.Answer.create({ answerText: 'ennen kuin todistetaan' }),
            Trivia.Answer.create({ answerText: 'ennen kuin kuulet uutisista' }),
            Trivia.Answer.create({ answerText: 'ennen kuin näet', correct:true })
        ],
				caption: 'jarmoluk (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 25,
        image: 'assets/img/sananlaskut/san6.jpg',
        questionText: 'Varmaa on se',
        answers: [
            Trivia.Answer.create({ answerText: 'mikä on kädessä', correct:true }),
            Trivia.Answer.create({ answerText: 'mikä on sydämessä' }),
            Trivia.Answer.create({ answerText: 'mikä lukee lehdessä' })
        ],
				caption: 'MartinStr (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 25,
        image: 'assets/img/sananlaskut/san7.jpg',
        questionText: 'Ei kettu sovi tuomariksi',
        answers: [
            Trivia.Answer.create({ answerText: 'kanalan kahakkaan' }),
            Trivia.Answer.create({ answerText: 'hanhen oikeusjuttuun', correct:true }),
            Trivia.Answer.create({ answerText: 'korpin puolesta puhujaksi' })
        ],
				caption: 'Nhelia (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 25,
        image: 'assets/img/sananlaskut/san8.jpg',
        questionText: 'Ei yksi pääsky',
        answers: [
            Trivia.Answer.create({ answerText: 'kesää aloita' }),
            Trivia.Answer.create({ answerText: 'suvea soita' }),
            Trivia.Answer.create({ answerText: 'kesää tee', correct:true })
        ],
				caption: 'moorpheus (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 25,
        image: 'assets/img/sananlaskut/san9.jpg',
        questionText: 'Joka miekkaan tarttuu',
        answers: [
            Trivia.Answer.create({ answerText: 'se miekkaan kaatuu', correct:true }),
            Trivia.Answer.create({ answerText: 'se ei rauhaa rakasta' }),
            Trivia.Answer.create({ answerText: 'ei kunnian kujalla kävele' })
        ],
				caption: 'cocoparisienne (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 25,
        image: 'assets/img/sananlaskut/san1.jpg',
        questionText: 'Sanoista',
        answers: [
            Trivia.Answer.create({ answerText: 'sovinto syntyy' }),
            Trivia.Answer.create({ answerText: 'sodat tulevat', correct:true }),
            Trivia.Answer.create({ answerText: 'rauha rakentuu' })
        ],
				caption: 'wobogre (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 25,
        image: 'assets/img/sananlaskut/san2.jpg',
        questionText: 'Hullu paljon työtä tekee',
        answers: [
            Trivia.Answer.create({ answerText: 'laiskajaakko ei laisinkaan' }),
            Trivia.Answer.create({ answerText: 'vaikka ei ois paikka' }),
            Trivia.Answer.create({ answerText: 'viisas pääsee vähemmällä', correct:true })
        ],
				caption: 'werner22brigitte (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 25,
        image: 'assets/img/sananlaskut/san3.jpg',
        questionText: 'Työ tekijäänsä',
        answers: [
            Trivia.Answer.create({ answerText: 'kiittää', correct:true }),
            Trivia.Answer.create({ answerText: 'neuvoo' }),
            Trivia.Answer.create({ answerText: 'elättää' })
        ],
				caption: 'Simon (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 25,
        image: 'assets/img/sananlaskut/san4.jpg',
        questionText: 'Ei kaikki ole sitä',
        answers: [
            Trivia.Answer.create({ answerText: 'mitä tilaat' }),
            Trivia.Answer.create({ answerText: 'miltä näyttää', correct:true }),
            Trivia.Answer.create({ answerText: 'eikä tätä' })
        ],
				caption: 'werner22brigitte (Public domain)'
    }),
    Trivia.Question.create({
        gameId: 25,
        image: 'assets/img/sananlaskut/san5.jpg',
        questionText: 'Ei sota yhtä',
        answers: [
            Trivia.Answer.create({ answerText: 'juhlaa ole' }),
            Trivia.Answer.create({ answerText: 'eikä toistakaan' }),
            Trivia.Answer.create({ answerText: 'miestä kaipaa', correct:true })
        ],
				caption: 'jarmoluk (Public domain)'
    }),
	//Start of Sivistyssanat
	Trivia.Question.create({
		gameId:26,
		image: 'assets/img/sivistyssanat/siv1.jpg',
		questionText: 'Degeneraatio',
		answers: [
			Trivia.Answer.create({ answerText: 'sukupolvi' }),
			Trivia.Answer.create({ answerText: 'rappeutuminen', correct:true }),
			Trivia.Answer.create({ answerText: 'rahan arvon lasku' })
		],
		caption: "Willabee (Public domain)"
	}),
	Trivia.Question.create({
		gameId:26,
		image: 'assets/img/sivistyssanat/siv2.jpg',
		questionText: 'Desibeli',
		answers: [
			Trivia.Answer.create({ answerText: 'muotoilu' }),
			Trivia.Answer.create({ answerText: 'kymmenys' }),
			Trivia.Answer.create({ answerText: 'äänen voimakkuuden yksikkö', correct:true })
		],
		caption: "schneich (Public domain)"
	}),
	Trivia.Question.create({
		gameId:26,
		image: 'assets/img/sivistyssanat/siv3.jpg',
		questionText: 'Hemofilia',
		answers: [
			Trivia.Answer.create({ answerText: 'veren punainen väriaine' }),
			Trivia.Answer.create({ answerText: 'perinnöllinen verenvuototauti', correct:true }),
			Trivia.Answer.create({ answerText: 'verisolu' })
		],
		caption: "224576 (Public domain)"
	}),
	Trivia.Question.create({
		gameId:26,
		image: 'assets/img/sivistyssanat/siv1.jpg',
		questionText: 'Gobeliini',
		answers: [
			Trivia.Answer.create({ answerText: 'suhteettoman suuri henkilö' }),
			Trivia.Answer.create({ answerText: 'rypälesokeri' }),
			Trivia.Answer.create({ answerText: 'kuviollinen seinävaate', correct:true })
		],
		caption: "Willabee (Public domain)"
	}),
	Trivia.Question.create({
		gameId:26,
		image: 'assets/img/sivistyssanat/siv2.jpg',
		questionText: 'Gastronomi',
		answers: [
			Trivia.Answer.create({ answerText: 'herkkujen tuntija', correct:true }),
			Trivia.Answer.create({ answerText: 'vatsalääkäri' }),
			Trivia.Answer.create({ answerText: 'paksusuoli' })
		],
		caption: "schneich (Public domain)"
	}),
	Trivia.Question.create({
		gameId:26,
		image: 'assets/img/sivistyssanat/siv3.jpg',
		questionText: 'Sabotaasi',
		answers: [
			Trivia.Answer.create({ answerText: 'tuhopoltto' }),
			Trivia.Answer.create({ answerText: 'tahallinen ilkivalta', correct:true }),
			Trivia.Answer.create({ answerText: 'juhlapyhä' })
		],
		caption: "224576 (Public domain)"
	}),
	Trivia.Question.create({
		gameId:26,
		image: 'assets/img/sivistyssanat/siv1.jpg',
		questionText: 'Radiologi',
		answers: [
			Trivia.Answer.create({ answerText: 'radioteknikko' }),
			Trivia.Answer.create({ answerText: 'säteilymittari' }),
			Trivia.Answer.create({ answerText: 'sädehoitoon erikoistunut lääkäri', correct:true })
		]
	}),
	Trivia.Question.create({
		gameId:26,
		image: 'assets/img/sivistyssanat/siv2.jpg',
		questionText: 'Pittoreski',
		answers: [
			Trivia.Answer.create({ answerText: 'raamatullinen' }),
			Trivia.Answer.create({ answerText: 'maalauksellinen', correct:true }),
			Trivia.Answer.create({ answerText: 'ympäri pyörähdys' })
		],
		caption: "schneich (Public domain)"
	}),
	Trivia.Question.create({
		gameId:26,
		image: 'assets/img/sivistyssanat/siv3.jpg',
		questionText: 'Fiktiivinen',
		answers: [
			Trivia.Answer.create({ answerText: 'kuvitteellinen', correct:true }),
			Trivia.Answer.create({ answerText: 'jännitysromaani' }),
			Trivia.Answer.create({ answerText: 'postimerkkien keräilijä' })
		],
		caption: "224576 (Public domain)"
	}),
	Trivia.Question.create({
		gameId:26,
		image: 'assets/img/sivistyssanat/siv1.jpg',
		questionText: 'Optimaalinen',
		answers: [
			Trivia.Answer.create({ answerText: 'vastakkaisuus' }),
			Trivia.Answer.create({ answerText: 'silmää hivelevä' }),
			Trivia.Answer.create({ answerText: 'paras mahdollinen', correct:true })
		],
		caption: "Willabee (Public domain)"
	}),
	Trivia.Question.create({
		gameId:26,
		image: 'assets/img/sivistyssanat/siv2.jpg',
		questionText: 'Evoluutio',
		answers: [
			Trivia.Answer.create({ answerText: 'arviointi' }),
			Trivia.Answer.create({ answerText: 'kehitys', correct:true }),
			Trivia.Answer.create({ answerText: 'väestön poissiirtäminen' })
		],
		caption: "schneich (Public domain)"
	}),
	Trivia.Question.create({
		gameId:26,
		image: 'assets/img/sivistyssanat/siv3.jpg',
		questionText: 'Modifikaatio',
		answers: [
			Trivia.Answer.create({ answerText: 'muunnos', correct:true }),
			Trivia.Answer.create({ answerText: 'muotiasiantuntemus' }),
			Trivia.Answer.create({ answerText: 'naisten hattujen valmistus' })
		],
		caption: "224576 (Public domain)"
	}),
	Trivia.Question.create({
		gameId:26,
		image: 'assets/img/sivistyssanat/siv1.jpg',
		questionText: 'Sensuaalinen',
		answers: [
			Trivia.Answer.create({ answerText: 'herkkätuntoinen' }),
			Trivia.Answer.create({ answerText: 'keskeinen' }),
			Trivia.Answer.create({ answerText: 'aistillinen', correct:true })
		],
		caption: "Willabee (Public domain)"
	}),
	Trivia.Question.create({
		gameId:26,
		image: 'assets/img/sivistyssanat/siv2.jpg',
		questionText: 'Laviini',
		answers: [
			Trivia.Answer.create({ answerText: 'tykin alusta' }),
			Trivia.Answer.create({ answerText: 'lumivyöry', correct:true }),
			Trivia.Answer.create({ answerText: 'pesuallas' })
		],
		caption: "schneich (Public domain)"
	}),
	Trivia.Question.create({
		gameId:26,
		image: 'assets/img/sivistyssanat/siv3.jpg',
		questionText: 'Kupletti',
		answers: [
			Trivia.Answer.create({ answerText: 'humoristinen laulu', correct:true }),
			Trivia.Answer.create({ answerText: 'lauluyhtye' }),
			Trivia.Answer.create({ answerText: 'soitinyhtye' })
		],
		caption: "224576 (Public domain)"
	}),
	Trivia.Question.create({
		gameId:26,
		image: 'assets/img/sivistyssanat/siv1.jpg',
		questionText: 'Limnologi',
		answers: [
			Trivia.Answer.create({ answerText: 'rajoitin' }),
			Trivia.Answer.create({ answerText: 'virvoitusjuoman valmistaja' }),
			Trivia.Answer.create({ answerText: 'järvitutkija', correct:true })
		],
		caption: "Willabee (Public domain)"
	}),
	Trivia.Question.create({
		gameId:26,
		image: 'assets/img/sivistyssanat/siv2.jpg',
		questionText: 'Pizzicato',
		answers: [
			Trivia.Answer.create({ answerText: 'pizzaravintola' }),
			Trivia.Answer.create({ answerText: 'sormilla näppäillen', correct:true }),
			Trivia.Answer.create({ answerText: 'Italialainen pitsi' })
		],
		caption: "schneich (Public domain)"
	}),
	Trivia.Question.create({
		gameId:26,
		image: 'assets/img/sivistyssanat/siv3.jpg',
		questionText: 'Sifoni',
		answers: [
			Trivia.Answer.create({ answerText: 'ohut silkkikangas' }),
			Trivia.Answer.create({ answerText: 'paineella toimiva tarjoilupullo', correct:true }),
			Trivia.Answer.create({ answerText: 'merkkiääni' })
		],
		caption: "224576 (Public domain)"
	}),
	Trivia.Question.create({
		gameId:26,
		image: 'assets/img/sivistyssanat/siv1.jpg',
		questionText: 'Tautologia',
		answers: [
			Trivia.Answer.create({ answerText: 'tautien tutkiminen' }),
			Trivia.Answer.create({ answerText: 'ihon maalaaminen' }),
			Trivia.Answer.create({ answerText: 'sanan tai asian toistaminen', correct:true })
		],
		caption: "Willabee (Public domain)"
	}),
	Trivia.Question.create({
		gameId:26,
		image: 'assets/img/sivistyssanat/siv2.jpg',
		questionText: 'Uniikki',
		answers: [
			Trivia.Answer.create({ answerText: 'unitautinen' }),
			Trivia.Answer.create({ answerText: 'ainutlaatuinen', correct:true }),
			Trivia.Answer.create({ answerText: 'valtioliitto' })
		],
		caption: "schneich (Public domain)"
	}),
	//end of Sivistyssanat
	//start of Matemaattisia käsitteitä
	Trivia.Question.create({
		gameId:27,
		questionText: 'Montako kananmunaa on tiussa?',
		image: 'assets/img/mat/mat1.jpg',
		answers: [
			Trivia.Answer.create({ answerText: '10' }),
			Trivia.Answer.create({ answerText: '12' }),
			Trivia.Answer.create({ answerText: '20', correct:true })
		]
	}),
	Trivia.Question.create({
		gameId:27,
		questionText: 'Montako desilitraa litraan mahtuu?',
		image: 'assets/img/mat/mat2.jpg',
		answers: [
			Trivia.Answer.create({ answerText: '5' }),
			Trivia.Answer.create({ answerText: '10', correct:true }),
			Trivia.Answer.create({ answerText: '100' })
		]
	}),
	Trivia.Question.create({
		gameId:27,
		questionText: 'Kuinka monta kilogrammaa on tonni?',
		image: 'assets/img/mat/mat3.jpg',
		answers: [
			Trivia.Answer.create({ answerText: '100' }),
			Trivia.Answer.create({ answerText: '1000', correct:true }),
			Trivia.Answer.create({ answerText: '10000' })
		]
	}),
	Trivia.Question.create({
		gameId:27,
		questionText: 'Montako veljestä Jukolassa oli?',
		image: 'assets/img/mat/mat4.jpg',
		answers: [
			Trivia.Answer.create({ answerText: '7', correct:true }),
			Trivia.Answer.create({ answerText: '10' }),
			Trivia.Answer.create({ answerText: '12' })
		]
	}),
	Trivia.Question.create({
		gameId:27,
		questionText: 'Kuinka monta grammaa on puoli kiloa?',
		image: 'assets/img/mat/mat5.jpg',
		answers: [
			Trivia.Answer.create({ answerText: '5' }),
			Trivia.Answer.create({ answerText: '500', correct:true }),
			Trivia.Answer.create({ answerText: '5000' })
		]
	}),
	Trivia.Question.create({
		gameId:27,
		questionText: 'Montako nollaa on miljoonassa?',
		image: 'assets/img/mat/mat6.jpg',
		answers: [
			Trivia.Answer.create({ answerText: '5' }),
			Trivia.Answer.create({ answerText: '7' }),
			Trivia.Answer.create({ answerText: '6', correct:true })
		]
	}),
	Trivia.Question.create({
		gameId:27,
		questionText: 'Kuinka monta senttiä on eurossa?',
		image: 'assets/img/mat/mat1.jpg',
		answers: [
			Trivia.Answer.create({ answerText: '10' }),
			Trivia.Answer.create({ answerText: '100', correct:true }),
			Trivia.Answer.create({ answerText: '1000' })
		]
	}),
	Trivia.Question.create({
		gameId:27,
		questionText: 'Kuinka monta päivää on vuodessa?',
		image: 'assets/img/mat/mat2.jpg',
		answers: [
			Trivia.Answer.create({ answerText: '180' }),
			Trivia.Answer.create({ answerText: '270' }),
			Trivia.Answer.create({ answerText: '365', correct:true })
		]
	}),
	Trivia.Question.create({
		gameId:27,
		questionText: 'Kuinka monta tähteä otavan-tähtikuviossa on?',
		image: 'assets/img/mat/mat3.jpg',
		answers: [
			Trivia.Answer.create({ answerText: '4' }),
			Trivia.Answer.create({ answerText: '7', correct:true }),
			Trivia.Answer.create({ answerText: '8' })
		]
	}),
	Trivia.Question.create({
		gameId:27,
		questionText: 'Kuinka monta senttimetriä puoli metriä on?',
		image: 'assets/img/mat/mat4.jpg',
		answers: [
			Trivia.Answer.create({ answerText: '50', correct:true }),
			Trivia.Answer.create({ answerText: '250' }),
			Trivia.Answer.create({ answerText: '500' })
		]
	}),
	Trivia.Question.create({
		gameId:27,
		questionText: 'Kumpi painaa enemmän; kilo nauloja vai kilo höyheniä?',
		image: 'assets/img/mat/mat5.jpg',
		answers: [
			Trivia.Answer.create({ answerText: 'kilo nauloja' }),
			Trivia.Answer.create({ answerText: 'kilo höyheniä' }),
			Trivia.Answer.create({ answerText: 'yhtä paljon', correct:true })
		]
	}),
	Trivia.Question.create({
		gameId:27,
		questionText: 'Kuinka monta desilitraa on puoli litraa?',
		image: 'assets/img/mat/mat6.jpg',
		answers: [
			Trivia.Answer.create({ answerText: '2,5' }),
			Trivia.Answer.create({ answerText: '5', correct:true }),
			Trivia.Answer.create({ answerText: '50' })
		]
	}),
	Trivia.Question.create({
		gameId:27,
		questionText: 'Kuinka monta minuuttia on tunnissa?',
		image: 'assets/img/mat/mat1.jpg',
		answers: [
			Trivia.Answer.create({ answerText: '50' }),
			Trivia.Answer.create({ answerText: '60', correct:true }),
			Trivia.Answer.create({ answerText: '100' })
		]
	}),
	Trivia.Question.create({
		gameId:27,
		questionText: 'Kuinka monta senttimetriä on metrissä?',
		image: 'assets/img/mat/mat2.jpg',
		answers: [
			Trivia.Answer.create({ answerText: '10' }),
			Trivia.Answer.create({ answerText: '100', correct:true }),
			Trivia.Answer.create({ answerText: '1000' })
		]
	}),
	Trivia.Question.create({
		gameId:27,
		questionText: 'Montako kylkiluuta ihmisellä on?',
		image: 'assets/img/mat/mat3.jpg',
		answers: [
			Trivia.Answer.create({ answerText: '24', correct:true }),
			Trivia.Answer.create({ answerText: '28' }),
			Trivia.Answer.create({ answerText: '36' })
		]
	}),
	//end of MAtemaattisia käsitteitä
	//Start of Vaihtoehtokysymys: Eurooppa I
	Trivia.Question.create({
		gameId:28,
		questionText: 'Ranskan viimeinen keisari oli',
		image: 'assets/img/eurooppa1/aloitus-piaf-lennon-nurmi.jpg',
		answers: [
			Trivia.Answer.create({ answerText: 'Ludvig VI' }),
			Trivia.Answer.create({ answerText: 'Napoleon III', correct:true }),
			Trivia.Answer.create({ answerText: 'Filip V' })
		],
		caption: "Sari Laitinen"
	}),
	Trivia.Question.create({
		gameId:28,
		questionText: 'Taalainmaan lääni sijaitsee',
		image: 'assets/img/eurooppa1/ruotsi.jpg',
		answers: [
			Trivia.Answer.create({ answerText: 'Norjassa' }),
			Trivia.Answer.create({ answerText: 'Tanskassa' }),
			Trivia.Answer.create({ answerText: 'Ruotsissa', correct:true })
		],
		caption: "Sari Laitinen"
	}),
	Trivia.Question.create({
		gameId:28,
		questionText: 'Ranskalainen laulaja Edith Piaf oli kuollessaan',
		image: 'assets/img/eurooppa1/aloitus-piaf-lennon-nurmi.jpg',
		answers: [
			Trivia.Answer.create({ answerText: '47-vuotias', correct:true }),
			Trivia.Answer.create({ answerText: '51-vuotias' }),
			Trivia.Answer.create({ answerText: '63-vuotias' })
		],
		caption: "Sari Laitinen"
	}),
	Trivia.Question.create({
		gameId:28,
		questionText: 'Skotlannin suurin kaupunki on',
		image: 'assets/img/eurooppa1/quijote-albania-skotlanti.jpg',
		answers: [
			Trivia.Answer.create({ answerText: 'Aberdeen' }),
			Trivia.Answer.create({ answerText: 'Glasgow', correct:true }),
			Trivia.Answer.create({ answerText: 'Edinburgh' })
		],
		caption: "Helena Launiainen"
	}),
	Trivia.Question.create({
		gameId:28,
		questionText: 'Säveltäjä Arvo Pärt on kotoisin',
		image: 'assets/img/eurooppa1/aloitus-piaf-lennon-nurmi.jpg',
		answers: [
			Trivia.Answer.create({ answerText: 'Saksasta' }),
			Trivia.Answer.create({ answerText: 'Virosta', correct:true }),
			Trivia.Answer.create({ answerText: 'Latviasta' })
		],
		caption: "Sari Laitinen"
	}),
	Trivia.Question.create({
		gameId:28,
		questionText: 'Albanian pääkaupunki on',
		image: 'assets/img/eurooppa1/quijote-albania-skotlanti.jpg',
		answers: [
			Trivia.Answer.create({ answerText: 'Tirana', correct:true }),
			Trivia.Answer.create({ answerText: 'Tripoli' }),
			Trivia.Answer.create({ answerText: 'Lezhë' })
		],
		caption: "Helena Launiainen"
	}),
	Trivia.Question.create({
		gameId:28,
		questionText: 'Romaanin Don Quijote kirjoitti',
		image: 'assets/img/eurooppa1/quijote-albania-skotlanti.jpg',
		answers: [
			Trivia.Answer.create({ answerText: 'Albert Dumas' }),
			Trivia.Answer.create({ answerText: 'Miguel de Cervantes', correct:true }),
			Trivia.Answer.create({ answerText: 'Mary Shelley' })
		],
		caption: "Helena Launiainen"
	}),
	Trivia.Question.create({
		gameId:28,
		questionText: 'Viron suurin saari on',
		image: 'assets/img/eurooppa1/jarvi.jpg',
		answers: [
			Trivia.Answer.create({ answerText: 'Saarenmaa', correct:true }),
			Trivia.Answer.create({ answerText: 'Hiidenmaa' }),
			Trivia.Answer.create({ answerText: 'Naissaari' })
		],
		caption: "Helena Launiainen"
	}),
	Trivia.Question.create({
		gameId:28,
		questionText: 'Paavo Nurmi voitti',
		image: 'assets/img/eurooppa1/aloitus-piaf-lennon-nurmi.jpg',
		answers: [
			Trivia.Answer.create({ answerText: '5 olympiakultaa' }),
			Trivia.Answer.create({ answerText: '12 olympiakultaa' }),
			Trivia.Answer.create({ answerText: '9 olympiakultaa', correct:true })
		],
		caption: "Sari Laitinen"
	}),
	Trivia.Question.create({
		gameId:28,
		questionText: 'Monacon hallitsijasuvun nimi on',
		image: 'assets/img/eurooppa1/ranska-pariisi-monaco.jpg',
		answers: [
			Trivia.Answer.create({ answerText: 'Bernadotte' }),
			Trivia.Answer.create({ answerText: 'Grimaldi', correct:true }),
			Trivia.Answer.create({ answerText: 'Sforza' })
		],
		caption: 'Sari laitinen'
	}),
	Trivia.Question.create({
		gameId:28,
		questionText: 'Kustaa Vaasa hallitsi Ruotsia',
		image: 'assets/img/eurooppa1/quijote-albania-skotlanti.jpg',
		answers: [
			Trivia.Answer.create({ answerText: '37 vuotta', correct:true }),
			Trivia.Answer.create({ answerText: '40 vuotta' }),
			Trivia.Answer.create({ answerText: '55 vuotta' })
		],
		caption: "Helena Launiainen"
	}),
	Trivia.Question.create({
		gameId:28,
		questionText: 'Drottnigholmin linna sijaitsee',
		image: 'assets/img/eurooppa1/ruotsi.jpg',
		answers: [
			Trivia.Answer.create({ answerText: 'Tanskassa' }),
			Trivia.Answer.create({ answerText: 'Norjassa' }),
			Trivia.Answer.create({ answerText: 'Ruotsissa', correct:true })
		],
		caption: "Sari Laitinen"
	}),
	Trivia.Question.create({
		gameId:28,
		questionText: 'Laulaja John Lennon kuoli vuonna',
		image: 'assets/img/eurooppa1/aloitus-piaf-lennon-nurmi.jpg',
		answers: [
			Trivia.Answer.create({ answerText: '1978' }),
			Trivia.Answer.create({ answerText: '1980', correct:true }),
			Trivia.Answer.create({ answerText: '1992' })
		],
		caption: "Sari Laitinen"
	}),
	Trivia.Question.create({
		gameId:28,
		questionText: 'Taiteilija, joka maalasi Guarnica -nimisen taulun on',
		image: 'assets/img/eurooppa1/aloitus-piaf-lennon-nurmi.jpg',
		answers: [
			Trivia.Answer.create({ answerText: 'Max Weber' }),
			Trivia.Answer.create({ answerText: 'Pablo Picasso', correct:true }),
			Trivia.Answer.create({ answerText: 'Joan Miró' })
		],
		caption: "Sari Laitinen"
	}),
	Trivia.Question.create({
		gameId:28,
		questionText: 'Pariisin Disneyland avattiin vuonna',
		image: 'assets/img/eurooppa1/ranska-pariisi-monaco.jpg',
		answers: [
			Trivia.Answer.create({ answerText: '1952' }),
			Trivia.Answer.create({ answerText: '1972' }),
			Trivia.Answer.create({ answerText: '1992', correct:true })
		],
		caption: 'Sari Laitinen'
	}),
	Trivia.Question.create({
		gameId:28,
		questionText: 'Adolf Hitler oli kuollessaan',
		image: 'assets/img/eurooppa1/hitler.jpg',
		answers: [
			Trivia.Answer.create({ answerText: '46-vuotias' }),
			Trivia.Answer.create({ answerText: '56-vuotias', correct:true }),
			Trivia.Answer.create({ answerText: '66-vuotias' })
		],
		caption: "Helena Launiainen"
	}),
	Trivia.Question.create({
		gameId:28,
		questionText: 'Darwin julkaisi teoksensa "Lajien synty" vuonna',
		image: 'assets/img/eurooppa1/aloitus-piaf-lennon-nurmi.jpg',
		answers: [
			Trivia.Answer.create({ answerText: '1679' }),
			Trivia.Answer.create({ answerText: '1759' }),
			Trivia.Answer.create({ answerText: '1859', correct:true })
		],
		caption: "Sari Laitinen"
	}),
	//end of Vaihtoehtokysymys: Eurooppa I
	//start of Vaihtoehtokysymys: Eurooppa II
	Trivia.Question.create({
		gameId:29,
		questionText: 'Vuoden 1984 talviolympialaiset pidettiin',
		image: 'assets/img/eurooppa2/talviolympialaiset.jpg',
		answers: [
			Trivia.Answer.create({ answerText: 'Grenoblessa' }),
			Trivia.Answer.create({ answerText: 'Sarajevossa', correct:true }),
			Trivia.Answer.create({ answerText: 'Salt Lake Cityssä' })
		],
		caption: "Sari Laitinen"
	}),
	Trivia.Question.create({
		gameId:29,
		questionText: 'Tonavan pituus on',
		image: 'assets/img/eurooppa2/aloitus-tonava.jpg',
		answers: [
			Trivia.Answer.create({ answerText: '2450km' }),
			Trivia.Answer.create({ answerText: '2650km' }),
			Trivia.Answer.create({ answerText: '2850km', correct:true })
		],
		caption: "Helena Launianen"
	}),
	Trivia.Question.create({
		gameId:29,
		questionText: 'Venäjän viimeinen tsaari oli',
		image: 'assets/img/eurooppa2/venaja.jpg',
		answers: [
			Trivia.Answer.create({ answerText: 'Nikolai II', correct:true }),
			Trivia.Answer.create({ answerText: 'Iivana IV' }),
			Trivia.Answer.create({ answerText: 'Pietari Suuri' })
		],
		caption: "Sari Laitinen"
	}),
	Trivia.Question.create({
		gameId:29,
		questionText: 'Pieni Merenneito -patsas sijaitsee',
		image: 'assets/img/eurooppa2/tanska.jpg',
		answers: [
			Trivia.Answer.create({ answerText: 'Tukholmassa' }),
			Trivia.Answer.create({ answerText: 'Oslossa' }),
			Trivia.Answer.create({ answerText: 'Kööpenhaminassa', correct:true })
		],
		caption: "Sari Laitinen"
	}),
	Trivia.Question.create({
		gameId:29,
		questionText: 'Wolfgang Amadeus Mozart syntyi vuonna',
		image: 'assets/img/eurooppa2/mozart.jpg',
		answers: [
			Trivia.Answer.create({ answerText: '1556' }),
			Trivia.Answer.create({ answerText: '1656' }),
			Trivia.Answer.create({ answerText: '1756', correct:true })
		],
		caption: 'Sari Laitinen'
	}),
	Trivia.Question.create({
		gameId:29,
		questionText: 'Englannin kuningatar Elizabeth I kruunattiin kuningattareksi',
		image: 'assets/img/eurooppa1/aloitus-piaf-lennon-nurmi.jpg',
		answers: [
			Trivia.Answer.create({ answerText: '22-vuotiaana' }),
			Trivia.Answer.create({ answerText: '25-vuotiaana', correct:true }),
			Trivia.Answer.create({ answerText: '28-vuotiaana' })
		],
		caption: "Sari Laitinen"
	}),
	Trivia.Question.create({
		gameId:29,
		questionText: 'Nobelin rauhanpalkinnon vuonna 2008 voitti',
		image: 'assets/img/eurooppa1/aloitus-piaf-lennon-nurmi.jpg',
		answers: [
			Trivia.Answer.create({ answerText: 'Lech Walesa' }),
			Trivia.Answer.create({ answerText: 'Martti Ahtisaari', correct:true }),
			Trivia.Answer.create({ answerText: 'Desmond Tutu' })
		],
		caption: "Sari Laitinen"
	}),
	Trivia.Question.create({
		gameId:29,
		questionText: 'James Bondin hahmon loi kirjailija',
		image: 'assets/img/eurooppa1/aloitus-piaf-lennon-nurmi.jpg',
		answers: [
			Trivia.Answer.create({ answerText: 'James Bond' }),
			Trivia.Answer.create({ answerText: 'Agatha Christie' }),
			Trivia.Answer.create({ answerText: 'Ian Fleming', correct:true })
		],
		caption: "Sari Laitinen"
	}),
	Trivia.Question.create({
		gameId:29,
		questionText: 'Suomessa on järviä',
		image: 'assets/img/eurooppa2/suomi.jpg',
		answers: [
			Trivia.Answer.create({ answerText: 'n. 98 000' }),
			Trivia.Answer.create({ answerText: 'n. 158 000' }),
			Trivia.Answer.create({ answerText: 'n. 188 000', correct:true })
		],
		caption: "Sari Laitinen"
	}),
	Trivia.Question.create({
		gameId:29,
		questionText: 'Pisan kaltevan tornin korkeus on',
		image: 'assets/img/eurooppa2/perus.jpg',
		answers: [
			Trivia.Answer.create({ answerText: '46 metriä' }),
			Trivia.Answer.create({ answerText: '56 metriä', correct:true }),
			Trivia.Answer.create({ answerText: '66 metriä' })
		],
		caption: "Helena Launiainen"
	}),
	Trivia.Question.create({
		gameId:29,
		questionText: 'Leonardo da Vinci syntyi',
		image: 'assets/img/eurooppa1/aloitus-piaf-lennon-nurmi.jpg',
		answers: [
			Trivia.Answer.create({ answerText: '1452', correct:true }),
			Trivia.Answer.create({ answerText: '1552' }),
			Trivia.Answer.create({ answerText: '1652' })
		],
		caption: "Sari Laitinen"
	}),
	Trivia.Question.create({
		gameId:29,
		questionText: 'Eiffel-torni rakennettiin vuonna',
		image: 'assets/img/eurooppa1/ranska-pariisi-monaco.jpg',
		answers: [
			Trivia.Answer.create({ answerText: '1889', correct:true }),
			Trivia.Answer.create({ answerText: '1909' }),
			Trivia.Answer.create({ answerText: '1929' })
		],
		caption: 'Sari Laitinen'
	}),
	Trivia.Question.create({
		gameId:29,
		questionText: 'Suomen sisällissota sodittiin vuonna',
		image: 'assets/img/eurooppa2/sisallissota-islanti.jpg',
		answers: [
			Trivia.Answer.create({ answerText: '1808' }),
			Trivia.Answer.create({ answerText: '1918', correct:true }),
			Trivia.Answer.create({ answerText: '1944' })
		],
		caption: "Sari Laitinen"
	}),
	Trivia.Question.create({
		gameId:29,
		questionText: 'Sputnik I laukaistiin vuonna',
		image: 'assets/img/eurooppa2/perus.jpg',
		answers: [
			Trivia.Answer.create({ answerText: '1947' }),
			Trivia.Answer.create({ answerText: '1957', correct:true }),
			Trivia.Answer.create({ answerText: '1967' })
		],
		caption: "Helena Launiainen"
	}),
	Trivia.Question.create({
		gameId:29,
		questionText: 'Kesäolympialaiset pidettiin Barcelonassa vuonna',
		image: 'assets/img/eurooppa1/ranska-pariisi-monaco.jpg',
		answers: [
			Trivia.Answer.create({ answerText: '1984' }),
			Trivia.Answer.create({ answerText: '1988' }),
			Trivia.Answer.create({ answerText: '1992', correct:true })
		],
		caption: 'Sari Laitinen'
	}),
	Trivia.Question.create({
		gameId:29,
		questionText: 'Taidemaalari Edvard Munch oli kotoisin',
		image: 'assets/img/eurooppa1/aloitus-piaf-lennon-nurmi.jpg',
		answers: [
			Trivia.Answer.create({ answerText: 'Norjasta', correct:true }),
			Trivia.Answer.create({ answerText: 'Virosta' }),
			Trivia.Answer.create({ answerText: 'Saksasta' })
		],
		caption: "Sari Laitinen"
	}),
	Trivia.Question.create({
		gameId:29,
		questionText: 'Euroopassa ensimmäisenä naisen valtion johtajaksi valinnut maa oli',
		image: 'assets/img/eurooppa2/sisallissota-islanti.jpg',
		answers: [
			Trivia.Answer.create({ answerText: 'Saksa' }),
			Trivia.Answer.create({ answerText: 'Viro' }),
			Trivia.Answer.create({ answerText: 'Islanti', correct:true })
		],
		caption: 'Sari Laitinen'
	}),
	//end of Vaihtoehtokysymys: Eurooppa II

	Trivia.Question.create({
		gameId:30,
		mediaId:6,
		questionText: ' ',
		image: 'assets/img/pilvi.jpg',
		options: {changeAt: 8000}
	}),
	Trivia.Question.create({
		gameId:30,
		mediaId:6,
		questionText: "Menneiden muistot mielessä laukkaa, <br> kaikki on siellä kohdallaan.",
		image: 'assets/img/pilvi.jpg',
		options: {changeAt: 17000}
	}),
	Trivia.Question.create({
		gameId:30,
		mediaId:6,
		questionText: 'Minnekä eilen retkemme johti,<br> maisemat häipyi unholaan.',
		image: 'assets/img/pilvi.jpg',
		options: {changeAt: 25000}
	}),
	Trivia.Question.create({
		gameId:30,
		mediaId:6,
		questionText: 'Voi tuota muistia mihin se on mennyt,<br> onko se loppunut kokonaan.',
		image: 'assets/img/pilvi.jpg',
		options: {changeAt: 33000}
	}),
	Trivia.Question.create({
		gameId:30,
		mediaId:6,
		questionText: 'Uutiset uudet unohtuvat kohta,<br> niin kuin ei ois niitä kuullutkaan.',
		image: 'assets/img/pilvi.jpg',
		options: {changeAt: 50000}
	}),
	Trivia.Question.create({
		gameId:30,
		mediaId:6,
		questionText: 'Kinnunen heitti, Vireeni juoksi,<br> mainetta kultaa Suomeen toi.',
		image: 'assets/img/pilvi.jpg',
		options: {changeAt: 58000}
	}),
	Trivia.Question.create({
		gameId:30,
		mediaId:6,
		questionText: 'Ketkä on maamme mestarit tänään,<br> milloinka heidät nähdä voi.',
		image: 'assets/img/pilvi.jpg',
		options: {changeAt: 67000}
	}),
	Trivia.Question.create({
		gameId:30,
		mediaId:6,
		questionText: 'Voi tuota muistia mihin se on mennyt,<br> onko se loppunut kokonaan.',
		image: 'assets/img/pilvi.jpg',
		options: {changeAt: 75000}
	}),
	Trivia.Question.create({
		gameId:30,
		mediaId:6,
		questionText: 'Uutiset uudet unohtuvat kohta,<br> niin kuin ei ois niitä kuullutkaan.',
		image: 'assets/img/pilvi.jpg',
		options: {changeAt: 91000}
	}),
	Trivia.Question.create({
		gameId:30,
		mediaId:6,
		questionText: 'Tieto se kulkee vauhdilla täällä,<br> matkassa en voi pysyä.',
		image: 'assets/img/pilvi.jpg',
		options: {changeAt: 99000}
	}),
	Trivia.Question.create({
		gameId:30,
		mediaId:6,
		questionText: 'Juuri kun luulin mukana ollaan,<br> samaa taas täytyy kysyä.',
		image: 'assets/img/pilvi.jpg',
		options: {changeAt: 107000}
	}),
	Trivia.Question.create({
		gameId:30,
		mediaId:6,
		questionText: 'Voi tuota muistia mihin se on mennyt,<br> onko se loppunut kokonaan.',
		image: 'assets/img/pilvi.jpg',
		options: {changeAt: 116000}
	}),
	Trivia.Question.create({
		gameId:30,
		mediaId:6,
		questionText: 'Uutiset uudet unohtuvat kohta,<br> niin kuin ei ois niitä kuullutkaan.',
		image: 'assets/img/pilvi.jpg',
		options: {changeAt: 124000}
	}),
	Trivia.Question.create({
		gameId:30,
		mediaId:6,
		questionText: 'Voi tuota muistia mihin se on mennyt,<br> onko se loppunut kokonaan.',
		image: 'assets/img/pilvi.jpg',
		options: {changeAt: 132000}
	}),
	Trivia.Question.create({
		gameId:30,
		mediaId:6,
		questionText: 'Uutiset uudet unohtuvat kohta,<br> niin kuin ei ois niitä kuullutkaan.',
		image: 'assets/img/pilvi.jpg',
		options: {}
	}),
	Trivia.Question.create({
		gameId:31,
		mediaId:15,
		questionText: ' ',
		image: 'assets/img/grammari.jpg',
		options: {changeAt: 11000}
	}),
	Trivia.Question.create({
		gameId:31,
		mediaId:15,
		questionText: 'Albumin kuvat ain mielen saa lentoon menneiden vuosien muistojen luo.',
		image: 'assets/img/grammari.jpg',
		options: {changeAt: 24000}
	}),
	Trivia.Question.create({
		gameId:31,
		mediaId:15,
		questionText: 'Juhlien pyörteisiin iloiseen rentoon lauluksi muuttuvat muistoni nuo.',
		image: 'assets/img/grammari.jpg',
		options: {changeAt: 35000}
	}),
	Trivia.Question.create({
		gameId:31,
		mediaId:15,
		questionText: 'Laulun mahti näin virkistää, lämmittää, yhdistää',
		image: 'assets/img/grammari.jpg',
		options: {changeAt: 46000}
	}),
	Trivia.Question.create({
		gameId:31,
		mediaId:15,
		questionText: 'Voimia antaen kantaen, läpi päivämme jokaisen',
		image: 'assets/img/grammari.jpg',
		options: {changeAt: 58000}
	}),
	Trivia.Question.create({
		gameId:31,
		mediaId:15,
		questionText: 'Vauhdilla muuttuvat muodit ja aatteet nuorempi polvi ain omansa tuo',
		image: 'assets/img/grammari.jpg',
		options: {changeAt: 70000}
	}),
	Trivia.Question.create({
		gameId:31,
		mediaId:15,
		questionText: 'Tyylikkäät olivat tavat ja vaatteet, lauluksi muuttuvat muistoni nuo.',
		image: 'assets/img/grammari.jpg',
		options: {changeAt: 82000}
	}),
	Trivia.Question.create({
		gameId:31,
		mediaId:15,
		questionText: 'Laulun mahti näin virkistää, lämmittää, yhdistää',
		image: 'assets/img/grammari.jpg',
		options: {changeAt: 93000}
	}),
	Trivia.Question.create({
		gameId:31,
		mediaId:15,
		questionText: 'Voimia antaen kantaen, läpi päivämme jokaisen.',
		image: 'assets/img/grammari.jpg',
		options: {changeAt: 105000}
	}),
	Trivia.Question.create({
		gameId:31,
		mediaId:15,
		questionText: 'Tunteiden kirjoissa värejä riittää, nousuja, laskuja elämä suo.',
		image: 'assets/img/grammari.jpg',
		options: {changeAt: 116000}
	}),
	Trivia.Question.create({
		gameId:31,
		mediaId:15,
		questionText: 'Aika on lempeä, yhteen ne liittää, lauluksi muuttuvat muistoni nuo.',
		image: 'assets/img/grammari.jpg',
		options: {changeAt: 128000}
	}),
	Trivia.Question.create({
		gameId:31,
		mediaId:15,
		questionText: 'Laulun mahti näin virkistää, lämmittää, yhdistää',
		image: 'assets/img/grammari.jpg',
		options: {changeAt: 139000}
	}),
	Trivia.Question.create({
		gameId:31,
		mediaId:15,
		questionText: 'Voimia antaen kantaen, läpi päivämme jokaisen',
		image: 'assets/img/grammari.jpg',
		options: {}
	}),

	//rentoutus exercises
	Trivia.Question.create({
		gameId:32,
		mediaId:16,
		image: 'assets/img/rentoutus/ren2.jpg',
		questionText: " ",
		caption: 'Marketta Leppänen'
	}),
	Trivia.Question.create({
		gameId:33,
		mediaId:17,
		image: 'assets/img/rentoutus/ren3.jpg',
		questionText: " ",
		caption: 'Marketta Leppänen'
	}),
	//jumppaliikkeet
	Trivia.Question.create({
		gameId:39,
		mediaId: 21,
		image: 'assets/img/jumppa/aamu/2.jpg',
		questionText: 'Heilauta oikeaa kättä eteen ja taakse.',
		options: {changeAt: "pressed"}
	}),
	Trivia.Question.create({
		gameId:39,
		mediaId: 21,
		image: 'assets/img/jumppa/aamu/3.jpg',
		questionText: 'Heilauta vasenta kättä eteen ja taakse laajasti.',
		options: {changeAt: "pressed"}
	}),
	Trivia.Question.create({
		gameId:39,
		mediaId: 21,
		image: 'assets/img/jumppa/aamu/4.jpg',
		questionText: 'Piirrä vaakakahdeksikkoa sivulta sivulle, isot silmukat. Harjoittele molemmin käsin.',
		options: {changeAt: "pressed"}
	}),
	Trivia.Question.create({
		gameId:39,
		mediaId: 21,
		image: 'assets/img/jumppa/aamu/5.jpg',
		questionText: 'Heilauta jalkaa eteen ja taakse. Harjoittele molemmin jaloin.',
		options: {changeAt: "pressed"}
	}),
	Trivia.Question.create({
		gameId: 39,
		mediaId: 21,
		image: 'assets/img/jumppa/aamu/6.jpg',
		questionText: 'Piirrä oikealla ja vasemmalla jalalla laiskoja kahdeksikkoja.',
		options: {changeAt: "pressed"}
	}),
	Trivia.Question.create({
		gameId: 39,
		mediaId: 21,
		image: 'assets/img/jumppa/aamu/1-dimen.jpg',
		questionText: 'Tee molemmilla käsillä laajoja kahdeksikkoja.',
		options: {changeAt: "pressed"}
	}),
	Trivia.Question.create({
		gameId: 40,
		mediaId: 21,
		image: 'assets/img/jumppa/jenkka/2.jpg',
		questionText: 'Nosta jalkoja jenkan tahtiin ylös ja alas.',
		options: {changeAt: "pressed"}
	}),
	Trivia.Question.create({
		gameId: 40,
		mediaId: 21,
		image: 'assets/img/jumppa/jenkka/3.jpg',
		questionText: 'Työnnä kantapäitä vuorotellen eteen ja taakse.',
		options: {changeAt: "pressed"}
	}),
	Trivia.Question.create({
		gameId: 40,
		mediaId: 21,
		image: 'assets/img/jumppa/jenkka/4.jpg',
		questionText: 'Hiihtoliike: Ylävartalo kiertyy ja sormetkin ojentuvat.',
		options: {changeAt: "pressed"}
	}),
	Trivia.Question.create({
		gameId: 40,
		mediaId: 21,
		image: 'assets/img/jumppa/jenkka/5.jpg',
		questionText: 'Taputa oikeaa reittä molemmin käsin 4 kertaa, taputa vasenta reittä molemmin käsin 4 kertaa, kierrä vartaloa.',
		options: {changeAt: "pressed"}
	}),
	Trivia.Question.create({
		gameId: 40,
		mediaId: 21,
		image: 'assets/img/jumppa/jenkka/6.jpg',
		questionText: 'Taputa oikealle kaksi kertaa, vasemmalle kaksi kertaa.',
		options: {changeAt: "pressed"}
	}),
	Trivia.Question.create({
		gameId: 40,
		mediaId: 21,
		image: 'assets/img/jumppa/jenkka/7.jpg',
		questionText: 'Ravistele käsiä sinne ja tänne, sivuille ja ylös, alas ja eteen.',
		options: {changeAt: "pressed"}
	}),

	//suomi quizzes start
	Trivia.Question.create({
		gameId: 41,
		questionText: 'Milloin on seuraava karkausvuosi?',
		answers: [
			Trivia.Answer.create({ answerText: '2015' }),
			Trivia.Answer.create({ answerText: '2016', correct:true }),
			Trivia.Answer.create({ answerText: '2017' })
		]
	}),
	Trivia.Question.create({
		gameId: 41,
		questionText: 'Kenen nimipäivä on uudenvuodenpäivänä?',
		answers: [
			Trivia.Answer.create({ answerText: 'Aatamin' }),
			Trivia.Answer.create({ answerText: 'Eevan' }),
			Trivia.Answer.create({ answerText: 'Ei kenenkään', correct:true })
		]
	}),
	Trivia.Question.create({
		gameId: 41,
		questionText: 'Mihin kaupunkiin rakennettiin Suomen ensimmäinen jäähalli?',
		answers: [
			Trivia.Answer.create({ answerText: 'Turkuun' }),
			Trivia.Answer.create({ answerText: 'Helsinkiin' }),
			Trivia.Answer.create({ answerText: 'Tampereelle', correct:true })
		]
	}),
	Trivia.Question.create({
		gameId: 41,
		questionText: 'Mikä on Pekka Korven urheilulaji?',
		answers: [
			Trivia.Answer.create({ answerText: 'Jääkiekko' }),
			Trivia.Answer.create({ answerText: 'Raviurheilu', correct:true }),
			Trivia.Answer.create({ answerText: 'Miekkailu' })
		]
	}),
	Trivia.Question.create({
		gameId: 41,
		questionText: 'Missä maakunnassa on Lieksan kaupunki?',
		answers: [
			Trivia.Answer.create({ answerText: 'Savossa' }),
			Trivia.Answer.create({ answerText: 'Pohjois-Karjalassa', correct:true }),
			Trivia.Answer.create({ answerText: 'Lapissa' })
		]
	}),
	Trivia.Question.create({
		gameId: 41,
		questionText: 'Kenen presidenttimme koti sijaitsi Luumäen Kotkanniemessä?',
		answers: [
			Trivia.Answer.create({ answerText: 'P.E. Svinhufvudin', correct:true }),
			Trivia.Answer.create({ answerText: 'Kyösti Kallion' }),
			Trivia.Answer.create({ answerText: 'Urho Kekkosen' })
		]
	}),
	Trivia.Question.create({
		gameId: 41,
		questionText: 'Kenen suomalaisen jääkiekkoiijan lempinimi on Hexi?',
		answers: [
			Trivia.Answer.create({ answerText: 'Teemu Selänteen' }),
			Trivia.Answer.create({ answerText: 'Heikki Riihirannan', correct:true }),
			Trivia.Answer.create({ answerText: 'Veli-Pekka Ketolan' })
		]
	}),
	Trivia.Question.create({
		gameId: 41,
		questionText: 'Missä suuressa järvessämme on Tehinselkä?',
		answers: [
			Trivia.Answer.create({ answerText: 'Inarijärvi' }),
			Trivia.Answer.create({ answerText: 'Päijänne', correct:true }),
			Trivia.Answer.create({ answerText: 'Saimaa' })
		]
	}),
	Trivia.Question.create({
		gameId: 41,
		questionText: 'Mitä roolihahmoa Matti Ranin esitti elokuvassa Tuntematon sotilas?',
		answers: [
			Trivia.Answer.create({ answerText: 'Vänrikki Kariluotoa', correct:true }),
			Trivia.Answer.create({ answerText: 'Luutnantti Lammia' }),
			Trivia.Answer.create({ answerText: 'Alikersantti Rokkaa' })
		]
	}),
	Trivia.Question.create({
		gameId: 41,
		questionText: 'Minkä Suomen kaupungin ruotsinkielinen nimi on Kaskö?',
		answers: [
			Trivia.Answer.create({ answerText: 'Kajaanin' }),
			Trivia.Answer.create({ answerText: 'Kaskisen', correct:true }),
			Trivia.Answer.create({ answerText: 'Kotkan' })
		]
	}),
	Trivia.Question.create({
		gameId: 41,
		questionText: 'Kun kello on Helsingissä 12:00, niin mitä se on Tukholmassa?',
		answers: [
			Trivia.Answer.create({ answerText: '10:00' }),
			Trivia.Answer.create({ answerText: '11:00', correct:true }),
			Trivia.Answer.create({ answerText: '12:00' })
		]
	}),
	Trivia.Question.create({
		gameId: 41,
		questionText: 'Missä kaupungissa teatterineuvos Eila Roine syntyi?',
		answers: [
			Trivia.Answer.create({ answerText: 'Turussa', correct:true }),
			Trivia.Answer.create({ answerText: 'Helsingissä' }),
			Trivia.Answer.create({ answerText: 'Tampereella' })
		]
	}),
	Trivia.Question.create({
		gameId: 41,
		questionText: 'Missä kaupungissa juna pysähtyy Viinijärven rautatieasemalla?',
		answers: [
			Trivia.Answer.create({ answerText: 'Kajaanissa' }),
			Trivia.Answer.create({ answerText: 'Suomussalmella' }),
			Trivia.Answer.create({ answerText: 'Outokummussa', correct:true })
		]
	}),
	Trivia.Question.create({
		gameId: 41,
		questionText: 'Missä maakunnassa sijaitsee Rääkkylän kunta?',
		answers: [
			Trivia.Answer.create({ answerText: 'Lapissa' }),
			Trivia.Answer.create({ answerText: 'Pohjois-Karjalassa', correct:true }),
			Trivia.Answer.create({ answerText: 'Savossa' })
		]
	}),
	//suomi II
	Trivia.Question.create({
		gameId: 42,
		questionText: 'Kuka europarlamentaarikkomme on entinen huippu-urheilija?',
		answers: [
			Trivia.Answer.create({ answerText: 'Sirpa Pietikäinen' }),
			Trivia.Answer.create({ answerText: 'Nils Torvalds' }),
			Trivia.Answer.create({ answerText: 'Sari Essayah', correct:true })
		]
	}),
	Trivia.Question.create({
		gameId: 42,
		questionText: 'Minä vuonna Teija Sopanen valittiin Suomen Neidoksi?',
		answers: [
			Trivia.Answer.create({ answerText: '1951' }),
			Trivia.Answer.create({ answerText: '1952' }),
			Trivia.Answer.create({ answerText: '1953', correct:true })
		]
	}),
	Trivia.Question.create({
		gameId: 42,
		questionText: 'Mikä oli Tauno Palon alkuperäinen sukunimi?',
		answers: [
			Trivia.Answer.create({ answerText: 'Palonen' }),
			Trivia.Answer.create({ answerText: 'Brännäs', correct:true }),
			Trivia.Answer.create({ answerText: 'Brand' })
		]
	}),
	Trivia.Question.create({
		gameId: 42,
		questionText: 'Kenen kuuluisan tiedemiehen ja kirjailijan syntymäki on Paikkarin torppa Sammatissa?',
		answers: [
			Trivia.Answer.create({ answerText: 'Elias Lönnrothin', correct:true }),
			Trivia.Answer.create({ answerText: 'Aleksis Kiven' }),
			Trivia.Answer.create({ answerText: 'J.L. Runebergin' })
		]
	}),
	Trivia.Question.create({
		gameId: 42,
		questionText: 'Missä kaupungissa sijaitsee Sara Hildénin taidemuseo?',
		answers: [
			Trivia.Answer.create({ answerText: 'Turussa' }),
			Trivia.Answer.create({ answerText: 'Tampereella', correct:true }),
			Trivia.Answer.create({ answerText: 'Helsingissä' })
		]
	}),
	Trivia.Question.create({
		gameId: 42,
		questionText: 'Minä vuonna Armi Kuusela valittiin Miss Universumiksi?',
		answers: [
			Trivia.Answer.create({ answerText: '1951' }),
			Trivia.Answer.create({ answerText: '1952', correct:true }),
			Trivia.Answer.create({ answerText: '1953' })
		]
	}),
	Trivia.Question.create({
		gameId: 42,
		questionText: 'Kuka kuuluisa kirjailija rakennutti kodikseen Turjanlinnan?',
		answers: [
			Trivia.Answer.create({ answerText: 'Väinö Linna' }),
			Trivia.Answer.create({ answerText: 'Ilmari Kianto', correct:true }),
			Trivia.Answer.create({ answerText: 'Mika Waltari' })
		]
	}),
	Trivia.Question.create({
		gameId: 42,
		questionText: 'Missä kaupungissa sijaitsee Wäinö Aaltosen museo?',
		answers: [
			Trivia.Answer.create({ answerText: 'Turussa', correct:true }),
			Trivia.Answer.create({ answerText: 'Tampereella' }),
			Trivia.Answer.create({ answerText: 'Helsingissä' })
		]
	}),
	Trivia.Question.create({
		gameId: 42,
		questionText: 'Missä sijaitsee Aleksis Kiven syntymäkoti?',
		answers: [
			Trivia.Answer.create({ answerText: 'Nurmijärvellä', correct:true }),
			Trivia.Answer.create({ answerText: 'Kuopiossa' }),
			Trivia.Answer.create({ answerText: 'Porvoossa' })
		]
	}),
	Trivia.Question.create({
		gameId: 42,
		questionText: 'Missä kaupungissa sijaitsee Gunnar ja Marie-Louise Didrichsenin taidemuseo?',
		answers: [
			Trivia.Answer.create({ answerText: 'Tammisaaressa' }),
			Trivia.Answer.create({ answerText: 'Porvoossa' }),
			Trivia.Answer.create({ answerText: 'Helsingissä', correct:true })
		]
	}),
	Trivia.Question.create({
		gameId: 42,
		questionText: 'Mistä maakunnasta säveltäjä Toivo Kuula oli syntyisin?',
		answers: [
			Trivia.Answer.create({ answerText: 'Savosta' }),
			Trivia.Answer.create({ answerText: 'Kymenlaaksosta' }),
			Trivia.Answer.create({ answerText: 'Pohjanmaalta', correct:true })
		]
	}),
	Trivia.Question.create({
		gameId: 42,
		questionText: 'Minä vuonna elokuva Niskavuoren Heta esitettiin ensimmäisen kerran?',
		answers: [
			Trivia.Answer.create({ answerText: '1942' }),
			Trivia.Answer.create({ answerText: '1952', correct:true }),
			Trivia.Answer.create({ answerText: '1962' })
		]
	}),
	Trivia.Question.create({
		gameId: 42,
		questionText: 'Kuka oli Suomen ensimmäinen naisministeri?',
		answers: [
			Trivia.Answer.create({ answerText: 'Hella Wuolijoki' }),
			Trivia.Answer.create({ answerText: 'Miina Sillanpää', correct:true }),
			Trivia.Answer.create({ answerText: 'Tyyne Leivo-Larsson' })
		]
	}),

	//Lorut
	Trivia.Question.create({
		gameId: 43,
		mediaId: 22,
		options: {playTo: 9300},
		questionText: 'Miten loru jatkuu?',
		answers: [
			Trivia.Answer.create({ answerText: 'siioille siiat' }),
			Trivia.Answer.create({ answerText: 'koirille kuoret' }),
			Trivia.Answer.create({ answerText: 'koirille kuoreet', correct:true })
		]
	}),
	Trivia.Question.create({
		gameId: 44,
		mediaId: 23,
		options: {playTo: 15000},
		questionText: 'Miten loru jatkuu?',
		answers: [
			Trivia.Answer.create({ answerText: 'palan taittoi' }),
			Trivia.Answer.create({ answerText: 'makkaran laittoi', correct:true }),
			Trivia.Answer.create({ answerText: 'makkaran söi' })
		]
	}),
	Trivia.Question.create({
		gameId: 45,
		mediaId: 24,
		options: {playTo: 8300},
		questionText: 'Miten loru jatkuu?',
		answers: [
			Trivia.Answer.create({ answerText: 'eelin keelin' }),
			Trivia.Answer.create({ answerText: 'vaapula vissun', correct:true }),
			Trivia.Answer.create({ answerText: 'viipula vaapula' })
		]
	}),
	Trivia.Question.create({
		gameId: 46,
		mediaId: 25,
		options: {playTo: 7000},
		questionText: 'Miten loru jatkuu?',
		answers: [
			Trivia.Answer.create({ answerText: 'illan tullen sanoi hän', correct:true }),
			Trivia.Answer.create({ answerText: 'kun mä lähden talosta' }),
			Trivia.Answer.create({ answerText: 'illan tullen pelistä pois' })
		]
	}),
	Trivia.Question.create({
		gameId: 47,
		mediaId: 26,
		options: {playTo: 11800},
		questionText: 'Miten loru jatkuu?',
		answers: [
			Trivia.Answer.create({ answerText: 'älä istu' }),
			Trivia.Answer.create({ answerText: 'istu vaan', correct:true }),
			Trivia.Answer.create({ answerText: 'istu isän polvel' })
		]
	}),
	Trivia.Question.create({
		gameId: 48,
		mediaId: 27,
		options: {playTo: 8100},
		questionText: 'Miten loru jatkuu?',
		answers: [
			Trivia.Answer.create({ answerText: 'jaloissa' }),
			Trivia.Answer.create({ answerText: 'kädessä' }),
			Trivia.Answer.create({ answerText: 'kainalossa', correct:true })
		]
	}),
	Trivia.Question.create({
		gameId: 49,
		mediaId: 28,
		options: {playTo: 11100},
		questionText: 'Miten loru jatkuu?',
		answers: [
			Trivia.Answer.create({ answerText: 'antaa sulle puuroo' }),
			Trivia.Answer.create({ answerText: 'keittää sulle puuroo', correct:true }),
			Trivia.Answer.create({ answerText: 'puuroo keittää' })
		]
	}),
	Trivia.Question.create({
		gameId: 50,
		mediaId: 29,
		options: {playTo: 5700},
		questionText: 'Miten loru jatkuu?',
		answers: [
			Trivia.Answer.create({ answerText: 'pääskysestä' }),
			Trivia.Answer.create({ answerText: 'kerttusesta' }),
			Trivia.Answer.create({ answerText: 'peipposesta', correct:true })
		]
	}),
	Trivia.Question.create({
		gameId: 51,
		mediaId: 30,
		options: {playTo: 13300},
		questionText: 'Miten loru jatkuu?',
		answers: [
			Trivia.Answer.create({ answerText: 'ja kermasta' }),
			Trivia.Answer.create({ answerText: 'ja mantelista' }),
			Trivia.Answer.create({ answerText: 'ja kanelista', correct:true })
		]
	}),
	Trivia.Question.create({
		gameId: 51,
		mediaId: 30,
		options: {playTo: 28000},
		questionText: 'Miten loru jatkuu?',
		answers: [
			Trivia.Answer.create({ answerText: 'sisiliskon hännistä' }),
			Trivia.Answer.create({ answerText: 'koiran häntätupsukoista', correct:true }),
			Trivia.Answer.create({ answerText: 'kissan hännistä' })
		]
	}),
	Trivia.Question.create({
		gameId: 52,
		mediaId: 31,
		options: {playTo: 13100},
		questionText: 'Miten loru jatkuu?',
		answers: [
			Trivia.Answer.create({ answerText: 'tortut tehtiin' }),
			Trivia.Answer.create({ answerText: 'tupaan kannettiin', correct:true }),
			Trivia.Answer.create({ answerText: 'tupa siivottiin' })
		]
	}),
	Trivia.Question.create({
		gameId: 53,
		mediaId: 32,
		options: {playTo: 4900},
		questionText: 'Miten loru jatkuu?',
		answers: [
			Trivia.Answer.create({ answerText: 'koffe laade', correct:true }),
			Trivia.Answer.create({ answerText: 'kinkke laade' }),
			Trivia.Answer.create({ answerText: 'doffe laade' })
		]
	}),
	Trivia.Question.create({
		gameId: 54,
		mediaId: 33,
		options: {playTo: 9900},
		questionText: 'Miten loru jatkuu?',
		answers: [
			Trivia.Answer.create({ answerText: 'härkäläisten kivitietä' }),
			Trivia.Answer.create({ answerText: 'hämäläisten härkätietä', correct:true }),
			Trivia.Answer.create({ answerText: 'turunlinnan härkätietä' })
		]
	}),
	Trivia.Question.create({
		gameId: 54,
		mediaId: 33,
		options: {playTo: 30500},
		questionText: 'Miten loru jatkuu?',
		answers: [
			Trivia.Answer.create({ answerText: 'onko lasta kätkyeessä', correct:true }),
			Trivia.Answer.create({ answerText: 'onko lapsi nukkumassa' }),
			Trivia.Answer.create({ answerText: 'joko lapsi nukkuu' })
		]
	}),
	Trivia.Question.create({
		gameId: 55,
		mediaId: 34,
		options: {playTo: 10900},
		questionText: 'Miten loru jatkuu?',
		answers: [
			Trivia.Answer.create({ answerText: 'kolipäässä kissalla' }),
			Trivia.Answer.create({ answerText: 'kultaisella varsalla' }),
			Trivia.Answer.create({ answerText: 'valkealla varsalla', correct:true })
		]
	}),
	Trivia.Question.create({
		gameId: 55,
		mediaId: 34,
		options: {playTo: 25500},
		questionText: 'Miten loru jatkuu?',
		answers: [
			Trivia.Answer.create({ answerText: 'harakka huttua keittää' }),
			Trivia.Answer.create({ answerText: 'harakka halot hakkaa', correct:true }),
			Trivia.Answer.create({ answerText: 'varis vetää nuottaa' })
		]
	}),
	Trivia.Question.create({
		gameId: 56,
		mediaId: 35,
		options: {playTo: 17000},
		questionText: 'Miten loru jatkuu?',
		answers: [
			Trivia.Answer.create({ answerText: 'mummon korista' }),
			Trivia.Answer.create({ answerText: 'mamman kaapista', correct:true }),
			Trivia.Answer.create({ answerText: 'isän pellosta' })
		]
	}),
	Trivia.Question.create({
		gameId: 57,
		mediaId: 36,
		options: {playTo: 10900},
		questionText: 'Miten loru jatkuu?',
		answers: [
			Trivia.Answer.create({ answerText: 'korkeilla kengillä' }),
			Trivia.Answer.create({ answerText: 'kauniilla liinalla' }),
			Trivia.Answer.create({ answerText: 'korealla kontilla', correct:true })
		]
	}),
];

Trivia.medias = [
        Trivia.Media.create({
            guid: 1,
            mediaType: 'mp3',
						//url: 'https://pienipiiri.s3.amazonaws.com/trivia/assets/new/kulkurinvalssi1.mp3'
						url: 'assets/sound/music/kulkurinvalssi1.mp3'
        }),
        Trivia.Media.create({
            guid: 2,
            mediaType: 'mp3',
						//url: 'https://pienipiiri.s3.amazonaws.com/trivia/assets/new/lapsuudentoverille1.mp3'
						url: 'assets/sound/music/lapsuudentoverille1.mp3'
        }),
        Trivia.Media.create({
            guid: 3,
            mediaType: 'mp3',
						//url: 'https://pienipiiri.s3.amazonaws.com/trivia/assets/new/valiaikainen1.mp3'
						url: 'assets/sound/music/valiaikainen1.mp3'
        }),
        Trivia.Media.create({
            guid: 4,
            mediaType: 'mp3',
						//url: 'https://pienipiiri.s3.amazonaws.com/trivia/assets/new/tulipunaruusut1.mp3'
						url: 'assets/sound/music/tulipunaruusut1.mp3'
        }),
        Trivia.Media.create({
            guid: 5,
						mediaType: 'mp3',
						//url: 'https://pienipiiri.s3.amazonaws.com/trivia/assets/new/suutarinemannankehtolaulu.mp3'
						url: 'assets/sound/music/suutarinemannankehtolaulu.mp3'
        }),
        Trivia.Media.create({
            guid: 6,
            mediaType: 'mp3',
						//url: 'https://pienipiiri.s3.amazonaws.com/trivia/assets/new/voituotamuistia.mp3'
						url: 'assets/sound/music/voituotamuistia.mp3'
        }),
		Trivia.Media.create({
			guid: 11,
			mediaType: 'mp3',
			//url: 'https://pienipiiri.s3.amazonaws.com/trivia/assets/new/kulkurinvalssi2.mp3'
			url: 'assets/sound/music/kulkurinvalssi2.mp3'
		}),
		Trivia.Media.create({
			guid: 12,
			mediaType: 'mp3',
			//url:'https://pienipiiri.s3.amazonaws.com/trivia/assets/new/lapsuudentoverille2.mp3'
			url: 'assets/sound/music/lapsuudentoverille2.mp3'
		}),
		Trivia.Media.create({
			guid: 13,
			mediaType: 'mp3',
			// url:'https://pienipiiri.s3.amazonaws.com/trivia/assets/new/valiaikainen2.mp3'
			url: 'assets/sound/music/valiaikainen2.mp3'
		}),
		Trivia.Media.create({
			guid: 14,
			mediaType: 'mp3',
			// url:'https://pienipiiri.s3.amazonaws.com/trivia/assets/new/tulipunaruusut2.mp3'
			url: 'assets/sound/music/tulipunaruusut2.mp3'
		}),
		Trivia.Media.create({
			guid: 15,
			mediaType: 'mp3',
			// url:'http://pienipiiri.s3.amazonaws.com/trivia/assets/new/laulunmahti.mp3' //pelkkä gapless
			url: 'assets/sound/music/laulunmahti.mp3'
		}),

		Trivia.Media.create({
			guid: 16,
			mediaType: 'mp3',
			url: 'assets/sound/music/yksilorentoutus.mp3'
		}),
		Trivia.Media.create({
			guid: 17,
			mediaType: 'mp3',
			url: 'assets/sound/music/parirentoutus.mp3'
		}),
		Trivia.Media.create({
			guid:21,
			mediaType: 'no-sound', //soundless implementation
			url: 'no-sound'
		}),
		//lorut audio both gapless and gapped
		Trivia.Media.create({
			guid:22,
			mediaType: 'mp3',
			// url: 'https://pienipiiri.s3.amazonaws.com/trivia/assets/new/lorut/veetaannuottaa.mp3'
			url: 'assets/sound/lorut/veetaannuottaa.mp3'
		}),
		Trivia.Media.create({
			guid:23,
			mediaType: 'mp3',
			// url: 'https://pienipiiri.s3.amazonaws.com/trivia/assets/new/lorut/peukaloputti.mp3',
			url: 'assets/sound/lorut/peukaloputti.mp3'
		}),
		Trivia.Media.create({
			guid:24,
			mediaType: 'mp3',
			// url: 'https://pienipiiri.s3.amazonaws.com/trivia/assets/new/lorut/enttententten.mp3'
			url: 'assets/sound/lorut/enttententten.mp3'
		}),
		Trivia.Media.create({
			guid:25,
			mediaType: 'mp3',
			// url: 'https://pienipiiri.s3.amazonaws.com/trivia/assets/new/lorut/maalarimaalasitaloa.mp3'
			url: 'assets/sound/lorut/maalarimaalasitaloa.mp3'
		}),
		Trivia.Media.create({
			guid:26,
			mediaType: 'mp3',
			// url: 'https://pienipiiri.s3.amazonaws.com/trivia/assets/new/lorut/ykskakskolme.mp3'
			url: 'assets/sound/lorut/ykskakskolme.mp3'
		}),
		Trivia.Media.create({
			guid:27,
			mediaType: 'mp3',
			// url: 'https://pienipiiri.s3.amazonaws.com/trivia/assets/new/lorut/kiskiskissanpoika.mp3'
			url: 'assets/sound/lorut/kiskiskissanpoika.mp3'
		}),
		Trivia.Media.create({
			guid:28,
			mediaType: 'mp3',
			// url: 'https://pienipiiri.s3.amazonaws.com/trivia/assets/new/lorut/lennalennaleppakerttu.mp3'
			url: 'assets/sound/lorut/lennalennaleppakerttu.mp3'
		}),
		Trivia.Media.create({
			guid:29,
			mediaType: 'mp3',
			// url: 'https://pienipiiri.s3.amazonaws.com/trivia/assets/new/lorut/kuukiurusta.mp3'
			url: 'assets/sound/lorut/kuukiurusta.mp3'
		}),
		Trivia.Media.create({
			guid:30,
			mediaType: 'mp3',
			// url: 'https://pienipiiri.s3.amazonaws.com/trivia/assets/new/lorut/mistaonpienettehty.mp3'
			url: 'assets/sound/lorut/mistaonpienettehty.mp3'
		}),
		Trivia.Media.create({
			guid:31,
			mediaType: 'mp3',
			// url: 'https://pienipiiri.s3.amazonaws.com/trivia/assets/new/lorut/viikonpaivat.mp3'
			url: 'assets/sound/lorut/viikonpaivat.mp3'
		}),
		Trivia.Media.create({
			guid:32,
			mediaType: 'mp3',
			// url: 'https://pienipiiri.s3.amazonaws.com/trivia/assets/new/lorut/ulledulledof.mp3'
			url: 'assets/sound/lorut/ulledulledof.mp3'
		}),
		Trivia.Media.create({
			guid:33,
			mediaType: 'mp3',
			// url: 'https://pienipiiri.s3.amazonaws.com/trivia/assets/new/lorut/tuutuutupakkirulla.mp3'
			url: 'assets/sound/lorut/tuutuutupakkirulla.mp3'
		}),
		Trivia.Media.create({
			guid:34,
			mediaType: 'mp3',
			// url: 'https://pienipiiri.s3.amazonaws.com/trivia/assets/new/lorut/korokorokirkkoon.mp3'
			url: 'assets/sound/lorut/korokorokirkkoon.mp3'
		}),
		Trivia.Media.create({
			guid:35,
			mediaType: 'mp3',
			// url: 'https://pienipiiri.s3.amazonaws.com/trivia/assets/new/lorut/mennaanmaata.mp3'
			url: 'assets/sound/lorut/mennaanmaata.mp3'
		}),
		Trivia.Media.create({
			guid:36,
			mediaType: 'mp3',
			// url: 'https://pienipiiri.s3.amazonaws.com/trivia/assets/new/lorut/hussikametsaan.mp3'
			url: 'assets/sound/lorut/hussikametsaan.mp3'
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

	//detect IE
	if(navigator && navigator.appName){

		if(navigator.appName == "Microsoft Internet Explorer"){
			$("body").html('Sovellus ei ole tuettu Internet Explorerilla. <a href="http://www.google.com/chrome">Lataa Google Chrome</a>');
			document.getElementById('application').style.display = 'none';
			console.log('ie detected');
		}else if(navigator.appName == "Netscape"){
			var ua = navigator.userAgent;
			var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
    		if (re.exec(ua) != null){
				$("body").html('Sovellus ei ole tuettu Internet Explorerilla. <a href="http://www.google.com/chrome">Lataa Google Chrome</a>');
				document.getElementById('application').style.display = 'none';
				console.log('ie detected');
			}
		}
	}

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
var player;
function loadPlayer(videoId) {
	setTimeout(function(){
		player = new YT.Player('player', {
	    	height: 620,
	    	width: 1100,
			videoId: videoId,
			playerVars: {
				'autohide': 1,
				//'controls': 0, //this caused weird aspect ratio problems
				'enablejsapi': 1,
				'rel': 0,
				'showinfo': 0,
				'modestbranding': 1
			},
	      	events: {
		        'onReady': onPlayerReady,
		        'onStateChange': onPlayerStateChange,
		        'onError': onPlayerError
	      	}
	    });
	},1500);
}

function onYouTubeIframeAPIReady(){
	loadPlayer(videoUrl);
}

function onPlayerError(event){
     console.log(event.data);
  }

function loadYT(){
	if(!window.YT){
	    loadYTapi();
	}else{
	   loadPlayer(videoUrl);
	}
}
function loadYTapi(){
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function onPlayerReady(event) {
	playVideo();
}

function onPlayerStateChange(event) {
	console.log(event);
	if (event.data == YT.PlayerState.ENDED) {
		Trivia.router.send('finishedPlaying')
	}
}

function playVideo() {
	player.playVideo();
	player.setVolume(100);
}

function pauseVideo() {
	player.pauseVideo();
}

function stopVideo() {
	player.stopVideo();
}

function preloadImage(uri) {
	var img = new Image();
	img.src = uri;
	console.log('imagesLoaded: '+uri);
	return img;
}
