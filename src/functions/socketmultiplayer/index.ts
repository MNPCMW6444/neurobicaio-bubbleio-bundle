import {io, Socket} from "socket.io-client";


let socket: Socket;
const createSocket = (uri: string) => {
    socket = io(uri);
};


const applyToSocket = (name: string, callBack: <DataType>(data: DataType) => void) => socket.on(name, callBack);
export default {createSocket, applyToSocket}