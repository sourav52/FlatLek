$(document).ready(function() {
	var $visualizers = $('.visualizer>div');

	function go() {
	  playRunner = setInterval(function() {
	    //visualizers
	    $visualizers.each(function() {
	      $(this).css('height', Math.random() * 90 + 10 + '%');
	    });
	  }, 250);
	};

	go();

	var sessionTimerLength = 1*60*1000;
	var breakTimerLength = 2*60*1000;
	var sessionLength=sessionTimerLength;
	var sessionTimerID;
	var runningStatus = 0;
	var mode = 1;
	var lap = 1;
	var audioPlayer = document.getElementById('bgAudio');
	// var audioLocation = 'audio/start.mp3';

	function formatInteger(uglyValue) {
		if (uglyValue>=0 && uglyValue<=9) {
			return "0"+uglyValue;
		}else{
			return uglyValue;
		}
	}

	function vibration(vibrationTime) {
		var x=navigator.vibrate;
		if(x){
			navigator.vibrate(vibrationTime);
		}else{
			console.log("Vibartion API does not supported");
		}
	}

	function countDownTimer() {
		sessionTimerID = setInterval(function() {
			sessionLength -= 1000;
			var min = Math.floor(sessionLength/(60*1000));
			var sec = Math.floor((sessionLength - (min * 60 * 1000)) / 1000);
			if (sessionLength<=0) {
				$("#sessionName").html( mode ? 'Session' : 'Break' );
				$("#sessionTimer").html(formatInteger(min)+" : "+formatInteger(sec));
				clearTimer(sessionTimerID,1);
				countDownTimer();
			}else{
				$("#sessionName").html(mode ? 'Session' : 'Break');
				$("#sessionTimer").html(formatInteger(min)+" : "+formatInteger(sec));
			}
		},1000);
	}


	function clearTimer(sessionTimerID,clearStatus) {
		clearInterval(sessionTimerID);
		if (clearStatus != undefined) {
			if (mode) {
				sessionLength = breakTimerLength;
				mode = 0;
				// audioPlayer.src = audioLocation;
				audioPlayer.play();
			}else{
				sessionLength = sessionTimerLength;
				mode = 1;
				// audioPlayer.src = audioLocation;
				audioPlayer.play();
			}
			vibration(700);
		}
	}


	function running(status) {
		if (status) {
			$(".icon").addClass('hidden');
			$('.visualizer').removeClass('hidden');
			countDownTimer();
		}else{
			clearTimer(sessionTimerID);
			$(".icon").removeClass('hidden');
			$('.visualizer').addClass('hidden');
		}
	}


	$('#timer').click(function() {

		if (!runningStatus) {
			runningStatus = 1;
			running(runningStatus);
		}else{
			runningStatus = 0;
			running(runningStatus);
		}
	});

});