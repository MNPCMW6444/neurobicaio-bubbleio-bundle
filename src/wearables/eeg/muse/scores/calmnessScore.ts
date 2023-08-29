import { epoch, fft, powerByBand } from "@neurosity/pipes";
import { map } from "rxjs";

const bandsForPowerByBand: any = {};

export const startListeningToCalmnessScore = async () => {
  if (!window.mnpcmw.wearables.eeg.muse.client.eegReadings)
    throw new Error("Muse not connected");
  const freqrange: any = Object.values(bandsForPowerByBand);
  const freqnames: any = Object.keys(bandsForPowerByBand);
  freqnames.forEach((freqname: string, index: number) => {
    bandsForPowerByBand[freqname] = [
      freqrange[index].minFrequencyiInHz,
      freqrange[index].maxFrequencyiInHz,
    ];
  });
  window.mnpcmw.wearables.eeg.muse.client.eegReadings
    .pipe(
      map(({ samples, timestamp }) => ({
        timestamp,
        data: samples,
      })) as any,
      epoch({ duration: 256, interval: 100 }) as any,
      fft({ bins: 256 }) as any,
      powerByBand(frequencyBands) as any
    )
    .subscribe((x: any) => {
      let score = 5;
      try {
        const keys = Object.keys(x);
        const values = Object.keys(x).map(
          (key: string) => (3 * x[key][0] + 7 * x[key][1]) / 20
        );
        let yoadedObject: any = {};
        values.forEach((value, i) => {
          yoadedObject[keys[i] as any] = value;
        });
        score =
          100 -
          (3 * yoadedObject.THETA +
            2 * yoadedObject.ALPHA_LOW +
            yoadedObject.ALPHA_HIGH) *
            4;
      } catch (e) {
        console.log("error in startListeningToCalmnessScore: ", e);
      }
      window.mnpcmw.wearables.eeg.muse.calmnessScore = Math.floor(
        score < 2 ? 2 : score > 30 ? 30 : score
      );
    });
};
