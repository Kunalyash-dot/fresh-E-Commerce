import React, { useEffect, useState } from 'react'
import NoData from '../components/NoData';
import Loading from '../components/Loading';
import UploadCategoryModel from '../components/UploadCategoryModel';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToasrError';
import EditCategory from '../components/EditCategory';
import ConfirmBox from '../components/ConfirmBox';

function CategoryPage() {
    const [openUploadCategory, setOpenUploadCategory] = useState(false);
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [editData, setEditData] = useState({
        name: "",
        image: "",
    });
    const [openConfimBoxDelete, setOpenConfirmBoxDelete] = useState(false)
    const [deleteCategory, setDeleteCategory] = useState({
        _id: ""
    })
    const fetchCategory = async () => {
        try {
            setLoading(true)
            const res = await Axios({
                ...SummaryApi.getCategory
            })
            console.log("category", res)
            if (res.status === 200) {
                setCategoryData(res.data.data)
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchCategory()
    }, [])

    const handleDeleteCategory = async () => {
        try {
            console.log(deleteCategory)
            const res = await Axios({
                ...SummaryApi.deleteCategory,
                data: deleteCategory
            })
            const { data: responseData } = res

            if (responseData.success) {
                toast.success(responseData.message)
                fetchCategory()
                setOpenConfirmBoxDelete(false)
            }

        } catch (error) {
            console.log(error)
            AxiosToastError(error)
        }
    }

    return (

        <section >
            <div className='p-2   bg-white shadow-md flex items-center justify-between'>
                <h2 className='font-semibold'>Category</h2>
                <button onClick={() => {
                    console.log(openUploadCategory);
                    setOpenUploadCategory(true);
                    console.log(openUploadCategory)
                }}
                    className='text-sm border border-green-200 hover:bg-green-200 px-3 py-1 rounded'>Add Category</button>
            </div>
            {
                !categoryData[0] && !loading && (
                    < NoData />
                )
            }
            <div className='p-4 grid  grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2'>
                {
                    categoryData.map((category, index) => {
                        return (
                            <div className='bg-white shadow-md rounded p-2 flex flex-col gap-2' key={category._id}>
                                <img src={category.image} className='w-full h-32 object-cover rounded' />
                                <h3 className='text-sm font-semibold'>{category.name}</h3>
                                <div className='flex items-center justify-between'>
                                    <button onClick={() => { setOpenEdit(true); setEditData(category) }} className='text-sm border border-yellow-200 hover:bg-yellow-200 px-3 py-1 rounded'>Edit</button>
                                    <button onClick={() => { setOpenConfirmBoxDelete(true); setDeleteCategory(category) }} className='text-sm border border-red-200 hover:bg-red-200 px-3 py-1 rounded'>Delete</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {loading && (
                <Loading />)}

            {openUploadCategory && (
                <UploadCategoryModel fetchData={fetchCategory} close={() => setOpenUploadCategory(false)} />
            )}
            {openEdit && (
                <EditCategory close={() => setOpenEdit(false)} data={editData} fetchData={fetchCategory} />
            )}
            {openConfimBoxDelete && (
                <ConfirmBox close={() => setOpenConfirmBoxDelete(false)} cancel={() => setOpenConfirmBoxDelete(false)} confirm={handleDeleteCategory} />
            )}
        </section>
    )
}

export default CategoryPage
