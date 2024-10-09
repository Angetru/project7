const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

const PORT=process.env.PORT || 3000;

//Middelware
app.use(express.json());

//Rutas
app.use('/api/auth', authRoutes);

//Conexion a BD MongoDB
mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log('Conectado a la BD'))
.catch(error => console.log(error));

app.listen(PORT, () => console.log(`Servidor corriendo en puerto: ${PORT}`));

