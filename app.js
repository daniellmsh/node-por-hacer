//Requires
//const argv = require('yargs').argv;
const argv = require('./config/yargs').argv;
const { crear, getListado, actualizarDB, borrar } = require('./por-hacer/por-hacer');

//obtenemos el comando
let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = crear(argv.descripcion);
        console.log(tarea.descripcion);
        break;
    case 'listar':
        console.log('listar');
        let listado = getListado();
        //console.log(listado);
        for (let tarea of listado) {
            console.log(tarea.descripcion);
        }
        break;
    case 'actualizar':
        let actualizado = actualizarDB(argv.descripcion, argv.completado);
        console.log(actualizado);
        break;
    case 'borrar':
        let borrado = borrar(argv.descripcion);
        console.log(borrado);
        break
    default:
        console.log('comando no reconocido');
        break;
}