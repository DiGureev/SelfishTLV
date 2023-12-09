import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

export const token = async (req, res, next) => {
    console.log(req.cookies.token)
    console.log(req.cookies.refreshToken);
    // let token = req.cookies.token || req.headers['x-access-token']
    //let refreshToken = req.cookies.refreshToken

    let token = req.body.token; // Works till refresh the page
    
    // let accesstoken = req.cookies.token || req.headers['x-access-token']


    if(!token) return res.status(401).json({msg:'No token'})

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if(err) {
      if (!refreshToken) {
        return res.status(403).json({ message: 'Token verification failed' });
      }

      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: 'Refresh token verification failed' });
        }

        const newAccessToken = jwt.sign({ id: user.id, username: user.username }, secretKey, {
          expiresIn: '1h', 
        });

        res.cookie('token', newAccessToken, { httpOnly: true });

        next();
      });
    } else {
      next();
    }
  })
}