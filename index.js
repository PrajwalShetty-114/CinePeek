import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';


const server = express();
const port = 3000;
const imageUrl = "https://image.tmdb.org/t/p/original";

server.use(express.static("public"));

const $movies = fs.readFileSync("./Movies.json", "utf-8");
const $tvShows = fs.readFileSync("./TvShows.json", "utf-8");

const movies = JSON.parse($movies);
const tvShows = JSON.parse($tvShows)

const optionsProvided = 2;

const movieUrl = "https://api.themoviedb.org/3/discover/movie";
const tvUrl = "https://api.themoviedb.org/3/discover/tv";


const movieArraySize = movies.length;
const tvArraySize = tvShows.length;

function combined(movies, tvShows) {
    const moviesAndTvShows = [];
    const combined = [movies, tvShows];
    if (movies.length === tvShows.length) {

        for (let index = 0; index < combined.length; index++) {
            for (let innerIndex = 0; innerIndex < combined[index].length; innerIndex++) {
                let element = combined[index];
                moviesAndTvShows.push(element[innerIndex]);
            }
        }
    }

    return moviesAndTvShows;
}

function genreID(Genre) {
    let id;
    switch (Genre) {
        case "Action":
            id = 28;
            break;

        case "Adventure":
            id = 12;
            break;

        case "Animation":
            id = 16;
            break;

        case "Comedy":
            id = 35;
            break;

        case "Crime":
            id = 80;
            break;

        case "Documentary":
            id = 99;
            break;

        case "Drama":
            id = 18;
            break;

        case "Family":
            id = 10751;
            break;

        case "Fantasy":
            id = 14;
            break;

        case "History":
            id = 36;
            break;

        case "Horror":
            id = 27;
            break;

        case "Music":
            id = 10402;
            break;

        case "Mystery":
            id = 9648;
            break;

        case "Romance":
            id = 10749;
            break;

        case "Science Fiction":
            id = 878;
            break;

        case "TV Movie":
            id = 10770;
            break;

        case "Thriller":
            id = 53;
            break;

        case "War":
            id = 10752;
            break;

        case "Western":
            id = 37;
            break;
        case "Action&Adventure":
            id = 10759;
            break;
        case "Kids":
            id = 10762;
            break;
        case "News":
            id = 10763;
            break;
        case "Reality":
            id = 10764;
            break;
        case "Sci-Fi&Fantasy":
            id = 10765;
            break;
        case "Soap":
            id = 10766;
            break;
        case "Talk":
            id = 10767;
            break;
        case "War&Politics":
            id = 10768;
            break;
        default:
            console.log("Invalid Genre");
            break;

    }

    return id;
}


function genreDetector(id, movies, arraySize) {
    let listOfDataForGenre = [];
    let listOfIds;
    let count = 0;

    for (let index = 0; index < arraySize; index++) {
        listOfIds = movies[index].genre_ids;
        let i = 0;
        while (i < listOfIds.length) {
            if (listOfIds[i] === id) {
                listOfDataForGenre[count++] = movies[index];
            }
            i++;
        }

    }

    return listOfDataForGenre;
}

function languageDetector(lang, movies, arraySize) {
    let listOfDataForLanguge = [];
    let listOfLanguge, count = 0;
    console.log(`Function 3 Executed\n\n\n`);
    for (let index = 0; index < arraySize; index++) {
        listOfLanguge = movies[index].original_language;

        if (listOfLanguge === lang) {
            listOfDataForLanguge[count++] = movies[index];
        }
    }

    return listOfDataForLanguge;
}


let combinedTypes = combined(movies, tvShows);
let combinedMovies = [movies, tvShows];

