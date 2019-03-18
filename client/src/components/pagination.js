import React from 'react';
import {connect} from 'react-redux';

class Pagination extends React.Component {

    changePage = (page, action) => {
        this.props.dispatch({
            type: action,
            pageNumber: page
        });
    }


    //generate pages
    getPaginationList = (error, filteredList, itemsPerPage) => {
        let pagination = {
            current_page: this.props.currentPage,
            last_page: Math.ceil(filteredList.length / itemsPerPage),
            count: filteredList.length,
            limit:10
        };

        // for displaying page numbers
        const pageNumbers = [];

        if ((pagination.current_page + pagination.limit) <= pagination.last_page) {
            for (let i = pagination.current_page; i < (pagination.current_page + pagination.limit); i++) {
                pageNumbers.push(i);
            }
        } else if (pagination.last_page >= pagination.limit) {
            for (let i = pagination.last_page - pagination.limit; i <=  pagination.last_page; i++) {
                pageNumbers.push(i);
            }
        } else {
            for (let i = 1; i <= pagination.last_page; i++) {
                pageNumbers.push(i);
            }
        }

        return <ul className="pagination">
            <li className={"page-item" + (pagination.current_page === 1 ? ' disabled' : '')}>
                <a className="page-link" onClick={() => this.changePage('', 'PREVIOUS')}>Previous </a>
            </li>
            {
                pageNumbers.map((item, index) => (
                        <li key={index} className={"page-item" + (pagination.current_page === item ? ' active' : '')}><a
                            className="page-link" onClick={() => this.changePage(item, 'NEWPAGE')}>{item}</a></li>
                    )
                )
            }
            <li className={"page-item" + (pagination.current_page === pagination.last_page ? ' disabled' : '')}>
                <a className="page-link" onClick={() => this.changePage('', 'NEXT')}>Next</a>
            </li>
        </ul>
    }


    render() {
        const {error, filteredList, itemsPerPage} = this.props.data;
        return (
            <div>
                <nav aria-label="...">
                    {this.getPaginationList(error, filteredList, itemsPerPage)}
                </nav>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        currentPage: state.currentPage
    }
}

export default connect(mapStateToProps)(Pagination);
