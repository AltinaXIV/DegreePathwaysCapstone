class BranchClassBubble extends HTMLElement {
    constructor() {
        super();

        // Create shadow root. This will create HTML that is not shown in the source.
        const shadow = this.attachShadow({mode: 'open'});
        this.shadowRoot.append(document.getElementById('branchClassBubbleTemplate').content.cloneNode(true));
    }
}

customElements.define('branch-class-bubble', BranchClassBubble);