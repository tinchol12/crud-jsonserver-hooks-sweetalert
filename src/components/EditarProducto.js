import React, {useState, useRef} from 'react';
import Error from './Error';
import axios from 'axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

function EditarProductos(props)
{    
    //destructuring de props
    const {history, producto, guardarRecargarProductos} = props

    //Generamos los REF
    const precioPlatoRef = useRef('');
    const nombrePlatoRef = useRef('');

    
    const [categoria, guardarCategoria] = useState('');
    const [error, guardarError] = useState(false);

    const leerValorRadio = e =>
    {
        guardarCategoria(e.target.value);
    }

    const editarProducto = async e => {
        e.preventDefault();

        //validacion
        const nuevoNombre = nombrePlatoRef.current.value,
              nuevoPrecio = precioPlatoRef.current.value

        if(nuevoNombre === '' || nuevoPrecio === '' || categoria === '')
        {
            guardarError(true);
            return;
        }

        guardarError(false);

        //revisar si cambio la categoria, de lo contrario asignar el mismo valor.
        let categoriaPlato = (categoria === '') ? producto.categoria : categoria;

        //obtenemos los nuevos valores del formulario
        const editarPlato = {
            precioPlato : nuevoPrecio,
            nombrePlato : nuevoNombre,
            categoria : categoriaPlato
        }

        //Enviar el Request al API
        const url = `http://localhost:4000/restaurant/${producto.id}`;

        try
        {
            const resultado = await axios.put(url, editarPlato);
            console.log(resultado);

            if(resultado.status === 200)
            {
                Swal.fire(
                    'Producto Editado!',
                    'El producto se ha editado correctamente.',
                    'success'
                  )
            }
        }
        catch (error)
        {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: 'Hubo un error!'
              })
        }
        
        //redirigir al usuario y consultar a la api    
        guardarRecargarProductos(true);
        history.push('/productos');
    }

    


    return (
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Editar Producto</h1>

        {(error) ? <Error mensaje='Todos los campos son obligatorios' /> : null}

            <form
                className="mt-5"
                onSubmit={editarProducto}
            >
                <div className="form-group">
                    <label>Nombre Platillo</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="nombre" 
                        placeholder="Nombre Platillo"
                        ref={nombrePlatoRef}
                        defaultValue={producto.nombrePlato}
                    />
                </div>

                <div className="form-group">
                    <label>Precio Platillo</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        name="precio"
                        placeholder="Precio Platillo"
                        ref={precioPlatoRef}
                        defaultValue={producto.precioPlato}
                    />
                </div>

                <legend className="text-center">Categoría:</legend>
                <div className="text-center">
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="postre"
                        onChange={leerValorRadio}
                        defaultChecked={(producto.categoria === 'postre')}
                    />
                    <label className="form-check-label">
                        Postre
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="bebida"
                        onChange={leerValorRadio}
                        defaultChecked={(producto.categoria === 'bebida')}
                    />
                    <label className="form-check-label">
                        Bebida
                    </label>
                </div>

                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="cortes"
                        onChange={leerValorRadio}
                        defaultChecked={(producto.categoria === 'cortes')}
                    />
                    <label className="form-check-label">
                        Cortes
                    </label>
                </div>

                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="ensalada"
                        onChange={leerValorRadio}
                        defaultChecked={(producto.categoria === 'ensalada')}
                    />
                    <label className="form-check-label">
                        Ensalada
                    </label>
                </div>
                </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Editar Producto" />
            </form>
        </div>
    )
}

export default withRouter(EditarProductos);