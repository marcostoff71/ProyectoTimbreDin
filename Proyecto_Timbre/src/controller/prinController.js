const express = require('express');
const mysqL   = require('../models/coneMysql')
const {Buffer} = require('buffer');
const router  = express.Router();

router.get("/",(req,res)=>{
    mysqL.query("SELECT * FROM `registroimg` ORDER BY idImg DESC",(err,rows)=>{

        if(err){
            res.status(404).send("Error");
        }else{
            res.render('principal',{datos:rows});
        }
    });
});
router.get("/primer",(req,res)=>{
    mysqL.query("SELECT * FROM RegistroImg order by idImg desc limit 1;",(err,rows)=>{
        if(err){
            res.status(404).send("Error");
        }else{
            if(rows.length>0){
                let primer=rows[0];

                let regre={
                    "idImg":primer.idImg,
                    "fecha":primer.fecha,
                    "img":Buffer.from(primer.img).toString()
                } 

                
                res.json(regre);
            }else{
                res.status(404).send("Error");
            }
        }4
    });
});

module.exports=router;