const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cpfRoutes = require('./api/routes/cpf-route');
const ipRoutes = require('./api/routes/ip-route');
const jwtRoutes = require('./api/routes/jwt-route');
const statusRoutes = require('./api/routes/status-route');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

app.use(morgan('dev')); //enables live reload
app.use(bodyParser.text());
app.use(bodyParser.json()); //extract json data from request body
app.use(bodyParser.urlencoded({extended:true}));

const allowedMethods = 'OPTIONS,PUT,POST,PATCH,DELETE,GET';

//https://enable-cors.org/server_expressjs.html
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', allowedMethods);
        return res.status(200).json({});
    }
    if(allowedMethods.indexOf(req.method) < 0){
        res.header('Access-Control-Allow-Methods', allowedMethods);
        return res.status(405).json({
            message: 'Method Not Allowed'
        });
    }
    next();
});

// Swagger
const swaggerOptions = {
    swaggerDefinition: {
        host: 'https://api-utilities.herokuapp.com/',
        openapi: '3.0.0',
        security: [],
        info: {
            title: 'Utils',
            description: 'Utilidades para desenvolvedores e analistas de teste',
            version: 'ALFA',
            contact: {
                name: 'Lariel',
                email: 'lariel.negreiros@gmail.com',
                url: 'https://lariel.github.io/',
            },
            servers: ['http://localhost:3000']
        }
    },
    apis: ['./api/routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/cpf', cpfRoutes);
app.use('/ip', ipRoutes);
app.use('/jwt',jwtRoutes);
app.use('/status',statusRoutes);

app.use('', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

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
