export const MyLeafElementName = "my-leaf";

export class MyLeaf extends HTMLElement {
    _data: string | null;
    _element: HTMLElement | null;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    static get observedAttributes () {
        return ["data"];
    }

    attributeChangedCallback(attributeName: string, oldValue: string, newValue: string) {
        if(oldValue === newValue) {
            return;
        }

        if (attributeName === "data") {
            this._data = newValue;
            this.updateText();
        }
    }

    connectedCallback() {
        const liElement = document.createElement("li");
        this._element = liElement;
        this.updateText();
        this.shadowRoot!.appendChild(liElement);
    }

    updateText () {
        if(!this._element || !this._data) {
            return;
        }

        this._element.innerText = this._data;
    }
}
