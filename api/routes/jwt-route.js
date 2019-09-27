const express = require('express');
const router = express.Router();

jwt_module = require('../../services/jwt-service')

router.get('/:jwt',(req,res,next)=>{
    const jwt = req.params.jwt
    res.status(200).json({
        Decoded:jwt_module.jwtDecode(jwt)
    });
});

module.exports = router;
