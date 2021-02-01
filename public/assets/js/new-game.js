$(document).ready(function () {
    $('select').formSelect();

    $.ajax({
        type: "GET",
        url: "/api/users/"
    }).then((response) => {
        let userList = [];
        for (let i = 0; i < response.length; i++) {
            userList[i] = {
                displayName: response[i].name,
                userId: response[i].id
            }
        }
        console.log(userList);
    })
});

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