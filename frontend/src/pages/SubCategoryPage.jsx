import React, { useState,useEffect } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
// import { LuPencil } from "react-icons/lu";
import { MdDelete  } from "react-icons/md";
import { HiPencil } from "react-icons/hi";
import ConfirmBox from '../components/ConfirmBox'
import DisplayTable from '../components/DisplayTable'
import UploadSubCategoryModel from '../components/UploadSubCategoryModel'
import EditSubCategory from '../components/EditSubCategory'
import ViewImage from '../components/ViewImage'
import AxiosToastError from '../utils/AxiosToasrError'

function SubCategoryPage() {
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false);
  const [data,setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const columnHelper = createColumnHelper();
  const [ImageURL, setImageURL] = useState('');
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    _id:""
  });
  const [deleteSubCategory, setDeleteSubCategory] = useState({
    _id:""
  });
  const [openDeleteConfirmBox, setOpenDeleteConfirmBox] = useState(false);
 const fetchSubCategory = async () => {

  try {
    setLoading(true);
    const res = await Axios({
      ...SummaryApi.getSubCategory
    })
    //console.log(res)
    if (res.status === 200) {
      setData(res.data.data);
      setLoading(false);
    } else {
      setLoading(false);
      toast.error(res.data.message);
    }
  } catch (error) {
    AxiosToastError(error)
  } finally {
    setLoading(false);
  }
   }
   useEffect(() => {
    fetchSubCategory()
  }
  ,[])
  const column = [
    columnHelper.accessor('name',{
      header:"Name"
    }),
    columnHelper.accessor('image',{
      header:"Image",
      cell: ({row}) => {
        //console.log(row)
        return (
          <div className='flex justify-center items-center'>
            <img src={row.original.image} alt={row.original.name} className='w-8 h-8 cursor-pointer' onClick={()=>{
              setImageURL(row.original.image)
            
            }} />
          </div>
        )
      }
    }),
    columnHelper.accessor('category',{
      header:"Category",
      cell: ({row}) => {
        return (
          <>
            {
              row.original.category.map((c,index)=>{
                return(
                  <p key={c._id+"table"} className='shadow-md px-1 inline-block'>{c.name}</p>
                )
              })
            }
          </>
        )
      }
    }),
    columnHelper.accessor("_id",{
      header : "Action",
      cell : ({row})=>{
        return(
          <div className='flex items-center justify-center gap-3'>
              <button onClick={()=>{
                  setOpenEdit(true)
                  setEditData(row.original)
              }} className='p-2 bg-green-100 rounded-full hover:text-green-600'>
                  <HiPencil size={20}/>
              </button>
              <button onClick={()=>{
                setOpenDeleteConfirmBox(true)
                setDeleteSubCategory(row.original)
              }} className='p-2 bg-red-100 rounded-full text-red-500 hover:text-red-600'>
                  <MdDelete  size={20}/>
              </button>
          </div>
        )
      }
    })
  ]

  const handleDeleteSubCategory = async () => {
  
  try {
    const res = await Axios({
      ...SummaryApi.deleteSubCategory,
      data:deleteSubCategory
    })
    //console.log(res)
    if (res.data.success) {
      toast.success(res.data.message);
      setOpenDeleteConfirmBox(false);
      fetchSubCategory(),
      setDeleteSubCategory({
        _id:""
      })
    } 
  } catch (error) {
    AxiosToastError(error)
  }}

  return (
    <section>
       <div className='p-2   bg-white shadow-md flex items-center justify-between'>
            <h2 className='font-semibold'>Sub Category</h2>
            <button onClick={()=>setOpenAddSubCategory(true)} className='text-sm border border-pink-200 hover:bg-pink-300 px-3 py-1 rounded'>Add Sub Category</button>
        </div>
        <div className='overflow-auto w-full max-w-[95vw]'>
            <DisplayTable
                data={data}
                column={column}
            />
        </div>
        {
          openAddSubCategory && (
            <UploadSubCategoryModel 
              close={()=>setOpenAddSubCategory(false)}
              fetchData={fetchSubCategory}
            />
          )
        }

        {
          ImageURL &&
          <ViewImage url={ImageURL} close={()=>setImageURL("")}/>
        }

        {
          openEdit && 
          <EditSubCategory 
            data={editData} 
            close={()=>setOpenEdit(false)}
            fetchData={fetchSubCategory}
          />
        }

        {
          openDeleteConfirmBox && (
            <ConfirmBox 
              cancel={()=>setOpenDeleteConfirmBox(false)}
              close={()=>setOpenDeleteConfirmBox(false)}
              confirm={handleDeleteSubCategory}
            />
          )
        }
    </section>
  )
}

export default SubCategoryPage
