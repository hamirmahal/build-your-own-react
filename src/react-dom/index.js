import VCompositeNode from './VCompositeNode';
import VDomNode from './VDomNode';

// 13. https://github.com/hamirmahal/build-your-own-react#13-rerendering-with-state
// Implement a class cache to save Component instances between renders.
const classCache = {
    cache: [],
    index: -1
};

// 13. https://github.com/hamirmahal/build-your-own-react#13-rerendering-with-state
// Store reactElement and domContainerNode from the first render.
const root = {};

/**
 * @returns {VCompositeNode | VDomNode} a
 * virtual node instantiated with reactElement
 * @param {*} reactElement 
 */
export function instantiateVNode(reactElement) {
    if (typeof reactElement?.type === 'function')
        return new VCompositeNode(reactElement);
    return new VDomNode(reactElement);
}

function render(
    reactElement = root.reactElement,
    domContainerNode = root.domContainerNode || {}
) {
    // 13. https://github.com/hamirmahal/build-your-own-react#13-rerendering-with-state
    // Reset the cache index and remove all contents in domContainerNode on re-renders.
    if (root.domContainerNode) {
        classCache.index = -1;
        domContainerNode.innerHTML = '';
    }

    const vNode = instantiateVNode(reactElement);
    domContainerNode.appendChild(vNode.mount(classCache));
    
    root.reactElement = reactElement;
    root.domContainerNode = domContainerNode;
}

export default {
    // 13. https://github.com/hamirmahal/build-your-own-react#13-rerendering-with-state
    // Defer actual rendering until after we are done updating state in all components.
    _reRender: () => setTimeout(render, 0),
    render
};
