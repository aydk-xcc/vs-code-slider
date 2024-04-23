import './assets/iconfont.css';
import VsCodeSlider from "./VsCodeSlider.vue";
// import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
VsCodeSlider.install = (app) => {
    app.component('vs-code-slider', VsCodeSlider);
}
export default VsCodeSlider;
