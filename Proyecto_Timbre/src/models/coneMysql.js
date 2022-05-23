const mysql = require('mysql');
const cone=mysql.createConnection({
    host:'localhost',
    port:3306,
    database:'dbdindong',
    user:'root',
    password:''
});


cone.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("La conexion ha sido exitosa");
    }
});
module.exports=cone;