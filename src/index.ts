import functions from "./functions";
import data from "./data";

declare global {
  interface Window {
    mnpcmw: {
      functions: typeof functions;
      data: typeof  data;
    };
  }
}


window.mnpcmw = { functions,data };
