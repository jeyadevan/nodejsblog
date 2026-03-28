require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const PORT = process.env.PORT || 3000;
const connectDB = require('./server/config/db');

// Connect to MongoDB
connectDB();
//Template Engine
app.set('view engine', 'ejs');
app.set('layout','layouts/main');
app.use(express.static('public'));
app.use(expressLayouts)

app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});