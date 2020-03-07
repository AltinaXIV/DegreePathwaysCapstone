/**
 * Sets a class bubble to a more compact form-factor
 * @param shadow {ShadowRoot} The Shadow DOM of the class bubble.
 */
function makeCompact(shadow) {
    "use strict";

    const childNodes = Array.from(shadow.childNodes);
    for(let i = 0; i < childNodes.length; i++) {
        let child = childNodes[i];
        if(child.className === undefined) {
            continue;
        }

        if(child.classList.contains("class-bubble")) {
            child.classList.add("compact");
            return
        }
    }
}

/**
 * Sets a class bubble to the original form factor.
 * @param shadow {ShadowRoot} The Shadow DOM of the class bubble.
 */
function removeCompact(shadow) {
    "use strict";

    const childNodes = Array.from(shadow.childNodes);
    for(let i = 0; i < childNodes.length; i++) {
        let child = childNodes[i];
        if(child.className === undefined) {
            continue;
        }

        if(child.classList.contains("class-bubble")) {
            child.classList.remove("compact");
            return
        }
    }
}

class RootClassBubble extends HTMLElement {

    constructor() {
        super();

        // Create shadow root. This will create HTML that is not shown in the source.
        this.shadow = this.attachShadow({mode: 'open'});
        this.shadow.append(document.getElementById('rootClassBubbleTemplate').content.cloneNode(true));
    }

    static get observedAttributes() { return ["href", "compact"];}

    attributeChangedCallback(name, oldValue, newValue) {
        if(name === "href") {
            this.addEventListener("click", () => {
                document.location.href = newValue;
            });
        }

        if(name === "compact") {
            if(newValue !== null) {
                makeCompact(this.shadow)
            } else {
                removeCompact(this.shadow);
            }
        }
    }
}

customElements.define('root-class-bubble', RootClassBubble);


class BranchClassBubble extends HTMLElement {
    constructor() {
        super();

        // Create shadow root. This will create HTML that is not shown in the source.
        this.shadow = this.attachShadow({mode: 'open'});
        this.shadow.append(document.getElementById('branchClassBubbleTemplate').content.cloneNode(true));
    }

    static get observedAttributes() { return ["href", "compact"];}

    attributeChangedCallback(name, oldValue, newValue) {
        if(name === "href") {
            this.addEventListener("click", () => {
                document.location.href = newValue;
            });
        }

        if(name === "compact") {
            if(newValue !== null) {
                makeCompact(this.shadow)
            } else {
                removeCompact(this.shadow);
            }
        }
    }
}

customElements.define('branch-class-bubble', BranchClassBubble);

class LeafClassBubble extends HTMLElement {
    constructor() {
        super();

        // Create shadow root. This will create HTML that is not shown in the source.
        this.shadow = this.attachShadow({mode: 'open'});
        this.shadow.append(document.getElementById('leafClassBubbleTemplate').content.cloneNode(true));
    }

    static get observedAttributes() { return ["href", "compact"];}

    attributeChangedCallback(name, oldValue, newValue) {
        if(name === "href") {
            this.addEventListener("click", () => {
                document.location.href = newValue;
            });
        }

        if(name === "compact") {
            if(newValue !== null) {
                makeCompact(this.shadow)
            } else {
                removeCompact(this.shadow);
            }
        }
    }
}

customElements.define('leaf-class-bubble', LeafClassBubble);

class StandAloneClassBubble extends HTMLElement {
    constructor() {
        super();

        // Create shadow root. This will create HTML that is not shown in the source.
        this.shadow = this.attachShadow({mode: 'open'});
        this.shadow.append(document.getElementById('stand-aloneClassBubbleTemplate').content.cloneNode(true));
    }

    static get observedAttributes() { return ["href", "compact"];}

    attributeChangedCallback(name, oldValue, newValue) {
        if(name === "href") {
            this.addEventListener("click", () => {
                document.location.href = newValue;
            });
        }

        if(name === "compact") {
            if(newValue !== null) {
                makeCompact(this.shadow)
            } else {
                removeCompact(this.shadow);
            }
        }
    }
}

customElements.define('stand-alone-class-bubble', StandAloneClassBubble );