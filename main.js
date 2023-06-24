let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let curr_track = document.createElement("audio");
let randomIcon = document.querySelector(".fa-shuffle");

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

let track_list = [
  {
    name: "Night Changes",
    artist: "One Direction",
    image: "images/night-changes.jpg",
    path: "music/night-changes.mp3",
  },
  {
    name: "Starboy",
    artist: "The Weekend",
    image: "images/starboy.jpg",
    path: "music/starboy.mp3",
  },
  {
    name: "Demons",
    artist: "Imagine Dragons",
    image: "images/demons.jpg",
    path: "music/demons.mp3",
  },
  {
    name: "Arcade",
    artist: "Duncan Laurence",
    image: "images/arcade.jpg",
    path: "music/arcade.mp3",
  },
  {
    name: "Runaway",
    artist: "Aurora",
    image: "images/runaway.jpg",
    path: "music/runaway.mp3",
  },
  {
    name: "Unstoppable",
    artist: "Sia",
    image: "images/unstoppable.jpg",
    path: "music/unstoppable.mp3",
  },
  {
    name: "Don't Let Me Down",
    artist: "The Chainsmoker",
    image: "images/dont-let-me-down.jpg",
    path: "music/dont-let-me-down.mp3",
  },
  {
    name: "The Lazy Song",
    artist: "Bruno Mars",
    image: "images/the-lazy-song.jpg",
    path: "music/the-lazy-song.mp3",
  },
  {
    name: "Dance Monkey",
    artist: "Tones and I",
    image: "images/dance-monkey.jpg",
    path: "music/dance-monkey.mp3",
  },
  {
    name: "Falling",
    artist: "Trevor Daniel",
    image: "images/falling.jpg",
    path: "music/falling.mp3",
  },
  {
    name: "Bad Boys",
    artist: "Tungevaag and Raaban",
    image: "images/bad-boys.jpg",
    path: "music/bad-boys.mp3",
  },
  {
    name: "Faded",
    artist: "Alan Walker",
    image: "images/faded.jpg",
    path: "music/faded.mp3",
  },
  {
    name: "On My Way",
    artist: "Alan Walker",
    image: "images/on-my-way.jpg",
    path: "music/on-my-way.mp3",
  },
];

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();

  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage =
    "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;

  updateTimer = setInterval(seekUpdate, 1000);

  curr_track.addEventListener("ended", nextTrack);

  random_bg_color();
}

function random_bg_color() {
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";

  document.body.style.background = bgColor;
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

function randomTrack() {
  isRandom ? pauseRandom() : playRandom();
}

function playRandom() {
  isRandom = true;
  randomIcon.classList.add("randomActive");
}

function pauseRandom() {
  isRandom = false;
  randomIcon.classList.remove("randomActive");
}

function repeatTrack() {
  let current_index = track_index;
  loadTrack(current_index);
  playTrack();
}

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;

  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;

  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
  if (track_index < track_list.length - 1 && isRandom === false)
    track_index += 1;
  else if (track_index < music_list.length - 1 && isRandom === true) {
    let random_index = Number.parseInt(Math.random() * track_list.length);
    track_index = random_index;
  } else track_index = 0;

  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0) track_index -= 1;
  else track_index = track_list.length - 1;

  loadTrack(track_index);
  playTrack();
}
function seekTo() {
  seekto = curr_track.duration * (seek_slider.value / 100);

  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

loadTrack(track_index);
