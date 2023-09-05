import {io, Socket} from "socket.io-client";


let socket: Socket;
const createSocket = (uri: string) => {
    socket = io(uri);
};


// const applyToSocket = (name: string, callBack: <DataType>(data: DataType) => void) => socket.on(name, callBack);


const createGame = (email: string) => {
    socket.emit('createGame', email);
    socket.on("gameCreated", (gameId) => {
        window.mnpcmw.data.state.store.multiplayer.game = gameId
    })
}

const joinGame = (email: string, wantedGame: number) => {
    socket.emit('joinGame', {email, wantedGame});
    socket.on("gameAnswer", (answer: boolean) => {
        window.mnpcmw.data.state.store.multiplayer.game = answer ? wantedGame : -1;
    })
}


export default {createSocket, createGame, joinGame}