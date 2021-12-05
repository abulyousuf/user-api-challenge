/***

Exercise 1

Add a user to the `https://reqres.in/api` api.
Test it by console.log the response/response data. The response will have a status: 201 or 200 and something.
The data will have an id and a createdAt field.

 ***/

const data = {
    first_name: "Abul",
    last_name: "Yousuf",
    email: "abul@mail.com"
};

fetch("https://reqres.in/api/users/", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
})
    .then(res => res.json())
    .then(user => console.log(user))
    .catch(err => console.error("Error: ", err));