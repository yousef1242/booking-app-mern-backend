const jwt  = require('jsonwebtoken')

const verifyToken = (req,res,next) => {
    const authToken = req.headers.authorization
    if (authToken) {
        const token = authToken.split(" ")[1]
        try {
            const decodedPlayload = jwt.verify(token,process.env.JWT_SECRET)
            req.user = decodedPlayload
            next()
        } catch (error) {
            return res.status(401).json({message : 'no token provided'})
        }
    } else {
        return res.status(401).json({message : 'invalid token, access deniend'})
    } 
}

module.exports = {
    verifyToken,
}