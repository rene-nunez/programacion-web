const selectUsers = document.getElementById("selectUsers");
const divDatos = document.getElementById("divDatos");
const btnCargar = document.getElementById("btnCargar");

btnCargar.addEventListener("click", () => {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(users => {
            let optionUsers = "";
            users.forEach(user => {
                optionUsers += `<option value=${user.id}>${user.username}</option>`
            });
            selectUsers.innerHTML = optionUsers;
        });
});