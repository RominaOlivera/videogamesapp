import axios from "axios"



export function getVideoGames(){
    return async function(dispatch){
        var json= await axios (`${process.env.REACT_APP_VIDEOGAMES}/videogames`)
        return dispatch({
            type: "GET_VIDEOGAMES",
            payload: json.data
        })
    }
}

export function getGeneros(){
    return async function(dispatch){
        var json= await axios (`${process.env.REACT_APP_VIDEOGAMES}/genres`)
      
        return dispatch({
            type: "GET_GENEROS",
            payload: json.data

    })
}
}


export function getName(name){
    return async function(dispatch){
        var json= await axios (`${process.env.REACT_APP_VIDEOGAMES}/videogames?name=${name}`)
        return dispatch({
            type: "GET_NAME",
            payload: json.data

    })
}
}

export function getDetail(id){
    return async function(dispatch){
        var json= await axios (`${process.env.REACT_APP_VIDEOGAMES}/videogame/${id}`)
        return dispatch({
            type: "GET_DETAIL",
            payload: json.data

    })
}
}





export function postVideoGame(payload){

    return async function(dispatch){
        var respuesta= await axios.post(`${process.env.REACT_APP_VIDEOGAMES}/videogame`, payload);
        return respuesta
}
}           









export function filterVideoByGenero(payload){
    return{
        type: "FILTER_BY_GENERO",
        payload
    }
}

export function filterVideoByCreados(payload){
    return{
        type: "FILTER_BY_CREADOS",
        payload
    }
}


// export function borrarDetail(payload){
//     return{
//         type: "BORRAR_DETAIL",
//         payload
//     }
// }


export function OrdenPorNombres(payload){
    console.log(payload, "payload")
    return{
        type: "ORDEN_POR_NOMBRE",
        payload
    }
}


export function OrdenPorRating(payload){
    // console.log(payload, "payload")
    return{
        type: "ORDEN_POR_RATING",
        payload
    }
}


