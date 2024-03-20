import createElement from "../functions/createElement"
import gsap from "gsap"

class SliderImage {
    
    element: HTMLImageElement
    _visible: boolean = false

    constructor(classString: string, src: string,  ImageContainer: HTMLElement) {
        let elemInfo: ElementInfo = {
            type: "img",
            class: [classString],
            attributes: {src: src}
        }
        
        this.element = createElement(elemInfo, ImageContainer) as HTMLImageElement
    }

    set visible(newState: boolean) {
        if (newState) {
            this.element.style.display = "block"

            gsap.fromTo(this.element, {y: 15, background: "linear-gradient()"}, {y: 0, duration: 0.5, ease: "bounce.out"})
            gsap.fromTo(this.element, {opacity: 0}, {opacity: 1, duration: 0.2, ease: "power1.in"})
            gsap.fromTo(this.element, {rotate: "-10"}, {rotate: "0", duration: 0.3, ease: "back.out"})
        } else {
            this.element.style.display = "none"
        }
    }

    get visible () {
        return this._visible
    }
    
}

export default SliderImage