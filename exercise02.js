/***
 * # Exercise 2
 *
 * **Part 1:**
 * Make a form with at least two fields and a submit button.
 * When the form is submitted, send the data to create a new user in the reqres api.
 * When the submission is complete, display a success message.
 *
 * **Part 2:**
 * Add an if statement. If the user id is higher than 500, throw an error.
 * Display the error message to the user, and do not display a success message.
 *
 * Tips:
 * - `event.preventDefault()`
 * - `throw new Error("...")`
 * - `.catch()`
 */

const form = document.querySelector("#form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const firstName = document.querySelector("#first-name");
    const lastName = document.querySelector("#last-name");

    const message = document.querySelector("#message");

    const data = {
        first_name: firstName.value,
        last_name: lastName.value
    }

    form.reset();

    fetch("https://reqres.in/api/users/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(user => {
            console.log(user);

            if (user.id > 500) {
                throw new Error("The user can not be created. Please, try again!")
            }

            message.classList.remove("error");
            message.classList.add("success");
            message.textContent = "The user has been created successfully!";
            firstName.focus();
        })
        .catch(err => {
            console.error(err);

            message.classList.remove("success");
            message.classList.add("error");
            message.textContent = err;
            firstName.focus();
        });
});