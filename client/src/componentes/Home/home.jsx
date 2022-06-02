import React from 'react'
import {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {getVideoGames, getGeneros,filterVideoByGenero,filterVideoByCreados} from "../redux/action/action"
import { OrdenPorNombres, OrdenPorRating} from '../redux/action/action'
import Cards from '../Card/cards'
import NavBar from '../NavBar/NavBar'
import Paginado from '../Paginado/paginado'
import "./home.css"



function Home() {


const dispatch = useDispatch()
const todoVideo = useSelector(state => state.Videogames)

//ME TRAIGO LOS GENEROS ORDENADOS
const todoGeneros= useSelector(state=> state.Generos)
todoGeneros.sort((a,b) => a.name.localeCompare(b.name))

//PAGINADO
const [paginaActual, setpaginaActual] = useState(1)
const [videoPorPagina] = useState(15)
const indexUltimoVideo = paginaActual * videoPorPagina
const indexPrimerVideo = indexUltimoVideo - videoPorPagina 

const actualVideo=todoVideo.slice(indexPrimerVideo, indexUltimoVideo)

const [orden, setorden] = useState("")


const errorPag= todoVideo.includes("Video juego no encontrado")
const errorPag2=todoVideo.includes("No se encuentra genero")



const paginado =(numeroPagina)=>{
  setpaginaActual(numeroPagina)
}





useEffect(()=>{
    dispatch(getVideoGames())
    dispatch(getGeneros())
    refresc()

},[dispatch])

function refresc(){
  setpaginaActual(1)
}

function handleClick(e){
  e.preventDefault();
    dispatch(getVideoGames())

}
function handleFilterGenero(e){
  dispatch(filterVideoByGenero(e.target.value))
  refresc()
  
}
function handleFilterCreado(e){
  dispatch(filterVideoByCreados(e.target.value))
  refresc()
}

function handleOrdenPorNombre(e){
  dispatch(OrdenPorNombres(e.target.value))
  setorden(`Ordenado${e.target.value}`)
  refresc()

}

function handleOrdenPorRating(e){
  dispatch(OrdenPorRating(e.target.value))
  setorden(`Ordenado${e.target.value}`)
  refresc()

}



  return (
      <div className='contenedores'>

        <NavBar refresc={refresc}/>
   
              <div>

              <select className='selectores' onChange={e=> handleFilterGenero(e)} >    
              <option value="Genero" >Genero:</option>                                      
              {todoGeneros?.map((g,i) => (
                <option value={g.name} key={i}> {g.name} </option> ))} 
               
              </select> 


              <select className='selectores' onChange={e=> handleOrdenPorNombre(e)}>
              <option value="">Ordenar por:</option>
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
              </select>


        
              <select className='selectores' onChange={e=> handleOrdenPorRating(e)}>
              <option value="rating+">Mayor rating</option>
              <option value="rating-">Menor rating</option>
              </select>


         
              <select className='selectores' onClick={e=> handleFilterCreado(e)}>
              <option value="todos">Todos</option>
              <option value="api">Existentes</option>
              <option value="creados">Creados</option>
              </select>
             
           
             
           
              <Paginado
             videoPorPagina={videoPorPagina}
             todoVideoGame={(errorPag || errorPag2)?null:todoVideo.length} 
             paginado={paginado}/>  
            
            
        
            </div>   

         <button className="volver"onClick={e=> {handleClick(e)}}>Volver a cargar video games</button>
      
         <Cards actualVideo={actualVideo}/>

      

    </div>
  )
}

export default Home
