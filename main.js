(() => {

const   playPauseBtn = document.querySelectorAll('.playpause'),
        stopBtn = document.querySelectorAll('.stop'),
        rwdBtn = document.querySelectorAll('.rwd'),
        fwdBtn = document.querySelectorAll('.fwd'),
        timeLabel = document.querySelectorAll('.time'),
        player = document.querySelectorAll('video'),
        capButton = document.querySelectorAll('.captions');

player.forEach(screen => screen.removeAttribute('controls'));
player.forEach(caption => caption.textTracks[0].mode = 'hidden');

capButton.forEach(button => button.onclick = function() {
    let index = this.dataset.button;
    if (player[index].textTracks[0].mode === 'hidden') {
        player[index].textTracks[0].mode = 'showing';
        return;
    } else {
        player[index].textTracks[0].mode = 'hidden';
    };
});

playPauseBtn.forEach(button => button.onclick = function() {
    let index = this.dataset.button;
    if(player[index].paused) {
        player[index].play();
        playPauseBtn[index].textContent = 'Pause';
        updateTime(index);
    } else {
        player[index].pause();
        playPauseBtn[index].textContent = 'Play';
    }
});

stopBtn.forEach(button => button.onclick = function() {
    let index = this.dataset.button;
    player[index].pause();
    player[index].currentTime = 0;
    playPauseBtn[index].textContent = 'Play';
});

rwdBtn.forEach(button => button.onclick = function() {
    let index = this.dataset.button;
    player[index].currentTime -= 3;
});

fwdBtn.forEach(button => button.onclick = function() {
    let index = this.dataset.button;
    player[index].currentTime += 3;
    if(player[index].currentTime >= player[index].duration || player[index].paused) {
        player[index].pause();
        player[index].currentTime = 0;
        playPauseBtn[index].textContent = 'Play';
    }
});

function updateTime(index){
    player[index].ontimeupdate = function() {
        let minutes = Math.floor(player[index].currentTime / 60);
        let seconds = Math.floor(player[index].currentTime - minutes * 60);
        let minuteValue;
        let secondValue;

        if (minutes<10) {
            minuteValue = "0" + minutes;
        } else {
            minuteValue = minutes;
        }

        if (seconds<10) {
            secondValue = "0" + seconds;
        } else {
            secondValue = seconds;
        }

        mediaTime = minuteValue + ":" + secondValue;
        timeLabel[index].textContent = mediaTime;
    };
}

})();