import React from 'react';

class TweetsView extends React.Component {

    getDataView = (error, paginatedList) => {
        if (error) {
            return <tbody>
            <tr>
                <td colSpan={3}>Error: {error.message}</td>
            </tr>
            </tbody>;
        } else {
            return <tbody>{
                paginatedList.map((item, index) => (<tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.email}</td>
                            <td>{item.body}</td>
                        </tr>
                    )
                )
            }
            </tbody>
        }
    }

    render() {
        const {error, paginatedList} = this.props.data;
        return (
            <div>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Sr.</th>
                        <th>Email</th>
                        <th>Comment</th>
                    </tr>
                    </thead>
                    {this.getDataView(error, paginatedList)}
                </table>
            </div>
        )
    }
}


export default TweetsView;