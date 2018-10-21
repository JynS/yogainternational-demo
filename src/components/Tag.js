import React from 'react';

export default class Tag extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        // remove from search
        this.props.remove(this.props.parent, this.props.value);
    }

    render() {
        return (
            <div className="col-xs-4 mt-2">
                <div className="ygi-search-filters__filter" onClick={this.handleClick}>
                    <label className="ygi-search-filters__filter-label">{this.props.value}</label>
                    <button className="ygi-search-filters__filter-close"></button>
                </div>
            </div>
        )
    }
}