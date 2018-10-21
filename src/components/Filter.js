// 
import React from "react";
import Drop from './Drop';

export default class Filter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            opened: false,
        }

        this.handleClick = this.handleClick.bind(this);
        this.close = this.close.bind(this);
    }

    handleClick() {
        // maybe have this handled in classSearch. Where it keeps track of which filter is opened and then closes the rest.
        this.setState({
            opened: !this.state.opened
        });
    }

    close() {
        this.setState({
            opened: false
        })
    }

    render() {
        return(
            <div className="col-lg col-md-6 col-xs-12 mt-2">
                <div
                    className={"ygi-dropdown__wrapper yi-teacher-dropdown nopadding d-block yi-dropdown--beneath-modal " + (this.state.opened ? 'show' : '') 
                    // Only one filter dropdown can be open at a time
                }
                >   
                    <button 
                        className="btn dropdown-toggle ygi-dropdown__placeholder" onClick={this.handleClick}
                    >
                        {this.props.value}
                    </button>
                    <div
                        className={"dropdown-menu ygi-dropdown__menu " + (this.state.opened ? 'show' : '')}
                    >
                        {this.props.drops.map((drop, i) => {
                            return <Drop value={drop} key={i} search={this.props.search} close={this.close} parent={this.props.value} />
                        })}
                    </div>
                </div>
            </div>
        );
    }
}
