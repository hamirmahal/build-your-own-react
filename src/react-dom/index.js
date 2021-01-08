import VCompositeNode from './VCompositeNode';
import VDomNode from './VDomNode';

export function instantiateVNode(reactElement) {
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