function discover(result, genreList, languageList) {

    let movieIdForGenreList = [];
    let movieIdForLanguageList = [];
    let matchedId = [];
    let count = 0;
    let discoveredMovies = [];

    try {

        for (let index = 0; index < genreList.length; index++) {
            movieIdForGenreList[index] = genreList[index].id;
        }
        for (let index = 0; index < languageList.length; index++) {
            movieIdForLanguageList[index] = languageList[index].id;
        }
        let combinedTypes = [movieIdForGenreList, movieIdForLanguageList];
        let anotherArray = [];

        for (let index = 0; index < combinedTypes.length; index++) {

            let partOfCombinedArray = combinedTypes[index];
            for (let secondIndex = 0; secondIndex < combinedTypes[index].length; secondIndex++) {
                anotherArray[count++] = partOfCombinedArray[secondIndex];
            }

        }


        let counter = 0;
        for (let index = 0; index < anotherArray.length; index++) {
            const element = anotherArray[index];

            for (let innerIndex = 0; innerIndex < anotherArray.length; innerIndex++) {

                if (index === innerIndex) {
                    continue;
                }
                else if (element === anotherArray[innerIndex]) {
                    if (!matchedId.includes(element)) {
                        matchedId[counter++] = element;
                    }
                }
            }
        }

        let mostMatchedData = [];
        let lessMatchedData = [];

        for (let index = 0; index < matchedId.length; index++) {
            const element = matchedId[index];
            for (let innerIndex = 0; innerIndex < result.length; innerIndex++) {
                if (element === result[innerIndex].id) {
                    mostMatchedData.push(result[innerIndex]);
                }
            }
        }

        for (let index = 0; index < anotherArray.length; index++) {
            const element = anotherArray[index];
            for (let innerIndex = 0; innerIndex < result.length; innerIndex++) {
                if (element === result[innerIndex].id) {
                    if (!lessMatchedData.includes(result[innerIndex])) {
                        lessMatchedData.push(result[innerIndex]);
                    }
                }
            }
        }

        if (mostMatchedData.length != 0) {
            discoveredMovies = mostMatchedData;
        } else {
            discoveredMovies = lessMatchedData;
        }

        return discoveredMovies;

    } catch (error) {
        console.log(`The error is ${error}`);
    }
}

function randomPicks(combinedMovies, media) {

    let random = [];
    if (media === "movies") {
        let Movie = combinedMovies[0];
        while (random.length < 10) {
            let randomNumber = Math.floor(Math.random() * Movie.length);
            if (!random.includes(Movie[randomNumber])) {
                random.push(Movie[randomNumber]);
            }
        }

    } else if (media === "tvShows") {
        let Shows = combinedMovies[1];
        while (random.length < 10) {
            let randomNumber = Math.floor(Math.random() * Shows.length);
            if (!random.includes(Shows[randomNumber])) {
                random.push(Shows[randomNumber]);
            }
        }
    }
    return random;
}

function randomSuggestions(combinedTypes) {

    let randomLength = Math.floor((Math.random() * 5) + 5);
    let randomMovies = [];
    while (randomMovies.length < randomLength) {
        let randomNumber = Math.floor(Math.random() * combinedTypes.length);
        if (!randomMovies.includes(combinedTypes[randomNumber])) {
            randomMovies.push(combinedTypes[randomNumber]);
        }
    }
    return randomMovies;
}


dotenv.config();


server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));

// const URL = "https://api.themoviedb.org/3";
const Key = process.env.API_KEY;
const Host = process.env.API_HOST;
const Auth = process.env.AUTH_KEY;

const config = {
    headers: {
        accept: Host,
        Authorization: `Bearer ${Auth}`
    }
};

server.get("/", async (req, res) => {

    try {
        res.render("index.ejs");
    } catch (error) {
        console.log("This is the error appeared --> " + error.message);
    }

});


