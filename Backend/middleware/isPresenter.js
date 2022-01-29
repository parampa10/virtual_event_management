const User = require('../models/User');

module.exports =async (req,res,next)=>{
    if (!req.user.is_presenter)
        return res.status(401).send({ msg: "Not a Presenter, sorry" });
    next();
};