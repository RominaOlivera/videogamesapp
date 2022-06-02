const {Router} = require("express")
const {getGeneroBd}= require("../midleware/genres.control")

const router= Router()

router.get("/genres", getGeneroBd)



module.exports= router;