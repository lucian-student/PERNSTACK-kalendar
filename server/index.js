
const express = require('express');
const app = express();
const cors = require('cors');
const server = require('http').createServer(app);
const cookieParser = require('cookie-parser');
//midelware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use('/users', require('./apis/users'));
app.use('/token', require('./apis/token'));
app.use('/activitys', require('./apis/activitys'));
app.use('/user_activitys', require('./apis/user_activitys'));
app.use('/query_activitys', require('./apis/actvity_queries'));
//get

//post

//put

//delete

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on PORT ${PORT} 🔥`));