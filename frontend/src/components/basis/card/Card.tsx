import React, { Component } from 'react';
import './Card.css';

interface CardProps {
    header: JSX.Element;
    bgColor?: string;
    color?: string;
    body: JSX.Element;
    footer?: JSX.Element;
}

class Card extends Component<CardProps> {
    render() {
        const header = this.props.header;
        const body = this.props.body;
        const footer = this.props.footer ? this.props.footer : null;
        const color = this.props.color ? this.props.color : "#000";
        const bgColor = this.props.bgColor ? this.props.bgColor : "#fff";

        return (
            <div className="card" style={{backgroundColor: bgColor, color: color}}>
                <div className="card-header">
                    {header}
                </div>
                <div className="card-input">
                    {body}
                </div>
                <div className="card-footer">
                    {footer}
                </div>
            </div>
        );
    }
}

export default Card;