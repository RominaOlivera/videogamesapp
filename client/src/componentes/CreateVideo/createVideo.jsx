import React from 'react'
import { postVideoGame, getGeneros,getVideoGames} from '../redux/action/action'
import { useDispatch,useSelector} from 'react-redux'
import { useEffect, useState } from 'react'
import { useHistory} from 'react-router-dom'
import "./createVideo.css"

export default function CreateVideo() {

  const dispatch = useDispatch()
  const history = useHistory()
  const todoGeneros = useSelector(state => state.Generos)






//ESPERA
 const [mensaje, setmensaje] = useState(false) 

 

  const [input, setInput] = useState({

    name: "",
    description: "",
    released: "",
    rating: "",
    platforms: [],
    image: "",
    genres: [],
    createdInDb: true,
    
    


  })

 
  const platforms = ['PC', 'PlayStation 5', 'Xbox One', 'PlayStation 4', 'Xbox Series S/X', 'Nintendo Switch', 'iOS', 'Android', 'Nintendo 3DS', 'Nintendo DS', 'Nintendo DSi', 'macOS'];
  
  
  
  //VALIDACIONES  
  function handleSubmit(e) {
    e.preventDefault()
    
    const { name, description, released, rating, platforms, image, genres } = input
    if (name && description && released && rating && image && platforms.length && genres.length) {
      


      if (typeof input.image === "string") {
        const ima = input.image.slice(0, 5);
        
        if(!input.rating||input.rating<0||input.rating>5) return alert("el rating debe ser entre el 0 y 5")
        if (input.genres.length > 4) return alert("Máximo 4 generos")
        
        if (ima !== "https") {
          return alert("La imagen debe ser https")
          
          
          
        } else {
          
          
     
          dispatch(postVideoGame(input))
          dispatch(getVideoGames()) 
          dispatch(getGeneros())
          alert("Video Games creado con exito")
          setInput({
            
            name: "",
            description: "",
            released: "",
            rating: "",
            platforms: [],
            image: "",
            genres: [],
          
            
            
          })  
          
          setmensaje(true)

          setTimeout(()=>{
            setmensaje(false)
            history.push("/home")

          }, 50000)
        }  
      }  
    } else {
      return alert("falta completar campos")
    }  
    
  }  
  
  
  
  
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })  
  } console.log(input, "input")  

  
  
  function handleCheck(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        platforms: [...input.platforms, e.target.value]
      })  
    }  
  }  
  
  function handleSelecGenero(e) {
    setInput({
      ...input,
      genres: [...input.genres, e.target.value]
    })  
  }  

 

  
  function handleDelete(e) {
    setInput({
      ...input,
      genres: input.genres.filter(gen => gen !== e)
      
    })  
  }  
  
  
  
  useEffect(() => {
    dispatch(getGeneros())
  
  }, [dispatch])
  





  return (

    <div className='contenedores1'>
     {mensaje&&<div><h1>Seras redireccionado en unos segundos</h1></div>} 
      <h2>¡Crea tu Video Games!</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Nombre:</label>
          <input
            className='nombre'
            type="text"
            placeholder='Nombre'
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)} />
        </div>

        <div>
          <label>Descripcion:</label>
          <input
            className='nombre'
            type="text"
            placeholder='Escribe una descripcion'
            value={input.description}
            name="description"
            onChange={(e) => handleChange(e)} />

        </div>

        <div>
          <label>Publicado:</label>
          <input
            className='nombre'
            type="date"
            value={input.released}
            name="released"
            onChange={(e) => handleChange(e)} />

        </div>


        <div>
          <label>Rating:</label>
          <input
            className='nombre'
            type="number"
            value={input.rating}
            name="rating"
            step="0.01"
            // min="0"
            // max="5"
            onChange={(e) => handleChange(e)} />

        </div>

        <div>
          <label>Imagen:</label>
          <input
            className='nombre'
            type="text"
            placeholder='Ingresa una imagen https'
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)} />
        </div>

        {platforms.map((p) => (
          <div className="plataforms" key={p}>
            <input
              type="checkbox"
              name="platforms"
              value={p}
              onChange={(e) => handleCheck(e)} />

            <h4>{p}</h4>
          </div>))}

      

      

        <div className='genero'>
          <select onChange={(e) => handleSelecGenero(e)}>
            {todoGeneros.map((g) => (
              <option value={g.name}>
                {g.name}

              </option>
            ))}
          </select>
        </div>



        <div className='volver'>
          <button type="submit">Crear Video Games</button>
         <h1>---------------------------------</h1>


        </div>


      </form>
      {input.genres.map((e) =>
        <div className='gene' >
          <h6>{e}</h6>
          <button
            className='eliminar' onClick={() => handleDelete(e)}
          >x</button>
        </div>

      )}
    </div>
  )
}
