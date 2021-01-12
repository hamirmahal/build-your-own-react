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
     * renders, instantiates, mounts
     * and returns a React functional
     * component or React class component.
     * @returns {*} a mounted Node
     */
    mount() {
        // 11. https://github.com/hamirmahal/build-your-own-react#11-render-react-class-component
        // Extend mount() so it is capable of mounting class components.
        if (this.reactElement.type.prototype.isReactComponent) {
            const classComponent = new this.reactElement.type(this.reactElement.props);
            const reactElement = classComponent.render();
            const virtualNode = instantiateVNode(reactElement);
            return virtualNode.mount();
        }
        const renderedComponent = this.reactElement.type(this.reactElement.props);
        const vNode = instantiateVNode(renderedComponent);
        return vNode.mount();
    }
}
