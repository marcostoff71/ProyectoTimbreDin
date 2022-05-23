const express = require('express');
const morgan  = require('morgan');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');
const cooki = require('cookie-parser');
const mysql = require('./coneMysql')

//controladores
const loginC = require("../controller/loginController");
const usersC = require("../controller/usersController");
const prinC = require("../controller/prinController");

class Server{

    constructor(){
        this.app=express()
        this.server=http.createServer(this.app);
        this.io=socketIO(this.server,{
            cors:{
                origin:"*"
            }
        });
        
        
        this.app.set("PORT",process.env.PORT||3000);
        this.middlewares();
        this.router();
        this.listen();
        this.socket();
    }


    middlewares(){
        this.app.use(morgan('dev'));

        
        const ruta=path.join("src","public");

        this.app.use(express.static(ruta));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));
        this.app.use(cooki());

        // Se indica el directorio donde se almacenarán las plantillas 
        this.app.set('views', 'src/views');

        // Se indica el motor del plantillas a utilizar
        this.app.set('view engine', 'pug');
    }

    router(){
        this.app.use("/",loginC);
        this.app.use("/usuario",usersC);
        this.app.use("/principal",prinC);
    }
    listen(){
        this.server.listen(this.app.get("PORT"),()=>{
            console.log(`Servidor iniciado en el puerto ${this.app.get("PORT")}`);
        });
    }
    socket(){
        
        this.io.on('connection',(socket)=>{
            console.log(`Cliente socket conectado con id: ${socket.id}`)

            socket.on('image',(data)=>{
                
                const {fecha=new Date(),img,estado}=data;
                let quer=mysql.format('insert into RegistroImg (fecha,img,estado) values(?) ',[[fecha,img,estado]]);

                mysql.query(quer,(err,rows)=>{

                    if(err){
                        console.log(err);
                    }else{ 
                        console.log("Insertado correctamente");
                        if(estado=="BTN"){
                            
                            this.io.sockets.emit('sonar',"sonar");
                            
                        }
                        this.io.sockets.emit('image',"Cargar");
                    }
                });
            });
            socket.on('envTomar',(data)=>{
                this.io.sockets.emit('envTomarF',data);
                // this.io.sockets.emit('sonar',"sonar");
            });
        });
    }


}
module.exports=Server;