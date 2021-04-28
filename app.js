const express = require('express');
const app = express();
const cors = require('cors');
const compression = require('compression')
const db = require('./models');
const logger = require('morgan');
const {Keyword} = require('./models');

db.sequelize
    .authenticate()
    .then(async () => {
    try{    
        console.log('db connect ok');
        await db.sequelize.sync({force : false});
        await Keyword.findOrCreate({
            where : {
                idx : 1,
            },
            defaults : {
                keywords : "",
            },
        });
    } catch(err) {
        console.log('db' + err);
    }
    });

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(compression());

const Router = require('./routes');
app.get('/', (req,res) => {
    res.send('1');
})
app.use('/api/search', Router.searchRouter);

app.listen(8081, () => {
    console.log('특훈 시작!')

});