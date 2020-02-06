class ClassBubble extends HTMLElement {
    constructor() {
        super();

        // Create shadow root. This will create HTML that is not shown in the source.
        const shadow = this.attachShadow({mode: 'open'});
        this.shadowRoot.append(document.getElementById('classBubbleTemplate').content.cloneNode(true));
    }
}

customElements.define('root-class-bubble', ClassBubble);
