const PRODUCTOS = [];
const FOTO = document.getElementsByClassName("foto");


// CARGA PRODUCTOS EN ARRAY DESDE PRODUCTOS.JSON
async function cargarProductoEnArray() {
    const PRODUCTOS_JSON = '../productos.json';
    try {
        const RESPONSE = await fetch(PRODUCTOS_JSON);
        if (!RESPONSE.ok) {
            throw new Error(`Error de red: ${RESPONSE.status}`);
        }
        const DATOS = await RESPONSE.json();
        PRODUCTOS.length = 0;
        PRODUCTOS.push(...DATOS);
        cargarProductos(PRODUCTOS()); // Llama a cargarProductos después de cargar los productos
        
    } catch (error) {
        console.error('Error al cargar productos desde el archivo JSON:', error);
    }
}

// verificar que cargarProductosEnArray se llame antes cualquier otra operacion
document.addEventListener('DOMContentLoaded', function () { 
    cargarProductoEnArray(); // Otras operaciones que dependen de la carga de productos

    

});

const CARGAR_PRODUCTOS = document.querySelector("#contenedor");
const BOTONES_CATEGORIA = document.querySelectorAll (".botones-categoria");

//CARGA LOS PRODUCTOS CON EL JSON
function cargarProductos (productosElegidos) {

    CARGAR_PRODUCTOS.innerHTML = "";

    productosElegidos.forEach (producto => {
        const div = document.createElement("div");

        div.className="card";
        div.innerHTML =`
                    <img class="card-img" src=".${producto.img}" alt="">
                    <div class="card-info">
                        <h3 class="nombre-item">${producto.nombre}</h3>
                        <p class="precio-item">$ ${producto.precio}</p>
                        <button class="botonCarrito m-2 p-2">Agregar al carrito</button>
                    </div>
                `;
                CARGAR_PRODUCTOS.appendChild(div);
                div.getElementsByTagName("button")[0].addEventListener ("click",()=> agregarAlCarrito(producto))

    });
}

//SIEMPRE QUE SE SELECCIONE UNA CATEGORIA, ESTA VA A DESPLEGAR LOS PRODUCTOS CORRESPONDIENTES
BOTONES_CATEGORIA.forEach (boton => {
        boton.addEventListener ("click",(e)=> {
            e.currentTarget.classList.add ("active");
            const PRODUCTOS_BOTON = PRODUCTOS.filter (producto => ((producto.categoria).toLowerCase()) === e.currentTarget.id);
            cargarProductos (PRODUCTOS_BOTON);
    })
});
