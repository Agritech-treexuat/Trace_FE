import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import EventFarmComponent from '../../Components/EventFarm/EventFarm'
import Footer from '../../Components/Footer/Footer'

const EventFarm = () => {
  return (
    <>
        <Navbar />
        <EventFarmComponent />
        <Footer />
    </>
  )
}

export default EventFarm