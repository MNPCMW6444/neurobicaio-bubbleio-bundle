import { epoch, fft, powerByBand } from "@neurosity/pipes";
import { EEGReading } from "muse-js";
import { map } from "rxjs";
import {IFrequencyBands} from "@neurosity/pipes/dist/cjs/types/frequencyBands";



const bandsForPowerByBand:IFrequencyBands={};

export const startListeningToCalmnessScore = async () => {
  if (!window.mnpcmw.wearables.eeg.muse.client.eegReadings)
    throw new Error("Muse not connected");
  const freqrange = Object.values(window.mnpcmw.standardization.eeg.FrequencyBands);
  const freqnames = Object.keys(window.mnpcmw.standardization.eeg.FrequencyBands);
  freqnames.forEach((freqname: string, index: number) => {
    bandsForPowerByBand[freqname] = [
      freqrange[index].minFrequencyiInHz,
      freqrange[index].maxFrequencyiInHz,
    ];
  });
  window.mnpcmw.wearables.eeg.muse.client.eegReadings
    .pipe(
      map(({ samples, timestamp }: EEGReading) => ({
        timestamp,
        data: samples,
      })) as any,
      epoch({ duration: 256, interval: 100 }) as any,
      fft({ bins: 256 }) as any,
      powerByBand(bandsForPowerByBand) as any
    )
    .subscribe((powerByBands: any) => {
      let score = 5;
      try {
        const keys = Object.keys(powerByBands);
        const values = Object.keys(powerByBands).map(
          (key: string) => (3 * powerByBands[key][0] + 7 * powerByBands[key][1]) / 20
        );
        let powerByBands2: any = {};
        values.forEach((value, i) => {
          powerByBands2[keys[i] as any] = value;
        });
        score =
          100 -
          (3 * powerByBands2.THETA +
            2 * powerByBands2.ALPHA_LOW +
            powerByBands2.ALPHA_HIGH) *
            4;
      } catch (e) {
        console.log("error in startListeningToCalmnessScore: ", e);
      }
      window.mnpcmw.wearables.eeg.muse.scores.calmness = Math.floor(
        score < 2 ? 2 : score > 50 ? 50 : score
      );
    });
};
