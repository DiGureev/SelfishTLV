import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

export const refreshToken = async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
  
    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token not found' });
    }
  
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Refresh token verification failed' });
      }
  
      // Generate a new access token
      const accessToken = jwt.sign({ id: user.id, username: user.username }, secretKey, {
        expiresIn: '1h', // New access token expires in 1 hour
      });
  
      // Set the new access token as an HTTP cookie
      res.cookie('token', accessToken, { httpOnly: true });
  
      res.status(200).json({ message: 'Token refreshed successfully' });
    });
  };