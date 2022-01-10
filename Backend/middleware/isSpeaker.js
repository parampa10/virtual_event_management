const User = require('../models/User');

module.exports =async (req,res,next)=>{
    if (!req.user.is_speaker)
        return res.status(401).send({ msg: "Not an speaker, sorry" });
    next();
};