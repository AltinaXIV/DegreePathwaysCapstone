/**
 * Attach tooltip to ClassBubble element
 *
 * @param {ShadowRoot} shadow
 */
/*function relocateTooltip(shadow) {
    "use strict";

    let BreakException = {};

    const childNodes = Array.from(shadow.childNodes);
     try {
         childNodes.forEach(childNode => {
             // Grab the class name of the current node
             let className = childNode.className;
             if(className === undefined) {
                 // This makes the classname an empty string to prevent JS errors.
                 className = "";
             }
             if (className.split(" ")[1] === "class-bubble") {
                 const bubble = childNode; // The current class bubble that is bring worked on
                 const subChildren = Array.from(childNode.childNodes);
                 try {
                     subChildren.forEach(subChild => {
                        if (subChild.className === "bubble-tooltip-span") {
                            const windowWidth = window.innerWidth;
                            const windowHeight = window.innerHeight;
                            const bubbleLeft = bubble.getBoundingClientRect().left;
                            const bubbleRight = bubble.getBoundingClientRect().right;
                            const bubbleTop = bubble.getBoundingClientRect().top;
                            const bubbleBottom = bubble.getBoundingClientRect().bottom;
                            const bubbleWidth = bubbleRight - bubbleLeft;

                            //The default location for a tooltip will be directly beneath the class bubble

                            subChild.style.top = (bubbleBottom + 5) + "px";

                            throw BreakException;
                        }
                     });
                 } catch (e) {
                     if (e !== BreakException) {
                         throw e;
                     }
                 }
                 throw BreakException;
             }
         });
     } catch (e) {
         if (e !== BreakException) {
             throw e;
         }
     }

}*/


/**
 * Attach interactive features to elements within the shadow DOM
 *
 * @param {ShadowRoot} shadow DOM to attach features too
 */
function attachFeatures(shadow) {
    "use strict";

    //shadow.addEventListener("mouseover", () => relocateTooltip(shadow));
}

class RootClassBubble extends HTMLElement {

    constructor() {
        super();

        // Create shadow root. This will create HTML that is not shown in the source.
        this.shadow = this.attachShadow({mode: 'open'});
        this.shadow.append(document.getElementById('rootClassBubbleTemplate').content.cloneNode(true));
        attachFeatures(this.shadow);
    }

    static get observedAttributes() { return ["href"];}

    attributeChangedCallback(name, oldValue, newValue) {
        this.addEventListener("click", () => {
            document.location.href = newValue;
        });
    }
}

customElements.define('root-class-bubble', RootClassBubble);


class BranchClassBubble extends HTMLElement {
    constructor() {
        super();

        // Create shadow root. This will create HTML that is not shown in the source.
        this.shadow = this.attachShadow({mode: 'open'});
        this.shadow.append(document.getElementById('branchClassBubbleTemplate').content.cloneNode(true));
        attachFeatures(this.shadow);
    }

    static get observedAttributes() { return ["href"];}

    attributeChangedCallback(name, oldValue, newValue) {
        this.addEventListener("click", () => {
            document.location.href = newValue;
        });
    }
}

customElements.define('branch-class-bubble', BranchClassBubble);

class LeafClassBubble extends HTMLElement {
    constructor() {
        super();

        // Create shadow root. This will create HTML that is not shown in the source.
        this.shadow = this.attachShadow({mode: 'open'});
        this.shadow.append(document.getElementById('leafClassBubbleTemplate').content.cloneNode(true));
        attachFeatures(this.shadow);
    }

    static get observedAttributes() { return ["href"];}

    attributeChangedCallback(name, oldValue, newValue) {
        this.addEventListener("click", () => {
            document.location.href = newValue;
        });
    }
}

customElements.define('leaf-class-bubble', LeafClassBubble);

class StandAloneClassBubble extends HTMLElement {
    constructor() {
        super();

        // Create shadow root. This will create HTML that is not shown in the source.
        this.shadow = this.attachShadow({mode: 'open'});
        this.shadow.append(document.getElementById('stand-aloneClassBubbleTemplate').content.cloneNode(true));
        attachFeatures(this.shadow);
    }

    static get observedAttributes() { return ["href"];}

    attributeChangedCallback(name, oldValue, newValue) {
        this.addEventListener("click", () => {
            document.location.href = newValue;
        });
    }
}

customElements.define('stand-alone-class-bubble', StandAloneClassBubble );