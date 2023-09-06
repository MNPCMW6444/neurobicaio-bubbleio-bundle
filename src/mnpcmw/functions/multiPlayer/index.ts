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
}

const joinGame = (uri: string, email: string, wantedGame: number) => {
    createSocket(uri);
    socket.emit('joinGame', {email, wantedGame});
    socket.on("gameAnswer", (answer: boolean) => {
        window.mnpcmw.data.state.store.multiPlayer.gameNumberHolder.value = answer ? wantedGame : -1;
    })
}


export default {createGame, joinGame}