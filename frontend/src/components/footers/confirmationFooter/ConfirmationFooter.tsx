import React, { Component } from 'react';

interface CardProps {
    onButtonClick: () => void;
}

class ConfirmationFooter extends Component<CardProps> {
    render() {
        return (
            <div>
                <button onClick={this.props.onButtonClick}>Enviar CSV!</button>
            </div>
        );
    }
}

export default ConfirmationFooter;