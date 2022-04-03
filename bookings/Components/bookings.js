import {useState, useEffect} from 'react'
import axios from 'axios'

function Bookings () {
   const [bookings, setBookings] = useState([])

   useEffect (async  () => {
      let res = await axios.get(`https://localhost:3001/bookings/all`)
      console.log(res)
      setBookings (res.data.bookings)
   }, [])

   return (
      <div className='App'>
         {
            bookings.map(el =>
               return <div className='bookingCard'>
                      <div
         }
      </div>
   )
}