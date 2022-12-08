const express = require('express'); 
const app = express();

const routerProductos = require('./Rutas/Producto'); //importar la ruta del archivo Producto
const routerCarrito = require('./Rutas/CarritoCompra');//importat la ruta del archivo CarritoCompra

app.use(express.json());
app.use(express.urlencoded({ extended:true})); 

//se usan las dos rutas
app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);

//Servidor escuchando por el puerto 8080
const PORT = process.env.PORT || 8080
app.listen(PORT, ()=>{
    console.log(`escuchando por el puerto: ${PORT}`);
})








