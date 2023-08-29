import wearables from "./wearables";

declare global {
  interface Window {
    mnpcmw: {
      wearables: typeof wearables;
    };
  }
}

window.mnpcmw = { wearables };
