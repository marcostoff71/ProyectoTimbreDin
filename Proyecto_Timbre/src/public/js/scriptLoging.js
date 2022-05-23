const btnV = document.getElementById("img-ojo");
const txtContraseña=document.getElementById("txtContraseña");
const txtUsuario =document.getElementById('txtUsuario');
        btnV.addEventListener("click",()=>{
            let type=txtContraseña.type=='password'?'text':'password';
            txtContraseña.type=type;
            // if(txtContraseña.type==='password'){
            //     txtContraseña.type="text";
            // }else{
            //     txtContraseña.type="password";
                
            // }
        })
const form = document.getElementById('form');
const btnEnviar=document.getElementById('btnIniciarSesion');

btnEnviar.addEventListener('click',()=>{
    txtContraseña.value=txtContraseña.value.toString();
    txtUsuario.value=txtUsuario.value.toString();
    


    if(txtContraseña.value!=''&&txtUsuario.value!=''){
        form.submit();
    }


})








