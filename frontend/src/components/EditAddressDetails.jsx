import React from 'react'
import { useForm } from "react-hook-form"
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToasrError'
import { IoClose } from "react-icons/io5";
import { useGlobalContext } from '../provider/GlobalProvider'



function EditAddressDetails({close,data}) {
    const {register,handleSubmit,reset} = useForm({
        defaultValues:{
            _id: data._id,
            userId: data.userId,
            fullName : data.fullName,
            addressLine:data.addressLine,
            city:data.city,
            landmark:data.landmark,
            state:data.state,
            country:data.country,
            pincode:data.pincode,
            mobile:data.mobile
        }
    })
      const { fetchAddress } = useGlobalContext()

      const onSubmit = async(data)=>{
        try {
            const res = await Axios({
                ...SummaryApi.updateAddress,
                data:{
                    ...data,
                    addressId:data._id,
                    fullName :data.fullName,
                     mobile :data.mobile, 
                     addressLine : data.addressLine, 
                     city : data.city, 
                     state : data.state, 
                     pincode : data.pincode, 
                     country : data.country, 
                     landmark : data.landmark

                }
            })
            const {data:responseData}= res;
            if(responseData.success){
                toast.success(responseData.message)
                if(close){
                    close()
                    reset()
                    fetchAddress()
                }
            }
        } catch (error) {
         AxiosToastError(error)   
        }
      }
  return (
    <section className='bg-black fixed top-0 left-0 right-0 bottom-0 z-50 bg-opacity-70 h-screen overflow-auto'>
        <div className='bg-white p-4 w-full max-w-lg mt-8 mx-auto rounded'>
            <div className='flex justify-between items-center gap-4'>
                <h2 className='font-semibold'>Edit Address</h2>
                <button onClick={close} className='hover:text-red-500'>
                    <IoClose  size={25}/>
                </button>
            </div>
            <form className='mt-4 grid gap-4' onSubmit={handleSubmit(onSubmit)}>
                <div className='grid gap-1'>
                    <label htmlFor='fullName'>Full Name :</label>
                    <input
                        type='text'
                        id='fullName' 
                        className='border bg-blue-50 p-2 rounded'
                        {...register("fullName",{required : true})}
                    />
                </div>
                 <div className='grid gap-1'>
                    <label htmlFor='mobile'>Mobile No. :</label>
                    <input
                        type='text'
                        id='mobile' 
                        className='border bg-blue-50 p-2 rounded'
                        {...register("mobile",{required : true})}
                    />
                </div>
                <div className='grid gap-1'>
                    <label htmlFor='addressLine'>Address Line :</label>
                    <input
                        type='text'
                        id='addressLine' 
                        className='border bg-blue-50 p-2 rounded'
                        {...register("addressLine",{required : true})}
                    />
                </div>
                <div className='grid gap-1'>
                    <label htmlFor='city'>City :</label>
                    <input
                        type='text'
                        id='city' 
                        className='border bg-blue-50 p-2 rounded'
                        {...register("city",{required : true})}
                    />
                </div>
                <div className='grid gap-1'>
                    <label htmlFor='landmark'>Land Mark :</label>
                    <input
                        type='text'
                        id='landmark' 
                        className='border bg-blue-50 p-2 rounded'
                        {...register("landmark",{required : true})}
                    />
                </div>
                <div className='grid gap-1'>
                    <label htmlFor='state'>State :</label>
                    <input
                        type='text'
                        id='state' 
                        className='border bg-blue-50 p-2 rounded'
                        {...register("state",{required : true})}
                    />
                </div>
                 <div className='grid gap-1'>
                    <label htmlFor='country'>Country :</label>
                    <input
                        type='text'
                        id='country' 
                        className='border bg-blue-50 p-2 rounded'
                        {...register("country",{required : true})}
                    />
                </div>
                <div className='grid gap-1'>
                    <label htmlFor='pincode'>Pincode :</label>
                    <input
                        type='text'
                        id='pincode' 
                        className='border bg-blue-50 p-2 rounded'
                        {...register("pincode",{required : true})}
                    />
                </div>
               
               

                <button type='submit' className='bg-green-200 w-full  py-2 font-semibold mt-4 hover:bg-green-300'>Submit</button>
            </form>
        </div>
    </section>
  )
}

export default EditAddressDetails
