const burger = document.querySelector(".burger");
const lista = document.querySelector(".nav-list");
const body =document.getElementById("body");

burger.addEventListener("click", e => {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    burger.classList.toggle("burger--active")
    lista.classList.toggle("active")
    body.classList.toggle("body--active")
});

{
    const desplegables = document.querySelectorAll(".nav-list-drop");


    desplegables.forEach(item => {

        item.addEventListener('click', e => {

            tamanioItem(item.lastElementChild)
            item.classList.toggle("active")
        })

    })


    function tamanioItem(item) {
        let altura = item.clientHeight;

        if (altura == 0) {
            altura = item.scrollHeight;
        } else {
            altura = 0;
        }


        item.style.height = altura + "px";
    }
}



// Animacion

let ruta=`${window.location.origin}/assets/music/bell.mp3`;
const audio = new Audio(ruta);
const bellNoty= document.getElementById('nav-title');
const socket= io();

socket.on('sonar',(data)=>{
    bellNoty.classList.remove('nav-title--active');
    void bellNoty.offsetWidth;
    bellNoty.classList.add('nav-title--active');

    audio.play();
});

