let songProgress = document.getElementById('song-progress');
let ctrlIcon = document.getElementById('play-icon');

let songTitle = document.getElementById('song_title');
let songArtist = document.getElementById('song_artist');

let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-time');

let songs = [
    {
        id: 0,
        title: 'Happy Days',
        src: './assets/happy-days-123082.mp3',
        artist: 'Luis Fonsi'
    },
    {
        id: 1,
        title: 'Love At First Sight',
        src: './assets/love-at-first-sight-123093.mp3',
        artist: 'Ft. Puerto'
    },
    {
        id: 2,
        title: 'You Hold My Hand',
        src: './assets/you-hold-my-hand-124164.mp3',
        artist: 'Rican'
    },
];

let currAudio = document.createElement('audio');
currAudio.setAttribute('id', 'song');

let isPlaying = false;
let songIndex = 0;
let updateTimer;

// Function to load the audio for the current song
function loadAudio() {
    clearInterval(updateTimer);
    reset();

    currAudio.src = songs[songIndex].src;
    songTitle.textContent = songs[songIndex].title;
    songArtist.textContent = songs[songIndex].artist;

    updateTimer = setInterval(setUpdate, 1000);
    currAudio.addEventListener('ended', nextAudio);
}

// Function to reset the song progress
function reset() {
    songProgress.value = 0;
}

// Function to play the current song
function playSong() {
    currAudio.play();
    isPlaying = true;
    ctrlIcon.setAttribute("src", "./assets/pause.svg");
}

// Function to pause the current song
function pauseSong() {
    currAudio.pause();
    isPlaying = false;
    ctrlIcon.setAttribute("src", "./assets/play.svg");
}

// Function to play the next song
function nextAudio() {
    songIndex = (songIndex + 1) % songs.length;
    loadAudio();
    playSong();
}

// Function to play the previous song
function prevAudio() {
    if (songIndex > 0) {
        songIndex -= 1;
    } else {
        songIndex = songs.length - 1;
    }
    loadAudio();
    playSong();
}

// Function to update the song progress and time
function setUpdate() {
    let seekPosition = 0;
    if (!isNaN(currAudio.duration)) {
        seekPosition = currAudio.currentTime * (100 / currAudio.duration);
        songProgress.value = seekPosition;

        let currentMinutes = Math.floor(currAudio.currentTime / 60);
        let currentSeconds = Math.floor(currAudio.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(currAudio.duration / 60);
        let durationSeconds = Math.floor(currAudio.duration - durationMinutes * 60);

        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

// Function to seek to a specific position in the song
function seekTo() {
    let seekto = currAudio.duration * (songProgress.value / 100);
    currAudio.currentTime = seekto;
}

// Function to toggle play and pause of the current song
function playPause() {
    if (ctrlIcon.getAttribute("src") === './assets/pause.svg') {
        ctrlIcon.setAttribute("src", "./assets/play.svg");
        pauseSong();
    } else {
        ctrlIcon.setAttribute("src", "./assets/pause.svg");
        playSong();
    }
}

loadAudio();
