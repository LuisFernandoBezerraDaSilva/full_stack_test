import React, { Component } from 'react';
import "./header.css"

interface CardProps {
    filter: boolean;
    title: string;
    onFilterChange: (value: string) => void;
}

class Header extends Component<CardProps> {
    render() {
        const { filter, title, onFilterChange } = this.props;
        
        return (
            <div className="header-container">
                <h1>{title}</h1>
                {filter && <input className="input-filter" type="text" onChange={(e) => onFilterChange(e.target.value)} />}
            </div>
        );
    }
}

export default Header;