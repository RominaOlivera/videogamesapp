

const initialState={
    Videogames: [],
    Generos:[],
    Videogames2: [],
    Detail: [],
    


}



function rootReducer(state=initialState, action){
    switch(action.type){
        
        case "GET_VIDEOGAMES":
            // console.log(action.payload,"payloaaad")
          return{
             ...state,
             Videogames: action.payload,
             Videogames2:action.payload
             
          }

          case "GET_GENEROS":
              return{
                  ...state,
                  Generos: action.payload
                  

              }


              case "GET_NAME":
                  return{
                      ...state,
                      Videogames: action.payload                   
                  }

                  case "GET_DETAIL":
                      return{
                          ...state,
                          Detail: action.payload
                      }

                    

                   
                    //   case "BORRAR_DETAIL":
                    //     return{
                    //         ...state,
                    //         Detail: []
                    //     }


                  case "POST_VIDEO":
                      return{
                          ...state
                      }


              //FILTROS
            case "FILTER_BY_GENERO":
                const todosVideoGame= state.Videogames2
                const filterGenero= todosVideoGame.filter(e => e.genres?.find(e => e.name === action.payload))
                if(!filterGenero.length){

                    return{
                        ...state,
                       Videogames: "No se encuentra genero",
                  
                    }
    
                }else  return{
                    ...state,
                    Videogames: filterGenero,
              

                }

               
      
                
               

                case "FILTER_BY_CREADOS":
                    const todosVideoGame2=state.Videogames2
                    const filterCreado= action.payload === "creados"? todosVideoGame2.filter(e=>e.createdInDb) : todosVideoGame2.filter(e=> !e.createdInDb)
                    

                    // console.log(filterCreado, "filter")
                    // console.log(todosVideoGame2, "todoVideo2")
                    return{
                        ...state,
                        Videogames: action.payload === "todos" ? state.Videogames2: filterCreado,
                        // Cache: state.Filtrado
                    }

                    //ORDENAMIENTOS

                    case "ORDEN_POR_NOMBRE":

                        let sort= action.payload === "asc"?
                        state.Videogames.sort(function(a,b){
                            if(a.name > b.name){
                                return 1;
                            }
                            if(b.name > a.name){
                                return -1;
                            }
                            return 0;
                            
                        }) :
                        state.Videogames.sort(function(a,b){
                            if(a.name > b.name){
                                return -1;
                            }
                            if(a.name > b.name){
                                return 1;
                            }
                            return 0
                        })
                        
                        
                       
                        return {
                            ...state,
                            Videogames:sort
                            
                       }

     
                       case "ORDEN_POR_RATING":
                       
                    let sortRating= action.payload === "rating-"?
                    state.Videogames.sort(function(a,b){
                        
                        return a.rating - b.rating
                        
                    }): state.Videogames.sort(function(a,b){

                        return b.rating- a.rating

                    })
                    
                   
                        return {
                            ...state,
                            Videogames:sortRating
                            
                        }  


               


     default:
          return state;

    }

 
                         
                 
}

    
                
                    



export default rootReducer;