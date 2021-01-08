import { instantiateVNode } from './index';

export default class VDomNode {
    constructor(reactElement) {
        this.reactElement = reactElement;
    }

    getPublicInstance() {}

    update() {}

    mount() {
        return document.createElement(this.reactElement.type);
    }
}
