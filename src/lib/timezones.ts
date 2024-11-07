const TIMEZONES = {
    "cupertino": "America/Los_Angeles",
    "new-york-city": "America/New_York",
    "london": "Europe/London",
    "amsterdam": "Europe/Amsterdam",
    "tokyo": "Asia/Tokyo",
    "hong-kong": "Asia/Hong_Kong",
    "sydney": "Australia/Sydney"
}


export function getCurrentTime(locale: string) {

    //@ts-ignore
    // Ignoring cause this does technically work
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
        hourCycle:"h12"
    }

    const formatter = new Intl.DateTimeFormat("en-US", options)

    return formatter.format(new Date())
}