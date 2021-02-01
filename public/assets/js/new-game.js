$(document).ready(function () {
    $('select').formSelect();

    $.ajax({
        type: "GET",
        url: "/api/users/"
    }).then((response) => {
        console.log(response);
    })
})

$(".submitButton").on("click", function (e) {
    e.preventDefault();

    $.ajax({
        type: "POST",
        url: "/api/games/new",
        data: {
            gameTitle: $("#gameTitle").val(),
            published: $("#published").val(),
            gameOwner: "TBD",
            playerAge: $("#playerAge").val(),
            minPlayers: $("#minPlayers").val(),
            maxPlayers: $("#maxPlayers").val(),
            minPlayTime: $("#minPlayTime").val(),
            maxPlayTime: $("#maxPlayTime").val(),
            gameDescription: $("#gameDescription").val(),
        }
    }).then((response) => {
        console.log(response);
    })
})