const express = require('express');
const router = express.Router();

cpf_module = require('../../services/cpf-service')

router.get('/generate',(req,res,next)=>{
    res.status(200).json({
        CPF: cpf_module.generator(1)
    });
});

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

router.get('/validate/:cpf',(req,res,next)=>{
    const cpf = req.params.cpf;
    res.status(200).json({
        status: cpf_module.validator(cpf)
    });
});

module.exports = router;