const form = document.querySelector("#movieForm")
const moviesBox = document.querySelector("#moviesBox")
const loadingDiv = document.querySelector("#loading")
const notFoundDiv = document.querySelector("#notFound")
 form.addEventListener("submit", async function (e){
 e.preventDefault()
 loadingDiv.classList.add("loading")
 const searchTerm = form.elements.movies.value
 const searchResults = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)
 
 makeImage(searchResults)
 form.elements.movies.value = ""
 form.addEventListener("change", ()=>{
    deleteShows()
    notFoundDiv.classList.add("invisible")
 })
 });

 
 const makeImage = function(searchResults){
    console.dir(searchResults)
    let everyHasNoImage = false;

    if(searchResults.data.length !=0 ){
        everyHasNoImage = searchResults.data.every( element => element.show.image == null)
        if(everyHasNoImage == false){
            for(let movies of searchResults.data){
             
                if(movies.show.image){
                    const div = document.createElement("div");
                    const img = document.createElement("img");
                    const showId = movies.show.id;
                    //showName = movies.show.name;
                    img.src= movies.show.image.medium;
                    div.classList.add("d-inline-block")
                    const linkButton = document.createElement("a")
                    linkButton.innerText = "Saiba mais"
                    linkButton.classList.add("btn","btn-secondary", "btn-sm","moviebtn", "invisible")
                    linkButton.href=`/movies/${showId}`
                
                    div.classList.add("imgcontainer",)
                    div.addEventListener("mouseover", ()=>{linkButton.classList.toggle("invisible")})
                    div.addEventListener("mouseout", ()=>{linkButton.classList.toggle("invisible")})
    
                    moviesBox.appendChild(div)
                    div.appendChild(img);
                    div.appendChild(linkButton)
                }
                
            }
        }else{
            // se tiver retorno de filme, mas não tiver imagem, remove o loading e tambem mostra o aviso
            loadingDiv.classList.remove("loading")
            notFoundDiv.classList.remove("invisible")
        }
    // Depois de carregar todos os filmes -> remove o loading
    loadingDiv.classList.remove("loading")
      
    }else{
        // Se não tiver retorno de filme algo, remove o loading e mostra o aviso
        loadingDiv.classList.remove("loading")
        notFoundDiv.classList.remove("invisible")
     
    }
    
}
 
function deleteShows(){
    const imagens = document.querySelectorAll("img")
    const divs = document.querySelectorAll(".imgcontainer")
    const btns = document.querySelectorAll(".moviebtn")
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
