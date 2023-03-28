const movieInfo = document.querySelector("#movie")

function createDetails() {
    const items = {
        genres: document.createElement("div"),
        description: document.createElement("h3"),
        title: document.createElement("h2"),
        trailer:  document.createElement("iframe"),
        budget: document.createElement("h4"),
        popularity: document.createElement("h4")  
    }
    
    for(let item in items) {
        console.log("Appended?")
        movieInfo.appendChild(items[item])
    }
}


createDetails()