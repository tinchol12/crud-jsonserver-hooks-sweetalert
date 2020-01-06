import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header';


import Producto from './components/Producto';
import Productos from './components/Productos';
import EditarProducto from './components/EditarProducto';
import AgregarProducto from './components/AgregarProducto';

function App() {

  const [productos, guardarProductos] = useState([]);
  const [recargarProductos, guardarRecargarProductos] = useState(true);



  useEffect(() =>
                  {
                      if(recargarProductos)
                      {
                        const consultarAPI = async () =>
                        {
                           const resultado = await axios.get('http://localhost:4000/restaurant');
                           guardarProductos(resultado.data); 
                        }
                        consultarAPI();
                        //cambiar estado de recarga
                        guardarRecargarProductos(false);
                      }
                  }, [recargarProductos]);


  return (
            <Router>
                        <Header />
                         <main className="container mt-5">
                            <Switch>
                                      <Route exact path="/productos" 
                                          render={ () => (
                                            <Productos 
                                              productos={productos}
                                              guardarRecargarProductos={guardarRecargarProductos}
                                            />
                                          )} 
                                      />
                                      <Route exact path="/nuevo-producto" 
                                          render={() => (
                                            <AgregarProducto
                                            guardarRecargarProductos={guardarRecargarProductos}
                                            />
                                          )}/>
                                      <Route exact path="/productos/editar/:id" 
                                          render={props => {
                                            //Tomar el ID del producto
                                            const idProducto = parseInt(props.match.params.id);

                                            //filtrar y pasar el seleccionado
                                            const producto = productos.filter(producto => producto.id === idProducto);

                                            return(
                                                    <EditarProducto 
                                                      producto={producto[0]}
                                                      guardarRecargarProductos={guardarRecargarProductos}
                                                    />
                                            ) 
                                          }}    
                                      />
                                      
                                      <Route exact path="/productos/:id" component={Producto} />
                            </Switch>
                          </main>
                        <p className="mt-4 p2 text-center"> Todos los derechos reservados</p>
            </Router>
  );
}

export default App;
