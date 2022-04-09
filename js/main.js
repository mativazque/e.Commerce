
let carrito = [];
let favoritos = [];

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




const productos = [
    { id: 1, nombre: "Mouse SteelSeries Aerox 3", precio: 300, stock: 0, img: "assets/SteelSeriesAerox3.jpg" },
    { id: 2, nombre: "Mouse Razer Viper Ultimate", precio: 200, stock: 40, img: "assets/RazerViperUltimate.jpg" },
    { id: 3, nombre: "Mouse Logitech G PRO X", precio: 330, stock: 40, img: "assets/Logitech_G_PRO_X.png" },
    { id: 4, nombre: "Mouse Logitech G502 HERO", precio: 300, stock: 40, img: "assets/Logitech_G502_HERO.png" },
    { id: 5, nombre: "Mouse HyperX Pulsefire Surge", precio: 200, stock: 40, img: "assets/HyperXPulsefireSurge.jpg" },
    { id: 6, nombre: "Teclado Corsair K95 RGB", precio: 150, stock: 0, img: "assets/CorsairK95RGB_2.jpg" },
    { id: 7, nombre: "Teclado SteelSeries Apex Pro", precio: 100, stock: 40, img: "assets/SteelSeriesApexPro.jpg" },
    { id: 8, nombre: "Teclado Logitech G915 Wireless", precio: 180, stock: 0, img: "assets/LogitechG915Wireless_2.jpg" },
    { id: 9, nombre: "Teclado Razer Huntsman Elite", precio: 210, stock: 0, img: "assets/RazerHuntsmanElite.jpg" },
    { id: 10, nombre: "Teclado Logitech G Pro", precio: 90, stock: 40, img: "assets/LogitechG_Pro.jpg" },
    { id: 11, nombre: "Auricular Razer Nari Ultimate", precio: 90, stock: 40, img: "assets/RazerNariUltimate.jpg" },
    { id: 12, nombre: "Auricular Logitech G935", precio: 90, stock: 40, img: "assets/LogitechG935.jpg" },
    { id: 13, nombre: "Auricular Audeze Mobius", precio: 90, stock: 40, img: "assets/AudezeMobius.jpg" },
    { id: 14, nombre: "Auricular 1More Spearhead VRX", precio: 90, stock: 40, img: "assets/1MoreSpearhead_VRX.jpg" },
    { id: 15, nombre: "Auricular SteelSeries Arctis Pro GameDAC", precio: 90, stock: 40, img: "assets/SteelSeriesArctisProGameDAC.jpg" },
    { id: 16, nombre: "Camara Web Elgato Facecam", precio: 90, stock: 40, img: "assets/ElgatoFacecam.jpg" },
    { id: 17, nombre: "Camara Web Streamcam de Logitech", precio: 90, stock: 40, img: "assets/StreamcamLogitech.jpg" },
    { id: 18, nombre: "Camara Web AVerMedia PW310P ", precio: 90, stock: 40, img: "assets/AVerMediaPW310P.jpg" },
    { id: 19, nombre: "Camara Web Logitech Brio", precio: 90, stock: 40, img: "assets/LogitechBrio.jpg" },
    { id: 20, nombre: "Camara Web AVerMedia PW315", precio: 90, stock: 40, img: "assets/AVerMedia_PW315.jpg" },
    { id: 21, nombre: "Silla Noblechairs Hero", precio: 90, stock: 40, img: "assets/NoblechairsHero.jpg" },
    { id: 22, nombre: "Silla Razer Iskur", precio: 90, stock: 40, img: "assets/RazerIskur.jpg" },
    { id: 23, nombre: "Silla Secretlab OMEGA", precio: 90, stock: 40, img: "assets/SecretlabOMEGA.jpg" },
    { id: 24, nombre: "Silla MSI MAG CH120 X", precio: 90, stock: 40, img: "assets/MSI_MAG_CH120X.jpg" },
    { id: 25, nombre: "Silla Corsair T3 Rush ", precio: 90, stock: 40, img: "assets/CorsairT3Rush.jpg" },
]


//Generador de productos en INDEX
const generadorProductos = (productos) => {
    let productosGenerados = "";
    productos.forEach((elemento) => {
        productosGenerados += `
        <div class="col mb-5">
            <div class="card h-100">
                ${(elemento.stock == 0) ? `<div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sin Stock</div>` : ``} 
                <img class="card-img-top" src=${elemento.img} alt="..." />
                <div class="card-body p-4">
                    <div class="text-center">
                        <h5 class="fw-bolder">${elemento.nombre}</h5>
                        ${elemento.precio}
                    </div>
                </div>
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
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

    const productosBuscados = productos.filter((elemento) => elemento.nombre.toUpperCase().includes(valorProductoBuscado));

    generadorProductos(productosBuscados);
}

let botonBuscador = document.getElementById("botonDebuscador");
botonBuscador.addEventListener("click", valorProductoBusc);



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
        <div class="d-flex justify-content-between align-items-center mb-3">
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
            </div>`;
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
        <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="d-flex align-items-center">
                    <img src="${elemento.img}" alt="" class="imgCarrito me-2">
                    <div class="d-flex flex-column me-3">
                        <h6>${elemento.nombre}</h6>
                        <h6>$ ${elemento.total}</h6>
                    </div>
                </div>
                <div class="d-flex justify-content-end">
                    <i class="fas fa-shopping-cart fa-lg me-2" onclick="favCar(${elemento.id})"></i>
                    <i class="fa-solid fa-trash-can fa-lg" onclick="eliminarProductoFav(${elemento.id})"></i>
                </div>
        </div>`;
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

