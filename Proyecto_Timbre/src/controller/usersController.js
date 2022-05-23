const express = require('express');
const mysqL   = require('../models/coneMysql')
const cryp = require('crypto');
const router  = express.Router();


router.get("/:id?",(req,res)=>{
    
    if(req.params.id){

        
        mysqL.query('SELECT * FROM Usuario',(err,rowsUsers,fields)=>{
                
            if(err){
                res.status(500).send(err);
            }else{
                
                mysqL.query("SELECT * FROM Usuario WHERE idUsuario = ?",req.params.id,(err,rows)=>{

                    if(err || rows.length==0){
                        res.redirect("/usuario")
                    }else{
                        res.render('usuarios',
                        {
                            usuarios:rowsUsers,
                            usuario:rows[0]
                        }
                        );
                    }
                });
            }   
    });
        
    }else{
        mysqL.query('SELECT * FROM Usuario',(err,rows,fields)=>{
                
                if(err){
                    res.status(500).send(err);
                }else{
                    res.render('usuarios',
                    {usuarios:rows
                    })
            }
        });
    }
});

router.post("/agregar/:id?",(req,res)=>{

    let sq;
    const {nombre,contra}=req.body
    if(req.params.id){

        sq=mysqL.format(`UPDATE Usuario SET usuario = ? , contra = ? WHERE idUsuario = ? `,[nombre,contra,req.params.id]);
    }else{
        sq=mysqL.format("INSERT INTO Usuario (usuario,contra) VALUES (?,?) ",[nombre,contra]);
    }

    mysqL.query(sq,(err,rows)=>{
        if(err){
            console.log(err)
            res.redirect("/usuario");
        }else{
            res.redirect("/usuario");
        }
    })
});
router.get("/eliminar/:id",(req,res)=>{

    if(req.params.id){

        mysqL.query("DELETE FROM Usuario WHERE idUsuario = ?",req.params.id,(err,rows)=>{
            if(err){
                console.log(err)
                res.redirect('/usuario/agregar');
            }
            res.redirect('/usuario/agregar');
        });
    }else{
        res.redirect('/usuario/agregar');

    }
});







module.exports=router;