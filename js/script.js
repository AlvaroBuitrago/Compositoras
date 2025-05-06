document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll('a[data-page]');

    links.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const page = link.getAttribute('data-page');
            console.log(`Cargando página: ${page}`); // Depuración

            fetch(page)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error al cargar la página: ${response.statusText}`);
                    }
                    return response.text();
                })
                .then(data => {
                    document.getElementById('content').innerHTML = data;
                })
                .catch(error => {
                    console.error(error);
                    document.getElementById('content').innerHTML = `
                        <div class="alert alert-danger" role="alert">
                            No se pudo cargar el contenido. Inténtalo de nuevo más tarde.
                        </div>`;
                });
        });
    });
});