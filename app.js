const express = require('express');
const app = express();
const cors = require('cors');
const compression = require('compression')
const db = require('./models');
// const {user} = require('./models');
const { handler } = require('./utils');
const { errorHandler } = handler;
//
// db.sequelize
//     .authenticate()
//     .then(async () => {
//         console.log('db connect ok');
//         await db.sequelize.sync({force : false});
//         const rows = user.create({username : "admin", password : "111"});
//         if(rows.length !== 0) return console.log('아이디가 존재합니다.');
//     })
//     .catch(err => {
//         console.log('db' + err);
//     });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(compression());

const Router = require('./routes');
// app.use('/api/user', Router.userRouter);

app.listen(8081, () => {
    console.log('특훈 시작!')

});