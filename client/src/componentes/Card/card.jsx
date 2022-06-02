import React from 'react'
import"./card.css"

function card({name, image, genres}) {
  return (

      
         <div >
           <div className='card'>
           <h2>{name}</h2>
           <img src={image} alt="imgen video games"/>
           <div className="contenido">
            {genres?.length&& genres.map(e=> <h3>{e.name}</h3>)}

            </div>
          </div>
       </div>
    
 
   
  )
}

export default card
