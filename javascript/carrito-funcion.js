function agregarAlCarrito(producto){
    let MEMORIA = JSON.parse (localStorage.getItem("card"));
    let cuenta;
    //CREA LOCALSTORAGE
    if(!MEMORIA || MEMORIA.length === 0){
        const NUEVO_PRODUCTO = getNuevoProductoParaMemoria(producto);
        localStorage.setItem("card",JSON.stringify([NUEVO_PRODUCTO]));
        cuenta = 1;
        setTimeout(() => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "El producto ha sido agregado",
                showConfirmButton: false,
                timer: 1500
              });
        },200);
        
    } else {
        const INDICE_PRODUCTO = MEMORIA.findIndex(card => card.id === producto.id);
        const NUEVA_MEMORIA = MEMORIA;
        
        if (INDICE_PRODUCTO === -1){
            const NUEVO_PRODUCTO = getNuevoProductoParaMemoria (producto);
            NUEVA_MEMORIA.push(NUEVO_PRODUCTO)
            cuenta = 1;
            setTimeout(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "El producto ha sido agregado",
                    showConfirmButton: false,
                    timer: 1500
                  });
            },200);
        } else {
            NUEVA_MEMORIA[INDICE_PRODUCTO].cantidad++;
            cuenta = NUEVA_MEMORIA[INDICE_PRODUCTO].cantidad;
            
        }
        localStorage.setItem("card",JSON.stringify(NUEVA_MEMORIA));
        return cuenta;
    }
}

//SIEMPRE QUE SE CLICKE EN EL BOTON - , RESTA UN PRODUCTO
function restarAlCarrito (producto){
    const MEMORIA = JSON.parse (localStorage.getItem("card"));
    const INDICE_PRODUCTO = MEMORIA.findIndex(card => card.id === producto.id);
    if(MEMORIA[INDICE_PRODUCTO].cantidad === 1){
        MEMORIA.splice(INDICE_PRODUCTO, 1);
        localStorage.setItem("card",JSON.stringify(MEMORIA))
    } else{
        MEMORIA[INDICE_PRODUCTO].cantidad--;
        
    }
    mensajeCarritoVacio();
    

    localStorage.setItem("card",JSON.stringify(MEMORIA));
    
    
    
}

//TOMA EL PRODUCTO, LE AGREGA 1 Y LO MUESTRA EN CARRITO
function getNuevoProductoParaMemoria (producto){
    const NUEVO_PRODUCTO = producto;
    NUEVO_PRODUCTO.cantidad = 1;
    return NUEVO_PRODUCTO;
}

