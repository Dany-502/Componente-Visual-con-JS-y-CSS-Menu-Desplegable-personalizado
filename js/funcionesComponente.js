function crearMenu(idContenedor, titulo, opciones, colorFondo, colorTexto) {
    /*Buscar el contenedor vacío en el HTML usando su ID*/
    const contenedor = document.getElementById(idContenedor);

    /*Si no existe el contenedor, se muestra un error en la consola*/
    if (!contenedor) {
        console.error("No se encontró ningún elemento con el ID:", idContenedor);
        return;
    }

    /*Se genera el HTML creado con una lista de opciones usando un bucle*/
    let listaOpcionesHTML = "";
    for (let i = 0; i < opciones.length; i++) {
        listaOpcionesHTML += `
            <li class="contenidoLista">
                <a href="#" class="opcion">${opciones[i]}</a>
            </li>
        `;
    }

    /*Se inserta el HTML creado dentro del contenedor vacío*/
    contenedor.innerHTML = `
        <input type="hidden" id="${idContenedor}-valor" name="${idContenedor}" value="">
        <nav class="nav">
            <ul class="lista">
                <li class="listaItems">
                    <div class="listaBoton listaBotonClick">
                        <a href="#" class="enlace">${titulo}</a>
                        <img src="img/flecha_abajo.png" class="flecha">
                    </div>
                    <ul class="mostrarLista">
                        ${listaOpcionesHTML}
                    </ul>
                </li>
            </ul>
        </nav>
    `;

    /*Se busca los elementos recién creados para mostrarlos en pantalla*/
    const boton = contenedor.querySelector('.listaBotonClick');
    const menu = contenedor.querySelector('.mostrarLista');
    const textoBoton = contenedor.querySelector('.enlace');
    const inputOculto = contenedor.querySelector(`#${idContenedor}-valor`);

    /*Se aplican colores personalizados si el usuario los especificó*/
    if (colorFondo) {
        boton.style.backgroundColor = colorFondo;
        menu.style.backgroundColor = colorFondo;
    }

    if (colorTexto) {
        textoBoton.style.color = colorTexto;
        const enlacesOpciones = contenedor.querySelectorAll('.opcion');
        for (let i = 0; i < enlacesOpciones.length; i++) {
            enlacesOpciones[i].style.color = colorTexto;
        }
    }

    /*Esta funcion se encarga de mostrar y ocultar el menu*/
    boton.addEventListener('click', (e) => {
        e.preventDefault();
        boton.classList.toggle('flecha');
        if (menu.clientHeight === 0) {
            menu.style.height = menu.scrollHeight + "px";
        } else {
            menu.style.height = "0px";
        }
    });

    /*Esta funcion permite observar el elemento seleccionado por el usuario*/
    menu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            e.preventDefault();

            const valorSeleccionado = e.target.textContent;

            textoBoton.textContent = valorSeleccionado;

            inputOculto.value = valorSeleccionado;

            boton.classList.remove('flecha');
            menu.style.height = '0px';
        }
    });
}

/*Esta funcion permite obtener el valor seleccionado por el usuario*/
function obtenerValorMenu(idContenedor) {
    const inputOculto = document.getElementById(`${idContenedor}-valor`);
    if (inputOculto) {
        return inputOculto.value;
    }
    return "";
}