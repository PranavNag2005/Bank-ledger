import jwt from 'jsonwebtoken'

export async function authMiddleWare(req, res, next) {
    console.log("In the middleware")
    const token = req.cookies.refreshToken || req.headers.authorization?.split(" ")[1]
    if (!token) {
        return res.status(401).json({ message: "jwt token is missing" })
    }
    const userData = jwt.verify(token, process.env.JWT_SECRET)
    console.log(userData)
    if (!userData) {
        return res.status(400).json({ messge: "User not found" })
    }
    req.user=userData
    next()

}
