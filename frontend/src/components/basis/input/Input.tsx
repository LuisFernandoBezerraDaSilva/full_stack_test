import React, { Component } from 'react';
import "./Input.css";

interface CardProps {
    type: string;
    format: string;
  }

class Input extends Component<CardProps> {
    render() {

        const type = this.props.type;
        const format = this.props.format;

        
        return (
            <div>
                
            </div>
        );
    }
}

export default Input;