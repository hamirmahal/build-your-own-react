import ReactDOM from '../react-dom';

class Component {
    // 10. https://github.com/hamirmahal/build-your-own-react#10-react-class-components
    // Begin implementation of React class components.
    constructor(props) {
        this.props = props
    }

    setState(state) {}

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
