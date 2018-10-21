import React from 'react';

export default class YClass extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="m-2">
                <div className="yi-card-small-centered-hover-wrapper">
                    <a className="yi-card-small yi-card-small--hoverable">
                        <div className="yi-card-small__image">
                            <img src={this.props.thumb} />
                        </div>
                        <div className="yi-card-small__content">
                            <h4 className="yi-card-small__title yi-card-small__title--two-line yi-card-small--hover-hide">
                                {this.props.title}
                            </h4>
                            <h4 className="yi-card-small__title yi-card-small__title--two-line yi-card-small--hover-show">
                                {this.props.title}
                            </h4>
                            <div className="yi-card-small__author yi-card-small--hover-hide">
                                {this.props.teacher}
                            </div>
                            <div className="yi-card-small__author yi-card-small--hover-show yi-card-small__author--full">
                                {this.props.teacher} | {this.props.style}
                            </div>
                            <p className="yi-card-small__snippet mt-1">
                            {this.props.body_snippet}
                        </p>
                        </div>
                        <div className="yi-card-small__lower-left">
                            <div>
                                <span className="yi-card-small__level">
                                    {this.props.level}
                                </span>
                            </div>
                        </div>
                        <div className="yi-card-small__lower-right">
                            <i className="icon-clock" style={{fontSize: "12px"}}></i>
                            <span className="yi-card-small__duration">
                                {this.props.duration}
                            </span>
                        </div>
                    </a>
                </div>
            </div>
        )
    }
}