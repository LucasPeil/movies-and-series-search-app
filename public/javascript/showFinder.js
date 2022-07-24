import { tns } from "./tiny-slider/src/tiny-slider.js"
const arrows = document.querySelector("#customControl")
const form = document.querySelector("#showForm")
const showsBox = document.querySelector("#showsBox")
const loadingDiv = document.querySelector("#loading")
const notFoundDiv = document.querySelector("#notFound")
let previusSearch =""
 form.addEventListener("submit", async function (e){
    e.preventDefault()
    loadingDiv.classList.add("loading")
    let searchTerm = form.elements.shows.value
    const searchResults = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)
    if(previusSearch !=searchTerm ){
      makeImage(searchResults)
      previusSearch = searchTerm
      form.addEventListener("change", ()=>{
        deleteShows()
        notFoundDiv.classList.add("invisible")
        arrows.classList.add("invisible")
       
     })
    }else{
      loadingDiv.classList.remove("loading")
    }  
 });

 
 const makeImage = function(searchResults){
  
    let noImage = false;

    if(searchResults.data.length !=0 ){
      // Se todos os filmes da API não tiverem imagem, o metodo "every" retornará true
        noImage = searchResults.data.every( element => element.show.image == null)
        if(noImage == false){ // se noImage é falso, então há filme com imagem para mostrar
            for(let shows of searchResults.data){
             
                if(shows.show.image){
                    const div = document.createElement("div");
                    const img = document.createElement("img");
                    const showId = shows.show.id;
                    
                    img.src= shows.show.image.medium;
                    img.classList.add("img-size")
                    div.classList.add("d-inline-block")
                    const linkButton = document.createElement("a")
                    linkButton.innerText = "Saiba mais"
                    linkButton.classList.add("btn","btn-dark", "btn-sm","showbtn", "invisible")
                    linkButton.href=`/${showId}`
                    div.classList.add("imgcontainer",)
                    div.addEventListener("mouseover", ()=>{linkButton.classList.toggle("invisible")})
                    div.addEventListener("mouseout", ()=>{linkButton.classList.toggle("invisible")})
    
                    showsBox.appendChild(div)
                    div.appendChild(img);
                    div.appendChild(linkButton)
                }
                
            }
        }else{
            // se tiver retorno de filme, mas não tiver imagem, remove o loading e tambem mostra o aviso
            loadingDiv.classList.remove("loading")
            
        }
    // Depois de carregar todos os filmes -> remove o loading
    loadingDiv.classList.remove("loading")
    arrows.classList.remove("invisible")
      
    }else{
        // Se não tiver retorno de filme algo, remove o loading e mostra o aviso
        loadingDiv.classList.remove("loading")
        notFoundDiv.classList.remove("invisible")

    }
    

    
showsBox.classList.add("my-slider")
var slider = tns({
    container: '.my-slider',
    items: 3,
    swipeAngle: false,
    mouseDrag: true,
    speed: 400,
    slideBy: 1,
    controlsPosition:"bottom",  
    controlsContainer:"#customControl",
    navPosition: "bottom",
    nav:false,
  
    responsive: {
      350:{
        items:1
      },
      500: { 
             
        items: 1
      },
      700: {
        gutter:15,
        items: 2
      },
             
      900: {
        gutter:15,
        items: 3
        
      }
    }
  });
}
 
function deleteShows(){
    const imagens = document.querySelectorAll("img")
    const divs = document.querySelectorAll(".imgcontainer")
    const btns = document.querySelectorAll(".showbtn")
    for(let img of imagens){
        img.remove()
        
    } 
    for(let div of divs){
        div.remove()
        
    } 
    for(let btn of btns){
        btn.remove()
        
    } 
}

//COLOCAR UM SCRIPT AQUI PRA QUANDO UM ITEM DA PÁGINA FOR EXCLUIDO
