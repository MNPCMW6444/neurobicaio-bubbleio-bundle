import { MuseClient } from "muse-js";
import scores from "./scores";



const muse: {
  client: MuseClient;
  connectAndStartMuse: () => Promise<void>;
  disconnect: () => void;
  isConnected:()=>boolean;
  startListeningToCalmnessScore: () => Promise<void>;
  scores:typeof scores
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

export default muse;
