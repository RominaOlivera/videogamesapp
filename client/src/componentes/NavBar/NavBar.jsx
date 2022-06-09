import React from 'react'
import {useState} from "react"
import { useDispatch } from 'react-redux'
import { getName } from '../redux/action/action'
import {Link} from "react-router-dom"
import "./navbar.css"


export default function NavBar({refresc}) {
    const dispatch = useDispatch()
    const [name, setname] = useState("")


    function handleInputChange(e){
        e.preventDefault()
        setname(e.target.value)
        refresc()
       
    }
   function handleSubmit(e){
       e.preventDefault()
       dispatch(getName(name))
     
   }
       return (
      <header >
           <div className='searchInput'>
             <input className='input' type= "text"
               placeholder='Busca video games..'
               onChange={e=> handleInputChange(e)}
                ></input>
                   <button className='searchboton' type="submit" onClick={(e)=> handleSubmit(e)}>Buscar</button>
                 
                   <ul>
                   <Link to="/create"><button>Crea tu video games</button></Link>
                
                  
                  
                   </ul>
                   </div>  
                   </header>           
        
       )
   }
   


