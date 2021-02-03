$(document).ready(function() {
    $('.modal').modal();
    $('select').formSelect();
    const addCopyFormEl = $("#add-copy-form");
    const ownerValueEl = $("#ownerDropdown");
    const submitEl = $("#submit");


    function addNewCopy(event) {
        event.preventDefault();

        $.ajax({
            type: "POST",
            url: "/api/games/new",
            data: {
                GameDescriptionId: submitEl.attr("data-value"),
                UserId: ownerValueEl.val()
            }
        }).then((response) => {
            window.location.href = "/games";
        });
    }

    submitEl.on("click", addNewCopy);
    // $('#copy').on("click", function (event) {
    //     $.ajax("/api/user", {
    //         type: "GET"
    //     }).then((response) => {
    //         for(let i = 0; i < response.length; i++) {
    //             let userOption = $("<option>");
    //             userOption.attr("data-value", response[i].id);
    //             userOption.text(response[i].name);
    //             ownerDropdown.append(userOption);
    //         }
    //         console.log(response);
    //     })
    // })
})