import { instantiateVNode } from './index';

export default class VDomNode {
    constructor(reactElement) {
        this.reactElement = reactElement;
    }

    /**
     * adds the props from this
     * VDomNode's React element to an
     * Element.
     * @param {Element} domNode is the
     * element to which we are adding
     * this VDomNode's React element's
     * props.
     * @returns {void} nothing
     */
    addPropsFromThisReactElementTo(domNode) {
        const { props } = this.reactElement;
        Object.entries(props).forEach(([propKey, propValue]) => {
            // 6. https://github.com/hamirmahal/build-your-own-react#6-classname
            // Set the className attribute of the domNode Element.
            if (propKey === 'className')
                domNode.className = propValue;
            // 7. https://github.com/hamirmahal/build-your-own-react#7-inline-styles
            // Set the style attribute of domNode.
            else if (propKey === 'style')
                Object.entries(props.style).forEach(([styleProperty, styleValue]) => {
                    domNode.style[styleProperty] = styleValue;
                });
            // 9. https://github.com/hamirmahal/build-your-own-react#9-events
            // Add event listeners for each of the attributes that start with "on".
            else if (propKey.substring(0,2) === "on")
                domNode.addEventListener(propKey.substring(2).toLowerCase(), propValue);
            else
                domNode.setAttribute(propKey, propValue);
        });
    }

    getPublicInstance() {}

    update() {}

    /**
     * @param {object} cache a class cache that saves
     * component instances between renders.
     * @returns {Element | Text} a non-virtual DOM node
     */
    mount(cache) {
        if (this.reactElement === null || this.reactElement === undefined)
            return document.createTextNode('');
        if (typeof this.reactElement === 'number' || typeof this.reactElement === 'string')
            return document.createTextNode(this.reactElement);
        const domNode = document.createElement(this.reactElement.type);
        // 8. https://github.com/hamirmahal/build-your-own-react#8-attributes
        // Add attributes to domNode.
        this.addPropsFromThisReactElementTo(domNode);
        const children = getChildrenAsArray(this.reactElement.props);
        const vDomNodeChildren = children.map(instantiateVNode);
        vDomNodeChildren.forEach(vDomNodeChild => {
            // github.com/hamirmahal/build-your-own-react#13-rerendering-with-state
            // Pass cache to the next call to mount(cache).
            const mountedVDomNodeChild = vDomNodeChild.mount(cache);
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