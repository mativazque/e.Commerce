
let carrito = [];
let favoritos = [];
let productos = [];

class orderUser {
    constructor(id, nombre, precio, img, cantidad) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = cantidad;
        this.total = precio * cantidad;
    }
}



fetch("/data.json")
.then((response) => response.json())
.then((data) => generadorProductos(data.productos))

fetch("/data.json")
.then((response) => response.json())
.then((data) => productos = (data.productos))




//Generador de productos en INDEX
const generadorProductos = (productos) => {
    let productosGenerados = "";
    productos.forEach((elemento) => {
        productosGenerados += `
        <div class="col mb-5">
            <div class="card h-100"> 
                <img class="card-img-top" src=${elemento.img} alt="..." />
                <div class="card-body p-2">
                    <div class="text-center">
                        <h6 class="fw-bolder">${elemento.nombre}</h6>
                        <h4 class="fw-bolder mt-3">$ ${elemento.precio}</h4>
                    </div>
                </div>
                <div class="card-footer p-2 pt-0 border-top-0 bg-transparent">
                    <div class="text-center">
                        <button type="button" class="btn btn-outline-dark m-2" onclick="agregarAlCarrito(${elemento.id})"><i class="fas fa-shopping-cart fa-lg"></i></button>
                        <button type="button" class="btn btn-outline-dark m-2" onclick="agregarFavoritos(${elemento.id})"><i class="fa-solid fa-heart fa-lg"></i></button>
                    </div>
                </div>
            </div>
        </div>`;
    });

    mostrarCardenHTML(productosGenerados);
}


//DOM productos index
const mostrarCardenHTML = (card) => {
    document.getElementById("contenedorProductos").innerHTML = card;
}

//Buscador de productos
const valorProductoBusc = () => {
    const valorProductoBuscado = document.getElementById("buscador").value.toUpperCase().trim();

    let productosBuscados = productos.filter((elemento) => elemento.nombre.toUpperCase().includes(valorProductoBuscado));

    console.log(productosBuscados.length);

    if (productosBuscados.length == 0) {
        productosBuscados = "No se encontró ningún producto";
        document.getElementById("contenedorProductos").innerHTML = `<h6 style="color: #ffff;">${productosBuscados}</h6>`;
    } else {
        generadorProductos(productosBuscados);
    }

    document.getElementById("Header").innerHTML = "";
}

let botonBuscador = document.getElementById("botonDebuscador");
botonBuscador.addEventListener("click", valorProductoBusc);

let enterBuscador = document.getElementById("buscador");
enterBuscador.addEventListener("keydown", valorProductoBusc);


///Filtro de categorias

//Buscador de productos
const filterCategoria = (categoria) => {

    let categoriaSelect = productos.filter((elemento) => elemento.categoria.includes(categoria));

    generadorProductos(categoriaSelect);

    document.getElementById("Header").innerHTML = "";
}

/////Carrito

//DOM carrito
const mostrarTablaCarrito = (table) => {
    if (carrito.length == 0) {
        document.getElementById("productosDelCarrito").innerHTML = `<h6>No hay productos agregados.</h6>`;
    } else {
        document.getElementById("productosDelCarrito").innerHTML = table;
    }
}


//Generador de carrito
const generadorTablaCarrito = (carrito) => {
    let productosGeneradosCarrito = "";
    carrito.forEach((elemento) => {
        productosGeneradosCarrito += `
        <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                    <img src="${elemento.img}" alt="" class="imgCarrito">
                    <div class="d-flex flex-column">
                        <h6>${elemento.nombre}</h6>
                        <h6>$ ${elemento.total}</h6>
                        <div class="d-flex">
                            <i class="fa-solid fa-circle-minus fa-lg me-2" onclick="restarProducto(${elemento.id})"></i>
                            <spam>${elemento.cantidad}</spam>
                            <i class="fa-solid fa-circle-plus fa-lg ms-2" onclick="sumarProducto(${elemento.id})"></i>
                        </div>
                    </div>
                </div>
                <i class="fa-solid fa-trash-can fa-lg" onclick="eliminarProducto(${elemento.id})"></i>
            </div>
            <hr style="height: 0.5px">`;
    });

    mostrarTablaCarrito(productosGeneradosCarrito);
}

