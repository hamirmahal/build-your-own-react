import { instantiateVNode } from './index';

export default class VDomNode {
    constructor(reactElement) {
        this.reactElement = reactElement;
    }

    getPublicInstance() {}

    update() {}

    /**
     * @returns {Element | Text} a non-virtual DOM node
     */
    mount() {
        if (this.reactElement === null || this.reactElement === undefined)
            return document.createTextNode('');
        if (typeof this.reactElement === 'number' || typeof this.reactElement === 'string')
            return document.createTextNode(this.reactElement);
        const domNode = document.createElement(this.reactElement.type);
        // 6. https://github.com/hamirmahal/build-your-own-react#6-classname
        // Set the className attribute of the domNode Element.
        domNode.className = this.reactElement.props.className;
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