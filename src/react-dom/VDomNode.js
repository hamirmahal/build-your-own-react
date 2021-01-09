import { instantiateVNode } from './index';

export default class VDomNode {
    constructor(reactElement) {
        this.reactElement = reactElement;
    }

    getPublicInstance() {}

    update() {}

    /**
     * @returns {Element} a DOM element with the type of
     * this VDomNode's reactElement
     */
    mount() {
        const domNode = document.createElement(this.reactElement.type);
        const children = getChildrenAsArray(this.reactElement.props);
        const vDomNodeChildren = children.map(instantiateVNode);
        vDomNodeChildren.forEach(vDomNodeChild => {
            const mountedVDomNodeChild = vDomNodeChild.mount();
            domNode.appendChild(mountedVDomNodeChild);
        });
        return domNode;
    }
}

/**
 * @returns {array} an array of React elements
 * @param {object} props This is the props object of a React element.
 */
function getChildrenAsArray(props) {
    const { children = [] } = props || {};
    return Array.isArray(children) ? children : [children];
}