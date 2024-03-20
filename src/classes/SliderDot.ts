import gsap from "gsap";
import createElement from "../functions/createElement";

class SliderDot {
  element: HTMLElement;
  _active: boolean = false;

  static activeBG = "rgb(0, 206, 24)";
  static inactiveBG = "rgb(171, 171, 171)";

  constructor(sliderHeader: string, DotContainer: HTMLElement) {
    this.element = createElement(
      {
        type: "div",
        class: [sliderHeader + "Dot"],
      },
      DotContainer
    ) as HTMLDivElement;

    this.element.style.backgroundColor = SliderDot.inactiveBG;
  }

  set active(newState: boolean) {
    if (newState) {
      gsap.fromTo(
        this.element,
        { backgroundColor: SliderDot.inactiveBG },
        { backgroundColor: SliderDot.activeBG, duration: 0.15 }
      );
      gsap.fromTo(
        this.element,
        { boxShadow: "0 0 0px 0px rgb(0, 255, 24,1)" },
        {
          duration: 0.3,
          boxShadow: "0 0 20px 5px rgb(0, 255, 24,0)",
        }
      );
    } else {
      gsap.fromTo(
        this.element,
        { backgroundColor: SliderDot.activeBG },
        { backgroundColor: SliderDot.inactiveBG, duration: 0.15 }
      );
    }
  }

  get active() {
    return this._active;
  }
}

export default SliderDot;
