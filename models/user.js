const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Por favor ingrese su nombre'],
    },
    email: {
        type: String,
        required: [true,'Por favor ingrese su mail'],
        unique: true
    },
    username: {
        type: String,
        required: [true,'Por favor ingrese su username'],
        unique: true,
    },
    password: {
        type: String,
        required: [true,'Por favor ingrese su password'],
    }
});

//Encriptar password previo registro en DB
UserSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        return next();
    }
    try{
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT || 10));
    this.password = await bcrypt.hash(this.password, salt);
    next();
    }catch(err){
        next(err);
    }
});

//Comparar password
UserSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);