import React from 'react'
import { postVideoGame, getGeneros } from '../redux/action/action'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import "./createVideo.css"

export default function CreateVideo() {

  const dispatch = useDispatch()
  const history = useHistory()
  const todoGeneros = useSelector(state => state.Generos)

  const [input, setInput] = useState({

    name: "",
    description: "",
    released: "",
    rating: "",
    platforms: [],
    image: "",
    genres: [],
    createdInDb: true


  })

  const platforms = ['PC', 'PlayStation 5', 'Xbox One', 'PlayStation 4', 'Xbox Series S/X', 'Nintendo Switch', 'iOS', 'Android', 'Nintendo 3DS', 'Nintendo DS', 'Nintendo DSi', 'macOS'];





//VALIDACIONES
  function handleSubmit(e) {
    e.preventDefault()

    const { name, description, released, rating, platforms, image } = input
    if (name && description && released && rating && image && platforms.length) {

      if (typeof input.image === "string") {
        const ima = input.image.slice(0, 5);

        if (input.genres.length > 4) return alert("Máximo 4 generos")
        
        if (ima !== "https") {
          return alert("La imagen debe ser https")



        } else {


          // console.log(input)
          dispatch(postVideoGame(input))
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
          history.push("./home")
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
    // if(!input.genres.includes(e.target.value)) 
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
      <h2>¡Crea tu Video Games!</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Nombre:</label>
          <input
            className='nombre'
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)} />
        </div>

        <div>
          <label>Descripcion:</label>
          <input
            className='nombre'
            type="text"
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
            min="0"
            max="5"
            onChange={(e) => handleChange(e)} />

        </div>

        <div>
          <label>Imagen:</label>
          <input
            className='nombre'
            type="text"
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
          <h6 type="submit"><button>Crear Video Games</button></h6>
          <Link to="/home"><button>  Volver </button></Link>


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
