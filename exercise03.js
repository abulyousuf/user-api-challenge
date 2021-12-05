/***
 * # Exercise 3:
 * **Part 1:**
 * Display all the users below your form.
 *
 * **Part 2:**
 * When you submit the form, add your user to the HTML at the top of the list.
 *
 * Tips:
 * - [Element.insertAdjacentHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML#syntax)
 *
 * **Part 3:**
 * **Part A:**
 * Make a button that will get the next page of reqres users and display them in the HTML.
 *
 * **Part B:**
 * If the `total_pages` value is lower than the next page, disable the button.
 */

let currentPage = 0;
let totalPages = 0;

const form = document.querySelector("#form");
const usersList = document.querySelector("#users-list");

const message = document.querySelector("#message");

const prevPageBtn = document.querySelector("#prev-page-btn");
const nextPageBtn = document.querySelector("#next-page-btn");

const renderPage = users => {
    usersList.textContent = "";
    message.textContent = "";
    message.classList.remove("success");
    message.classList.remove("error");

    for (const user of users.data) {
        const liElement = document.createElement("li");
        liElement.textContent = `Name: ${user.first_name} ${user.last_name}, Email: ${user.email}`;
        usersList.appendChild(liElement);
    }
};

fetch("https://reqres.in/api/users/")
    .then(res => res.json())
    .then(users => {
        currentPage = users.page;
        totalPages = users.total_pages;

        prevPageBtn.disabled = true;

        for (const user of users.data) {
            const liElement = document.createElement("li");
            liElement.textContent = `Name: ${user.first_name} ${user.last_name}, Email: ${user.email}`;
            usersList.appendChild(liElement);
        }
    })
    .catch(err => console.error(err));

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const firstName = document.querySelector("#first-name");
    const lastName = document.querySelector("#last-name");

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
            if (user.id > 500) {
                throw new Error("The user can not be created. Please, try again!")
            }

            message.classList.remove("error");
            message.classList.add("success");
            message.textContent = "The user has been created successfully!";
            firstName.focus();

            usersList.insertAdjacentHTML("afterbegin", `<li>Name: ${user.first_name} ${user.last_name}</li>`);
        })
        .catch(err => {
            console.error(err);

            message.classList.remove("success");
            message.classList.add("error");
            message.textContent = err;
            firstName.focus();
        });
});

nextPageBtn.addEventListener("click", () => {
    currentPage += 1;

    if (currentPage === totalPages) {
        nextPageBtn.disabled = true;
        prevPageBtn.disabled = false;
    }

    fetch(`https://reqres.in/api/users?page=${currentPage}`)
        .then(res => res.json())
        .then(users => {
            renderPage(users);
        })
        .catch(err => console.error(err));
});

prevPageBtn.addEventListener("click", () => {
    currentPage -= 1;

    if (currentPage === 1) {
        prevPageBtn.disabled = true;
        nextPageBtn.disabled = false;
    }

    fetch(`https://reqres.in/api/users?page=${currentPage}`)
        .then(res => res.json())
        .then(users => {
            renderPage(users);
        })
        .catch(err => console.error(err));
});