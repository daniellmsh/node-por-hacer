const fs = require('fs');


let listadoPorHacer = [];

//Guardamos en nuestra bd
const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer); // esta funcion convierte un arreglo a un objeto totalmente valido

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('no se pudo grabar', err);
    });
};

//leemos un json como base de datos
const cargarDB = () => {
    //hay varias formas de leer un archivo JSON desde una peticion HTTP
    //como estamos usando node del lado del servidor podemos hacer un require y al detectar que es un archivo json node lo serializa y lo convierte en un objeto JS por default
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    };
};

//Creamos nuestra tarea
const crear = (descripcion) => {
    // cargamos db
    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardarDB();

    return porHacer;
};

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
};

//para actualizar nuestra bd
const actualizarDB = (descripcion, completado) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => {
        //retornaremos la descripcion si esta es igual a la descripcion que recibimos en el parametro 
        return tarea.descripcion === descripcion;
    });

    if (index >= 0) {
        //la tarea pendiente va a ser igual  como completada a lo que se mande por el parametro que se recibe segun sea true o false
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
};

const borrar = (descripcion) => {
    cargarDB();
    //declaramos nuevo arreglo, utilizamos funcion filter que nos permite quitar o filtrar algun elemno en particular de nuestro arreglo
    let nuevoListado = listadoPorHacer.filter(tarea => {
        //retornarmos las tardeas que sean diferentes a la tarea que estamos recibiendo
        return tarea.descripcion !== descripcion
    });

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }

};

module.exports = {
    crear,
    getListado,
    actualizarDB,
    borrar
};