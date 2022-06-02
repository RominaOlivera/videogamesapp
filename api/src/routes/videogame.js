const {Router} = require("express")
const {getAllVideo, postVideoGame, getIdVideo}=require("../midleware/videogame.control")


const router= Router()

router.get("/videogames",getAllVideo)
router.get("/videogame/:id", getIdVideo )
router.post("/videogame", postVideoGame)



module.exports= router;