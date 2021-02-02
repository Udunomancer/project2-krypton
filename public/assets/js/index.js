$(document).ready(function () {
    // Reference to the search form
    const searchForm = $(".search-games")
    // Reference to the search text input
    const searchTerm = $("#search-term");
    // // Reference to the submit button
    // const searchSubmit = $("#search-submit")

    function searchGames(event) {
        event.preventDefault();

        let URL = "/search";
        const param = encodeURI(searchTerm.val().trim());

        if (param) {
            URL = URL + "/" + param;
        }

        window.location.href = URL;
    }

    searchForm.on("submit", searchGames);
});