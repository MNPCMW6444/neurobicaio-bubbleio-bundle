const startGame = async (gameSrc: string) => {
    await window.mnpcmw.functions.wearables.eeg.muse.client.connect();
    await window.mnpcmw.functions.wearables.eeg.muse.startListeningToCalmnessScore();
    window.mnpcmw.functions.singlePlayer.startRenderingGame(gameSrc);
}

const resetGame = () => {
    window.mnpcmw.functions.singlePlayer.resetGame();
}

export default {startGame, resetGame}