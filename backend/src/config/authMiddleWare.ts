/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next
 */

// @ts-ignore
export const authentication = (req : any , res : any , next : NextFunction) => {
 const authHeader = req.headers.authorization;
 if (!authHeader) return res.status(401).json({message: 'No token found'});
 const token = authHeader.split(' ')[1];
try{
const payload = jwt.verify(token , process.env.JWT_SECRET);
req.user = payload;
next();
}catch(error){
return res.status(403).json({ message: 'Invalid token' });
}
}