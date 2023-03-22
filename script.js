var song = [
  [0,"Invincible","DEAF KEV","songs/1.mp3","banners/1.jpg","4:33"],
  [1,"My Heart","Different Heaven","songs/2.mp3","banners/2.jpg","4:27"],
  [2,"Keep You","Spektrum ft. Sara Skinner","songs/3.mp3","banners/3.jpg","4:49"],
  [3,"Blank","Disfigure","songs/4.mp3","banners/4.jpg","3:29"],
  [4,"Sky High","Elektronomia","songs/5.mp3","banners/5.jpg","3:58"],
  [5,"Mortals","Warriyo","songs/6.mp3","banners/6.jpg","3:50"]
];


var listDiv = document.querySelector(".list");
var list = document.getElementById("playlist");
var currentIndex = 0;

window.onload = function(){
  listing();
  loadSong();
}






//  CREATING PLAYLIST  FUNCTION

function listing(){
  list.innerHTML = "";
  for (var i = 0; i < song.length; i++) {
    var name = song[i][2] + " - " + song[i][1];
    var title = "";
    if (name.length>22) {
      title = name;
      name = name.substr(0,22) + "...";
    }else{title = name;}
    list.innerHTML += "<li><div class='list-element'><img src='" + song[i][4] + "' width='43px' height='43px'><div><span id='sng' title='" + title + "'>" + name + "</span> <span id='snglnt'>" + song[i][5] + "</span></div><span class='plyonlst' id='playSong' onclick='playOnList(" + i + ",this)'><i class='fas fa-play'></i></span></div></li>";
  }
}

/*----------------------------------------------------------------------*/






// LOADING SONG DATAS

var image = document.querySelector(".image"),
songName = document.getElementById("song"),
artistName = document.getElementById("artist"),
crntTime = document.getElementById("currentTime"),
dur = document.getElementById("songLength"),
audio = document.getElementById("audio");


function loadSong(){
  image.style.background = "url('" + song[currentIndex][4] + "')";
  songName.innerText = song[currentIndex][1];
  artistName.innerText = song[currentIndex][2];
  crntTime.innerText = "0:00";
  dur.innerText = song[currentIndex][5];
  audio.src = song[currentIndex][3];
}




/*----------------------------------------------------------------------*/








// BUTTON EVENTS

var playPause = document.getElementById("play-pause"),
next = document.getElementById("next"),
prev = document.getElementById("prev"),
shuffle = document.getElementById("shuffle"),
shuffledArray = new Array();



playPause.addEventListener("click",function(){
  var listbutton = list.children[currentIndex].querySelector("#playSong");
  listbutton.classList.add("current");

  if(audio.paused) {
    audio.play();
    playPause.innerHTML = "<i class='fas fa-pause'></i>";
    playOnList(-5,listbutton);
  }else {                                                         //  PLAY/PAUSE
    audio.pause();
    playPause.innerHTML = "<i class='fas fa-play'></i>";
    playOnList(-5,listbutton);
  }
});


prev.addEventListener("click",function(){
  if(currentIndex == 0) {
    currentIndex = song.length-1;
  }else {                                                         //  PREVIOUS SONG
    currentIndex--;
  }
  loadSong();
  audio.play();
  playPause.innerHTML = "<i class='fas fa-pause'></i>";
  rfrpol();
});


next.addEventListener("click",function(){
  if(currentIndex == song.length-1) {
    currentIndex = 0;
  }else {                                                         //  NEXT SONG
    currentIndex++;
  }
  loadSong();
  audio.play();
  playPause.innerHTML = "<i class='fas fa-pause'></i>";
  rfrpol();
});


shuffle.addEventListener("click",function(){
  var temp = song[currentIndex][0];
  song = song.sort(() => Math.random() - 0.5);
  for (var i = 0; i < song.length; i++) {                         //  SHUFFLING LIST
    if (temp == song[i][0]) {
      currentIndex = i;
    }
  }
  listing();
  playOnList(-10,list.children[currentIndex].querySelector("#playSong"));
});










