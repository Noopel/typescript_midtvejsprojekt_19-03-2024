export function elementQuery(queryString: string): HTMLElement {
    let element = document.querySelector(queryString) as HTMLElement
    return element
}

export function elementQueryAll(queryString: string): NodeListOf<Element> {
    let elements = document.querySelectorAll(queryString) as NodeListOf<Element>
    return elements
}