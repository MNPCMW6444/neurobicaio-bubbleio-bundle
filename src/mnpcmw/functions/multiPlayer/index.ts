import {io, Socket} from "socket.io-client";

let socket: Socket;
const defaultServerURI = "https://neurobicaio-multiplayer.onrender.com";


const createSocket = (uri: string) => {
    socket = io(uri || defaultServerURI);
};


const createGame = (uri: string, email: string) => {
    createSocket(uri);
    socket.emit('createGame', email);
    socket.on("gameCreated", (gameId) => {
        window.mnpcmw.data.state.store.multiPlayer.gameNumberHolder.value = gameId
    })
    play(email);
}

const joinGame = (uri: string, email: string, wantedGame: number) => {
    createSocket(uri);
    socket.emit('joinGame', {email, wantedGame});
    socket.on("gameAnswer", (answer: boolean) => {
        window.mnpcmw.data.state.store.multiPlayer.gameNumberHolder.value = answer ? wantedGame : -1;
    })
    play(email);
}

const play = (email: string) => {
    setInterval(() => socket.emit('updateScore', {
        email,
        newScore: window.mnpcmw.data.state.store.wearables.eeg.muse.scores.calmness.scoreHolder.value
    }), 1000);
    socket.on("fightsOnTrue", () => {
        //start rendering
    })
}


export default {createGame, joinGame}