/*----------------------------------------------------------------------*/
/*----------------------------------------------------------------------*/

        //  MAKING MANUAL PLAYER

  var progressBar = document.querySelector(".track"),
  musicCurrentTime = document.getElementById("currentTime"),
  musicDur = document.getElementById("songLength"),
  stick = document.querySelector(".stick"),
  vol = document.getElementById("volRange");

  audio.addEventListener("timeupdate", (e)=>{
    var currentTime = e.target.currentTime;
    var duration = e.target.duration;
    var progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = progressWidth + "%";


    audio.addEventListener("loadeddata", ()=>{

      var audDuration = audio.duration;
      var mint = Math.floor(audDuration / 60);
      var sec = Math.floor(audDuration % 60);                                   // WHEN THE CURRENT TIME IS UPDATED ON AUDIO
      if(sec < 10){
        sec = "0" + sec ;
      }
      musicDur.innerText = mint + ":" + sec;
    });

    var currentMint = Math.floor(currentTime / 60);
    var currentSec = Math.floor(currentTime % 60);
    if(currentSec < 10){
      currentSec = "0" + currentSec;
    }
    musicCurrentTime.innerText = currentMint + ":" + currentSec;
  });





    audio.addEventListener("ended", function(){next.click();});                 // WHEN THE MUSIC ENDS


    stick.addEventListener("mousedown", (e)=>{
      var point = e.offsetX;
      var width = e.target.clientWidth;
      var duration2 = audio.duration;
      var percent = (point * 100) / width;                                      // WHEN WE MANUALLY CHANGE THE CURRENT TIME
      var percent2 = (point * duration2) / width;

      progressBar.style.width = point + "px";
      audio.currentTime = percent2;
    });


    vol.addEventListener("input",function(){                                    // SETTING VOLUME LEVEL
      audio.volume = this.value / 100;
    })



/*----------------------------------------------------------------------*/
/*----------------------------------------------------------------------*/












// PLAYING SONG ON LIST

var listBtn = document.getElementsByClassName("plyonlst");

function playOnList(x,ths){
  if (x>-1) {
    currentIndex = x;

    if (ths.classList.contains("current")) {
      if (audio.paused) {
        audio.play();
        playPause.innerHTML = "<i class='fas fa-pause'></i>";
      }else {
        audio.pause();
        playPause.innerHTML = "<i class='fas fa-play'></i>";
      }
    }else {
      loadSong();
      audio.play();
      playPause.innerHTML = "<i class='fas fa-pause'></i>";                     // IF WE CLICK PLAY ON THE PLAYLIST
    }

    if (ths.classList.contains("playing")) {
      ths.classList.remove("playing");
      ths.innerHTML = "<i class='fas fa-play'></i>";
    }else {
      emptyPOLS();
      ths.classList.add("playing");
      ths.classList.add("current");
      ths.innerHTML = "<i class='fas fa-pause'></i>";
    }
  }
  else if (x == -10) {
    emptyPOLS();
    ths.classList.add("current");
    if (audio.paused) {
      ths.classList.remove("playing");
      ths.innerHTML = "<i class='fas fa-play'></i>";                            // REFRESHING POL BTN WHEN PLAYLIST IS SHUFFLED
    }else {
      ths.classList.add("playing");
      ths.innerHTML = "<i class='fas fa-pause'></i>";
    }
  }
  else {
    if (audio.paused) {
      ths.classList.remove("playing");
      ths.innerHTML = "<i class='fas fa-play'></i>";
    }else {                                                                     // REFRESHING POL BTN WHEN PREV/NEXT BUTTON IS CLICKED
      ths.classList.add("playing");
      ths.innerHTML = "<i class='fas fa-pause'></i>";
    }
  }

}




function rfrpol(){
  var xds = list.children[currentIndex].querySelector("#playSong");
  emptyPOLS();
  xds.classList.add("current");                                                 // CHANGING POL BUTTON ON PREV-NEXT CLICKING
  xds.classList.add("playing");
  xds.innerHTML = "<i class='fas fa-pause'></i>";
}


function emptyPOLS(){
  for (var i = 0; i < listBtn.length; i++) {
    listBtn[i].classList.remove("current");                                     // ON HAND FUNCTION FOR MAKING BUTTONS ON THE PLAYLIST DEFAULT
    listBtn[i].classList.remove("playing");
    listBtn[i].innerHTML = "<i class='fas fa-play'></i>";
  }
};







/*----------------------------------------------------------------------*/







// DISPLAYING PLAYLIST TOGGLE
document.getElementById("musicList").onclick = function(){
  listDiv.classList.toggle("showlist");
}
document.getElementById("xx").onclick = function(){
  listDiv.classList.remove("showlist");
}






/*  Volume Input Displaying Toggle */
var volumeBtn = document.getElementById("volume");
volume.onclick = function(){
  document.querySelector(".st1").classList.toggle("display");
}






/*----------------------------------------------------------------------*/


































//FOR RANGE INPUT'S RUNNABLE TRACK
var volTr = document.querySelector("#volRange");

function setBackgroundSize(volTr) {
  volTr.style.setProperty("--background-size", getBackgroundSize(volTr) + "%");
}

setBackgroundSize(volTr);

volTr.addEventListener("input", () => setBackgroundSize(volTr));

function getBackgroundSize(volTr) {
  var min = volTr.min;
  var max = volTr.max;
  var value = volTr.value;

  var size = (value - min) / (max - min) * 100;

  return size;
}
