const express = require('express'); 
const { Router } = express;
//Instanciando de la clase Router
const routerCarrito = new Router();


//GET*************************
routerCarrito.get('/:id/productos',(req, res)=>{
    console.log('ruta carrito');
});


//POST************************
routerCarrito.post('/:id/productos',(req, res)=>{
    console.log('ruta post');
});


//DELETE*********************
routerCarrito.delete('/:id/productos/:id_prod');


//EXPORTAMOS EL ROUTER CARRITO COMPRA para donde lo vayamos a utlizar
module.exports = routerCarrito; 