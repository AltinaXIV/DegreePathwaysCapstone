/**
 * Attach tooltip to ClassBubble element
 *
 * @param {ShadowRoot} shadow
 */
function attachTooltip(shadow) {
    "use strict";
    let BreakException = {};

    const childNodes = Array.from(shadow.childNodes);
     try {
         childNodes.forEach(childNode => {
             if (childNode.nodeName === "DIV") {
                 childNode.addEventListener("click", () => alert("SUCCESS"));
                 throw BreakException;
             }
         });
     } catch (e) {
         if (e !== BreakException) {
             throw e;
         }
     }

}

class RootClassBubble extends HTMLElement {
    constructor() {
        super();

        // Create shadow root. This will create HTML that is not shown in the source.
        const shadow = this.attachShadow({mode: 'open'});
        shadow.append(document.getElementById('rootClassBubbleTemplate').content.cloneNode(true));
        attachTooltip(shadow);
    }
}

customElements.define('root-class-bubble', RootClassBubble);


class BranchClassBubble extends HTMLElement {
    constructor() {
        super();

        // Create shadow root. This will create HTML that is not shown in the source.
        const shadow = this.attachShadow({mode: 'open'});
        shadow.append(document.getElementById('branchClassBubbleTemplate').content.cloneNode(true));
        attachTooltip(shadow);
    }
}

customElements.define('branch-class-bubble', BranchClassBubble);

class LeafClassBubble extends HTMLElement {
    constructor() {
        super();

        // Create shadow root. This will create HTML that is not shown in the source.
        const shadow = this.attachShadow({mode: 'open'});
        shadow.append(document.getElementById('leafClassBubbleTemplate').content.cloneNode(true));
        attachTooltip(shadow);
    }
}

customElements.define('leaf-class-bubble', LeafClassBubble);

class StandAloneClassBubble extends HTMLElement {
    constructor() {
        super();

        // Create shadow root. This will create HTML that is not shown in the source.
        const shadow = this.attachShadow({mode: 'open'});
        shadow.append(document.getElementById('stand-aloneClassBubbleTemplate').content.cloneNode(true));
        attachTooltip(shadow);
    }
}

customElements.define('stand-alone-class-bubble', StandAloneClassBubble);