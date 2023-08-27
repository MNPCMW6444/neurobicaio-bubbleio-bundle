import { MuseClient } from "muse-js";
import { startListeninigToCalmnessScore } from "./scores/calmnessScore";

declare global {
  interface Window {
    muse: MuseClient;
    connectAndStartMuse: () => Promise<void>;
    calmessScore: number;
    startListeninigToCalmnessScore: () => void;
  }
}

window.muse = new MuseClient();

window.connectAndStartMuse = async () => {
  await window.muse.connect();
  await window.muse.start();
};

window.startListeninigToCalmnessScore = startListeninigToCalmnessScore;
