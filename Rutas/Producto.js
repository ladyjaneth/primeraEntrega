const express = require('express'); 
const { Router } = express;

const routerProductos = new Router();//Instanciando de la clase Router
const ProductoMA = require('../Modelo/ProductoMA');//SE IMPORTA LA CLASE 
const productoMA = new ProductoMA('producto.txt');//SE INSTANCIA EL OBJETO DE LA CLASE PRODUCTOMA


//GET////////////////////
routerProductos.get('/:id?',async(req, res)=>{//endopoint =punto final para un api//params cuando lo pide por parámetro y el que no tiene parámetro lo buscamos por el body
   const productoid= req.params.id;
   let productos;
   if(productoid){
     productos = await productoMA.getById(productoid);
    }else{
    productos = await productoMA.getAll();
   }
   res.json({'productos': productos});
});

//POST//////////////////
routerProductos.post('/', async(req, res)=>{
    const producto = req.body;
    const verificarVacio = Object.entries(producto).length===0;
    if(verificarVacio){
        res.json({'error': 'no se encontraron propiedaddes para crear el producto'});
    }
    let mensaje; //mensaje para el usuario 
    producto.id = await productoMA.save(producto); //tiene el id que nos responde el método save
    
    if(producto.id==0){
        mensaje = 'Error al crear un producto';
    }else{
        mensaje = 'Se guardo el producto satisfactoriamente';
    }
    res.json({'mensaje': mensaje}); 
});


//PUT//////////////////
routerProductos.put('/:id',async(req,res)=>{
   const productoId = Number(req.params.id); //almacer el id que me envian
   const productoEncontrado = await productoMA.getById(productoId);//si ese id que me enviaron existe - buscar el producto por el id
   
   if(productoEncontrado==null){
    res.json({'mensaje':'Producto no encontrado'});
   }
                                        //demás propiedades
   const propiedadesCuerpo = req.body; //obtener las propiedades que se va a actualizar por el body
   const verificarVacio = Object.entries(propiedadesCuerpo).length===0; //verdadero
   if(verificarVacio){
     res.json({'mensaje':'no se encontraron propiedades para actualizar del producto'});
   }
   const productoActualizar = {...propiedadesCuerpo};
   productoActualizar.id=productoId;
   const productoActualizado= productoMA.update(productoActualizar);
   let mensaje;
   if(productoActualizado){
        mensaje='Producto actualizado satisfactoriamente';
   }else{
        mensaje='Ha ocurrido un error al intentar actualizar el producto';
   }
   res.json({mensaje});

});

//DETELE///////////////
routerProductos.delete('/:id',async(req,res)=>{
    const productoId = req.params.id;
    const productoEliminarId = productoMA.deleteById(productoId);//ver donde están todos los productos para poder eliminar productoMA
    let mensaje; //mensaje que puede cambiar 
    if(productoEliminarId){
        mensaje = 'Producto eliminado satisfactoriamente'; //enviarle un mensaje
    }else{
        mensaje = 'Ha sucedido un error al tratar de eliminar el producto';
    }
    res.json({'mensaje': mensaje}); //contestar al usuario
});
   



//EXPORTAMOS EL ROUTER PRODUCTO para donde lo vayan a utilizar
module.exports = routerProductos; 
