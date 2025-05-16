import React, { useState } from 'react'
import SummaryApi from '../common/SummaryApi';
import { IoClose } from 'react-icons/io5';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToasrError';
import Axios from '../utils/Axios';
import uploadImage from '../utils/UploadImage'

function EditCategory({close, fetchData, data:CategoryData}) {
  const [data, setData] = useState({
    name: CategoryData.name,
    image: CategoryData.image
  });
  const [loading, setLoading] = useState(false);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // //console.log("working inside edit category")
    //console.log("Submitted data:", data);
    try {
    
      const res = await Axios({
        ...SummaryApi.updateCategory,
        data:{
          _id: CategoryData._id,
          name: data.name,
          image: data.image
        }
      });
 
      //console.log("response",res)
      if (res.status === 200) {
        toast.success("Category updated successfully");
        fetchData();
        close();
      }
    } catch (error) {
      //console.log(error)
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadCategoryImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    const response = await uploadImage(file);
    setLoading(false);
    if (response.status === 200) {
      setData((prev) => ({
        ...prev,
        image: response.data.data.url
      }));
    }
  };

  return (
    <section className='fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center'>
    <div className='bg-white max-w-4xl w-full p-4 rounded'>
        <div className='flex items-center justify-between'>
            <h1 className='font-semibold'>Update Category</h1>
            <button onClick={close} className='w-fit block ml-auto'>
                <IoClose size={25}/>
            </button>
        </div>
        <form className='my-3 grid gap-2' onSubmit={handleSubmit}>
            <div className='grid gap-1'>
                <label id='categoryName'>Name</label>
                <input
                    type='text'
                    id='categoryName'
                    placeholder='Enter category name'
                    value={data.name}
                    name='name'
                    onChange={handleOnChange}
                    className='bg-blue-50 p-2 border border-blue-100 focus-within:border-black outline-none rounded'
                />
            </div>
            <div className='grid gap-1'>
                <p>Image</p>
                <div className='flex gap-4 flex-col lg:flex-row items-center'>
                    <div className='border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded'>
                        {
                            data.image ? (
                                <img
                                    alt='category'
                                    src={data.image}
                                    className='w-full h-full object-scale-down'
                                />
                            ) : (
                                <p className='text-sm text-neutral-500'>No Image</p>
                            )
                        }
                        
                    </div>
                    <label htmlFor='uploadCategoryImage'>
                        <div  className={`
                        ${!data.name ? "bg-gray-400" : "border-yellow-300 hover:bg-yellow-500" }  
                            px-4 py-2 rounded cursor-pointer border font-medium
                        `}>
                            {
                                loading ? "Loading..." : "Upload Image"
                            }
                           
                        </div>

                        <input disabled={!data.name} onChange={handleUploadCategoryImage} type='file' id='uploadCategoryImage' className='hidden'/>
                    </label>
                    
                </div>
            </div>

            <button
                className={`
                ${data.name && data.image ? "bg-green-200 hover:bg-green-300" : "bg-gray-400 "}
                py-2    
                font-semibold 
                `}
            >Update Category</button>
        </form>
      
    </div>
    </section>
  )
}

export default EditCategory
