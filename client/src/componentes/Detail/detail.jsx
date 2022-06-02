import React from 'react'
import { getDetail } from '../redux/action/action'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

export default function Detail() {

    const dispatch = useDispatch()
    const { id } = useParams();

    const miVideoGame= useSelector((state)=> state.Detail)


    useEffect(()=> {
        dispatch(getDetail(id))
    
    },[dispatch,id])

    
function stripHtml(html){
   let tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}
    

    return (
        <div>
        <div>
       {miVideoGame?.length > 0?
       <div>
           <div className="contenedores1">
            
           <h1>{miVideoGame[0]?.name}</h1>

           <img src={miVideoGame[0]?.image} alt="imagen"/>
         
        
           <div className="descripcion2">
           <h3><span>Genero:</span> {miVideoGame[0].genres.map(e => e.name + (" "))}</h3>                    
           <h4><span>Description:</span>{stripHtml(miVideoGame[0]?.description)} </h4>
           <h4><span>Publicado:</span> {miVideoGame[0]?.released}</h4>
           <h4><span>Rating:</span> {miVideoGame[0]?.rating}</h4>
           <h4><span>Plataformas:</span> {miVideoGame[0]?.platforms }</h4>
    
           </div>
           <div className="volver">
                   <Link to="/home"><button>Volver</button></Link>
                   </div>
           </div>
        </div>
        :
        <div className="cargando">
            <img src="https://tradinglatam.com/wp-content/uploads/2019/04/loading-gif-png-4.gif" alt="imagen no funciona"/>
            <h4>Cargando</h4> 
        </div>
       }
   </div>
   </div>
)
}
