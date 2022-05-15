const reviewButton = document.querySelector("#reviewButton")
const reviewBox = document.querySelector("#reviewBox")

reviewButton.addEventListener("click", function(e){
    e.preventDefault()
    reviewBox.classList.remove("invisible")
    //reviewBox.classList.add("visible")
    

})