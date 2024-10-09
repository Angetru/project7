const User = require('../models/user');
const auth = require('./middleware/auth');
const jwt = require('jsonwebtoken');

const Router = express.Router();

//Ruta protegida
router.get('users', auth, async(req, res) => {
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(401).json({message: 'Acceso denegado'});
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Token no valido'});
    }
});

module.exports = auth;