const express = require ('express')
const router = express.Router()
const db = require('../db/db')

router.get('/all', async(req,res) => {
    try{
        let meetingRooms = await db.any(`SELECT * FROM meetingRooms`)
        console.log('meetingRooms', meetingRooms)
        res.json({
            payload: meetingRooms,
            message:'All meeting rooms retreived'
        })
    }catch (error){
        res.status(500)
        res.json({
            message:`Failed to retrieve data`
        })
        console.log(error)
    }
})

router.post ('/newroom', async (req,res) =>{
    let insertQuery = `INSERT INTO meetingRooms (name, capacity, floor)
                        VALUES ($1,$2,$3);`

    let name = req.body.name
    let capacity = req.body.capacity
    let floor = req.body.floor

    let body = {
        name: name,
        capcity: capacity,
        floor: floor
    }
    try{
        await db.none(insertQuery,[name,capacity,floor])
        res.json ({
            status : 'success',
            message:'New Room created',
            body:body
        })
    }catch (error){
        console.log(error)
        res.json({
            message: error.detail
        })
    }
})

router.get('/id/bookings', async (req, res) => {
    let id = req.params.id
    try {
        let bookings = await db.any(`SELECT * FROM bookings WHERE meetingRooms_id = ${id}`);
        res.json({
            payload: bookings,
            message: `Retrieved all bookings for this meeting room`
        });
    } catch (error) {
        res.status(500);
        res.json({
            message: `Unable to retrieve data`
        })
        console.log(error);
    }
 })

 module.exports = router;