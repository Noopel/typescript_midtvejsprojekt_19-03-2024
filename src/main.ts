import './style.scss'
import wireframe from "../assets/json/wireframe.json"
import sliderData from "../assets/json/sliderData.json"
import createElement from './functions/createElement'
import Slider from './classes/Slider'

(()=>{
    wireframe.html.forEach((elemData)=>{
        createElement(elemData, document.body)
    })
    new Slider(sliderData.images);
})()
