const movieInfo = document.querySelector("#movie")
const API_KEY = "41d720cb66a9e8c5a0107c33dc1b4f32"

async function getTrailers(info) {
    if (info.videos) {

    }
}

async function createDetails() {
    const items = {
        title: document.createElement("h2"),
        description: document.createElement("h3"),
        trailer:  document.createElement("iframe"),
        budget: document.createElement("h4"),
        popularity: document.createElement("h4"),
        release: document.createElement("h4"),
        duration: document.createElement("h4"),
        genres: document.createElement("div"),
    }
    
    for(let item in items) {
        console.log("Appended?")
        movieInfo.appendChild(items[item])
    }

    const info = (await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/550?api_key=${API_KEY}`,
    }).catch(err => {
        console.log(err)
    })).data

    items["budget"].innerHTML = `Budget <br> <br>\$${info.budget}`
    items["title"].innerHTML = `${info.title}`
    items["description"].innerHTML = `${info.overview}`
    items["popularity"].innerHTML = `Popularity <br> <br> ${Math.floor(info.popularity)} / 100`
    items["release"].innerHTML = `Released <br> <br> ${info.release_date}`
    items["duration"].innerHTML = `Duration <br> <br> ${info.runtime} mins`

    const title = document.createElement("h2")
    title.innerText = "Genres"
    items["genres"].appendChild(title)

    if (info && info.genres) {
        for (let tag of info.genres) {
            let element = document.createElement("h5")
            element.innerText = tag.name
            element.className = "tag"
            items["genres"].appendChild(element)
            console.log("Created")
        }
    }

    console.log(info)    

    getTrailers(info)
}


createDetails()