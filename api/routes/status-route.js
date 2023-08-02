const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /status/{statusCode}:
 *  post:
 *      description: Retorna o status code de acordo com o status informado por parâmetro.
 *      summary: Obter uma resposta de acordo com o status passado na request.
 *      parameters:
 *       - in: path
 *         name: statusCode
 *         type: integer
 *         required: true
 *         description: Status code para retornar.
 *      tags:
 *       - Status Code
 *      responses:
 *          '200':
 *              description: Retorna status code 200 se for passado 200
 *          '400': 
 *              description: Retorna status code 400 se for passado 400
 *          '500': 
 *              description: Retorna status code 500 se for passado 500
 * 
 *  get:
 *      description: Retorna o status code de acordo com o status informado por parâmetro.
 *      summary: Obter uma resposta de acordo com o status passado na request
 *      parameters:
 *       - in: path
 *         name: statusCode
 *         type: integer
 *         required: true
 *         description: Status code para retornar.
 *      tags:
 *       - Status Code
 *      responses:
 *          '200':
 *              description: Retorna status code 200 se for passado 200
 *          '400': 
 *              description: Retorna status code 400 se for passado 400
 *          '500': 
 *              description: Retorna status code 500 se for passado 500
 *  put:
 *      description: Retorna o status code de acordo com o status informado por parâmetro.
 *      summary: Obter uma resposta de acordo com o status passado na request
 *      parameters:
 *       - in: path
 *         name: statusCode
 *         type: integer
 *         required: true
 *         description: Status code para retornar.
 *      tags:
 *       - Status Code
 *      responses:
 *          '200':
 *              description: Retorna status code 200 se for passado 200
 *          '400': 
 *              description: Retorna status code 400 se for passado 400
 *          '500': 
 *              description: Retorna status code 500 se for passado 500
 *  patch:
 *      description: Retorna o status code de acordo com o status informado por parâmetro.
 *      summary: Obter uma resposta de acordo com o status passado na request
 *      parameters:
 *       - in: path
 *         name: statusCode
 *         type: integer
 *         required: true
 *         description: Status code para retornar.
 *      tags:
 *       - Status Code
 *      responses:
 *          '200':
 *              description: Retorna status code 200 se for passado 200
 *          '400': 
 *              description: Retorna status code 400 se for passado 400
 *          '500': 
 *              description: Retorna status code 500 se for passado 500
 *  delete:
 *      description: Retorna o status code de acordo com o status informado por parâmetro.
 *      summary: Obter uma resposta de acordo com o status passado na request
 *      parameters:
 *       - in: path
 *         name: statusCode
 *         type: integer
 *         required: true
 *         description: Status code para retornar.
 *      tags:
 *       - Status Code
 *      responses:
 *          '200':
 *              description: Retorna status code 200 se for passado 200
 *          '400': 
 *              description: Retorna status code 400 se for passado 400
 *          '500': 
 *              description: Retorna status code 500 se for passado 500
 */
router.all('/:statusCode',(req,res,next)=>{
    const statusCode = req.params.statusCode;
    if (isNaN(statusCode)) {
        const error = new Error('Status code inválido!');
        error.status = 400;
        next(error);
    }
    const sendResponseBody = req.query.responseBody;
    const customResponseMessage = req.query.responseMessage;
    let responseBody = null;
    if (sendResponseBody == 'true') {
        switch (statusCode) {
            case '200':
                responseBody = {'message': `${customResponseMessage ? customResponseMessage : 'Ok' }`};
                break;
            case '400':
                responseBody = {'message': `${customResponseMessage ? customResponseMessage : 'O campo é obrigatório' }`};
                break;
            case '500':
                responseBody = {'message': `${customResponseMessage ? customResponseMessage : 'Ocorreu um erro ao processar sua solicitação' }`};
                break;
            default:
                responseBody = {'message': `${customResponseMessage ? customResponseMessage : 'Não foi possível processar sua solicitação.' }`};
                break;
        }
        return res.status(statusCode).json(responseBody);        
    }
    res.status(statusCode).json();
});

module.exports = router;
