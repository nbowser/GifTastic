///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//                          PLEASE NOTE THE FOLLOWING
//          -Used text, ideas, and flow mainly from the working-movie-app-solved.html, pausing-gifs.html, button-triggered-ajax.html,
//           and a few other exercises.  Having difficulty adding  this stuff together.
//          -I tried many changes to fetch and post data from giphy and these 'Frankenstein' parts!

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function() {
    
    // Array of topics of interests
    var topic = ["drumming", "martial arts", "rally racing", "soccer", "stunts", "inventions", "filming", "flying machines"];
    var results = [];

       // Function for displaying movie data
    function renderButtons() {

        // deleting the gifs prior to adding new gifs
        $("#buttons", "#images").empty();

        // looping through the topic array
        for (var i = 0; i < topic.length; i++) {

            // making buttons for each item in the array
            var a = $("<button>");
            
            // adding a class to the gif button
            a.addClass("gif-btn");

            // adding a data attribute to the button
            a.attr("data-name", topic[i]);

            // providing the initial button text
            a.text(topic[i]);

            // adding the button to the buttons div
            $("#buttons").append(a);
        }
    } 



    // displayGifInfo function re-render the html to display the appropriate content
    function displayGifInfo() {

        var gif = $(this).attr("data-name");
        var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=tLWHKZmtkwLEHFUdJEfezSVCMucvzBV1&limit=10";

        // Creating an AJAX call for the specific button being clicked
        $.ajax({
           url: giphyURL,
           method: "GET"
        }).then(function(response) {
        
            // console logging to see response from giphy
        // console.log(giphyURL);
        // console.log(response);
            results = response.data;

            $("#images").empty();

            for (var i = 0; i < results.length; i++) {
            

            // creating a div to hold the gif
            var gifDiv = $("<div class='gif'>");
            
            // storing rating data
            var rating = results[i].rating;  // put data here instead of rating to view response
            
            // creating an element to display the rating
            var p= $("<p>").text("Rating; " + rating);

            // display the rating
            gifDiv.append(p);

            // retrieving the url for the image
            var imgURL = response.images;

            // creating an element to hold the image
            var image = $("<img>");
            
            image.addClass("image-gifs")
                image.attr("src", results[i].images.fixed_height_still.url);
                image.attr("data-state", "still");
                image.attr("data-position", i);
            // appending the image
            gifDiv.append(image);

            // putting the entire gif in div
            $("#images").prepend(gifDiv);
            }
        });
    }

    // Function for displaying movie data


    // this function handles event where a gif button is clicked
    $("#add-input").on("click", function(event) {
        event.preventDefault();

        // this line grabs the input from the textbox
        var userGif = $("#user-input").val().trim();

        // adding gif fro the textbox to my array
        topic.push(userGif);

        // calling renderButtons that handles the processing of our movie array
        renderButtons();
    })

    function gifSwap() {
        var state = $(this).attr("data-state");
       
        // to return a string
        var position = $(this).attr("data-position");

        // change string to integer
        postition = parseInt(position);

       console.log(results[position].images.fixed_height.url);
       console.log(position);

        if (state === "still") {
            console.log("images here");
            $(this).attr("src", results[position].images.fixed_height.url);
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", results[postition].images.fixed_height_still.url);
            $(this).attr("data-state", "still");
        }
    };

    $(document).on("click", ".image-gifs", gifSwap);

    //adding a click event listner to all elements with a class of 
    $(document).on("click", ".gif-btn", displayGifInfo);

    // calling the renderButtons function to display the intial buttons
    renderButtons();

});