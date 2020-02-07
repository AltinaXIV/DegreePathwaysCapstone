class RootClassBubble extends HTMLElement {
    constructor() {
        super();

        // Create shadow root. This will create HTML that is not shown in the source.
        const shadow = this.attachShadow({mode: 'open'});
        shadow.append(document.getElementById('rootClassBubbleTemplate').content.cloneNode(true));
    }
}

customElements.define('root-class-bubble', RootClassBubble);
