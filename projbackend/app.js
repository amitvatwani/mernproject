require('dotenv').config()

const mongoose = require('mongoose');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');


//My routes
const authRoutes = require('./routes/auth.js');
const userRoutes = require('./routes/user.js');
const categoryRoutes = require('./routes/category.js');
const productRoutes = require('./routes/product.js');
const orderRoutes = require('./routes/order.js');
const paymentBRoutes = require('./routes/paymentBRoutes.js');
const stripeRoutes = require('./routes/stripepayment.js');

//DB Connection
mongoose.connect(process.env.DATABASES, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
	}).then(() => {
			console.log("DB CONNECTED");		
	});

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//MyRoutes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", paymentBRoutes);
app.use("/api", stripeRoutes);



//Port
const port = process.env.PORT || 8000;

//Starting a server
app.listen(port, () => {
		console.log(`app is running at ${port}`);
})