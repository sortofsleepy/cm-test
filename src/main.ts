import './styles/style.css'
import data from "./navigation.json"
import {buildCityNode} from "./city.ts";

// Notes
// using "as" here since we know these element either exist or are being created the moment the script loads.

// get ref to navbar
const cities = document.querySelector("#cities") as Element

// get ref to highlighter
const highlighter = document.querySelector("#selector") as HTMLElement

const measure_canvas = document.createElement("canvas") as HTMLCanvasElement
const ctx = measure_canvas.getContext("2d") as CanvasRenderingContext2D
ctx.font = getComputedStyle(document.body).font


// build nodes for each city
data.cities.forEach(city => {
    cities.innerHTML += buildCityNode(city)

})

let items = Array.prototype.slice.call(cities.children)
items.forEach(city => {
    city.addEventListener("mouseover", onMouseOver)
})


////////// HOVER HANDLING /////////////////////////

// last element hovered over
let current_city: Element | null = null

/**
 * Handles things when we hover over a city
 * @param e
 */
function onMouseOver(e: Event) {

    const target = e.target as Element

    if (target.hasAttribute("data-section")) {
        // only set things up if we aren't already looking at the city in question
        if (current_city !== target) {
            current_city = target
            adjustSelector()
        }
    }

}

/**
 * Adjusts the selector item to match the width of the text and animates it towards the target.
 */
function adjustSelector() {

    const el = current_city?.children[0] as Element
    const width = measureText(el.innerHTML)

}

/**
 * Uses canvas element to measure the width of text minus box calculations
 * @param text{string} the text to measure
 */
function measureText(text: string) {
    return ctx.measureText(text).width
}

window.addEventListener("resize", () => {
    // container_width = cities.getBoundingClientRect().width
})