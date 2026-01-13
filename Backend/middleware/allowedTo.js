module.exports = (...roles)=>{
    console.log(roles);
    return (req,res,next)=>{
        if(!roles.includes(req.currentUser.role)){
            return res.status(401).json({message : "this role is not authorized"})
        }
        next();
    }
}