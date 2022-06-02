import React from "react"
import "./paginado.css"




export default function Paginado({videoPorPagina,todoVideoGame,paginado}){

   
   
    const numerosPagina=[]

    for (let i=1; i<=Math.ceil(todoVideoGame/videoPorPagina); i++) {
     
     numerosPagina.push(i);        
    }
    return (
        <nav>
            <ul className="paginacion">
                {numerosPagina.length? 
                numerosPagina.map(numero=>(
                    <li className="number" key= {numero}>
                    <button className="pagButton"onClick={()=> paginado(numero)}>{numero}</button>
                    </li>
                )):null}
            </ul>
        </nav>
    )
}