const {getTweetsList} = require('../service/tweets.service');

//for third party call
module.exports.getTweetsList = (req, res) => {
    try {
        getTweetsList().then((response) => {
            res.status(200).json(response);
        },(error)=>{
            res.status(400).json(error.message);
        });
    } catch (e) {
        res.status(500).json(e.message);
    }
}