interface City {
    section: string,
    label: string
}

export function buildCityNode(city: City) {

    return `<li class="city" data-section="${city.section}">
                <h3>${city.label}</h3>
            </li>`
}