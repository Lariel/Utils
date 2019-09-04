const express = require('express');
const router = express.Router();

cpf_module = require('../../services/cpf-service')

router.get('/generate',(req,res,next)=>{
    res.status(200).json({
        CPF: cpf_module.generator()
    });
});

router.get('/validate/:cpf',(req,res,next)=>{
    const cpf = req.params.cpf;
    res.status(200).json({
        status: cpf_module.validator(cpf)
    });
});

module.exports = router;