//Total carrito
const totalCarrito = () => {
    const totalCompra = carrito.reduce((acumulador, elemento) => acumulador + elemento.total, 0);
    document.getElementById("totalCompra").innerHTML = `${totalCompra}`;
}


//Spam cantidad de productos carrito
const spamCarrito = () => {
    const totalCantidadSpam = carrito.reduce((acc, el) => acc + el.cantidad, 0);
    document.getElementById("spamCarrito").innerHTML = totalCantidadSpam;
}

//Agregar al carrito
const agregarAlCarrito = (id) => {

    //Buscando el producto a agregar
    const productoComprado = productos.find((elemento) => elemento.id == id);

    //Agregando el producto
    const rePedido = carrito.some((e) => e.id == productoComprado.id);
    if (rePedido == false) {
        carrito.push(new orderUser(productoComprado.id, productoComprado.nombre, productoComprado.precio, productoComprado.img, 1));
    } else {
        const idCarrito = carrito.map((elem) => elem.id);
        const indiceElemento = idCarrito.indexOf(id);
        carrito[indiceElemento].cantidad += 1
        carrito[indiceElemento].total = carrito[indiceElemento].cantidad * carrito[indiceElemento].precio
    }

    //Alert
    Toastify({
        text: `Agregaste ${productoComprado.nombre}  al carrito`,
        duration: 3000,
        newWindow: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () { } // Callback after click
    }).showToast();

    
    //Actualizando el HTML del Spam de Cantidad de productos agregados
    spamCarrito();

    //Generando HTML del body-carrito
    generadorTablaCarrito(carrito);
    totalCarrito();

    //Actualizando el Storage
    localStorage.setItem("carrito", JSON.stringify(carrito));

}

//Eliminar producto
const eliminarProducto = (elemento) => {
    const idCarrito = carrito.map((elem) => elem.id);
    const indiceElemento = idCarrito.indexOf(elemento);
    carrito.splice(indiceElemento, 1);
    spamCarrito();
    generadorTablaCarrito(carrito);
    totalCarrito();

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

//+1 Cantidad
const sumarProducto = (id) => {
    const idCarrito = carrito.map((elem) => elem.id);
    const indiceElemento = idCarrito.indexOf(id);
    carrito[indiceElemento].cantidad += 1
    carrito[indiceElemento].total = carrito[indiceElemento].cantidad * carrito[indiceElemento].precio
    generadorTablaCarrito(carrito);

    totalCarrito();
    spamCarrito();

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// -1 Producto
const restarProducto = (id) => {
    const idCarrito = carrito.map((elem) => elem.id);
    const indiceElemento = idCarrito.indexOf(id);
    carrito[indiceElemento].cantidad += -1
    if (carrito[indiceElemento].cantidad == 0) {
        eliminarProducto(id);
    }
    else {
        carrito[indiceElemento].total = carrito[indiceElemento].cantidad * carrito[indiceElemento].precio
        generadorTablaCarrito(carrito);
        totalCarrito();
        spamCarrito();
    }


    localStorage.setItem("carrito", JSON.stringify(carrito));
}

//Confirmar compra
const confirmarCompra = () => {

    if (carrito.length > 0) {

        swal({
            title: "Compra confirmada",
            text: "Muchas gracias!",
            icon: "success",
        });
    }

    carrito = [];
    generadorTablaCarrito(carrito);
    totalCarrito();
    spamCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito));

}

