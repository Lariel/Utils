const express = require('express');
const router = express.Router();

ip_module = require('../../services/ip-service')

/**
 * @swagger
 * /ip:
 *  get:
 *      description: Retorna o endereço IP público com base no header X-Forwarded-For.
 *      responses:
 *          '200':
 *              description: 
 * 
 */
router.get('/',(req,res,next)=>{
    res.status(200).json({
        IP:ip_module.ipExtractor(req)
    });
});

module.exports = router;
