const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cpfRoutes = require('./api/routes/cpf-route');
const ipRoutes = require('./api/routes/ip-route')

app.use(morgan('dev')); //enables live reload
app.use(bodyParser.text());
app.use(bodyParser.json()); //extract json data from request body
app.use(bodyParser.urlencoded({extended:true}));

//https://enable-cors.org/server_expressjs.html
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if(req.method === 'OPTIONS'){
        //res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        res.header('Access-Control-Allow-Methods','GET');
        return res.status(200).json({});
    }
    if(req.method != ('OPTIONS' && 'GET')){
        //res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(405).json({
            message: 'Method Not Allowed'
        });
    }
    next();
});

app.use('/cpf', cpfRoutes);
app.use('/ip', ipRoutes);

app.use((req,res,next)=>{
    const error = new Error('Recurso não encontrado');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
