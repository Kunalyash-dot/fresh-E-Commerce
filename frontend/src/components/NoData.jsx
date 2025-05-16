import React from 'react'
import noDataImage from '../assets/nothing here yet.webp'

function NoData() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
        <img src={noDataImage} alt="No Data" className='w-36' />
        <h2 className='text-2xl font-semibold'>No Data Available</h2>
        <p className='text-gray-500'>Please check back later.</p>
      
    </div>
  )
}

export default NoData
