import {epoch, fft, powerByBand} from "@neurosity/pipes";
import {map} from "rxjs";

const bandsForPowerByBand = {};

export default {
    startListeningToCalmnessScore: async () => {
        const {client, data, functions, config} = window.mnpcmw;
        const {eegReadings} = client.eeg.muse;
        if (!eegReadings) throw new Error("Muse not connected");

        const {FrequencyBands} = data.standardization.eeg;

        Object.entries(FrequencyBands).forEach(([key, {minFrequencyiInHz, maxFrequencyiInHz}]) => {
            bandsForPowerByBand[key] = [minFrequencyiInHz, maxFrequencyiInHz];
        });

        eegReadings
            .pipe(
                map(({samples, timestamp}) => ({timestamp, data: samples})),
                epoch({duration: 256, interval: 100}),
                fft({bins: 256}),
                powerByBand(bandsForPowerByBand)
            )
            .subscribe(powerByBands => {
                try {
                    const powerByBands2 = Object.fromEntries(
                        Object.entries(powerByBands).map(
                            ([key, val]) => [key, (3 * val[0] + 7 * val[1]) / 20]
                        )
                    );
                    functions.wearables.eeg.muse.scores.calmness.scoreHolder.value = config.calculateCalmnessScore(powerByBands2);
                } catch (e) {
                    console.log("error in startListeningToCalmnessScore: ", e);
                }
            });
    }
};
