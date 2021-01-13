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
     * @param {object} classCache a class
     * cache object that saves component
     * instances between renders. It has
     * a cache property that is an array
     * and an int index property.
     * @returns {*} a mounted Node
     */
    mount(classCache) {
        // github.com/hamirmahal/build-your-own-react#11-render-react-class-component
        // Extend mount() so it is capable of mounting class components.
        if (this.reactElement.type.prototype.isReactComponent) {
            // github.com/hamirmahal/build-your-own-react#13-rerendering-with-state
            // Increase the cache's index property and get the element at that index.
            const element = classCache.cache[++classCache.index];
            // github.com/hamirmahal/build-your-own-react#13-rerendering-with-state
            // If the element is defined, use it, and update its props attribute.
            if (element) {
                // Add the class instance to the cache.
                element.props = this.reactElement.props;
                classCache.cache[classCache.index] = element;
                const reactElement = element.render();
                const virtualNode = instantiateVNode(reactElement);
                return virtualNode.mount(classCache);
            }
            const classComponent = new this.reactElement.type(this.reactElement.props);
            // github.com/hamirmahal/build-your-own-react#13-rerendering-with-state
            // Add the class instance to the cache.
            classComponent.props = this.reactElement.props;
            classCache.cache[classCache.index] = classComponent;
            const reactElement = classComponent.render();
            const virtualNode = instantiateVNode(reactElement);
            return virtualNode.mount(classCache);
        }
        const renderedComponent = this.reactElement.type(this.reactElement.props);
        const vNode = instantiateVNode(renderedComponent);
        return vNode.mount(classCache);
    }
}
