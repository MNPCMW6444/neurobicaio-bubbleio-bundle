const startGame = async (email: string, gameNum: number, negativeGameSrc: string, positiveGameSrc: string) => {
    await window.mnpcmw.functions.wearables.eeg.muse.client.connect();
    await window.mnpcmw.functions.wearables.eeg.muse.startListeningToCalmnessScore();
    window.mnpcmw.functions.multiPlayer.createSocket(undefined);
    gameNum ? window.mnpcmw.functions.multiPlayer.joinGame(email, gameNum) : window.mnpcmw.functions.multiPlayer.createGame(email)

}

const resetGame = () => {
    window.mnpcmw.functions.singlePlayer.resetGame();
}

export default {startGame, resetGame}