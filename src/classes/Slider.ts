import gsap from "gsap";
import { elementQuery } from "../functions/elementQuery";
import SliderImage from "./SliderImage";
import SliderDot from "./SliderDot";

class Slider {
  /* Config */
  static autoSliderEnabled = true;
  static autoSlideDelay = 2;

  static createPaginations = true;

  static assetImagePath = "../assets/img/";

  static containerError = "ERROR: No Container was found for Slider";
  static imageContainerError = "ERROR: No ImageContainer was found for Slider";

  /* Object variables */
  imgElements: SliderImage[] = [];
  dotElements: SliderDot[] = [];

  currentIndex: number = 0;
  lastIndex: number = 0;
  version: number = 0;

  constructor(imagePaths: string[], sliderHeader: string = "slider") {
    let sliderImageContainer = elementQuery(`#${sliderHeader}ImageContainer`);
    let dotContainer = elementQuery(`#${sliderHeader}DotContainer`);

    sliderImageContainer ? null : console.error(Slider.imageContainerError);

    imagePaths.forEach((img: string) => {
      let sliderImg = new SliderImage(
        `.${sliderHeader}Image`,
        Slider.assetImagePath + img,
        sliderImageContainer
      );
      this.imgElements.push(sliderImg);

      if (dotContainer && Slider.createPaginations) {
        let sliderDot = new SliderDot(sliderHeader, dotContainer);
        let index = this.dotElements.push(sliderDot) - 1;

        sliderDot.element.addEventListener("click", () => {
          this.set(index);
        });
      }
    });

    let nextButton = elementQuery(`#${sliderHeader}NextBtn`);
    let prevButton = elementQuery(`#${sliderHeader}PrevBtn`);

    const tweenFrom: Object = { boxShadow: "0 0 0px 0px rgb(0,0,0,1)" };
    const tweenTo: object = {
      duration: 0.3,
      boxShadow: "0 0 10px 10px rgb(0,0,0,0)",
    };

    nextButton
      ? nextButton.addEventListener("click", () => {
          gsap.fromTo(nextButton, tweenFrom, tweenTo);
          this.next();
        })
      : null;
    prevButton
      ? prevButton.addEventListener("click", () => {
          gsap.fromTo(prevButton, tweenFrom, tweenTo);
          this.prev();
        })
      : null;

    this.updateSlider();
  }

  updateAutoSlider() {
    this.version += 1;
    let currentVersion = this.version;

    setTimeout(() => {
      if (currentVersion === this.version) {
        this.version = 0;
        this.next();
      }
    }, Slider.autoSlideDelay * 1000);
  }

  updateSlider() {
    for (let index = 0; index < this.imgElements.length; index++) {
      this.imgElements[index].visible = false;
    }
    this.dotElements[this.lastIndex]
      ? (this.dotElements[this.lastIndex].active = false)
      : null;

    this.imgElements[this.currentIndex].visible = true;
    this.dotElements[this.currentIndex]
      ? (this.dotElements[this.currentIndex].active = true)
      : null;

    this.lastIndex = this.currentIndex;

    Slider.autoSliderEnabled ? this.updateAutoSlider() : null;
  }

  next() {
    this.currentIndex++;
    if (this.currentIndex > this.imgElements.length - 1) {
      this.currentIndex = 0;
    }

    this.updateSlider();
  }

  prev() {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.imgElements.length - 1;
    }
    this.updateSlider();
  }

  set(newIndex: number) {
    this.currentIndex = newIndex;
    if (this.currentIndex < 0) {
      this.currentIndex = this.imgElements.length - 1;
    }
    if (this.currentIndex > this.imgElements.length - 1) {
      this.currentIndex = 0;
    }
    this.updateSlider();
  }
}

export default Slider;
