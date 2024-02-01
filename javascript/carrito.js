const CONTENEDOR_CARDS = document.getElementById ("productos-carrito");
const UNIDADES = document.getElementById ("unidades");
const PRECIO = document.getElementById ("precio");
const CARRITO_VACIO = document.getElementById ("carrito-vacio");
const TOTALES = document.getElementById ("totales");
const REINICIAR_CARRITO = document.getElementById ("reiniciar");
const COMPRA_FINALIZADA = document.getElementById ("comprar");



//CREA LAS CARDS AL MOMENTO DE LLEVARLAS AL CARRITO
function crearTarjetasProductosInicio (){
    CONTENEDOR_CARDS.innerHTML="";
    const productos = JSON.parse(localStorage.getItem("card"));

    if (productos && productos.length > 0){
        productos.forEach(producto => {
            const div = document.createElement ("div");
            div.classList = "card-carrito";
            div.innerHTML = `
                            <img class="card-img" src=".${producto.img}" alt="">
                            <h3 class="nombre-item">${producto.nombre}</h3>
                            <p class="bg-violet-600 w-60 text-lg text-white font-bold rounded-md p-[10px] text-center">$ ${producto.precio}</p>
                            <div class="flex gap-1">
                                <button class="bg-violet-600 p-2 rounded-md font-bold text-lg"> - </button>
                                <span class = "p-2 cantidad text-lg" > ${producto.cantidad} </span>
                                <button class="bg-violet-600 p-2 rounded-md font-bold text-lg"> + </button>
                            <div>    
                            `;
                
                CONTENEDOR_CARDS.appendChild (div); 
                div
                    .getElementsByTagName("button")[1]
                    .addEventListener("click", (e)=>  {
                        
                        const CUENTA_ELEMENTO = e.target.parentElement.getElementsByTagName("span")[0];
                        CUENTA_ELEMENTO.innerText = agregarAlCarrito(producto);
                        actualizarTotales();
                    });
                div
                    .getElementsByTagName("button")[0]
                    .addEventListener("click", (e)=> {
                        restarAlCarrito(producto);
                        crearTarjetasProductosInicio();
                        actualizarTotales();
                    });
                }); 
    }
}

crearTarjetasProductosInicio()

//ACTUALIZA LOS VALORES DE PRECIO TOTAL COMO DE LAS UNIDADES CARGADAS EN EL CARRITO
function actualizarTotales (){
    const PRODUCTOS = JSON.parse (localStorage.getItem("card"));
    let unidades = 0;
    let precio = 0;
    if(PRODUCTOS && PRODUCTOS.length>0){
        PRODUCTOS.forEach(producto =>{
            unidades += producto.cantidad;
            precio += producto.precio * producto.cantidad
        })
        UNIDADES.innerText = unidades;
        PRECIO.innerText = precio;
    }
}

//MUESTRA MENSAJE DE CARRITO VACIO SIEMPRE Y CUANDO ESTE NO TENGA PRODUCTOS CARGADOS
function mensajeCarritoVacio() {
    const PRODUCTOS = JSON.parse (localStorage.getItem("card"));
    CARRITO_VACIO.classList.toggle("hidden",PRODUCTOS && PRODUCTOS.length>0);
    TOTALES.classList.toggle("hidden",!(PRODUCTOS && PRODUCTOS.length>0));
}

mensajeCarritoVacio();

//REINICIA EL CARRITO, BORRA PRODUCTOSM, VALORES Y CANTIDADES
REINICIAR_CARRITO.addEventListener("click",reiniciarCarrito);
function reiniciarCarrito(){
    localStorage.removeItem("card");
    crearTarjetasProductosInicio();
    actualizarTotales();
    mensajeCarritoVacio();
    Swal.fire({
        title: "😭😭😭",
        text: "Productos Eliminados",
        imageUrl: "../assets/Llorar.png",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image"
      });

}

actualizarTotales();

COMPRA_FINALIZADA.addEventListener("click", finalizarCompra);
function finalizarCompra() {
    localStorage.removeItem("card");
    reiniciarCarrito();
    actualizarTotales();
    mensajeCarritoVacio();
    Swal.fire({
        title: "😁😁😁",
        text: "Muchas gracias por tu compra",
        imageUrl: "../assets/Gracias.jpg",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image"
      });


}
