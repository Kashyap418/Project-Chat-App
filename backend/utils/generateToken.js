import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    //{ userId } is the payload, i.e., the actual data being embedded in the token.
    // You’re putting the userId inside the token so you can later extract it to identify the user.
    // process.env.JWT_SECRET is the secret string like a digital signature  used to sign and verify the token.
    // It's stored in .env file to keep it safe and private.
        expiresIn: '15d'
    })
 
    res.cookie('jwt', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, //ms
        httpOnly: true, //So that this cookie is not accessible via jS to prevent XSS attacks cross-site scripting attacks
        sameSite: 'strict', //CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development"
    })
}

export default generateTokenAndSetCookie;