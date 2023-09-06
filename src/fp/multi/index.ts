const startGame = async (uri: string, email: string, gameNum: number, negativeGameSrc: string, positiveGameSrc: string) => {
    await window.mnpcmw.functions.wearables.eeg.muse.client.connect();
    await window.mnpcmw.functions.wearables.eeg.muse.startListeningToCalmnessScore();
    gameNum ? window.mnpcmw.functions.multiPlayer.joinGame(uri, email, gameNum) : window.mnpcmw.functions.multiPlayer.createGame(uri, email)

}

const resetGame = () => {
    window.mnpcmw.functions.singlePlayer.resetGame();
}

export default {startGame, resetGame}