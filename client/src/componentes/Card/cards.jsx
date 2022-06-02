import React from 'react'
import Card from './card'
import { Link } from 'react-router-dom'
import {useDispatch,useSelector} from "react-redux"
import { useEffect } from 'react'
import { getVideoGames } from '../redux/action/action'



export default function Cards({actualVideo}) {
 const dispatch = useDispatch()

 const todoVideo = useSelector(state => state.Videogames)

const noHayVideo= todoVideo.includes("Video juego no encontrado")

const noHayGenero=todoVideo.includes("No se encuentra genero")


 useEffect(() => {
     dispatch(getVideoGames())
     
 }, [dispatch])


  return (
    <div className='conteiner'>
  
      {!noHayGenero?
      !noHayVideo?
      actualVideo?.length?
      actualVideo?.map((e,i)=>
      <Link to={"/videogame/"+ e.id}>
      
        <Card  key={i} name={e.name} image={e.image} genres={e.genres}/>
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

