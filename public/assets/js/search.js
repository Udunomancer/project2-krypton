$(document).ready(function() {
    // Reference to the container
    const resultsEl = $("#results-contain");
    // Getting Search Term from the URL
    const pageURL = window.location.search;
    const urlParams = new URLSearchParams(pageURL);
    let searchTerm = urlParams.get('title');

    searchGameDescriptions();

    function searchGameDescriptions() {
        $.ajax({
            type: "GET",
            url: "/api/game-description/" + searchTerm
        }).then((response) => {
            // <div class="card">
            // <div class="card-content">
            console.log(response);
            for (let i = 0; i < response.length; i++) {
                let resultCard = $("<div>");
                resultCard.addClass("card");
                let resultTitle = $("<div>");
                resultTitle.addClass("card-title");
                resultTitle.text(response[i].gameTitle);
                resultCard.append(resultTitle);
                let resultContent = $("<div>");
                resultContent.addClass("card-content");
                resultContent.text(
                    "Description: " + response[i].gameDescription + "\n" +
                    "Players: " + response[i].minPlayers + "-" + 
                    response[i].maxPlayers
                );
                resultCard.append(resultContent);
                resultsEl.append(resultCard);
            }
        })
    }
})