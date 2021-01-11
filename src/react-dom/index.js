import VCompositeNode from './VCompositeNode';
import VDomNode from './VDomNode';

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

function render(reactElement, domContainerNode) {
    const vNode = instantiateVNode(reactElement);
    domContainerNode.appendChild(vNode.mount());
}

export default {
    _reRender: () => {},
    render
};
