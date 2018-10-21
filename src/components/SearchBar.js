import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            value: ""
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            value: e.target.value
        });

        this.props.search(e.target.value);
    }

    render() {
        return (
            <div className="ygi-search-bar__wrapper mt-2">
                <input 
                    className="ygi-search-bar__input" 
                    type="text"
                    placeholder="Search"
                    value={this.state.value}
                    onChange={this.handleChange}
                />
                <a 
                    className="icon-wrapper ygi-search-bar__icon-wrapper"
                    href="javascript:void(0)"
                >
                    <svg className="icon-search-grey" role="presentation">
                        <FontAwesomeIcon icon={faSearch} />
                    </svg>
                </a>
            </div>
        );
    }
}