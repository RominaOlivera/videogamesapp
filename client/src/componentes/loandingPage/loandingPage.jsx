import React from 'react'
import {Link} from "react-router-dom"
import "./loandingPage.css"

function loandingPage() {
    return (
     
       
        <div className='fondototal'>
            <p>Bienvenidos a Video games App</p>
            <h5>
      <Link to ="/home">
         
         <img src="https://www.tbkids.es/wp-content/uploads/2017/07/icono-videojuegos.png" alt="boton"/>
      </Link>
      
      </h5>
      <h5>INGRESAR</h5>
     
        </div>
    )
}

export default loandingPage
