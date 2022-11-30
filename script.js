let trackPic =document.querySelector('.trackPic');
let trackName =document.querySelector('.trackName');
let artistName = document.querySelector('.artistName');
let startTime = document.querySelector('.startTime');
let timeSlider = document.querySelector('.timeSlider');
let endTime  =  document.querySelector('.endTime');
let volumeUp = document.querySelector('.fa-volume-up');
let volumeDown = document.querySelector('.fa-volume-down');
let volumeSlider = document.querySelector('.volumeSlider');

let randomBtn = document.querySelector('.randomTrack');
let prevtrack = document.querySelector('.previousTrack')

let playPause_Btn = document.querySelector('.playPauseBtn');
let next_Track = document.querySelector('.nextTrack');
let repeattrack = document.querySelector('.repeatTrack');

// creating element audio to load up all the music elements
 let currentTrack =  document.createElement('audio');

// databse for the Playlists

const playList=[
    {
        Image: './musicPic/skylar_grey.jpg',
        track_Name: ' Last One Standing ',
        artist: ' Skylar Grey ',
        music : './mp3s/Last-One-Standing_320(PagalWorld).mp3',
    },
    {
        Image: './musicPic/perfect_weapon.jpg',
        track_Name: ' Perfect Weapon ',
        artist: ' 070 Shake ',
        music : './mp3s/Perfect_Weapon.mp3',
    },
    {
        Image: './musicPic/dualipa.jpg',
        track_Name: ' Love Again ',
        artist: ' Dua Lipa ',
        music : './mp3s/Dua_Lipa_-_Love_Again.mp3',
    }, 
    {
        Image: './musicPic/the_weeknd.jpg',
        track_Name: ' High For This ',
        artist: ' The Weeknd ',
        music : './mp3s/The_Weeknd_-_High_For_This_Original_.mp3',
    },
    {
        Image: './musicPic/lp.jpg',
        track_Name: ' Points Of Authority ',
        artist: ' LINKIN PARK ',
        music : './mp3s/Linkin_Park_-_Points_of_Authority_.mp3',
    },
    {
        Image: './musicPic/harry_styles.jpg',
        track_Name: ' Watermelon Sugar ',
        artist: ' Harry Styles ',
        music : './mp3s/watermelon.mp3',
    },
    
];

let trackIndex =0; // to iterate via indexes of the array of objects
let isPlaying = false; //to toggle, like switch
let isRandom = false;

// it'll be the important thing  to set timers and for slider to sync with 
let updateTime ;

//  to load all the tracks
loadTracks(trackIndex);


function loadTracks(trackIndex){
    clearInterval(updateTime); // will stop the set interval;
    reset(); // this will reset everthing to scratch

    currentTrack.src= playList[trackIndex].music;
    currentTrack.load(); // basic HTML load() function for the media
    trackPic.style.backgroundImage = "url(" + playList[trackIndex].Image+ " )";
    trackName.textContent = playList[trackIndex].track_Name;
    artistName.textContent =playList[trackIndex].artist;

    //to start the musci count down and calling setUpDate function to sync with the music and show exact music time on the silder and sync  the slider thumb with it aswell

    updateTime =setInterval(setUpDate,1000);

    //at the end of the song when it got ended it'll change to new one
    currentTrack.addEventListener('ended',nextTrack)
}

function reset(){
    startTime.textContent = "00:00";
    endTime.textContent = "00:00";
    timeSlider.value = 0;
}



function repeatTrack(){
    let currentTrackIndex = trackIndex;
    loadTracks(currentTrackIndex);
    playTrack();
}

// making playing button as switch
function playPauseBtn(){

    isPlaying ? pauseTrack() : playTrack();
}

function playTrack(){
    currentTrack.play();
    isPlaying =true;
    playPause_Btn.innerHTML ='<i class="fa fa-pause-circle fa-3x"></i>';
}
function pauseTrack(){
    currentTrack.pause();
    isPlaying =false;
    playPause_Btn.innerHTML = '<i class="fa fa-play-circle  fa-3x" ></i>';
}

function randomTrack(){

    isRandom ? stopRandom() : playRandom();
    
}

// making random button as switch
function playRandom(){
    isRandom = true;
    randomBtn.classList.add('activateRandom');
}

function stopRandom(){
    isRandom = false;
    randomBtn.classList.remove('activateRandom');
}


function nextTrack(){
    if(trackIndex<playList.length-1 && isRandom === false){
        trackIndex++;
    } else if(trackIndex<playList.length-1 && isRandom === true)
    {
       let  randomTrackIndex = Math.round(Math.random()*playList.length);

       trackIndex =randomTrackIndex;
    } else{
        trackIndex = 0 ;
    }

    loadTracks(trackIndex);
    playTrack();
}


function previousTrack(){
    if(trackIndex>0 && isRandom === false){
        trackIndex--;
    } else if(trackIndex>0 && isRandom === true){
        let  randomTrackIndex = Math.round(Math.random()*playList.length);

       trackIndex =randomTrackIndex;
    } else{
        trackIndex = playList.length-1;
    }
    loadTracks(trackIndex);
    playTrack();
}



function timeSlide(){

    // when to change the slider position manually music start from there then it'll sync with the current time then
    let trackTime = currentTrack.duration*(timeSlider.value/100);
    currentTrack.currentTime =trackTime;
}

function volume(){
    // to set volume slider,as volume in html sound track ranges from 0-1
    currentTrack.volume =volumeSlider.value/100;
}

//  to sync the track slider with the timimgs
function setUpDate(){
    let beginTime =0;
    if ( typeof currentTrack.duration === 'number'  ){
        
        beginTime =currentTrack.currentTime*(100/currentTrack.duration);
        timeSlider.value = beginTime;
        
        // to Segregate the minutes and seconds for both start/current and end time

        let currentMins = Math.floor(currentTrack.currentTime/60);
        let currentSecs = Math.floor(currentTrack.currentTime -currentMins*60);
        let endTimeMins = Math.floor(currentTrack.duration/60);
        let endTimeSecs = Math.floor(currentTrack.duration -endTimeMins*60);
        
        // to get  start/current time and end time of the track in the format of 00:00
         if(currentMins<10)
        {currentMins = "0" + currentMins};
        if(currentSecs<10)
        {currentSecs = "0" + currentSecs};
        if(endTimeMins<10)
        {endTimeMins = "0" + endTimeMins;}
        if(endTimeSecs<10)
        {endTimeSecs = "0" + endTimeSecs};


        startTime.textContent =currentMins + ":" + currentSecs;
        endTime.textContent = endTimeMins + ":" + endTimeSecs;


    }
    
}