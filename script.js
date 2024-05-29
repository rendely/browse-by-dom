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


function getActionableElements(el){
    console.log(el);
    if (!el.hasChildNodes() && el.nodeName === 'A') {
        console.log('found an a no children')
        return el
    }
    if (!el.hasChildNodes()) {
        console.log('null')
        return null
    }
    const children = Array.from(el.children).map(c => 
        getActionableElements(c)
    )
    const childrenFiltered = children.filter(c => !!c)
    const childrenActionable = childrenFiltered.length > 0 ? childrenFiltered.map(getActionableElements) : null
    if (el.hasChildNodes() && el.nodeName === 'A'){
        console.log('a with children')
        const new_el = el;
        el.children = childrenActionable
        return new_el
    }
    if (el.hasChildNodes() && el.nodeName !== 'A'){
        console.log('just children')
        return childrenActionable
    }
}

getActionableElements(sub)
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