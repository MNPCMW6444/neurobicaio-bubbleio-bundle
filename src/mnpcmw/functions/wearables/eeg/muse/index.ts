import {MuseClient} from "muse-js";
import scores from "./scores";


const muse: {
    client: MuseClient;
    connectAndStartMuse: () => Promise<void>;
    disconnect: () => void;
    isConnected: () => boolean;
    startListeningToCalmnessScore: () => Promise<void>;
    scores: typeof scores;
    doGame: () => void;
} = {} as any;

muse.client = new MuseClient();

muse.connectAndStartMuse = async () => {
    await muse.client.connect();
    await muse.client.start();
};
muse.disconnect = () => {
    muse.client.disconnect();
};


muse.scores = scores;

muse.doGame = () => {


    var x = document.createElement("VIDEO");


    x.setAttribute("id", "testandovideo");
    x.setAttribute("width", "100%");
    x.setAttribute("height", "100%");


    x.ontimeupdate = function () {
        GetTime()
    };


    document.querySelector('video').controls = false;
    document.querySelector('video').src = "https://88f5b7650ad825d3e3c4590d6d0a94a4.cdn.bubble.io/f1693596871443x878313702387805800/Untitled%20design%20%283%29.mp4"

    document.querySelector('video').playbackRate = 0

    document.querySelector('video').play()

    window.mnpcmw.functions.wearables.eeg.muse.doGame()


    setInterval(() => {
        document.querySelector('video').playbackRate = window.mnpcmw.data.state.store.wearables.eeg.muse.scores.calmness.scoreHolder.value;
    }, 500);
    window.mnpcmw.functions.wearables.eeg.muse.connectAndStartMuse();
    window.mnpcmw.functions.wearables.eeg.muse.scores.startListeningToCalmnessScore.startListeningToCalmnessScore();
}

export default muse;
