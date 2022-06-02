const axios = require("axios")
const {Genres} = require("../db")
const {API_KEY}= process.env



//CARGO GENEROS EN BD UNA VEZ LEVANTADO EL BACK 

async function getAllGenero(){
    try{
      
        let generos=(await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data.results?.map(e =>({name:e.name}))


       if(generos.length){ 
        for (var i = 0; i < generos.length; i++) {
        
            await Genres.findOrCreate({where:{name: generos[i].name}})
      
          }
        }
 
    console.log("Generos cargados en la BD")
    }catch(error){
        console.log(error)

    }
}


//ME TRAIGO LOS GENEROS DE LA BD A LA RUTA
function getGeneroBd(req,res,next){
    Genres.findAll()
    .then(generos=>res.send(generos))
    .catch(e=>next())
}



module.exports={
    getAllGenero,
    getGeneroBd
}