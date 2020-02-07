class LeafClassBubble extends HTMLElement {
    constructor() {
        super();

        // Create shadow root. This will create HTML that is not shown in the source.
        const shadow = this.attachShadow({mode: 'open'});
        this.shadowRoot.append(document.getElementById('leafClassBubbleTemplate').content.cloneNode(true));
    }
}

customElements.define('leaf-class-bubble', LeafClassBubble);