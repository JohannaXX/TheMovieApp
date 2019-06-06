document.getElementById('searchForm').addEventListener('submit', function search(e) {
    document.getElementById('movieList').innerHTML = "";
    document.getElementById('videoList').innerHTML = "";

    e.preventDefault();
    let searchWord = document.getElementById('searchText').value;
    
    axios.get(`https://www.omdbapi.com?s="${searchWord}"&apikey=9be27fce`)
        .then((response) => {
            const results = response.data.Search;
            console.log(results);
        
       
            for (let i = 0; i<results.length; i++) {
                let imdbID = results[i].imdbID;   

                axios.get(`https://www.omdbapi.com?i=${imdbID}&apikey=9be27fce`)
                .then((res) => {      
                    let poster = res.data.Poster;
                    let title = res.data.Title.toUpperCase();
                    let year = res.data.Year;
                    let country = res.data.Country;
                    let genre = res.data.Genre;
                    let runtime = res.data.Runtime;
                    let director = res.data.Director;
                    let actors = res.data.Actors;
                    let plot = res.data.Plot;
                      
                
                    document.getElementById('movieList').innerHTML += 
                            `<div class="movieDescription">
                                    <img src="${poster}"/>
                                    <div>
                                        <h3>${title}</h3>
                                        <h4>${year}, ${country}</h4>
                                        <h4>${genre}, ${runtime}</h4>
                                        <h4>Director: ${director}</h4>
                                        <h4>Starring: ${actors}</h4></br>
                                        <h5><i>"${plot}"</i></h5>
                                    </div> 
                            </div>`; 

                        let giphyTitle = title.replace(/(:|-|'|,)/, "").toLocaleLowerCase().split(" ").join("-");

                        const postMovie = axios.get(`https://api.giphy.com/v1/gifs/search?q=movie-${giphyTitle}&api_key=hwi9C9Fit7p3LAAcYwHpK33g4kCeowWl&limit=1`)
                            .then((answer) => {
                                let videos = answer.data.data;
                                let url = videos[0].url;
                                console.log(url);

                                let videoID = url.split("-");
                                videoID = videoID[videoID.length-1];

                                document.getElementById('videoList').innerHTML += `<iframe src="https://giphy.com/embed/${videoID}" frameBorder="0" scrolling="no"></iframe>`;
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                        
                    })
                    .catch((err) => {
                        console.log(err);
                    })  

            }
        })
        .catch((err) => {
            console.log(err);
        })
});