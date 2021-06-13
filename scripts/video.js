let player;
let sliderDot = $(".video__playback-button");
let soundDot = $(".video__volume-button");
let playerContainer = $(".video__player");


let eventsInit = () => {
  let play = false;
  let sound = true;

  $(".video__content").click(event => {
    event.preventDefault();
    play = !play;

    if (play == true) {
        setTimeout(function () {
          player.playVideo();
        }, 300);
    } else {
        setTimeout(function () {
          player.pauseVideo();
        }, 0);
    }
  });

  $(".video__controls-button").click(event => {
    $(".video__content").click();
  });


  $(".video__playback").click(event => {
    if (playerContainer.hasClass("active")) {
      let bar = $(event.currentTarget);
      let clickBar = event.originalEvent.layerX;
      let setDot = (clickBar / bar.width()) * 100;
      $(sliderDot).css("left", String((setDot) + "%"));
      player.seekTo((player.getDuration() / 100) * setDot);
    }
  });

  $(".video__vol-wrapper").parent().click(event => {
    if (playerContainer.hasClass("active")) {
      sound = !sound;

      if (sound == true) {
          $(".video__vol-wrapper").parent().removeClass("off");
          player.setVolume(100);
      } else {
          $(".video__vol-wrapper").parent().addClass("off");
          player.setVolume(0);
      }
    }
  });

  $(".video__volume").click(event => {
    if (playerContainer.hasClass("active")) {
      let bar = $(event.currentTarget);
      let clickBar = event.originalEvent.layerX;
      let setDot = (clickBar / bar.width()) * 100;
      $(soundDot).css("left", String((setDot) + "%"));
      player.setVolume(setDot);
    }
  });
}


let formatTime = timeSec => {
    const roundTime = Math.round(timeSec);

    const minutes = addZero(Math.floor(roundTime / 60));
    const seconds = addZero(roundTime - minutes * 60);

    function addZero(num) {
        return num < 10 ? `0${num}` : num;
    }

    return `${minutes}:${seconds}`;
};


let onPlayerReady = () => {
    player.unMute();
    player.setVolume(100);

    let intervalSlider;
    let intervalSound;
    const durationSec = player.getDuration();
    $(".duration__estimate").text(formatTime(durationSec));

    if (typeof interval != "undefined") {
        clearInterval(interval);
    }

    intervalSlider = setInterval(() => {
        const completedSec = player.getCurrentTime();
        $(".duration__completed").text(formatTime(completedSec));
        $(sliderDot).css("left", String((completedSec / durationSec) * 100) + "%");
    }, 1000);

    intervalSound = setInterval(() => {
        const vol = player.getVolume();
        $(soundDot).css("left", String(vol) + "%");
    }, 100);
};

let onPlayerStateChange = event => {
    /*
        -1 (воспроизведение видео не начато)
        0 (воспроизведение видео завершено)
        1 (воспроизведение)
        2 (пауза)
        3 (буферизация)
        5 (видео подают реплики). 
    */
    switch (event.data) {
        case 0:
            player.stopVideo();
            playerContainer.removeClass("active");
            $(".video__content").click();
            break;

        case 1:
            playerContainer.addClass("active");
            break;

        case 2:
            playerContainer.removeClass("active");
            break;
    }
};


function onYouTubeIframeAPIReady() {
    player = new YT.Player("youtube", {
        height: "100%",
        width: "100%",
        videoId: "JGfR2IhXmx4",
        events: {
            "onReady": onPlayerReady,
            "onStateChange": onPlayerStateChange
        },
        playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            loop: 1,
            modestbranding: 0,
            rel: 0,
            showinfo: 0
        }
    });
}


eventsInit();