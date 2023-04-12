let movieInfo = document.querySelector("#movie");
const API_KEY = "41d720cb66a9e8c5a0107c33dc1b4f32";
let movieid = 550;

let select = document.querySelector("select");

async function getTrailers(items, videos) {
  let frame = items["trailer"];
  let trailer = videos.results.filter((video) => video.type == "Trailer");
  let current = 0;
  frame.id = "frame";
  if (trailer.length) {
    let iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${trailer[0].key}`;
    iframe.style.display = "inline";
    frame.append(iframe);
    if (trailer.length > 1) {
      let right = document.createElement("h3");
      right.id = "right";
      right.style.userSelect = "none";
      right.innerText = ">";
      frame.append(right);

      let left = document.createElement("h3");
      left.innerText = "<";
      left.style.userSelect = "none";
      left.id = "left";
      frame.insertBefore(left, iframe);

      right.addEventListener("click", () => {
        current += 1;
        iframe.src = `https://www.youtube.com/embed/${trailer[current].key}`;
        if (current == trailer.length - 1) {
          right.style.visibility = "hidden";
          left.style.visibility = "visible";
          left.style.position = "relative";
        }
      });

      left.addEventListener("click", () => {
        current -= 1;
        iframe.src = `https://www.youtube.com/embed/${trailer[current].key}`;
        if (current == 0) {
          left.style.visibility = "hidden";
          left.style.position = "absolute";
          right.style.visibility = "visible";
        }
      });
    }
  } else {
    frame.remove();
  }
}

async function deletediv() {
  movieInfo.remove();
  movieInfo = document.createElement("div");
  document.body.append(movieInfo);
}

async function createDetails() {
  const items = {
    title: document.createElement("div"),
    trailer: document.createElement("div"),
    income: document.createElement("div"),
    popularity: document.createElement("h4"),
    release: document.createElement("h4"),
    duration: document.createElement("h4"),
    genres: document.createElement("div"),
    language: document.createElement("div"),
  };

  for (let item in items) {
    console.log("Appended?");
    movieInfo.appendChild(items[item]);
  }

  let info = await axios({
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${movieid}`,
    params: {
      api_key: API_KEY,
      append_to_response: "videos",
    },
  }).catch((err) => {
    console.log(err);
  });

  console.log(info);

  if (info) {
    info = info.data;
    items["income"].innerHTML = `
        <div>
            <h4>Budget</h4>
            <h4>\$${info.budget}</h4>
        </div>
        <div>
            <h4>Revenue</h4>
            <h4>\$${info.revenue}</h4>
        </div>
        <div>
            <h4>Net</h4>
            <h4>${
              info.revenue - info.budget < 0
                ? "-$" + Math.abs(info.revenue - info.budget)
                : "$" + (info.revenue - info.budget)
            }</>
        </div>
        `;
    items["income"].id = "income";
    items["title"].innerHTML = `
        <a target=_blank href="https://www.themoviedb.org/movie/${movieid}"><h3>${info.title}</h3></a>
        <a target=_blank href=${info.homepage}><h4>Website</h4></a>
        <div id="info">
            <h3 id="description">${info.overview}</h3>
            <img id="poster" src="https://image.tmdb.org/t/p/original/${info.poster_path}"></img>
        </div>
        `;

    if (document.querySelector("#website") && !info.homepage) {
      document.querySelector("#wesbite").remove();
    }
    items["popularity"].innerHTML = `Popularity <br> <br> ${Math.floor(
      info.popularity
    )} / 100`;
    items["popularity"].style.margin = "0";
    items["release"].innerHTML = `Released <br> <br> ${info.release_date}`;
    items["duration"].innerHTML = `Duration <br> <br> ${info.runtime} mins`;

    let title = document.createElement("h2");
    title.innerText = "Genres";
    items["genres"].appendChild(title);

    if (info) {
      if (info.genres) {
        for (let tag of info.genres) {
          let element = document.createElement("h5");
          element.innerText = tag.name;
          element.className = "tag";
          items["genres"].appendChild(element);
          console.log("Created");
        }
      }

      title = document.createElement("h2");
      title.innerText = "Spoken Languages";
      items["language"].appendChild(title);

      if (info.spoken_languages) {
        for (let tag of info.spoken_languages) {
          let element = document.createElement("h5");
          element.innerText = tag.name;
          element.className = "tag";
          items["language"].appendChild(element);
          console.log("Created");
        }
      }
    }

    getTrailers(items, info.videos);
  }
}

select.addEventListener("change", () => {
  movieid = select.value;
  deletediv();
  createDetails();
});

document.querySelector("button").addEventListener("click", () => {
  movieid = select.value;
  deletediv();
  createDetails();
});
