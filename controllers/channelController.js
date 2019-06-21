const List = require('../models/list');
const Channel = require('../models/channel');

const get = async (req, res) => {
    const username = req.user ? req.user.username : "";
    const channels = await Channel.find({ owner: username });
    
    res.render('channels', {
        channels,
        username: req.user ? req.user.username : '',
        active: {
            channels: true
        }
    });
};

const add = async(req, res)=>{
    const username = req.user ? req.user.username: "";
    const userLists = await List.find({owner: username});

    res.render('add_channel', {
      userLists,
      active: {
          channels: true
      }
    });
  }

const create = async (req, res) => {
    try{
        const username = req.user ? req.user.username : '';
        const newestChannel = await Channel.findOne().sort('-channelCode').exec();
        let code = null;

        if (!newestChannel){
          code = 999;
        }

        const {channel_name: name, channel_subject: subject, lists} = req.body;
        const channel = new Channel ({ name, subject, lists, owner: username, channelCode: code + 1});
        const createdChannel = await channel.save();
    } catch(e){
      console.log(e);
    }
};

const remove = async (req, res) => {
    const username = req.user.username;
    const channelId = req.body.channelId;
    const removed = await Channel.findOneAndRemove({ owner: username, _id: channelId });

    const channelId = req.body.channelId;

    if (removed) {
        res.json({});
    } else {
        res.status(400).json({});
    }
};

module.exports = {
    get,
    add,
    create,
    remove
};
