import React, { useState } from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../utils/UploadImage'
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToasrError'
import ViewImage from '../components/ViewImage';
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux'
import { IoClose } from "react-icons/io5";
import Loading from '../components/Loading';
import AddFieldComponent from '../components/AddFieldComponent';
import SuccessAlert from '../utils/SuccessAlert';

function UploadProduct() {
  const [data,setData] = useState({
    name:"",
    image:[],
    category:[],
    subCategory:[],
    stock:0,
    price:0,
    discount:0,
    description:"",
    more_details:{},
  });
const [imageLoading,setImageLoading] = useState(false);
const [viewImageURL,setViewImageURL] = useState("");
const allCategory = useSelector(state=>state.product.allCategory);
const [selectCategory,setSelectCategory]= useState("");
const [selectSubCategory,setSelectSubCategory] = useState("");
const allSubCategory = useSelector(state=>state.product.allSubCategory)
const [openAddField,setOpenAddField] = useState(false);
const [fieldName,setFieldName] = useState("");

const handleChange = (e)=>{
  const {name,value} = e.target;
  setData((prev)=>{
    return {
      ...prev,
      [name] : value
    }
  })
}

const handleUploadImage = async(e)=>{
  const file = e.target.files[0];

  if(!file) return;

  setImageLoading(true);
  const res = await uploadImage(file)
  const {data : ImageResponse} = res;
  const imageUrl = ImageResponse.data.url;

  setData((prev)=>{
    return {
      ...prev,
      image:[...prev.image,imageUrl]
    }
  })
  setImageLoading(false);
}

const handleDeleteImage = async(index)=>{
  data.image.splice(index,1)
  setData((prev)=>{
    return{
      ...prev
    }
  })
}

const handleRemoveCategory = async(index)=>{
  data.category.splice(index,1);
  setData((prev)=>{
    return {
      ...prev
    }
  })
}

const handleRemoveSubCategory = async(index)=>{
  data.subCategory.splice(index,1)
  setData((prev)=>{
    return{
      ...prev
    }
  })
}

const handleAddField = ()=>{
  setData((prev)=>{
    return {
      ...prev,
      more_details:{
        ...prev.more_details,
        [fieldName] :""
      }
    }
  })
  setFieldName("")
  setOpenAddField(false)
}

const handleSubmit = async(e)=>{
  e.preventDefault();
  console.log("data",data);

  try {
   
   
    const res = await Axios({
      ...SummaryApi.createProduct,
      data:{
        name:data.name,
        description :data.description,
        price:Number(data.price) ,
        category: data.category.map(cat => cat._id),
    subCategory: data.subCategory.map(sub => sub._id),
        image :data.image,
        stock:Number(data.stock),
        discount:Number(data.discount),
        more_details:data.more_details

      }
    })
    // console.log(res)
    const {data: responseData} = res;
    if(responseData.success){
      SuccessAlert(responseData.message);
      setData({
        name:"",
    image:[],
    category:[],
    subCategory:[],
    stock:"",
    price:"",
    discount:"",
    description:"",
    more_details:{},
      })
    }
  } catch (error) {
    console.log(error)
    AxiosToastError(error)
  }
}
  return (
    <section>
       <div className='p-2   bg-white shadow-md flex items-center justify-between'>
            <h2 className='font-semibold'>Upload Product</h2>
        </div>
        <div className='grid p-3'>
            <form className='grid gap-4' onSubmit={handleSubmit}>
                <div className='grid gap-1'>
                  <label htmlFor='name' className='font-medium'>Name</label>
                  <input 
                    id='name'
                    type='text'
                    placeholder='Enter product name'
                    name='name'
                    value={data.name}
                    onChange={handleChange}
                    required
                    className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
                  />
                </div>
                <div className='grid gap-1'>
                  <label htmlFor='description' className='font-medium'>Description</label>
                  <textarea 
                    id='description'
                    type='text'
                    placeholder='Enter product description'
                    name='description'
                    value={data.description}
                    onChange={handleChange}
                    required
                    multiple 
                    rows={3}
                    className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded resize-none'
                  />
                </div>
                <div>
                    <p className='font-medium'>Image</p>
                    <div>
                      <label htmlFor='productImage' className='bg-blue-50 h-24 border rounded flex justify-center items-center cursor-pointer'>
                          <div className='text-center flex justify-center items-center flex-col'>
                            {
                              imageLoading ?  <Loading/> : (
                                <>
                                   <FaCloudUploadAlt size={35}/>
                                   <p>Upload Image</p>
                                </>
                              )
                            }
                          </div>
                          <input 
                            type='file'
                            id='productImage'
                            className='hidden'
                            accept='image/*'
                            onChange={handleUploadImage}
                          />
                      </label>
                      {/**display uploded image*/}
                      <div className='flex flex-wrap gap-4'>
                        {
                          data.image.map((img,index) =>{
                              return(
                                <div key={img+index} className='h-20 mt-1 w-20 min-w-20 bg-blue-50 border relative group'>
                                  <img
                                    src={img}
                                    alt={img}
                                    className='w-full h-full object-scale-down cursor-pointer' 
                                    onClick={()=>setViewImageURL(img)}
                                  />
                                  <div onClick={()=>handleDeleteImage(index)} className='absolute bottom-0 right-0 p-1 bg-red-600 hover:bg-red-600 rounded text-white hidden group-hover:block cursor-pointer'>
                                    <MdDelete/>
                                  </div>
                                </div>
                              )
                          })
                        }
                      </div>
                    </div>

                </div>
                <div className='grid gap-1'>
                  <label className='font-medium'>Category</label>
                  <div>
                    <select
                      className='bg-blue-50 border w-full p-2 rounded'
                      value={selectCategory}
                      onChange={(e)=>{
                        const value = e.target.value 
                        const category = allCategory.find(el => el._id === value )
                        
                        setData((preve)=>{
                          return{
                            ...preve,
                            category : [...preve.category,category],
                          }
                        })
                        setSelectCategory("")
                      }}
                    >
                      <option value={""}>Select Category</option>
                      {
                        allCategory.map((c,index)=>{
                          return(
                            <option key={index+1} value={c?._id}>{c.name}</option>
                          )
                        })
                      }
                    </select>
                    <div className='flex flex-wrap gap-3'>
                      {
                        data.category.map((c,index)=>{
                          return(
                            <div key={c._id+index+"productsection"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
                              <p>{c.name}</p>
                              <div className='hover:text-red-500 cursor-pointer' onClick={()=>handleRemoveCategory(index)}>
                                <IoClose size={20}/>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
                <div className='grid gap-1'>
                  <label className='font-medium'>Sub Category</label>
                  <div>
                    <select
                      className='bg-blue-50 border w-full p-2 rounded'
                      value={selectSubCategory}
                      onChange={(e)=>{
                        const value = e.target.value 
                        const subCategory = allSubCategory.find(el => el._id === value )

                        setData((preve)=>{
                          return{
                            ...preve,
                            subCategory : [...preve.subCategory,subCategory]
                          }
                        })
                        setSelectSubCategory("")
                      }}
                    >
                      <option value={""} className='text-neutral-600'>Select Sub Category</option>
                      {
                        allSubCategory.map((c,index)=>{
                          return(
                            <option key={index+1} value={c?._id}>{c.name}</option>
                          )
                        })
                      }
                    </select>
                    <div className='flex flex-wrap gap-3'>
                      {
                        data.subCategory.map((c,index)=>{
                          return(
                            <div key={c._id+index+"productsection"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
                              <p>{c.name}</p>
                              <div className='hover:text-red-500 cursor-pointer' onClick={()=>handleRemoveSubCategory(index)}>
                                <IoClose size={20}/>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>

                <div className='grid gap-1'>
                  <label htmlFor='stock' className='font-medium'>Number of Stock</label>
                  <input 
                    id='stock'
                    type='number'
                    placeholder='Enter product stock'
                    name='stock'
                    value={data.stock}
                    onChange={handleChange}
                    required
                    className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
                  />
                </div>

                <div className='grid gap-1'>
                  <label htmlFor='price' className='font-medium'>Price</label>
                  <input 
                    id='price'
                    type='number'
                    placeholder='Enter product price'
                    name='price'
                    value={data.price}
                    onChange={handleChange}
                    required
                    className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
                  />
                </div>

                <div className='grid gap-1'>
                  <label htmlFor='discount' className='font-medium'>Discount</label>
                  <input 
                    id='discount'
                    type='number'
                    placeholder='Enter product discount'
                    name='discount'
                    value={data.discount}
                    onChange={handleChange}
                    required
                    className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
                  />
                </div>


                {/**add more field**/}
                  {
                    Object?.keys(data?.more_details)?.map((k,index)=>{
                        return(
                          <div className='grid gap-1' key={k+index}>
                            <label htmlFor={k} className='font-medium'>{k}</label>
                            <input 
                              id={k}
                              type='text'
                              value={data?.more_details[k]}
                              onChange={(e)=>{
                                  const value = e.target.value 
                                  setData((preve)=>{
                                    return{
                                        ...preve,
                                        more_details : {
                                          ...preve.more_details,
                                          [k] : value
                                        }
                                    }
                                  })
                              }}
                              required
                              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
                            />
                          </div>
                        )
                    })
                  }

                <div onClick={()=>setOpenAddField(true)} className=' hover:bg-primary-200 bg-white py-1 px-3 w-32 text-center font-semibold border border-primary-200 hover:text-neutral-900 cursor-pointer rounded'>
                  Add Fields
                </div>

                <button
                  className='bg-green-200 hover:bg-green-300 py-2 rounded font-semibold'
                >
                  Submit
                </button>
            </form>
        </div>

        {
          viewImageURL && (
            <ViewImage url={viewImageURL} close={()=>setViewImageURL("")}/>
          )
        }

        {
          openAddField && (
            <AddFieldComponent 
              value={fieldName}
              onChange={(e)=>setFieldName(e.target.value)}
              submit={handleAddField}
              close={()=>setOpenAddField(false)} 
            />
          )
        }

    </section>
  )
}

export default UploadProduct
