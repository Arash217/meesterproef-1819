const Exercise = require('../models/exercise');
const Channel = require('../models/channel');

const get = async (req, res) => {
    const exercises = await Exercise.find();
    res.render('lists', {
        exercises,
        username: req.user ? req.user.username : '',
        active: {
            lists: true
        }
    });
};

const add = async (req, res) => {
    const username = req.user ? req.user.username : '';
    const userChannels = await Channel.find({owner: username});

    res.render('add_list', {
        userChannels,
        active: {
            lists: true
        }
    });
};

const update = async (req, res) => {
    const {subject, questions} = req.body;
    await Exercise.findByIdAndUpdate(subject, {questions});
    res.redirect('/lists');
};

module.exports = {
    get,
    update,
    add
};