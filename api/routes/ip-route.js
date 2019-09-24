const express = require('express');
const router = express.Router();

ip_module = require('../../services/ip-service')

router.get('/',(req,res,next)=>{
    res.status(200).json({
        status:ip_module.ipExtractor(req)
    });
});

module.exports = router;
