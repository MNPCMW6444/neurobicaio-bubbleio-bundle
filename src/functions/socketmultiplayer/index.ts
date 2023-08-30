import {io} from "socket.io-client";

const socket = io('http://localhost:3000');


const definebehssssss =()=>{

// Listen for game state updates
    socket.on('game-update', (newGameState) => {
        // Update your game UI based on the new game state
    });

// Listen for new players joining
    socket.on('new-player', (newPlayer) => {
        // Handle new player (e.g., add a new sprite at newPlayer.x, newPlayer.y)
    });

// Listen for players leaving
    socket.on('player-left', (playerId) => {
        // Handle player leaving the game
    });

}

export  default  {definebehssssss}