import { epoch, fft, powerByBand } from "@neurosity/pipes";
import { map } from "rxjs";

enum FrequencyBandsPoints {
  minTheta = 4,
  minAlphaLow = 8,
  minAlphaHigh = 10,
  minBetaLow = 12.5,
  minBetaMid = 16.5,
  minBetaHigh = 21,
  minGamma = 30,
  max = 60,
}
const FrequencyBands = {
  THETA: {
    minFrequencyiInHz: FrequencyBandsPoints.minTheta,
    maxFrequencyiInHz: FrequencyBandsPoints.minAlphaLow,
  },
  ALPHA_LOW: {
    minFrequencyiInHz: FrequencyBandsPoints.minAlphaLow,
    maxFrequencyiInHz: FrequencyBandsPoints.minAlphaHigh,
  },
  ALPHA_HIGH: {
    minFrequencyiInHz: FrequencyBandsPoints.minAlphaHigh,
    maxFrequencyiInHz: FrequencyBandsPoints.minBetaLow,
  },
  BETA_LOW: {
    minFrequencyiInHz: FrequencyBandsPoints.minBetaLow,
    maxFrequencyiInHz: FrequencyBandsPoints.minBetaMid,
  },
  BETA_MID: {
    minFrequencyiInHz: FrequencyBandsPoints.minBetaMid,
    maxFrequencyiInHz: FrequencyBandsPoints.minBetaHigh,
  },
  BETA_HIGH: {
    minFrequencyiInHz: FrequencyBandsPoints.minBetaHigh,
    maxFrequencyiInHz: FrequencyBandsPoints.minGamma,
  },
  GAMMA: {
    minFrequencyiInHz: FrequencyBandsPoints.minGamma,
    maxFrequencyiInHz: FrequencyBandsPoints.max,
  },
};
const frequencyBands = {} as any;

export const startListeninigToCalmnessScore = async () => {
  const freqrange = Object.values(FrequencyBands);
  const freqnames = Object.keys(FrequencyBands);
  freqnames.forEach((freqname: string, index: number) => {
    frequencyBands[freqname] = [
      freqrange[index].minFrequencyiInHz,
      freqrange[index].maxFrequencyiInHz,
    ];
  });
  window.muse.eegReadings
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
        console.log("error in startListeninigToCalmnessScore: ", e);
      }
      window.calmessScore = Math.floor(score < 2 ? 2 : score > 30 ? 30 : score);
    });
};
