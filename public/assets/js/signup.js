$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $(".sign-up");
  var nameInput = $("user-name");
  var emailInput = $("#email");
  var passwordInput = $("#password");
  

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      userName: nameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password || !userData.userName) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.userName);
    emailInput.val("");
    passwordInput.val("");
    nameInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the users page
  // Otherwise we log any errors
  function signUpUser(email, password, userName) {
    $.post("/api/signup", {
      email: email,
      password: password,
      userName: userName
    })
      .then(function(data) {
        window.location.replace("/users");
       
      })
      .catch((err) => {
        res.status(500);
      });
  }

  // function handleLoginErr(err) {
  //   $("#alert .msg").text(err.responseJSON);
  //   $("#alert").fadeIn(500);
  // }
});