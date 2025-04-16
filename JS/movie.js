const button=document.querySelector("#button") //search button
const imageSection=document.querySelector("#imageSection") //movies appearing section

//adding event listner when button click
button.addEventListener("click",(e)=>{
    //preventing default refresh
    e.preventDefault()
    //getting the input value from user inputing
    let input=document.querySelector("#userInput").value
    //calling moviesearch function and passing user input
    movieSearch(input)
    
})

//arrow function search for movies using OMDb API with parameter input from user
const movieSearch = (input) => {
    //fetching the api link and inserting user input which movie to search
    fetch(`http://www.omdbapi.com/?s=${input}&apikey=7be1539e`)
         //getting response into json format
        .then(response => response.json())
        .then(json => {
            imageSection.innerHTML = ""; // clear previous search results
            //checking the result is valid
            if (json.Response === "True") {
                //Looping through each movie in the search results and creating a movie card for each
                json.Search.forEach(movie => {
                    //// Creating a div element to represent each movie's card
                    const movieCard = document.createElement("div");
                    movieCard.style.border = "1px solid "; // Adding border to the card
                    movieCard.style.padding = "10px"; // Adding space around the content inside the card
                    movieCard.style.margin = "10px"; // Adding space between the movie cards
                    movieCard.style.width = "180px"; // Setting a fixed width for the card
                    movieCard.style.color = "white" // Setting the text color to white
                    movieCard.style.display = "inline-block"; // Displaying the cards side by side
                    movieCard.style.textAlign = "center"; // Center-aligning the content inside the card

                    // Creating an image element to display the movie's poster
                    const img = document.createElement("img");
                    img.src = movie.Poster; // Setting the image source to the movie's poster URL
                    img.style.width = "100%"; // Making the image fill the width of the card
                    // Appending the image to the movie card
                    imageSection.appendChild(img);

                    // Creating an h4 element to display the movie's title
                    const title = document.createElement("h4");
                    title.textContent = movie.Title;  // Setting the title of the movie
                     

                    // Creating a paragraph element to display the movie's release year
                    const year = document.createElement("p");
                    year.textContent = "Year: " + movie.Year; // Setting the year text
                    
                     // Appending the image, title and year to the movie card
                    movieCard.appendChild(img);
                    movieCard.appendChild(title);
                    movieCard.appendChild(year);
                    // Appending the movie card (including title, year, and poster) to the imageSection div
                    imageSection.appendChild(movieCard);
                });
            } else {
                // If no movies are found, alert message
                alert("no movies found")
                //clearing input box
                document.querySelector("#userInput").value=''
                
            }
        })
        .catch(error => {
            // Catching and logging any errors that occurred during the fetch request
            console.log("Error:", error);
            // Displaying an error message if something goes wrong with the fetch request
            imageSection.innerHTML = "<p>Something went wrong. Please try again.</p>";
        });
};
   