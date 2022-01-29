const User = require('../models/User');

module.exports =async (req,res,next)=>{
    if (!req.user.is_attendee)
        return res.status(401).send({ msg: "Not an attendee, sorry" });
    next();
};
