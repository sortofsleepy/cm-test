
// Side note : it should be possible to dynamically build the time zone name, but
// not doing here given that we'd need to know special cases ahead of time anyways(like New York or Cupertino)
// so just do a lookup table.
const TIMEZONES = {
    "cupertino": "America/Los_Angeles",
    "new-york-city": "America/New_York",
    "london": "Europe/London",
    "amsterdam": "Europe/Amsterdam",
    "tokyo": "Asia/Tokyo",
    "hong-kong": "Asia/Hong_Kong",
    "sydney": "Australia/Sydney"
}

/**
 * Returns the current date + time for the specified locale id
 * @param locale {string} the id of the locale to look up
 */
export function getCurrentTime(locale: string) {

    //@ts-ignore
    // Ignoring cause this does technically works
    const lookup = TIMEZONES[locale]

    const options: Intl.DateTimeFormatOptions = {
        timeZone: lookup,
        month: "numeric",
        day: "numeric",
        year: "numeric",
        hour12: true,
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hourCycle: "h12"
    }

    const formatter = new Intl.DateTimeFormat("en-US", options)

    return formatter.format(new Date())
}

/**
 * Generates a random hex color
 */
export function getRandomColor(){
    const r = Math.floor(Math.random() * 255)
    const g = Math.floor(Math.random() * 255)
    const b = Math.floor(Math.random() * 255)

    return "#"+((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}