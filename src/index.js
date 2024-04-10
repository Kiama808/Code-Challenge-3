document.addEventListener("DOMContentLoaded", () => {
    // Selecting DOM elements
    const poster = document.getElementById("poster");
    const title = document.getElementById("title");
    const runtime = document.getElementById("runtime");
    const description = document.getElementById("film-info");
    const showtime = document.getElementById("showtime");
    const remainingTickets = document.getElementById("ticket-num");

    // Function to fetch and display details of a specific film
    function showCaseDetails(id) {
        fetch(`http://localhost:3000/films/${id}`)
        .then((response) => response.json())
        .then((data) => {
            filmDetails(data);
        })
        .catch((error) => console.error(error));
    }

    // Function to display film details
    function filmDetails(data) {
        poster.src = data.poster;
        title.textContent = data.title;
        runtime.textContent = data.runtime;
        showtime.textContent = data.showtime;
        description.textContent = data.description;
        const availableTickets = data.capacity - data.tickets_sold;
        remainingTickets.textContent = availableTickets;
    }

    // Display details of the film with ID 1
    showCaseDetails(1);

    const ul = document.getElementById("films");

    // Function to fetch and display list of films
    function moviesList(films) {
        fetch('http://localhost:3000/films')
        .then((response) => response.json())
        .then((data) => {
            data.forEach((film) => createMovieList(film));
        })
        .catch((error) => console.error(error));
    }

    // Function to create list items for each film
    function createMovieList(data) {
        const list = document.createElement("li");
        list.textContent = data.title;
        list.className = "menu";
        list.setAttribute("data-id", data.id);
        ul.appendChild(list);
    }

    // Display list of films
    moviesList();

    const buyTicketsBtn = document.getElementById("buy-ticket");

    // Event listener for buying tickets
    buyTicketsBtn.addEventListener("click", () => {
        // Call buyTickets function when the button is clicked
        buyTickets();
    });

    // Function to buy tickets
    function buyTickets() {
        fetch('http://localhost:3000/films')
        .then((response) => response.json())
        .then((data) => {
            // Logic for buying tickets goes here
            // You need to fetch availableTickets and updateTicketsSold
        })
        .catch((error) => console.error(error));
    }

    // Function to update tickets sold
    function updateTicketsSold(id, newTicketsSold) {
        fetch(`http://localhost:3000/films/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                tickets_sold: newTicketsSold,
            }),
        })
        .then(() => {
            showTicketsRemained(id);
        })
        .catch((error) => console.error(error));
    }

    // Function to display remaining tickets
    function showTicketsRemained() {
        fetch('http://localhost:3000/films')
        .then((response) => response.json())
        .then((data) => {
            remainingTickets.textContent = data.capacity - data.tickets_sold;
        })
        .catch((error) => console.error(error));
    }

    // Function to delete a film
    function deleteMovies(id) {
        return fetch(`http://localhost:3000/films/${id}`,  {
            method: "DELETE",
        })
        .then(() => {
            const list = document.getElementById(`film-${id}`);
            if (list) {
                list.remove();
            }
        });
    }

    const deleteButton = document.createElement("button");
    deleteButton.textContente = "Delete";
    deleteButton.addEventListener("click",  () => {
      deleteFilm(film.id);
    });

    // Append delete button
    list.appendChild(deleteButton);
});
