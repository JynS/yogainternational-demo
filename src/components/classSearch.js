import React from 'react';
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import Tag from './Tag';
import fCats from '../data/filterCats';
import classes from '../data/classes';
import YClass from './YClass';

const classArray = classes.classes;

export default class classSearch extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            searching: false,
            filters: [],
            results: [],
            term: ""
        }
        let active = {};
        fCats.forEach(c => {
            active[c.name] = []
        });
        this.state.active = active;

        this.search = this.search.bind(this);
        this.remove = this.remove.bind(this);
        this.checkSearch = this.checkSearch.bind(this);
        this.removeActive = this.removeActive.bind(this);
        this.addActive = this.addActive.bind(this);
        this.addFilter = this.addFilter.bind(this);
        this.removeFilter = this.removeFilter.bind(this);
        this.getClasses = this.getClasses.bind(this);
        this.countActives = this.countActives.bind(this);
        this.searchFilter = this.searchFilter.bind(this);
        this.searchTerm = this.searchTerm.bind(this);
        this.searchBar = this.searchBar.bind(this);

    }

    searchTerm(term) {
        this.setState({
            term: term
        });
        this.getClasses(term);
        this.checkSearch([], term);
    }

    search(filter, parent, term) {
        let filters = this.state.filters.slice();

        // Check if we already have this filter active
        if (
            filters.map(f => {
                return f.name;
            }).indexOf(filter) === -1
        ) {
            this.addFilter(filters, parent, filter);
            this.addActive(parent, filter);
        }
        else {
            this.removeFilter(filters, parent, filter);
            this.removeActive(parent, filter);
        }

        // perform search
        this.getClasses(term);

        // check if we're searching
        this.checkSearch(filters, term);
    }

    searchFilter(array, parent, filter, results) {
        array.forEach(c => {
            if (parent == "Anatomy" ? c["anatomical_focus"] == filter : c[parent.toLowerCase()] == filter) {
                results.push(c)
            }

        });

        return results;
    }

    searchBar(array, term) {
        let results = [];
        array.forEach(c => {
            for (let prop in c) {
                if (typeof c[prop] === "string" 
                && prop !== "url" 
                && prop !== "thumb"
                && prop !== "body_snippet") {
                    if (c[prop].toLowerCase().search(term) !== -1) {
                        results.push(c);
                        break;
                    }
                }
                else if (c[prop][0]) {
                    if (prop !== "anatomical_focus" 
                    && prop !== "style") {
                        if (c[prop][0].toLowerCase().search(term) !== -1) {
                            results.push(c);
                            break;
                        }
                    }
                }
            }
        })
        return results;
    }

    getClasses(term) {
        let actives = this.countActives();
        let stateResults = []
        actives.forEach((p, i) => {
            if (i === 0) {
                let results = [];
                this.state.active[p].forEach(f => {
                    let result = this.searchFilter(classArray, p, f.replace(/ /g, "-").toLowerCase(), []);
                    Array.prototype.push.apply(results, result);
                });
                stateResults = results;
                this.setState({
                    results: results
                });
            }
            else {
                let results = [];
                this.state.active[p].forEach(f => {
                    let result = this.searchFilter(stateResults, p, f.replace(/ /g, "-").toLowerCase(), []);
                    Array.prototype.push.apply(results, result);
                });
                stateResults = results;
                this.setState({
                    results: results
                });
            }
        })

        // search term from search bar
        if (term || this.state.term) {
            if (stateResults.length > 0) {
                let results = [];
                results = this.searchBar(stateResults, term ? term : this.state.term)
                this.setState({
                    results: results
                })
            }
            else {
                let results = this.searchBar(classArray, term ? term : this.state.term);
    
                this.setState({
                    results: results
                })
            }

        }

    }

    addFilter(filters, parent, filter) {
        filters.push({name: filter, parent: parent});
        this.setState({
            filters: filters
        });
    }

    removeFilter(filters, parent, filter) {
        filters.splice(
            filters.map(f => {
                return f.name;
            }).indexOf(filter), 1);
        this.setState({
            filters: filters
        });

        return filters;
    }

    addActive(parent, filter) {
        let active = this.state.active;

        if (active[parent] != filter) {
            active[parent].push(filter);
        }

        this.setState({
            active: active
        });
    }

    removeActive(parent, filter) {
        let active = this.state.active;
        active[parent].splice(active[parent].indexOf(filter), 1);

        this.setState({
            active: active
        })
    }

    countActives() {
        let active = this.state.active;
        let actives = [];
        for (parent in active) {
            if (active[parent].length > 0) {
                actives.push(parent);
            }
        }

        return actives;
    }

    remove(parent, filter) {
        let filters = this.state.filters.slice();
        filters = this.removeFilter(filters, parent, filter);
        this.removeActive(parent, filter);
        this.getClasses();
        this.checkSearch(filters, this.state.term);
    }



    checkSearch(filters, term) {
        // check if we're searching
        if (!term && filters.length == 0) {
            this.setState({
                searching: false
            });
        }
        else {
            this.setState({
                searching: true
            });
        }
    }

    render() {
        return (
            <div id="app">
                <div className="container px-3">
                    <h2 className="ygi-page-heading ygi-page-heading--dark">Online 60 Minute Yoga Classes </h2>
                </div>
                <div className="container px-3">
                    <div className="ygi-search__wrapper">
                        <div className="ygi-search-bar col col-12 col-lg-2">
                            <SearchBar search={this.searchTerm}/>
                        </div>
                        <div className="yi-dropdowns__wrapper-visibility col-lg-10 ">
                            <div className="row">                       
                                {fCats.map((cat, i) => {
                                    return <Filter value={cat.name} drops={cat.drops} key={i} search={this.search} />
                                } )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ygi-search-filters"  style={{display: this.state.searching ? "block" : "none"}}>
                    <div className="container px-3">
                        <div className="ygi-search-filters__wrapper">
                            <div className="ygi-search-filters__filters" style={{width: "100%"}}>
                                <label className="ygi-search-filters__filters-label">Filters</label>
                                <div className="row">
                                    {this.state.filters.map((f, i) => {
                                        return <Tag value={f.name} parent={f.parent} key={i} remove={this.remove} />
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{display: this.state.searching ? "block" : "none"}}>
                    <section className="ygi-divider__wrapper">
                        <div className="container">
                            <div className="ygi-divider"></div>
                        </div>
                    </section>
                    <div className="ygi-profile-classes">
                        <div className="container">
                            <p className="ygi-profile-classes__heading mx-auto text-center">
                                {this.state.results.length} Results
                            </p>
                            <div className="ygi-profile-classes__button-wrapper"></div>
                            <div className="ygi-profile-classes__wrapper">
                                {this.state.results.map((r, i) => {
                                    return <YClass 
                                            thumb={r.thumb}
                                            title={r.title}
                                            teacher={r.teacher}
                                            style={r.style}
                                            body_snippet={r.body_snippet}
                                            level={r.level}
                                            duration={r.duration}
                                            key={i}
                                            />
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}