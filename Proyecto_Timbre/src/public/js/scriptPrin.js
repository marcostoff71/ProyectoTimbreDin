// const socket=io();
const btnTFoto=document.getElementById('btnTomarFoto');
const notification=document.getElementById('noti');

btnTFoto.addEventListener('click',(e)=>{
    socket.emit('envTomar',"tomarfoto");
});

socket.on("sonar",(data)=>{
    notification.classList.add("img-notificacion--active");
    setTimeout(()=>{
        notification.classList.remove("img-notificacion--active");
    },4000);
});
function agregarDatos(json){
    let d = new Date(json.fecha);
    let plan=`
        <tr>
            <td>${json.idImg}</td>
            <td>
                <time class="date">${regresaHora12(d)}</time>
                <time class="date">${regresaFecha(d)}</time>
            </td>
            <td>
            <img class="img-cam" src="data:image/png;base64,${json.img}" alt="imagen${json.idImg}">
            </td>
        </tr>
    `
    tableBody.innerHTML=plan+tableBody.innerHTML;
    
}
socket.on('image',(data)=>{
    let link=`${window.location.origin}/principal/primer`;

    
    fetch(link)
    .then(response=>
        response.json()
    )
    .then(response=>{
        agregarDatos(response);
    })
    .catch(err=>{
        console.log(err);
    })
});

//modales de imagenes 
const tableBody=document.getElementById("tbody");
const modal=document.getElementById("modal-container");
const modalClose=document.getElementById("close");
const modalImg=document.getElementById("modal-img");

tableBody.addEventListener('click',(e)=>{
    if(e.target.tagName=="IMG"){
        
        modalImg.src=e.target.src;
        modalImg.alt=e.target.alt;
        modal.classList.add("modal-container--active");
        modalImg.animate([
            // fotogramas clave
            { transform: 'scale(0)' },
            { transform: 'scale(1.5)' }
          ], {
            // opciones de sincronización
            duration: 200,
            iterations: 1,
            fill: 'forwards' 
          })
        modal.addEventListener("click",(e)=>{
            if(e.target.tagName!="IMG"){
                modal.classList.remove('modal-container--active');    
            }
        });
        modalClose.addEventListener('click',()=>{
            modal.classList.remove('modal-container--active');
        })
    }
});


function regresaFecha(d){
    return new Intl.DateTimeFormat('Es-es').format(d);
}
function regresaHora12(d= new Date()){
    let hh=d.getHours();
    let mm=d.getMinutes();
    let ss=d.getSeconds();
    let tiempo="AM";
    if(hh>=12){
        
        if(hh>12){
            hh-=12;
        }
        tiempo="PM";
    }else if(hh==0){
        hh=12;
    }

    return `${hh<10?"0"+hh:hh}:${mm<10?"0"+mm:mm}:${ss<10?"0"+ss:ss} ${tiempo}`
}

