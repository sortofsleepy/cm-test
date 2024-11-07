import './styles/style.pcss'
import data from "./navigation.json"
import {buildCityNode} from "./city.ts";
import {calculatePosition, measureText, updateFontSize} from "./lib/highlighter.ts";

//////////  SETUP //////////

// get ref to navbar
const cities = document.querySelector("#cities") as Element

// get ref to highlighter
const highlighter = document.querySelector("#selector") as HTMLElement

// a canvas to measure the exact font dimensions.
const measure_canvas = document.createElement("canvas") as HTMLCanvasElement
const ctx = measure_canvas.getContext("2d") as CanvasRenderingContext2D


// build nodes for each city
data.cities.forEach(city => {
    cities.innerHTML += buildCityNode(city)
})

let items = Array.prototype.slice.call(cities.children)
items.forEach(city => {
    city.addEventListener("mouseover", onMouseOver)
    city.addEventListener("mouseout", onMouseOut)
})

cities.addEventListener("mouseout", onNavOut)

// Setup the font settings based on one of the items in the list
let fontSettings = getComputedStyle(items[0].children[0]).font
ctx.font = fontSettings

////////// HOVER HANDLING //////////

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
 * Handles when we mouse out on a city
 */
function onMouseOut() {
    current_city = null
}

/**
 * Handles when we aren't moused over on any city; hides highlighter after 1 sec
 */
function onNavOut() {
    setTimeout(() => {
        if (current_city === null) {
            highlighter.style.opacity = "0"
        }
    }, 1000)
}

/**
 * Adjusts the selector item to match the width of the text and animates it towards the target.
 */
function adjustSelector() {
    const el = current_city as HTMLElement
    const text = el.children[0]

    const rect = el.getBoundingClientRect()
    const container = cities.getBoundingClientRect()

    const textWidth = measureText(ctx, text.innerHTML)

    highlighter.style.width = `${textWidth}px`

    const x = calculatePosition(container.x, rect.x, rect.width, textWidth)
    highlighter.style.transform = `translate3d(${x}px,0,0)`

    // attempts to allow transform to hit first before showing highlighter. Right thing to do might be to chain
    // event listeners but probably not worth the hassle in this case so rely on magic number that's roughly in line
    // with animation timing.
    setTimeout(() => {
        highlighter.style.opacity = "1"
    }, 320)
}


let timeout:any
window.addEventListener("resize", () => {
    clearTimeout(timeout)
    timeout = setTimeout(()=>{
        let fontSize = getComputedStyle(items[0].children[0]).fontSize
        updateFontSize(ctx, fontSize)
    },1500)
})
