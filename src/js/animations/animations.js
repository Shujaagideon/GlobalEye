import gsap from 'gsap'
import SplitTextJS from 'split-text-js';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
gsap.registerPlugin(ScrollTrigger);


export default class Animations {
    constructor(text, config = {}) {
        this.config = {};
        this.config.duration = config.duration || 0.5;
        this.config.splitType = config.splitType || 'chars words';
        this.config.delay = config.delay || 0;
        this.config.ease = config.ease || 'ease';
        this.config.replay = config.replay || false;
        this.config.stagger = config.stagger || 0.02;
        if (text !== undefined) {
            this.text = new SplitTextJS(text);
            console.log(this.text);
        }

        this.introTl = gsap.timeline({
            onComplete: () => {
                document.body.style.overflowY = 'scroll';
            }
        });
        this.introAnim();
        this.animate();
    }
    introAnim() {
        const introText = new SplitTextJS(document.querySelector('.intro h1'));

        this.introTl.from(introText.chars, {
            y: 20,
            opacity: 0,
            duration: this.config.duration,
            delay: this.config.delay,
            ease: this.config.ease,
            stagger: this.config.stagger,
        })
        this.introTl.to(introText.chars, {
            ScrollTrigger: {
                trigger: this.text,
            },
            y: -20,
            opacity: 0,
            duration: this.config.duration,
            delay: 0.3,
            ease: this.config.ease,
            stagger: this.config.stagger,
        });
        this.introTl.to('.intro', {
            opacity: 0,
            duration: 0.3,
        });
        this.introTl.to('.landingCover', {
            maskSize: '250%',
            duration: 0.5,
            backgroundSize: 'calc(75% + 4px)',
            ease: 'cubic-bezier(.6,.04,.12,.96)',
            delay: 0.1,
        })
    }
    textAnim(text, y=150, stagger = this.config.stagger){
        this.introTl.from(text, {
            scrollTrigger: {
                trigger: text,
                // markers: true
            },
            y: y,
            opacity: 0,
            duration: 0.6,
            ease: 'cubic-bezier(.6,.04,.12,.96)',
            stagger: stagger,
            delay: -0.8,
        })
    }

    animate() {
        [...document.querySelectorAll('.text h1')].forEach( text=>{
            let newText = new SplitTextJS(text);
            this.textAnim(newText.chars);
        });
        [...document.querySelectorAll('.text h2')].forEach(text => {
            let newText = new SplitTextJS(text);
            this.textAnim(newText.chars);
        });
        [...document.querySelectorAll('.text h3')].forEach( text=>{
            let newText = new SplitTextJS(text);
            this.textAnim(newText.chars);
        });
        [...document.querySelectorAll('.text h4')].forEach(text => {
            let newText = new SplitTextJS(text);
            this.textAnim(newText.chars);
        });
        [...document.querySelectorAll('.text p')].forEach(text => {
            let newText = new SplitTextJS(text);
            this.textAnim(newText.chars, 0, 0.005);
        });
        this.introTl.to('header ',{
            opacity: 1,
            duration: 0.6,
            ease: 'cubic-bezier(.6,.04,.12,.96)',
            delay: 0.2,
        })
    }
}