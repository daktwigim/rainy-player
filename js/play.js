/* Initialize */
  /* no */
  var nohash = chrome.extension.getBackgroundPage().$("#init-no");
  no = nohash.text()*1;
  /* vol */
  var volhash = chrome.extension.getBackgroundPage().$("#init-vol");
  vol = volhash.text()*1;
  /* targeting */
  var target = chrome.extension.getBackgroundPage().document.getElementById("track"+no);
  target.volume = vol;
  $('<i id="vol-now">:'+Math.floor(target.volume*10)+'</i>').replaceAll('#vol-now')
  $(".bg").removeClass("bg").addClass("bg"+no);

/* Status Check */
var checker = target.paused;
if(checker === true){
    $("#play").removeClass("pause").addClass("play");
    $(".fa-pause").removeClass("fa-pause").addClass("fa-play");
}else{
    $("#play").removeClass("play").addClass("pause");
    $(".fa-play").removeClass("fa-play").addClass("fa-pause");
}

/* Play & Pasue */
      $("#play").click(function() {
          if($("#play").hasClass("play") === true){
            /* Play */
            $("#play").removeClass("play").addClass("pause");
            $(".fa-play").removeClass("fa-play").addClass("fa-pause");
            //$(".fa-play").removeClass("fa-play").addClass("fa-pause");
            target.play();
        }else{
            /* Pause */
            $("#play").removeClass("pause").addClass("play");
            $(".fa-pause").removeClass("fa-pause").addClass("fa-play");
            //$(".fa-pause").removeClass("fa-pause").addClass("fa-play");
            target.pause();
        }
      });

/* Change Track */
    /* Init Function */
    var init = function(){
        /* Audio */
        target = chrome.extension.getBackgroundPage().document.getElementById("track"+no);
        target.volume = vol;
        $('<i id="vol-now">:'+Math.floor(target.volume*10)+'</i>').replaceAll('#vol-now');
        target.load();
        /* play */
        target.play();
        $("#play").removeClass("play").addClass("pause");
        $(".fa-play").removeClass("fa-play").addClass("fa-pause");
        /* Volume */
        /* Send no 2 background*/
        nohash.text(no);
    }

    /* Track forward */
    $("#track-forward").click(function() {
        /* Pause */
        target.pause();
        /* Changing */
        if(no === 3){
          no = 1;
          /* Background image */
          var pre = 3;
          $(".bg"+pre).removeClass("bg"+pre).addClass("bg"+no);
      }else{
          no += 1;
          /* Background image */
          var pre = no - 1;
          $(".bg"+pre).removeClass("bg"+pre).addClass("bg"+no);
      }
      init();
    });

    /* Track back*/
    $("#track-back").click(function(){
        /* Pause */
        target.pause();
        /* Changing */
        if(no === 1){
            no = 3;
            /* Background image */
            var pre = 1;
            $(".bg"+pre).removeClass("bg"+pre).addClass("bg"+no);
        }else{
            no -= 1;
            /* Background image */
            var pre = no+1;
            $(".bg"+pre).removeClass("bg"+pre).addClass("bg"+no);
        }
        init();
    });



/* Volume Control */
    /* Send vol 2 background*/
    var sendvol = function(){
      volhash.text(target.volume);
    }

    /* Volume up */
    $("#vol-up").click(function() {
      if(target.volume < 1){
        vol = target.volume += 0.1;
        $('<i id="vol-now">:'+Math.floor(target.volume*10)+'</i>').replaceAll('#vol-now')
        sendvol();
      }
    });

    /* Volume down */
    $("#vol-down").click(function() {
      if(target.volume > 0){
        vol = target.volume -= 0.1;
        $('<i id="vol-now">:'+Math.floor(target.volume*10)+'</i>').replaceAll('#vol-now')
        sendvol();
      }
    });


/* Control By Keyborad */
    $('html').keypress(function (event) {

        /* Play & Pause */
        if(event.which == 32 && $("#play").hasClass("play") === true){
            $("#play").removeClass("play").addClass("pause");
            $(".fa-play").removeClass("fa-play").addClass("fa-pause");
            //$(".fa-play").removeClass("fa-play").addClass("fa-pause");
            target.play();
        }else if(event.which == 32 && $("#play").hasClass("pause") === true){
          $("#play").removeClass("pause").addClass("play");
          $(".fa-pause").removeClass("fa-pause").addClass("fa-play");
          //$(".fa-pause").removeClass("fa-pause").addClass("fa-play");
          target.pause();
        }

    /* Change Track by Keyborad */
        if(event.which == 46){ /* >>> */
            /* Pause */
            target.pause();
            /* Changing */
            if(no === 3){
                no = 1;
                /* Background image */
                var pre = 3;
                $(".bg"+pre).removeClass("bg"+pre).addClass("bg"+no);
            }else{
                no += 1;
                /* Background image */
                var pre = no - 1;
                $(".bg"+pre).removeClass("bg"+pre).addClass("bg"+no);
            }
            init();
        }else if(event.which == 44){ /* <<< */
            /* Pause */
            target.pause();
            /* Changing */
            if(no === 1){
              no = 3;
              /* Background image */
              var pre = 1;
              $(".bg"+pre).removeClass("bg"+pre).addClass("bg"+no);
            }else{
              no -= 1;
              /* Background image */
              var pre = no+1;
              $(".bg"+pre).removeClass("bg"+pre).addClass("bg"+no);
            }
            init();
        }

    /* Volume Control by Keyborad */
        if(event.which == 61 && target.volume < 1){ /*187: '=' @ ASCII*/
            vol = target.volume += 0.1;
            $('<i id="vol-now">:'+Math.floor(target.volume*10)+'</i>').replaceAll('#vol-now')
            sendvol();
        }else if(event.which == 45 && target.volume > 0){ /*189: '-' @ ASCII*/
            vol = target.volume -= 0.1;
            $('<i id="vol-now">:'+Math.floor(target.volume*10)+'</i>').replaceAll('#vol-now')
            sendvol();
        }
    });
