
// Wait for the DOM content to be fully loaded before executing the following code
document.addEventListener("DOMContentLoaded", function() {
    // Retrieve a reference to the unordered list element with the id "films"
    const filmList = document.getElementById("films");
    // Define a function to fetch movie data from the server and populate the film list
    function fetchAndPopulateFilmList() {
        // Fetch movie data from the server endpoint
        fetch("http://localhost:3000/films")
        // Parse the response as JSON
        .then(response => response.json())
        .then(data => {
            // Iterate over each movie in the fetched data
            data.forEach(movie => {
                // Create a new list item element for each movie
                const listItem = document.createElement("li");
                // Set the text content of the list item to the movie title
                listItem.textContent = movie.title;
                // Add CSS classes to the list item for styling purposes
                listItem.classList.add("film", "item");
                // Add the "sold-out" class and update text content if the movie is sold out
                if (movie.tickets_sold === movie.capacity) {
                    listItem.classList.add("sold-out");
                    listItem.textContent += " (Sold Out)";
                }
                // Add a click event listener to each list item to display movie details when clicked
                listItem.addEventListener("click", function() {
                    // Update the movie details displayed on the page
                    const image = document.getElementById("poster");
                    const description = document.getElementById("film-info");
                    const movieTitle = document.getElementById("title");
                    const runTime = document.getElementById("runtime");
                    const showTime = document.getElementById("showtime");
                    
                    image.src = movie.poster;
                    description.textContent = movie.description;
                    movieTitle.textContent = movie.title;
                    runTime.textContent = movie.runtime + " minutes";
                    showTime.textContent = movie.showtime;
                });
                // Append the list item to the unordered list
                filmList.appendChild(listItem);
            });
        })
        .catch(error => console.error("Error fetching movie data:", error));
    }
    
    // Add an event listener to the unordered list to handle clicks on film items
    filmList.addEventListener("click", function(event) {
        // If the click event occurred on a list item with class "film item"
        if (event.target && event.target.matches("li.film.item")) {
            // Retrieve the movie ID from the data attribute of the clicked list item
            const movieId = event.target.dataset.id;
            // Invoke the buyTicket() function with the retrieved movie ID
            purchaseTicket(movieId);
        }
    });

    // Remove the placeholder list item if it exists
    const placeholderLi = document.getElementById("placeholder");
    if (placeholderLi) {
        placeholderLi.remove();
    }

    // Populate the film list with movie data when the page loads
    fetchAndPopulateFilmList();
});
