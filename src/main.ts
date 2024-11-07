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
    const el = current_city as HTMLElement
    const text = el.children[0]

    const rect = el.getBoundingClientRect()
    const container = cities.getBoundingClientRect()

    const textWidth = measureText(text.innerHTML)

    highlighter.style.width = `${textWidth}px`

    let x = rect.x - container.x
    const offset = rect.width /2;
    x += offset
    x -= (textWidth / 2)

    highlighter.style.left = `${x}px`
}

/**
 * Uses canvas element to measure the width of text minus box calculations.
 * Adds a tiny bit of padding to better fit the text.
 * @param text{string} the text to measure
 */
function measureText(text: string) {
    let w = ctx.measureText(text).width
    return w + (w / 2)
}

window.addEventListener("resize", () => {
    // container_width = cities.getBoundingClientRect().width
})