const express = require('express');
const mysqL   = require('../models/coneMysql')
const cryp = require('crypto');
const router  = express.Router();



router.get("/",(req,res)=>{
    res.render('login');
})
router.post("/login",(req,res)=>{
    const {nombre , contra} = req.body;
    let sq = mysqL.format("SELECT * FROM Usuario WHERE usuario = ? AND contra = ? ",[nombre,contra]);
    mysqL.query(sq,(err,rows,fields)=>{

        if(err)
            res.send("Error");
        else if(rows.length>0){
            res.redirect('/principal')
        }else{
            res.render('login',{err:"err"});  
        }
      
    })
})


module.exports=router;
