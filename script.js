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


// start with a root node
// we'll save to an empty array which over time we fill with objects of element and children

function isValidElement(el){
    if (['A'].includes(el.nodeName)) return true 
    return false
}

function getActionableElements(el){
    // if single node
    if (!Array.isArray(el)){
        // if terminating node
        if (!el.hasChildNodes()){
            if (isValidElement(el)){
                return undefined
            } else{
                return {element: el.href, text: el.innerText, label:el.ariaLabel}
            }
        }
        //if has children
        else{
            const children = getActionableElements(Array.from(el.children))
            //if keep this node
            if (isValidElement(el)){
                return {element: el.href, text:el.innerText, label:el.ariaLabel, ...children && {children: children}}
            }
            //skip this node
            else{
                return children ? children : undefined 
            }            
        }
    }
    // else if list
    else{
        const elements = el.map(getActionableElements)
        const filtered = elements.filter(e => e !== undefined)
        if (filtered.length === 0) return undefined 
        if (filtered.length === 1) return filtered[0]
        return filtered
    }

}

let result = getActionableElements(sub)
JSON.stringify(result, null, 4)

getActionableElements(document.body)


let elements = document.querySelectorAll('*');
let arias = Array.from(elements).filter(element => {
    return (
        
            (
                (Array.from(element.attributes).some(attr => attr.name.startsWith('aria-label')) && !['img'].includes(element.role))

                || 
                
                ['a', 'input', 'button'].includes(element.tagName.toLowerCase())
            )
            && element.ariaHidden !== 'true'
            && isElementInViewport(element)
            && element.checkVisibility()
            && element.tabIndex !== '-1'

        )});

arias.forEach((a,i) => a.setAttribute('bot-id',i))

let ariasresult = arias.map(a => ({ id: a.bot_id, tag: a.nodeName, role: a.role, tabindex: a.tabindex, fontSize: window.getComputedStyle(a, null).getPropertyValue('font-size'), name: a.name, type: a.type, title: a.title, label: a.ariaLabel, text: a.innerText, rect: a.getBoundingClientRect(), href: a.href }));



console.table(ariasresult);

//TODO
//-Get the aria-label from elements inside the A tag if it doesn't have it itself
//