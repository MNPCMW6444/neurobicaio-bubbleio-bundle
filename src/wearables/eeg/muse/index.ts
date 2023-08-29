import { MuseClient } from "muse-js";
import { startListeningToCalmnessScore } from "./scores/calmnessScore";

const muse: {
  client: MuseClient;
  connectAndStartMuse: () => Promise<void>;
  disconnect: () => void;
  startListeningToCalmnessScore: () => Promise<void>;
} = {} as any;

muse.client = new MuseClient();

muse.connectAndStartMuse = async () => {
  await muse.client.connect();
  await muse.client.start();
};
muse.disconnect = () => {
  muse.client.disconnect();
};

muse.startListeningToCalmnessScore = startListeningToCalmnessScore;

export default muse;
