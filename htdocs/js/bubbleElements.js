class BubbleElements extends HTMLElement {
    constructor() {
        super();

        // Create shadow root. This will create HTML that is not shown in the source.
        const shadow = this.attachShadow({mode: 'open'});
        shadow.append(document.getElementById('rootClassBubbleTemplate').content.cloneNode(true));
    }
}

customElements.define('root-class-bubble', BubbleElements);


class BranchClassBubble extends HTMLElement {
    constructor() {
        super();

        // Create shadow root. This will create HTML that is not shown in the source.
        const shadow = this.attachShadow({mode: 'open'});
        shadow.append(document.getElementById('branchClassBubbleTemplate').content.cloneNode(true));
    }
}

customElements.define('branch-class-bubble', BranchClassBubble);

class LeafClassBubble extends HTMLElement {
    constructor() {
        super();

        // Create shadow root. This will create HTML that is not shown in the source.
        const shadow = this.attachShadow({mode: 'open'});
        shadow.append(document.getElementById('leafClassBubbleTemplate').content.cloneNode(true));
    }
}

customElements.define('leaf-class-bubble', LeafClassBubble);

class StandAloneClassBubble extends HTMLElement {
    constructor() {
        super();

        // Create shadow root. This will create HTML that is not shown in the source.
        const shadow = this.attachShadow({mode: 'open'});
        shadow.append(document.getElementById('stand-aloneClassBubbleTemplate').content.cloneNode(true));
    }
}

customElements.define('stand-alone-class-bubble', StandAloneClassBubble);