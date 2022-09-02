import { ITreeModel } from "./treeModel";
import { MyLeafElementName } from "./myLeaf";

export const MyTreeElementName = "my-tree";

export class MyTree extends HTMLElement {
    _data: ITreeModel;
    _element: HTMLElement | null;

    constructor() {
        super();
        this.attachShadow({ mode: "open"})
    }

    static get observedAttributes() {
        return ["data"];
    }

    attributeChangedCallback(attributeName: string, oldValue: string, newValue: string) {
        if (oldValue === newValue) {
            return;
        }

        if (attributeName === "data") {
            this._data = JSON.parse(newValue) as ITreeModel;
            this.updateTree();
        }
    }

    connectedCallback() {
        const ulElement = document.createElement("ul");
        this._element = ulElement;
        this.updateTree();
        this.shadowRoot!.appendChild(ulElement);
    }

    updateTree() {
        if(!this._data || !this._element) {
            return;
        }

        if(this._data.id) {
            this._element.id = this._data.id.toString();
            const liElement = document.createElement("li");
            liElement.innerText = this._data.id.toString();
            this._element.appendChild(liElement);
        }
        for (const item of this._data.items) {
            if (item.items && item.items.length > 0) {
                const treeElement = document.createElement(MyTreeElementName);
                treeElement.setAttribute("data", JSON.stringify(item));
                this._element.appendChild(treeElement);
            } else {
                const leafElement = document.createElement(MyLeafElementName);
                leafElement.setAttribute("data", item.id.toString());
                this._element.appendChild(leafElement);
            }
        }
    }
}
