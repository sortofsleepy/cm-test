import './styles/style.css'
import data from "./navigation.json"
import {buildCityNode} from "./city.ts";

// get ref to navbar
const nav = document.querySelector("#cities")

// build nodes for each city
data.cities.forEach(city => {
    nav!.innerHTML += buildCityNode(city)
})