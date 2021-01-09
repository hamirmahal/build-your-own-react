import Component from './Component';

const createElement = (type, props, ...children) => {
    const newReactType = {};
    
    newReactType.type = type;

    newReactType.props = {
        children: [...children.flat()],
        ...props
    };

    newReactType.$$typeof = Symbol.for("react.element");

    newReactType.ref = null;

    newReactType._owner = null;

    return newReactType;
};

export default {
    createElement: createElement,
    Component: Component
};