//Vaciar carrito
const vaciarCarrito = () => {
    carrito = [];
    generadorTablaCarrito(carrito);
    totalCarrito();
    spamCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

/////FAVORITOS

//DOM favorito
const mostrarTablaFav = (table) => {
    if (favoritos.length == 0) {
        document.getElementById("productosFavoritos").innerHTML = `<h6>No hay productos agregados.</h6>`;
    } else {
        document.getElementById("productosFavoritos").innerHTML = table;
    }
}

//Generador de favoritos
const generadorTablaFav = (favoritos) => {
    let productosGeneradosFav = "";
    favoritos.forEach((elemento) => {
        productosGeneradosFav += `
        <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                    <img src="${elemento.img}" alt="" class="imgCarrito me-2">
                    <div class="d-flex flex-column me-3">
                        <h6>${elemento.nombre}</h6>
                        <h6>$ ${elemento.total}</h6>
                    </div>
                </div>
                <div class="d-flex justify-content-end">
                    <i class="fas fa-shopping-cart fa-lg me-3" onclick="favCar(${elemento.id})"></i>
                    <i class="fa-solid fa-trash-can fa-lg" onclick="eliminarProductoFav(${elemento.id})"></i>
                </div>
        </div>
        <hr style="height: 0.5px">`;
    });

    mostrarTablaFav(productosGeneradosFav);
}

//Spam cantidad de productos favoritos
const spamFav = () => {
    const totalCantidadFavSpam = favoritos.reduce((acc, el) => acc + el.cantidad, 0);
    document.getElementById("spamFavoritos").innerHTML = totalCantidadFavSpam;
}

//Agregar a favoritos
const agregarFavoritos = (id) => {

    //Buscando el producto a agregar
    const productoFavorito = productos.find((elemento) => elemento.id == id);

    //Agregando el producto
    const reFav = favoritos.some((e) => e.id == productoFavorito.id);
    if (reFav == false) {
        favoritos.push(new orderUser(productoFavorito.id, productoFavorito.nombre, productoFavorito.precio, productoFavorito.img, 1));
        //Alert
        Toastify({
            text: `Agregaste ${productoFavorito.nombre}  a favoritos`,
            duration: 3000,
            newWindow: true,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function () { } // Callback after click
        }).showToast();
    } else {
            Toastify({
                text: `Ya tienes ${productoFavorito.nombre} en favoritos`,
                duration: 3000,
                newWindow: true,
                gravity: "top", // `top` or `bottom`
                position: "left", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #00b0b, #96c93d)",
                },
                onClick: function () { } // Callback after click
            }).showToast();

    }

    //Actualizando el HTML del Spam de Cantidad de productos agregados
    spamFav();

    //Generando HTML del body-carrito
    generadorTablaFav(favoritos);

    //Actualizando el Storage
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

//Eliminar producto
const eliminarProductoFav = (elemento) => {
    const idFav = favoritos.map((elem) => elem.id);
    const indiceElemento = idFav.indexOf(elemento);
    favoritos.splice(indiceElemento, 1);
    spamFav();
    generadorTablaFav(favoritos);

    localStorage.setItem("favoritos", JSON.stringify(favoritos));
}


//De favorito a carrito
const favCar = (id) => {
    agregarAlCarrito(id);
    eliminarProductoFav(id);

}

//Vaciar carrito
const vaciarFavoritos = () => {
    favoritos = [];
    generadorTablaFav(favoritos);
    spamFav();
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
}


//Enviar a favoritos
const favoritosAlCarrito = () => {
    for (i = 0; i < favoritos.length; i++) {
        agregarAlCarrito(favoritos[i].id);
    }
    vaciarFavoritos();

}

//Inicializando con Storage
if (localStorage.getItem("carrito") != null) {
    const storageCarrito = JSON.parse(localStorage.getItem("carrito"));
    carrito = storageCarrito;
    generadorTablaCarrito(carrito);
    totalCarrito();
    spamCarrito();
}

if (localStorage.getItem("favoritos") != null) {
    const storageFavoritos = JSON.parse(localStorage.getItem("favoritos"));
    favoritos = storageFavoritos;
    generadorTablaFav(favoritos);
    spamFav();
}


// Ejecutando funciones
generadorProductos(productos);

if (carrito.length == 0) { document.getElementById("productosDelCarrito").innerHTML = `<h6>No hay productos agregados.</h6>`; }

