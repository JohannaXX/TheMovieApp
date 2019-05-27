let poster;
let title;
let year;
let type;
let imdbID;

let giphyTitle;
let url;
let videoID;
let videos;

document.getElementById('searchForm').addEventListener('submit', function search(e) {
    document.getElementById('movieList').innerHTML = "";
    document.getElementById('videoList').innerHTML = "";

    e.preventDefault();
    let searchWord = document.getElementById('searchText').value;
    
    axios.get(`https://www.omdbapi.com?s="${searchWord}"&apikey=${myomdbkey}`)
        .then((response) => {
            const results = response.data.Search;
            console.log(results);
        
            for (let i = 0; i<results.length; i++) {
                poster = results[i].Poster;
                title = results[i].Title;
                year = results[i].Year;
                type = results[i].Type;
                imdbID = results[i].imdbID;      
                
                document.getElementById('movieList').innerHTML += 
                    `<div class="movieDescription">
                            <img src="${poster}"/>
                            <div>
                                <h3>${title}</h3>
                                <div>${year}</div>
                                <div>${type}</div>
                            </div> 
                    </div>`; 

                giphyTitle = title.replace(/(:|-|'|,)/, "").toLocaleLowerCase().split(" ").join("-");
                   
                const postMovie = axios.get(`https://api.giphy.com/v1/gifs/search?q=movie-${giphyTitle}&api_key=${mygiphykey}&limit=1`)
                .then((answer) => {
                    videos = answer.data.data;
                    url = videos[0].url;
                    console.log(url);

                    videoID = url.split("-");
                    videoID = videoID[videoID.length-1];

                    document.getElementById('videoList').innerHTML += `<iframe src="https://giphy.com/embed/${videoID}" frameBorder="0" scrolling="no"></iframe>`;
                })
                .catch((err) => {
                    console.log(err);
                })    
            }
        })
        .catch((err) => {
            console.log(err);
        });
});

var myomdbkey = config.MY_OMDBKEY;
var mygiphykey = config.MY_GIPHYKEY;
