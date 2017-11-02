var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require("fs")

var getMyTweets = function() {

    var client = new Twitter(keys.twitterKeys);

    var params = { screen_name: "Alicewanderland" };
    client.get("statuses/user_timeline", params, function(error, tweets, response) {

        if (!error) {
            // console.log(tweets);
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log(" ");
                console.log(tweets[i].text);

            }
            // close of for loop
        }
        // close of if statement
    });
    // close of function
}
// close of var getMytweets


var spotify = new Spotify(keys.spotifyKeys);

var getMeSpotify = function(songName) {

    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var songs = data.tracks.items;
        var artists = []

        for (var i = 0; i < songs.length; i++) {
            var artists = []
            songs[i].artists.map(function(artist) {
                artists.push(artist.name);
            });
            console.log(i);
            console.log("artist(s): " + artists);
            console.log("song name: " + songs[i].name);
            console.log("preview song:  " + songs[i].preview_url);
            console.log("album: " + songs[i].album.name);
            console.log("-----------------------------------------------------");
        }
        // close of error if
    });
    // close of spotify search function
}
// close of getMeSpotify function
var getMeMovie = function(movieName) {

    request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {
        if (!error && response.statusCode == 200) {

            var jsonData = JSON.parse(body);

            console.log("Title: " + jsonData.Title);
            console.log("Year: " + jsonData.Year);
            console.log("Rated: " + jsonData.Rated);
            console.log("IMDB Rating: " + jsonData.imdbRating);
            console.log("Country: " + jsonData.Country);
            console.log("Language: " + jsonData.Language);
            console.log("Plot: " + jsonData.Plot);
            console.log("Actors: " + jsonData.Actors);
            console.log("Rotten tomatoes rating: " + jsonData.tomatoRating);
            console.log("Rotten tomatoes URL: " + jsonData.tomatoURL);
        }
    })
}
// var doWhatItSays = function() {
//     fs.readFile('random.txt', 'utf8', function(err, data) {
//         if (err) throw err;
        
//         var dataArr = data.split(",");
//         if (dataArr.length == 2) {
//         	runThis(dataArr[0], dataArr[1]);
//         } else if (dataArr.length ==1) {
//         	runThis(dataArr[0]);
//         }
//     });
// }
var runThis = function(argOne, argTwo) {
    // pick(argOne, argTwo);
    switch (argOne) {
        case "my-tweets":
            getMyTweets();
            break;
        case "spotify-this-song":
            getMeSpotify(argTwo);
            break;
        case "movie-this":
            getMeMovie(argTwo)
        // case "do-what-it-says":
        // 	doWhatItSays(argTwo)
        default:
            console.log("LIRI does not know that");
    }
};

runThis(process.argv[2], process.argv[3]);