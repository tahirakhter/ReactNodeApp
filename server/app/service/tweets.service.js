const axios = require('axios');

module.exports.getTweetsList = () => {
    return new Promise((resolve, reject) => {
         let tweetsApi = {
            method: 'get',
            url: 'https://jsonplaceholder.typicode.com/comments',
            data: {}
        }

        axios(tweetsApi)
            .then((response) => {
                resolve(response.data);
            },(error)=>{
                reject(new Error(error.message));
            })
    });

}