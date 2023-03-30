let movieInfo = document.querySelector("#movie")
const API_KEY = "41d720cb66a9e8c5a0107c33dc1b4f32"
let movieid = 550

let select = document.querySelector("select")

async function getTrailers(frame) {
    let videos = await axios({
        url: `https://api.themoviedb.org/3/movie/${movieid}/videos`,
        params: {
            api_key: API_KEY
        }
    }).catch(err => {
        console.log(err)
    })
    let trailer = videos.data.results.filter(video => video.type == "Trailer")
    let current = 0
    frame.style.display = "flex"
    frame.style.flexDirection = "row"
    frame.style.alignItems = "center"
    frame.style.gap = "1rem"
    if (trailer.length) {
        let iframe = document.createElement("iframe")
        iframe.src = `https://www.youtube.com/embed/${trailer[0].key}`
        iframe.style.display = "inline"
        frame.append(iframe)
        if (trailer.length > 1) {
            let right = document.createElement("h3")
            right.style.display = "inline"
            right.style.userSelect = "none"
            right.innerText = ">"
            frame.append(right)

            let left = document.createElement("h3")
            left.style.display = "inline"
            left.style.userSelect = "none"
            left.innerText = "<"
            left.style.visibility = "hidden"
            left.style.position = "absolute"
            frame.insertBefore(left, iframe)

            right.addEventListener("click", () => {
                current += 1
                iframe.src = `https://www.youtube.com/embed/${trailer[current].key}`
                if (current == trailer.length - 1) {
                    right.style.visibility = "hidden"
                    left.style.visibility = "visible"
                    left.style.position = "relative"
                }
            })

            left.addEventListener("click", () => {
                current -= 1
                iframe.src = `https://www.youtube.com/embed/${trailer[current].key}`
                if (current == 0) {
                    left.style.visibility = "hidden"
                    left.style.position = "absolute"
                    right.style.visibility = "visible"
                }
            })
        }
    }
}

async function deletediv(){
    movieInfo.remove();
    movieInfo = document.createElement("div");
    document.body.append(movieInfo)
}

async function createDetails() {
    const items = {
        title: document.createElement("h2"),
        description: document.createElement("h3"),
        trailer:  document.createElement("div"),
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

    let info = (await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/${movieid}`,
        params: {
            api_key: API_KEY
        }
    }).catch(err => {
        console.log(err)
    }))

    if (info) {
        info = info.data 
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

        getTrailers(items["trailer"])
    }
}

select.addEventListener("change", () => {
    movieid = select.value
    deletediv()
    createDetails()
})

document.querySelector("button").addEventListener("click", () => {
    movieid = select.value
    deletediv()
    createDetails()
})