import  React from 'react';

export let FlyPublicComponent = ComponsedComponent => class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    componentDidMount() {

    }

    render() {
        let methods = {

        }

        return <ComponsedComponent {...methods} {...this.props} {...this.state} />;
    }
}

