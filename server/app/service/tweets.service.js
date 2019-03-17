const fetch = require("cross-fetch");

module.exports.getTweetsList = async () => {
    return new Promise((resolve, reject) => {
        const tweetsApi = "https://jsonplaceholder.typicode.com/comments";
        fetch(tweetsApi, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then((data) => {
                    resolve(data);
                },
                (error) => {
                    reject(new Error('failed to fetch'));
                })
            .catch(error => {
                reject(new Error('failed to fetch'));
            })
    })
}