server.post("/submit", async (req, res) => {
    let Genre = req.body.genre;
    let media = req.body.media;
    let lang = req.body.language;

    try {
        if (media === "movies") {
            let response = await axios.get(`${movieUrl}?api_key=${Key}`, { timeout: 5000 });
            console.log("Success!");

            let Data = response.data;
            let array = Data.results;
            let size = array.length;

            let genreList = genreDetector(genreID(Genre), array, size);
            let languageList = languageDetector(lang, array, size);

            let Item = discover(array, genreList, languageList);

            let randomMovie = randomPicks(combinedMovies, media);


            fs.writeFileSync('items.json', JSON.stringify(Item), 'utf8');
            fs.writeFileSync('RandomMovie.json', JSON.stringify(randomMovie), 'utf8');
            res.render("discover.ejs", {
                Items: Item,
                RandomMovie: randomMovie,
                image: imageUrl
            });

        } else {
            let response = await axios.get(`${tvUrl}?api_key=${Key}`, { timeout: 5000 });
            console.log("Success!");

            let Data = response.data;
            let array = Data.results;
            let size = array.length;

            let genreList = genreDetector(genreID(Genre), array, size);
            let languageList = languageDetector(lang, array, size);

            let Item = discover(array, genreList, languageList);
            let randomMovie = randomPicks(combinedMovies, media);

            fs.writeFileSync('items.json', JSON.stringify(Item), 'utf8');
            fs.writeFileSync('RandomMovie.json', JSON.stringify(randomMovie), 'utf8');

            res.render("discover.ejs", {
                Items: Item,
                RandomMovie: randomMovie,
                image: imageUrl
            });
        }
    } catch (error) {


        if (media === "movies") {

            let genreList = genreDetector(genreID(Genre), movies, movieArraySize);
            let languageList = languageDetector(lang, movies, movieArraySize);

            let Item = discover(movies, genreList, languageList);
            console.log(`Discovered items are ${Item.length}`);

            let randomMovie = randomPicks(combinedMovies, media);
            fs.writeFileSync('items.json', JSON.stringify(Item), 'utf8');
            fs.writeFileSync('RandomMovie.json', JSON.stringify(randomMovie), 'utf8');

            res.render("discover.ejs", {
                Items: Item,
                RandomMovie: randomMovie,
                image: imageUrl
            });
        } else {

            let genreList = genreDetector(genreID(Genre), tvShows, tvArraySize);
            let languageList = languageDetector(lang, tvShows, tvArraySize);

            let Item = discover(tvShows, genreList, languageList);
            let randomMovie = randomPicks(combinedMovies, media);

            fs.writeFileSync('items.json', JSON.stringify(Item), 'utf8');
            fs.writeFileSync('RandomMovie.json', JSON.stringify(randomMovie), 'utf8');
            res.render("discover.ejs", {
                Items: Item,
                RandomMovie: randomMovie,
                image: imageUrl
            });
        }
        console.log("Error is -> " + error.message);
    }

});


server.get("/random", (req, res) => {
    let random = randomSuggestions(combinedTypes);
    res.render("randomPick.ejs", {
        Random: random,
        image: imageUrl
    })
});


server.post("/send", (req, res) => {
    let data = req.body;
    // console.log("\ndata is\n");
    // console.log('data is \n', data);

    let Item = [];
    let randomMovie = [];

    try {
        let items = fs.readFileSync('items.json', 'utf8');
        Item = JSON.parse(items);
        // console.log("\nitems are");

        let RandomMovie = fs.readFileSync('RandomMovie.json', 'utf8');
        randomMovie = JSON.parse(RandomMovie);
    } catch (error) {
        console.log(error.message);
    }

    const allMoviesData = [...Item, ...randomMovie];
    const watchList = fs.readFileSync('watchList.json', 'utf8');
    const watchListMovieData = JSON.parse(watchList);
    const selectedIds = (data.selectedIds || []).map(id => parseInt(id, 10));

    for (const id of selectedIds) {
        // Find the first movie in the combined list that matches the ID
        const movieToAdd = allMoviesData.find(movie => movie.id === id);

        if (movieToAdd) {
            // Check if a movie with this ID is already in our watchlist to prevent duplicates
            const isDuplicate = watchListMovieData.some(movie => movie.id === id);
            if (!isDuplicate) {
                watchListMovieData.push(movieToAdd);
            }
        }
    }

    console.log("\nWatchlist are");
    console.log(watchListMovieData);
    fs.writeFileSync('watchList.json', JSON.stringify(watchListMovieData));

    // Redirect the user to the watchlist page after adding items.
    // This is important to prevent the request from hanging.
    res.redirect('/watchlist');
});


server.get("/watchlist", (req, res) => {
    let watchList = fs.readFileSync('watchList.json', 'utf8');

    res.render("watchList.ejs", {
        WatchList: JSON.parse(watchList),
        image: imageUrl
    });
});

server.post("/remove", (req, res) => {
    let data = req.body;

    let removedIds = data.selectedIds;
    console.log("Data is\n", removedIds);
    try {
        let watchLists = fs.readFileSync('watchList.json', 'utf8');
        let watchList = JSON.parse(watchLists);
        for (let index = 0; index < watchList.length; index++) {
            for (let innerIndex = 0; innerIndex < removedIds.length; innerIndex++) {
                const Id = removedIds[innerIndex];
                if (Id == watchList[index].id) {
                    watchList.splice(index, 1);
                }
            }
        }
        fs.writeFileSync('watchList.json', JSON.stringify(watchList));
        res.redirect('/watchlist');
    } catch (error) {
        console.log("The error is " + error.message);
    }
});


server.listen(port, () => {
    console.log(`Server Runnning on Port ${port}`);
});
