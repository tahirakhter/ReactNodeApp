const axios = require('axios');

module.exports.getTweetsList = () => {
    const reqData = {
        method: 'GET',
        url: 'https://jsonplaceholder.typicode.com/comments',
        data: {},
        headers: {}
    };

    return axios(reqData).then((response) => {
        if (response) {
            return response.data;
        } else {
            return new Error('failed to fetch');
        }
    }).catch((error) => {
        return error.response;
    })
}