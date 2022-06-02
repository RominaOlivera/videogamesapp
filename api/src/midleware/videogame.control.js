const axios = require("axios")
const {Videogame, Genres} = require ("../db")
const {Op} = require("sequelize")
const e = require("express")
const {API_KEY}= process.env



//TRAIGO INFO API
async function getInfoApi(){

     const videogamePage1= await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=1`)
    //  const videogamePage2= await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`)
    //  const videogamePage3= await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`)
    //  const videogamePage4= await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`)
    //  const videogamePage5= await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`)


    const video = videogamePage1.data.results;
    //  const video1 = videogamePage1.data.results;
    //  const video2 = videogamePage2.data.results;
    //  const video3 = videogamePage3.data.results;
    //  const video4 = videogamePage4.data.results;
    //  const video5 = videogamePage5.data.results;
   
    // const video=[...video1, ...video2, ...video3, ...video4, ...video5]
    // const video=[...video1, ...video2]
   
     

     const descriArr=[]

     for(let vgame of video ){//ejecuta vgame por cada elemnto de lo que contiene video

     const id=vgame.id
     const {data}= await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
     let videoDescri={
        id: vgame.id,
        name: vgame.name,
        released: vgame.released,
        rating: vgame.rating,
        platforms: vgame.platforms? vgame.platforms.map(e=>e.platform.name).filter(e=> e !== null).join(", "): "No hay plataforma disponible",
        image:vgame.background_image,
        genres: data.genres?.map(e =>{return {name: e.name}}),
        description: data.description 
        
    }
   
    descriArr.push(videoDescri)


     }
     return descriArr
};





//TRAIGO CREADOS BASE DE DATOS

async function getInfoBd(){
    return await Videogame.findAll({
        include:{
            model: Genres,
            attributes:["name"],
            through:{attributes:[]}

        }
        
    })


}




//UNO AMBOS VIDEOJUEGOS y BUSCO POR NAME
const getAllVideo = async (req,res,next) => {

   try{
    const apiVideoData = await getInfoApi();
    const dbVideoData = await getInfoBd();
    
    const videoApiBd= apiVideoData.concat(dbVideoData)
  
    
    const name = req.query.name
    
    if(name){
        
        const videoName= apiVideoData.filter(e=>e.name.toUpperCase().includes(name.toUpperCase()))
        const videoBdName= await Videogame.findAll({
            where:{name:{
                [Op.iLike]: name}
                
            },
            include:{
                model: Genres,
                attributes:["name"],
                through:{attributes:[]}
                
            }
        })
        const todoVideoJuegos = videoName.concat(videoBdName)
       
        
   todoVideoJuegos.length?
   res.status(200).send(todoVideoJuegos):
   res.send(["Video juego no encontrado"])
    }else{

        res.status(200).send(videoApiBd)
    }
   

   }catch(error){
       next(error)
   }

};





 async function postVideoGame(req,res){


    const {
        name,
        description,
        released,
        rating,
        platforms,
        image,
        createdInDb,
        genres
        }= req.body



    const [newVideoJuego, create]= await Videogame.findOrCreate({

        where:{
     
        name,
        description,
        released,
        rating,
        platforms,
        image,
        createdInDb,
        
    },
    })
    
   for (const genero of genres) {
       
    let generoBd= await Genres.findOne({
        where:{name:{
        [Op.iLike]: genero}}
    })
   

  
    newVideoJuego.addGenres(generoBd)
   
   }
   res.send("El video juego ha sido creado con éxito")
    
   
  
  

}


  
  

async function getIdVideo(req,res){

try{
    const id=req.params.id;
    const videosTodo= await getInfoApi()
    
    if(id){
        
     let videoId = videosTodo.filter( e =>  e.id === parseInt(id))
        
       if(id.length> 10){ 
           
        var videoIdBd= await Videogame.findByPk(id, {
            include:{
                model: Genres,
                attributes:["name"],
                through:{attributes:[]}
                
            }})
        }
      const todoVideoId= videoId.concat(videoIdBd)
      todoVideoId.length?
      res.status(200).json(todoVideoId):
      res.status(404).send("Video juego no encontrado")
       }else{
   
           res.status(200).send(videoIdBd)
       }



    }catch(error){
     console.log(error)
    }

}







module.exports={
  getAllVideo, postVideoGame, getIdVideo
}
