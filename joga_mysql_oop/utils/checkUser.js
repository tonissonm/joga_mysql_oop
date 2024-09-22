const checkUser = (username) =>{
    return(req,res,next)=>{
        console.log('Session user:', req.session.user);
        if(!req.session.user||req.session.user.username !== username){
            res.status(403).json({
                message: 'Access denied'
            })
            return;
        }
        next(); 
    } 
}
module.exports = checkUser; 