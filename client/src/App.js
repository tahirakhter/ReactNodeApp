import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import _ from "lodash"
import TweetsView from './components/tweetsList';
import Pagination from './components/pagination';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
            error: '',
            tweetsList: [],
            filteredList: [],
            paginatedList: [],
            itemsPerPage: 25
        };
        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(event) {
        if (!_.isEmpty(event.target.value)) {
            let filtered = _.filter(this.state.tweetsList, (item) => {
                let n = item.email.toLowerCase().search(event.target.value.toLowerCase());
                return (n > -1) ? item : '';
            });
            this.setState({
                searchQuery: event.target.value.toLowerCase(),
                filteredList: filtered,
                paginatedList: this.paginatedList(filtered),
            });
        } else {
            this.setState({
                searchQuery: '',
                filteredList: this.state.tweetsList,
                paginatedList: this.paginatedList(this.state.tweetsList)
            });
        }
    }

    componentDidMount() {
        this.getTweetsList();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.currentPage !== this.props.currentPage) {
            this.setState({
                paginatedList: this.paginatedList(this.state.filteredList)
            });
        }
    }

    //get tweets data
    getTweetsList = () => {
        const reqData = {
            method: 'GET',
            url: 'http://localhost:8080/api/tweets',
            data: {},
            headers: {}
        };
        axios(reqData).then((response) => {
            if (response) {
                this.setState({
                    tweetsList: response.data,
                    filteredList: response.data,
                    paginatedList: this.paginatedList(response.data),
                    message: '',
                });
            } else {
                this.setState({
                    tweetsList: [],
                    filteredList: [],
                    paginatedList: [],
                    error: response.data.message,
                });
            }
        }).catch((error) => {
            let err = error.response.data;
            this.setState({
                error: err.message,
                tweetsList: [],
                filteredList: [],
                paginatedList: []
            });
        })
    }

    //return paginated resulted
    paginatedList(items) {
        let page = this.props.currentPage;
        let per_page = this.state.itemsPerPage || 10;
        let offset = (page - 1) * per_page;
        let paginatedItems = items.slice(offset).slice(0, per_page);
        return paginatedItems;
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md">
                        <div className="alert alert-warning" role="alert">
                            <input className="form-control" name="searchQuery" placeholder="type to search"
                                   onChange={this.onInputChange}/>
                        </div>
                    </div>
                </div>
                <div className="row">

                </div>
                <div className="row">
                    <div className="col-md">
                        {this.state.paginatedList.length > 0 ? <TweetsView data={this.state}/> : this.state.error}

                        <div className="col-md">
                            {this.state.paginatedList.length > 0 ? <Pagination data={this.state}/> : ''}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentPage: state.currentPage
    }
}

export default connect(mapStateToProps)(App);
