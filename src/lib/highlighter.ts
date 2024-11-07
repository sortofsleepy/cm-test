/**
 * Uses canvas element to measure the width of text minus box calculations.
 * Adds a tiny bit of padding to better fit the text.
 * @param ctx{CanvasRenderingContext2D} the context to use
 * @param text{string} the text to measure
 * @param additionalPadding {number} any additional padding in addition to the default (which is half the width of the text)
 */
export function measureText(ctx: CanvasRenderingContext2D, text: string, additionalPadding: number = 0) {
    let w = ctx.measureText(text).width
    return w + (w / 2) + additionalPadding
}

/**
 * Calculates the position for the highlighting element
 * @param containerX {number} the x position of the parent container
 * @param elX {number} the x position of the element we're trying to highlight
 * @param elWidth {number} the width of the element we're trying to highlight
 * @param textWidth {number} the width of the text (as returned by {@link measureText})
 */
export function calculatePosition(
    containerX: number,
    elX: number,
    elWidth: number,
    textWidth: number
) {
    let x = elX - containerX
    const offset = elWidth / 2;
    x += offset
    x -= (textWidth / 2)
    return x
}