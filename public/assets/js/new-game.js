$(document).ready(function () {
    $('select').formSelect();
});

$(".submitButton").on("click", function (e) {
    e.preventDefault();
    const newGame = {
        gameTitle: $("#gameTitle"),
        gameOwner: "TBD",
        minPlayers: $("#minPlayers")
    }

    $.ajax({
        type: "POST",
        url: "/api/games/",
        data: newGame
    })
})