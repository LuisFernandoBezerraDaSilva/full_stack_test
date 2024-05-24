import React, { Component } from 'react';
import "./header.css"

interface Props {
    filter: boolean;
    title: string;
    onFilterSubmit?: (value: string) => void;
}

class Header extends Component<Props> {
    state = {
        inputValue: ''
    };

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ inputValue: event.target.value });
    };

    handleButtonClick = () => {
        if (this.props.onFilterSubmit) {
            this.props.onFilterSubmit(this.state.inputValue);
        }
    };

    render() {
        const { filter, title } = this.props;
        
        return (
            <div className="header-container">
                <h1 className="h1-custom-margin">{title}</h1>
                {filter && (
                    <div className="input-container">
                        <input className="input-filter" type="text" onChange={this.handleInputChange} />
                        <button onClick={this.handleButtonClick}>Submit</button>
                    </div>
                )}
            </div>
        );
    }
}

export default Header;