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
        url: "/api/game-description/new",
        data: {
            gameTitle: $("#gameTitle").val(),
            playerAge: $("#playerAge").val(),
            published: $("#published").val(),
            gameOwner: $("#ownerDropdown").val(),
            minPlayers: $("#minPlayers").val(),
            maxPlayers: $("#maxPlayers").val(),
            minPlayTime: $("#minPlayTime").val(),
            maxPlayTime: $("#maxPlayTime").val(),
            gameDescription: $("#gameDescription").val(),
        }
    }).then((response) => {
        window.location.href = "/";
    })
})