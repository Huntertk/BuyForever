import jwt from 'jsonwebtoken';

export const generateJsonWebToken = (payload:string):string => {
    return jwt.sign({userId: payload}, process.env.JWT_SECRET as string, {
        expiresIn:"1d"
    })
}
