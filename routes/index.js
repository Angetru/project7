const express = require('express');
const router = express.Router();

const userRouter = require('./userRoutes');
// const authRouter = require('./authRoutes');
const serviceRouter = require('./serviceRoutes');
const orderRouter = require('./orderRoutes');

router.use('/users', userRouter);
// router.use('/', authRouter);
router.use('/service', serviceRouter);
router.use('/oder', orderRouter);

module.exports = router;
