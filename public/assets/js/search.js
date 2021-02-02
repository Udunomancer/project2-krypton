$(document).ready(function () {
  // === DOM Variables ===
  // Reference to the container
  const resultsEl = $("#results-contain");
  // Reference to the search items
  const searchForm = $(".search-games");
  const searchTerm = $("#search-term");
  // === JS Variables ===
  // Getting Search Term from the URL
  // const pageURL = window.location.search;
  // const urlParams = new URLSearchParams(pageURL);
  // let searchTerm = urlParams.get("title");
  
  // === Function Definitions ===

  function newSearch(event) { 
    event.preventDefault();
    let param = searchTerm.val();
    console.log(param);

    window.location.href = "search/" + param;
    
    // $.ajax("/search/" + param, {
    //   type: "GET"
    // }).then((response) => {
    //   location.reload;
    // });     
  }

  // function searchGameDescriptions() {
  //   $.ajax({
  //     type: "GET",
  //     url: "/api/game-description/" + searchTerm,
  //   }).then((response) => {
  //     // <div class="card">
  //     // <div class="card-content">
  //     console.log(response);
  //     if(response.length < 1) {
  //       buildNoResults();
  //     }
  //     for (let i = 0; i < response.length; i++) {
  //       buildResultCard(response[i]);
  //     }
  //   });
  // }

  function viewGame(event) {
      const param = event.target.dataset.value;
      console.log(param);
      window.location.href = "/game-description/" + param;
      // $.ajax("/game-description/" + param, {
      //    type: "GET"
      // }).then((response) => {
      //   console.log(response);
      // })
  }

  // === Function Calls ===
  // searchGameDescriptions();

  // === Event Listeners ===
  searchForm.on("submit", newSearch);
  resultsEl.on("click", ".btn", viewGame);
});
