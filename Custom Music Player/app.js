const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');


//songs titles
const songs = ['brooklyn', 'onceagain', 'creativeminds'];

//keep track
let songIndex = 1;

//initially load song details to DOM
loadSong(songs[songIndex]);
//update song details
function loadSong(song){
    title.innerText=song;
    audio.src=`music/${song}.mp3`;
    cover.src =`img/${song}.jpg`;
}; 
//play song
function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}
//pause song
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
}
//prev song
function prevSong(){
    songIndex--;
    if(songIndex <0){
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong();
}
//prev song
function nextSong(){
    songIndex++;
    if(songIndex > songs.length-1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}
//update progress bar
function updateProgress(e){
const {duration, currentTime } =e.srcElement;
const progressPercenet =(currentTime/duration)*100;
progress.style.width = `${progressPercenet}%`;

}
//set progress bar
function setProgress(e){
    const width=this.clientWidth;
    const clickX= e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;

}
//event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    if(isPlaying){
        pauseSong();
    }
    else {
        playSong();
    }
});

//change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

//time/song update
audio.addEventListener('timeupdate', updateProgress);

//click on progress bar
progressContainer.addEventListener('click', setProgress);
//songs ends
audio.addEventListener('ended', nextSong);