import './styles/style.pcss'
import data from "./navigation.json"
import {buildCityNode} from "./city.ts";
import {calculatePosition, measureText, updateFontSize} from "./lib/highlighter.ts";
import {getCurrentTime, getRandomColor} from "./lib/timezones.ts";

//////////  SETUP //////////

// current city selected
let current_city: Element | null = null

// holds refs to the nav items
let items: Array<Element> = []

// reference to time element
const time = document.querySelector(".worldtime") as HTMLElement

// get ref to navbar
const cities = document.querySelector("#cities") as Element

// get ref to highlighter
const highlighter = document.querySelector("#selector") as HTMLElement

// a canvas to measure the exact font dimensions.
const measure_canvas = document.createElement("canvas") as HTMLCanvasElement
const ctx = measure_canvas.getContext("2d") as CanvasRenderingContext2D

window.onload = () => {

    // build nodes for each city
    data.cities.forEach(city => {
        cities.innerHTML += buildCityNode(city)
    })

    // re-reference as an array to make it a bit easier to work with
    items = Array.prototype.slice.call(cities.children)

    // loop through and add click event
    items.forEach(city => {
        city.addEventListener("click", onClick)
    })

    // start from the first item; make all the necessary adjustments.
    current_city = items[0]
    current_city.classList.add("clicked")

    // update font measurement
    const fontSize = getComputedStyle(items[0].children[0]).fontSize
    updateFontSize(ctx, fontSize)

    // adjust selector
    adjustSelector()

    // start timer to update time
    setInterval(() => {
        let t = getCurrentTime(current_city!.getAttribute("data-section") as string).split("")
        t = t.map(itm => {
            const col = getRandomColor()
            return `<span style="color:${col}">${itm}</span>`
        })

        //const col = getRandomColor()
        time.children[0].innerHTML = t.join("")

        if (time.children[0].innerHTML !== "") {
            time.style.opacity = "1"
        }

    }, 1000)
}

/**
 * Responds to click event when clicking on an item
 * @param e {Event} the event object from the click.
 */
function onClick(e: Event) {
    const target = e.target as Element
    current_city?.classList.remove("clicked")

    if (target.hasAttribute("data-section")) {
        // only set things up if we aren't already looking at the city in question
        if (current_city !== target) {
            current_city = target
            current_city?.classList.add("clicked")

            adjustSelector()
        }
    }
}

////////// HIGHLIGHTER ADJUSTMENT //////////
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
    }, 520)
}

////////// RESIZING //////////
// When resizing, we need to adjust the width of the highlighter depending on the new font size
// since that can change depending on the window width. Also adds a slight debounce
let timeout: any
window.addEventListener("resize", () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
        let fontSize = getComputedStyle(items[0].children[0]).fontSize
        updateFontSize(ctx, fontSize)
        adjustSelector()
    }, 550)
})
