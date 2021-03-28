const express = require('express');
const router = express.Router();

cpf_module = require('../../services/cpf-service')

/**
 * @swagger
 * /cpf/generate:
 *  get:
 *      description: Gera um CPF válido
 *      responses:
 *          '200':
 *              description: CPF gerado com sucesso
 * 
 */
router.get('/generate',(req,res,next)=>{
    res.status(200).json({
        CPF: cpf_module.generator(1)
    });
});

/**
 * @swagger
 * /cpf/generate/{quantidade}:
 *  get:
 *      summary: Gera N CPFs válidos. 
 *      description: Gera N CPFs válidos, de acordo com a quantidade informada na URL.
 *      parameters:
 *       - in: path
 *         name: quantidade
 *         type: integer
 *         required: false
 *         description: Quantidade desejada de CPFs.
 *      responses:
 *          '200':
 *              description: CPFs gerados com sucesso
 *          '406':
 *              description: A quantidade solicitada deve ser maior que 0
 * 
 */
router.get('/generate/:qtd',(req,res,next)=>{
    const qtd = req.params.qtd;
    qtd > 0 ? (
        res.status(200).json({
            CPFs: cpf_module.generator(qtd)
        })
    ):(
        res.status(406).json({
            Mensagem: 'Informe uma quantidade maior que 0'
        })
    )
});

/**
 * @swagger
 * /cpf/validate/{cpfValidacao}:
 *  get:
 *      summary: Validação de CPF. 
 *      description: Validação do CPF informado na URL.
 *      parameters:
 *       - in: path
 *         name: cpfValidacao
 *         type: integer
 *         required: true
 *         description: CPF para validação.
 *      responses:
 *          '200':
 *              description: Retorna TRUE quando o CPF consultado é válido, e FALSE quando inválido.
 * 
 */
router.get('/validate/:cpf',(req,res,next)=>{
    const cpf = req.params.cpf;
    res.status(200).json({
        status: cpf_module.validator(cpf)
    });
});

module.exports = router;