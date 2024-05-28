let elements = document.querySelectorAll('*');
let arias = Array.from(elements).filter(element => {
return ((Array.from(element.attributes).some(attr => attr.name.startsWith('aria-label')) && element.ariaHidden !== 'true') && isElementInViewport(element) || ['a','input','button'].includes(element.tagName.toLowerCase()) && isElementInViewport(element)) ;
});

let ariasresult = arias.map(a => ({tag: a.nodeName, name: a.name, type:a.type,  label: a.ariaLabel, text: a.innerText}))

console.log(ariasresult);

function isElementInViewport (el) {

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