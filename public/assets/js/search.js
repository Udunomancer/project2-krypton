$(document).ready(function() {
    // Reference to the container
    const containEl = $("#contain");
    // Getting Search Term from the URL
    const pageURL = window.location.search;
    const urlParams = new URLSearchParams(pageURL);
    let searchTerm = urlParams.get('title');

    $.ajax({
        type: "GET",
        url: "/api/games/" + searchTerm
    }).then((response) => {
        console.log(response);
    })
})