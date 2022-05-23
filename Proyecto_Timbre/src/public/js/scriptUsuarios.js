
const txtContraseña=document.getElementById("txtContraseña");
const txtUsuario =document.getElementById('txtUsuario');
const form = document.getElementById('form');
const btnEnviar=document.getElementById('btnIniciarSesion');

btnEnviar.addEventListener('click',()=>{
    txtContraseña.value=txtContraseña.value.toString();
    txtUsuario.value=txtUsuario.value.toString();
    

    if(txtContraseña.value!=''&&txtUsuario.value!=''){
        form.submit();
    }


})








