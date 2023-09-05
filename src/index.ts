import mnpcmw from "./mnpcmw";
import fp from "./fp";

declare global {
    interface Window {
        mnpcmw: typeof mnpcmw;
        fp: typeof fp;
    }
}


window.mnpcmw = mnpcmw;
window.fp = fp;
