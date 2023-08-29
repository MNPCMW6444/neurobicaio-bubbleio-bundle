import wearables from "./wearables";
import standardization from "./standardization";

declare global {
  interface Window {
    mnpcmw: {
      wearables: typeof wearables;
      standardization: typeof  standardization;
      errorMessages: string[];
    };
  }
}


window.mnpcmw = { wearables,standardization, errorMessages:[] };
