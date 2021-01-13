import ReactDOM from '../react-dom';

class Component {
    // 10. https://github.com/hamirmahal/build-your-own-react#10-react-class-components
    // Begin implementation of React class components.
    constructor(props) {
        this.props = props
    }

    /**
     * merges the parameter state into the existing state,
     * unless the parameter state is undefined or null, in
     * which case this method does nothing.
     * 
     * See
     * https://github.com/hamirmahal/build-your-own-react#12-state.
     * 
     * @param {object} state is what to merge into the existing
     * state. It might be undefined or null, or a function.
     * @returns {void} nothing
     */
    setState(state) {
        // 12. https://github.com/hamirmahal/build-your-own-react#12-state
        // Make the Component class stateful.
        if (state === null || state === undefined)
            return;
        if (typeof state === 'function')
            state(this.state);
        this.state = { ...this.state, ...state };
        // https://github.com/hamirmahal/build-your-own-react#13-rerendering-with-state
        // Implement the _reRender function in ReactDOM and call it from setState().
        ReactDOM._reRender();
    }

    // 10. https://github.com/hamirmahal/build-your-own-react#10-react-class-components
    // Begin implementation of React class components.
    /**
     * is the only required
     * method in a class component.
     * It should return React
     * elements.
     * @returns a React element
     */
    render() {
        throw new Error("The Component class does not extend React.Component.");
    }
}

// 10. https://github.com/hamirmahal/build-your-own-react#10-react-class-components
// Begin implementation of React class components.
Component.prototype.isReactComponent = true;

export default Component;
