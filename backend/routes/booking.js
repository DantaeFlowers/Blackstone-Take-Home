const express = require ('express')
const router = express.Router()
const db = require('../db/db')

router.get('/all', async(req,res) => {
    try{
        let bookings = await db.any(`SELECT * FROM bookings`)
        console.log('bookings', bookings)
        res.json({
            payload: bookings,
            message:'All bookings retreived'
        })
    }catch (error){
        res.status(500)
        res.json({
            message:`Failed to retrieve data`
        })
        console.log(error)
    }
})

router.post ('/newbooking', async (req,res) =>{
    let insertQuery = `INSERT INTO booking (meetingName, meetingRoom_id, startSate, endDate)
                        VALUES ($1,$2,$3,$4);`

    let meetingName = req.body.meetingName
    let meetingRoom_id = req.body.meetingRoom_id
    let startDate = req.body.startDate
    let endDate = req.body.endDate

    let body = {
        meetingName: meetingName,
        meetingRoom_id: meetingRoom_id,
        startDate: startDate,
        endDate: endDate
    }

    try{
        await db.none(insertQuery,[meetingName,meetingName,startDate,endDate])
        res.json ({
            status : 'Success',
            message:'New booking created',
            body:body
        })
    }catch (error){
        console.log(error)
        res.json({
            message: error.detail
        })
    }
})

module.exports = router;

// router.delete('/cancel/:id', async (req,res) => {
//     let id = req.params.id
//     let deleteQuery = `DELETE FROM bookings WHERE id = ${id}`
// })