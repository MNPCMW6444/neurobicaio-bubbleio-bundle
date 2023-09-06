import {io, Socket} from "socket.io-client";


let socket: Socket;
const createSocket = (uri: string) => {
    socket = io(uri || "https://neurobicaio-multiplayer.onrender.com");
};


const createGame = (email: string) => {
    socket.emit('createGame', email);
    socket.on("gameCreated", (gameId) => {
        window.mnpcmw.data.state.store.multiPlayer.gameNumberHolder.value = gameId
    })
}

const joinGame = (email: string, wantedGame: number) => {
    socket.emit('joinGame', {email, wantedGame});
    socket.on("gameAnswer", (answer: boolean) => {
        window.mnpcmw.data.state.store.multiPlayer.gameNumberHolder.value = answer ? wantedGame : -1;
    })
}


export default {createSocket, createGame, joinGame}