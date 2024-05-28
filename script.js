function isElementInViewport(el) {

    // Special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

let elements = document.querySelectorAll('*');
let arias = Array.from(elements).filter(element => {
    return (
        
            (
                Array.from(element.attributes).some(attr => attr.name.startsWith('aria-label'))

                || 
                
                ['a', 'input', 'button'].includes(element.tagName.toLowerCase())
            )
            && element.ariaHidden !== 'true'
            && isElementInViewport(element)
            && element.checkVisibility()

        )});

let ariasresult = arias.map(a => ({ tag: a.nodeName, hidden: a.ariaHidden, name: a.name, type: a.type, title: a.title, label: a.ariaLabel, text: a.innerText, rect: a.getBoundingClientRect(), href: a.href }));

ariasresult

console.table(ariasresult);

