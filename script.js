let songIndex = 0; // Track the currently playing song index

let audioElement = new Audio('Songs/Aaja We Mahiya (Imran Khan).mp3'); // Initialize audio element with default song
let masterplay = document.getElementById("masterplay"); // Main play/pause button
let progressbar = document.getElementById("ProgressBar"); // Progress bar element
let gif = document.getElementById('gif'); // GIF element for showing animation during play

// All song items in the main song list
let songItems = Array.from(document.getElementsByClassName('one_song_block'));
// All song items in the quick picks list
let songItems1 = Array.from(document.getElementsByClassName('songItem1'));
// Display current song name
let mastersongname = document.getElementById('masterSongName');

// List of songs with their respective file paths and cover images
let songs = [
    { songName: "Aaja We Mahiya", filePath: "Songs/Aaja We Mahiya (Imran Khan).mp3", coverPath: "Cover/Imran_khan.jpg" },
    { songName: "Amplifier", filePath: "Songs/Amplifier - Imran Khan.mp3", coverPath: "Cover/Imran_khan.jpg" },
    { songName: "Pata Chalgea", filePath: "Songs/Pata Chalgea (Imran Khan).mp3", coverPath: "Cover/Imran_khan.jpg" },
    { songName: "Tum Se", filePath: "Songs/Tum Se.mp3", coverPath: "Cover/tum_se.jpeg" },
    { songName: "Aaj Ki Raat", filePath: "Songs/Aaj Ki Raat - Stree 2.mp3", coverPath: "Cover/aaj_ki_raat.jpeg" },
    { songName: "Baarish", filePath: "Songs/Baarish (Yaariyan) [PagalWorld.com] - 320Kbps.mp3", coverPath: "Cover/baarish.jpeg" },
    { songName: "Dil Ibaadat", filePath: "Songs/Dil Ibaadat - Tum Mile 320Kbps.mp3", coverPath: "Cover/dil_ibadaat.jpg" },
    { songName: "Barsaat Ki Dhun", filePath: "Songs/Barsaat Ki Dhun - Jubin Nautiyal.mp3", coverPath: "Cover/Barsaat-Ki-Dhun.jpg" },
    { songName: "Hasi", filePath: "Songs/Hasi (Shreya Ghoshal) Hamari Adhuri Kahani - 320Kbps.mp3", coverPath: "Cover/hasi.jpg" }
]

// Update song items with cover images and song names
songItems.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerHTML = songs[i].songName;
})

// Update quick pick items with cover images and song names
songItems1.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i + 3].coverPath;
    element.getElementsByClassName('songName')[0].innerHTML = songs[i + 3].songName;
})

// Play/pause functionality for the master play button
masterplay.addEventListener('click', () => {
    if (audioElement.paused) { // Check if audio is paused or at the start
        if (songIndex == 0 && audioElement.currentTime == audioElement.duration) {
            songIndex=-1;
            playNextSong();
        }
        else {
            audioElement.play();
            masterplay.classList.remove('fa-circle-play'); // Change icon to pause
            masterplay.classList.add('fa-circle-pause');
            makeAllPlay();
            gif.style.opacity = 1; // Show GIF animation
        }
    }
    else {
        audioElement.pause();
        masterplay.classList.remove('fa-circle-pause'); // Change icon to play
        masterplay.classList.add('fa-circle-play');
        gif.style.opacity = 0; // Hide GIF animation

        let newIcon = document.getElementById(songIndex.toString());
        newIcon.classList.remove('fa-circle-play');
        newIcon.classList.add('fa-circle-pause');
    }

})

// Update progress bar as the song plays
audioElement.addEventListener('timeupdate', () => {
    // Calculate progress percentage
    let progress = parseFloat((audioElement.currentTime / audioElement.duration) * 100);
    progressbar.value = progress; // Update progress bar value
})



// Change current playback time based on progress bar position
progressbar.addEventListener('change', () => {
    // Set current time to the new position
    audioElement.currentTime = progressbar.value * audioElement.duration / 100;
})

// Function to reset all play buttons to the play icon
const makeAllPlay = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

// Event listeners for each song item to play/pause individual songs
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener(('click'), (e) => {
        // Get the index of the clicked song
        let clickedIndex = parseInt(e.target.id);

        if (clickedIndex === songIndex && !audioElement.paused) {
            // If the same song is clicked and it's playing, pause it
            audioElement.pause();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            masterplay.classList.remove('fa-circle-pause');
            masterplay.classList.add('fa-circle-play');
            gif.style.opacity = 0;
        }
        else if (clickedIndex === songIndex && audioElement.paused && audioElement.currentTime != 0) {
            audioElement.play();
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            masterplay.classList.remove('fa-circle-play');
            masterplay.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
        }
        else {
            // If a different song is clicked, play the new song
            makeAllPlay();  // Reset all play buttons
            songIndex = clickedIndex;
            e.target.classList.remove('fa-circle-play'); // Change icon to pause
            e.target.classList.add('fa-circle-pause');
            mastersongname.innerText = songs[songIndex].songName; // Update song name display
            audioElement.src = songs[songIndex].filePath; // Set new audio source
            audioElement.currentTime = 0;
            audioElement.play();

            masterplay.classList.remove('fa-circle-play'); // Update master button to pause
            masterplay.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
        }
    })
})


// Function to go to the next song
const playNextSong = () => {
    makeAllPlay();
    if (songIndex === 8) {
        songIndex = 0;
        gif.style.opacity = 0;
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
    }
    else {
        songIndex += 1;
        audioElement.src = songs[songIndex].filePath;
        mastersongname.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;

        // Update icon for the currently playing song
        document.getElementById(songIndex.toString()).classList.remove('fa-circle-play');
        document.getElementById(songIndex.toString()).classList.add('fa-circle-pause');
    }
}

// Event listener to automatically play the next song when the current song ends
audioElement.addEventListener('ended', playNextSong);


// Event listener for the 'previous' button to go to the previous song
document.getElementById('previous').addEventListener('click', () => {
    makeAllPlay(); // Reset all play buttons
    if (songIndex == 0)
        songIndex = 8; // Loop to the last song if at the first
    else
        songIndex -= 1; // Go to the previous song
    audioElement.src = songs[songIndex].filePath;
    mastersongname.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');

    // Update icon for the currently playing song
    let newIcon = document.getElementById(songIndex.toString());
    newIcon.classList.remove('fa-circle-play');
    newIcon.classList.add('fa-circle-pause');
})

// Event listener for the 'next' button to go to the next song
document.getElementById('next').addEventListener('click', playNextSong);