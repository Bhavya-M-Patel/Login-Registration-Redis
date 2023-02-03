const jwt = require("jsonwebtoken");

function signJWT(data){
    let secreat = process.env.secreat_key;
    return jwt.sign(data, secreat, { expiresIn: '1d' })
}



let verifyJWT = (req, res, next) => {
    try {
        
        const  token  = req.cookies[process.env.token_header_key];
        
        if (!token) {
            res.redirect("/");
            res.status(200).end();
        }
        const decodeToken = jwt.verify(token, process.env.secreat_key);
        next();
    } catch (e) {
        res.locals.isAuthenticated = false;
        console.log(e);
        res.status(401).end();
    }
};

module.exports = {signJWT, verifyJWT}