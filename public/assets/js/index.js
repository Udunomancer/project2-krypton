$(document).ready(function() {
    // Reference to the search form
    const searchForm = $(".search-games")
    // Reference to the search text input
    const searchTerm = $("#search-term");
    // // Reference to the submit button
    // const searchSubmit = $("#search-submit")

    function searchGames(event) {
        event.preventDefault();

        const searchInput = {
            value: searchTerm.val().trim()
        };

        console.log(searchInput);
    }

    searchForm.on("submit", searchGames);    
})