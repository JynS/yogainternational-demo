import React from 'react';

export default class Drop extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        // Should add tag to filter list
        // Should start search
        this.props.search(this.props.value, this.props.parent);
        this.props.close();
    }

    render() {
        return(
            <button className="dropdown-item ygi-dropdown__option" onClick={this.handleClick}>
                {this.props.value}
            </button>
        );
    }
}