const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline');
    const image = document.querySelector(`picture`);

    // Sounds 
    const sounds = document.querySelectorAll('.sound-container .card');

    //Time Display
    const timeDisplay = document.querySelector(`.clock-display`);

    //Time Select
    const timeSelect = document.querySelectorAll('.time-container button');

    // Length of the Outline 
    const outlineLength = outline.getTotalLength();

    //Duration//
    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    //Pick Different Sounds 

    sounds.forEach(sound => {
        sound.addEventListener('click', function () {
            song.src = this.getAttribute("data-sound");
            checkPlaying(song);
        })
    })


    //Play Sound //
    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    //Select the time//
    timeSelect.forEach(option => {
        option.addEventListener('click', function () {
            fakeDuration = this.getAttribute("data-time");
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
        });
    });

    //Create a function specific to stop and play the sounds//
    const checkPlaying = song => {
        if (song.paused) {
            song.play();
            play.src = '/icons/pause.svg';
        } else {
            song.pause();
            play.src = '/icons/play.svg';
        }
    }

    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        //Animate the Text//
        timeDisplay.textContent = `${minutes}:${seconds}`;

        if (currentTime >= fakeDuration) {
            song.pause();
            song.currentTime = 0;
            play.src = '/icons/play.svg'
        }
    };

};


app();
