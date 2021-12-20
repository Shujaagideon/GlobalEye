import SmoothScroll from "./utils/smoothScroll";
import Animations from "./animations/animations";


void new class {
    constructor() {
            this.textAnimation = new Animations();
            this.introElements = {
                cover: document.querySelector('.intro'),
                text: document.querySelector('.intro h1'),
                config:{
                    duration: 0.6,
                    splitType: 'chars'
                }
            }
            this.Start();
    }
    
    Start() {
        new SmoothScroll();
        new Animations(this.introElements.text, this.introElements.config);
    }


}