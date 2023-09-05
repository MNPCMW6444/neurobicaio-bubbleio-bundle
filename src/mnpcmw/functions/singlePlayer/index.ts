const startRenderingGame = (gameSrc: string) => {
    var videoElement = document.createElement("VIDEO");
    videoElement.setAttribute("id", "singlePlayerVideoID");
    document.querySelector('video').controls = false;
    document.querySelector('video').src = gameSrc;
    document.querySelector('video').playbackRate = 0
    document.querySelector('video').play();
    setInterval(() => {
        document.querySelector('video').playbackRate = window.mnpcmw.data.state.store.singlePlayer.scores.currentPersonalScoreHolder.value;
    }, 500);
}

const resetGame = () => {
    document.querySelector('video').currentTime = 0;
}


export default {startRenderingGame, resetGame}