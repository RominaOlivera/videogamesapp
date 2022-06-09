import React from 'react'
import Card from './card'
import { Link } from 'react-router-dom'


export default function Cards({actualVideo, errorPag,errorPag2}) {


  return (
    <div className='conteiner'>
  
      {!errorPag2?
      !errorPag?
      
      actualVideo?.length?
      actualVideo?.map((e)=>
      <Link to={"/videogame/"+ e.id}>
      
        <Card  name={e.name} image={e.image} genres={e.genres}/>
        </Link>
        
      ):
       <div className='cargando'><span><img src='https://tradinglatam.com/wp-content/uploads/2019/04/loading-gif-png-4.gif' alt="cargando"/>
         <h4>Cargando</h4></span></div>:
         <div className='cargando'><h4>No hay video games con dicho nombre</h4></div>:
         <div className='cargando'><h4>No se encuentra genero disponible</h4></div>


         
    }
</div>

  )
}

