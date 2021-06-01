const Express = require("express");
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");

//Import the Journal Model
const {logModel} = require('../models');

router.get('/practice',validateJWT, (req, res) => {
    res.send('Hey!! This is a practice route!')
});

/*
=====================
log create start
=====================
*/

router.post('/create',validateJWT, async (req, res) => {
    const {description,definition,result, owner_id} = req.body.log;
    const {id} = req.user;
    
    const logEntry = {
        description,
        definition,
        result,
        owner_id,
        id
    }
    try{
        const newLog = await logModel.create(logEntry);
        res.status(200).json(newLog);
    } catch(err){
        res.status(500).json({error:err});
    }
    logModel.create(logEntry)
});

/*
=====================
log create end
=====================
*/

router.get("/about", (req, res) => {
    res.send('This is about route!')
});

module.exports = router;

/*
=====================
Get All
=====================
*/
router.get("/", async(req, res) => {
    try {
        const entries = await logModel.findAll();
        res.status(200).json(entries);
    }catch(err){
        res.status(500).json({error:err});
    }
});
/*
=====================
Get log by user
=====================
*/
router.get("/mine",validateJWT, async(req, res) => {
    let {id} = req.user;
    try {
        const userLogs = await logModel.findAll({
            where:{
                id:id
            }
        });
        res.status(200).json(userLogs);
    }catch(err){
        res.status(500).json({error:err});
    }
});
/*
=====================
Get log by title
=====================
*/
router.get("/:id", async(req, res) => {
    let {id} = req.params;
    try {
        const userLogs = await logModel.findAll({
            where:{
                id:id
            }
        });
        res.status(200).json(userLogs);
    }catch(err){
        res.status(500).json({error:err});
    }
});

/*
=====================
Update a log
=====================


router.put("/update/:id", validateJWT, async(req, res) =>{


})

*/
