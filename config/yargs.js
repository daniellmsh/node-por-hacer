const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'descripcion de una tarea por hacer'
};

const completado = {
    demand: true,
    alias: 'c',
    desc: 'marca como completado o pendiente la tarea',
    default: true
};

const argv = require('yargs').command('crear', 'Crea una tarea por hacer', {
    descripcion
}).command('actualizar', 'actualiza una tarea pendiente', {
    descripcion,
    completado
}).command('listar', 'lista nuestras tareas', {
    descripcion
}).command('borrar', 'borra un registro de nues bd', {
    descripcion
}).argv;

module.exports = {
    argv
};