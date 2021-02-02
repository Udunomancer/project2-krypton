$(document).ready(function () {
    $('select').formSelect();
});

$(".submitButton").on("click", function (e) {
    e.preventDefault();

    $.ajax({
        type: "POST",
        url: "/api/game-description/new",
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