import { instantiateVNode } from './index';

export default class VCompositeNode {
    /**
     * initializes this
     * VCompositeNode instance with
     * a class property that is a
     * React element.
     * @param {object} reactElement 
     * is an object denoting
     * a React element. Its type
     * is a React functional
     * component.
     */
    constructor(reactElement) {
        this.reactElement = reactElement;
    }

    getPublicInstance() {}

    update() {}

    /**
     * calls this VCompositeNode's
     * React element's type, which is a
     * React functional component, with
     * this VCompositeNode's React
     * element's props object passed
     * as a parameter argument.
     * @returns {*} a mounted Node
     */
    mount() {
        const renderedComponent = this.reactElement.type(this.reactElement.props);
        const vNode = instantiateVNode(renderedComponent);
        return vNode.mount();
    }
}
