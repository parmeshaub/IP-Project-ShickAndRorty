// Add an event listener to the login form
document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // prevent the form from submitting normally

    // Get the values of the email and password fields
    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;

    // TODO: Validate the email and password (e.g. check if they are not empty)

    // Make an AJAX request to authenticate the user
    const settings = {
      async: true,
      crossDomain: true,
      url:
        'https://shickandrortyip-5d89.restdb.io/rest/contacts?q={"email":"' +
        email +
        '","password":"' +
        password +
        '"}',
      method: "GET",
      headers: {
        "content-type": "application/json",
        "x-apikey": "63ea5fa3478852088da681b6",
        "cache-control": "no-cache",
      },
    };

    $.ajax(settings).done(function (response) {
      if (response.length > 0) {
        // Login was successful
        window.location.href = "home.html"; // Redirect to success page
        console.log("Success");
      } else {
        // Login was unsuccessful
        alert("Invalid email or password. Please try again.");
      }
    });
  });

// Add an event listener to the registration form
document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // prevent the form from submitting normally

    // Get the values of the username, email, and password fields
    const username = document.querySelector(
      '#registerForm input[name="username"]'
    ).value;
    const email = document.querySelector(
      '#registerForm input[type="email"]'
    ).value;
    const password = document.querySelector(
      '#registerForm input[type="password"]'
    ).value;

    // TODO: Validate the username, email, and password (e.g. check if they are not empty)

    // Create a new contact object to represent the user
    const contact = {
      username: username,
      email: email,
      password: password,
    };

    // Make an AJAX request to create a new contact (i.e. register the user)
    const settings = {
      async: true,
      crossDomain: true,
      url: "https://shickandrortyip-5d89.restdb.io/rest/contacts",
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-apikey": "<63ea5fa3478852088da681b6>",
        "cache-control": "no-cache",
      },
      processData: false,
      data: JSON.stringify(contact),
    };

    $.ajax(settings).done(function (response) {
      // Registration was successful
      window.location.href = "home.html"; // Redirect to success page
    });
  });
