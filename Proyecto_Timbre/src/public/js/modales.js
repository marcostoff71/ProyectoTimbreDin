const modales=document.querySelectorAll(".modal-container");
modales.forEach(item=>{
    item.lastElementChild.addEventListener('click',()=>{
        item.style.display='none';
    })
});


function regresaHora12(d= new Date()){
    let hh=d.getHours();
    let mm=d.getMinutes();
    let ss=d.getSeconds();
    let tiempo="AM";
    if(hh>=12){
        hh=hh-12;
        if(hh==0){
            hh=1;
        }
        tiempo="PM";
    }

    return `${hh<10?"0"+hh:hh}:${mm<10?"0"+mm:mm}:${ss<10?"0"+ss:ss} ${tiempo}`

}