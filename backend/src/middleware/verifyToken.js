import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const verifyToken = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return res.status(403).json({ message: 'Token is required for authentication' });
    }

    jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
        if (err) {
            console.log(err, 'Error')
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.decoded = decoded;
        next();
    });
};

export default verifyToken