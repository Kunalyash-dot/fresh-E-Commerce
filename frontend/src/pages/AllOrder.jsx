import React, { useEffect, useState } from 'react'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import NoData from '../components/NoData'

function AllOrder() {
    const [order,setOrder] = useState([])

    const fetchAllOrder =async ()=>{
try {
    const res = await Axios({
        ...SummaryApi.getAllOrder,
    })
     const { data: responseData } = res
      if (responseData.success) {
                setOrder(responseData.data)
            }
} catch (error) {
    console.log(error)
}
    }
    //console.log(order)

useEffect(()=>{
    fetchAllOrder()
},[])
  return (
    <div>
      <div className='bg-white shadow-md p-3 font-semibold'>
        <h1>Order</h1>
      </div>
        {
          !order[0] && (
            <NoData/>
          )
        }
        {
          order.map((order,index)=>{
            return(
              <div key={order._id+index+"order"} className='order rounded p-4 text-sm'>
                <div>
<p>Full name : {order?.userId?.name}</p>
                  <p>Contact Number : {order?.delivery_address.mobile}</p>
                  <p>Delivery Address: {order.delivery_address
.addressLine},{order.delivery_address.city},{order.delivery_address.pincode} </p>
                </div>

                  <p>Order No : {order?.orderId}</p>
                  
                  <div className='flex gap-3'>
                    <img
                      src={order.product_details.image[0]} 
                      className='w-14 h-14'
                    />  
                    <p className='font-medium'>{order.product_details.name}</p>
                  </div>
                 
              </div>
            )
          })
        }
    </div>
  )
}

export default AllOrder
