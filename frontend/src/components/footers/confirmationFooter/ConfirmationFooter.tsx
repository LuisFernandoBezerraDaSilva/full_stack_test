import React, { Component } from 'react';

interface Props {
    onButtonClick: () => void;
}

class ConfirmationFooter extends Component<Props> {
    render() {
        return (
            <div>
                <button onClick={this.props.onButtonClick}>Enviar CSV!</button>
            </div>
        );
    }
}

export default ConfirmationFooter;