const btnLoad = document.getElementById("btnLoad");
const divDatos = document.getElementById("divDatos");

btnLoad.addEventListener("click", () => {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            let texto = `<ul class="list-group list-group-flush">`;
            users.forEach(user => {
                texto += `<li class="list-group-item">ID: ${user.id}<br> Name: ${user.name}<br> Email: ${user.email}<br> Website: ${user.website}</li>`
            });
            texto += `</ul>`;
            divDatos.innerHTML = texto;
        });
});