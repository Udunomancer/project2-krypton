$(document).ready(function () {
  // === DOM Variables ===
  // Reference to the container
  const resultsEl = $("#results-contain");
  // Reference to the search form
  const searchForm = $(".search-games");
  // === JS Variables ===
  // Getting Search Term from the URL
  const pageURL = window.location.search;
  const urlParams = new URLSearchParams(pageURL);
  let searchTerm = urlParams.get("title");
  
  // === Function Definitions ===

  function newSearch(event) {
      event.preventDefault();
      resultsEl.empty();
      searchGameDescriptions();
  }

  function searchGameDescriptions() {
    $.ajax({
      type: "GET",
      url: "/api/game-description/" + searchTerm,
    }).then((response) => {
      // <div class="card">
      // <div class="card-content">
      console.log(response);
      if(response.length < 1) {
        buildNoResults();
      }
      for (let i = 0; i < response.length; i++) {
        buildResultCard(response[i]);
      }
    });
  }

  function buildResultCard(currentResult) {
    let resultCard = $("<div>");
    resultCard.addClass("card");
    resultCard.attr("data-table-id", currentResult.id);
    let resultTitle = $("<div>");
    resultTitle.addClass("card-title");
    resultTitle.text(currentResult.gameTitle);
    resultCard.append(resultTitle);
    let resultContent = $("<div>");
    resultContent.addClass("card-content");
    resultContent.text(
      "Description: " +
        currentResult.gameDescription +
        "\n" +
        "Players: " +
        currentResult.minPlayers +
        "-" +
        currentResult.maxPlayers
    );
    resultCard.append(resultContent);
    let resultAction = $("<div>");
    resultAction.addClass("card-action");
    let resultButton = $("<button>");
    resultButton.addClass("btn waves-effect waves-light orange");
    resultButton.attr("type", "submit");
    resultButton.attr("data-value", currentResult.id);
    resultButton.text("View Game");
    resultAction.append(resultButton);
    resultCard.append(resultAction);
    resultsEl.append(resultCard);
  }

  function viewGame(event) {
      const param = event.target.dataset.value;
      window.location.href = "/game-description/" + param;
  }

  // === Function Calls ===
  searchGameDescriptions();

  // === Event Listeners ===
  searchForm.on("submit", newSearch);
  resultsEl.on("click", ".btn", viewGame);
});
