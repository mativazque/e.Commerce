let carrito = [];

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
    { id: 1, nombre: "Producto A", precio: 300, stock: 0, img: "assets/producto.jpg" },
    { id: 2, nombre: "Producto B", precio: 200, stock: 40, img: "assets/producto.jpg" },
    { id: 3, nombre: "Producto C", precio: 330, stock: 40, img: "assets/producto.jpg" },
    { id: 4, nombre: "Producto D", precio: 300, stock: 40, img: "assets/producto.jpg" },
    { id: 5, nombre: "Producto E", precio: 200, stock: 40, img: "assets/producto.jpg" },
    { id: 6, nombre: "Producto F", precio: 150, stock: 0, img: "assets/producto.jpg" },
    { id: 7, nombre: "Producto G", precio: 100, stock: 40, img: "assets/producto.jpg" },
    { id: 8, nombre: "Producto H", precio: 180, stock: 0, img: "assets/producto.jpg" },
    { id: 9, nombre: "Producto I", precio: 210, stock: 0, img: "assets/producto.jpg" },
    { id: 10, nombre: "Producto J", precio: 90, stock: 40, img: "assets/producto.jpg" },
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
                        <div class="d-flex justify-content-center small text-warning mb-2">
                            <div class="bi-star-fill"></div>
                            <div class="bi-star-fill"></div>
                            <div class="bi-star-fill"></div>
                            <div class="bi-star-fill"></div>
                            <div class="bi-star-fill"></div>
                        </div>$ 
                        ${elemento.precio}
                    </div>
                </div>
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center">
                        <button type="button" class="btn btn-outline-dark" onclick="agregarAlCarrito(${elemento.id})">Comprar</button>
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
    document.getElementById("productosDelCarrito").innerHTML = table;
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

    //Actualizando el Storage
    localStorage.setItem("carrito", JSON.stringify(carrito));

    //Actualizando el HTML del Spam de Cantidad de productos agregados
    document.getElementById("spamCarrito").innerHTML = carrito.length;

    //Generando HTML del body-carrito
    generadorTablaCarrito(carrito);

    //Actualizando el total del carrito
    totalCarrito();
}

//Eliminar producto
const eliminarProducto = (elemento) => {
    const idCarrito = carrito.map((elem) => elem.id);
    const indiceElemento = idCarrito.indexOf(elemento);
    carrito.splice(indiceElemento, 1);
    document.getElementById("spamCarrito").innerHTML = carrito.length;
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
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

//Vaciar carrito (vaciar y confirmar compra)

const vaciarCarrito = () => {
    carrito = [];
    generadorTablaCarrito(carrito);
    totalCarrito();
    document.getElementById("spamCarrito").innerHTML = carrito.length;
    localStorage.setItem("carrito", JSON.stringify(carrito));
}



//Inicializando con Storage

if (localStorage.getItem("carrito") != null) {
    const storageCarrito = JSON.parse(localStorage.getItem("carrito"));
    carrito = storageCarrito;
    generadorTablaCarrito(carrito);
    totalCarrito();
    document.getElementById("spamCarrito").innerHTML = carrito.length;
}

// Ejecutando funciones
generadorProductos(productos);

