import './assets/iconfont.css';
import VsSlider from "./VsCodeSlider.vue";
// import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
export const install: (app) => void = (app) => {
    app.component('vs-code-slider', VsSlider);
}
export const VsCodeSlider = VsSlider;

export default {
    VsCodeSlider: VsSlider,
    install
}
