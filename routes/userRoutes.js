const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Singup (Registro de Usuario)
router.post('/signup', async (req, res) => {
    const {name, email, username, password} = req.body;
    //Verificar si los campos están completos
    if(!email || !username || !password){
        return res.status(400).json({message: 'Por favor complete los campos'});
    }
    try{
        //Verificar si existe el usuario
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({message: 'El usuario ya esta registrado'});
        }
        //Hash de password
        const hashedPassword = await bcrypt.hash(password, 10);
        //Crear usuario
        user = new User({ name, email, username, password: hashedPassword });
        await user.save();
        //Generar token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        return res.status(201).json({ message: 'Usuario creado exitosamente', token });

    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Error al registrar usuario'});
    }
});

//Login de usuario
router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    try{
    const user = await User.findOne({username});
    if(!user || !(await bcrypt.compare(password, user.password))){
        return res.status(401).json({message: 'Credenciales incorrectas'});
    }
    //Generar token
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
    res.status(200).json({message: 'Login exitoso', token});
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Error en el servidor'});
    }
});

module.exports = router;