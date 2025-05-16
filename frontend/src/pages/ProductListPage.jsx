import React, { useEffect, useState } from 'react'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { Link, useParams } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToasrError'
import Loading from '../components/Loading'
import CardProduct from '../components/CardProduct'
import { validURLConvert } from '../utils/validURLConvert'
import { useSelector } from 'react-redux'

function ProductListPage() {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPage, setTotalPage] = useState(1)
  const params = useParams()
  const AllSubCategory = useSelector(state => state.product.allSubCategory);
 

  const [DisplaySubCatory, setDisplaySubCategory] = useState([])
  const subCategory = params?.subCategory?.split("-")
  const subCategoryName = subCategory?.slice(0, subCategory?.length - 1)?.join(" ")

  const categoryId = params.category.split("-").slice(-1)[0]
  const subCategoryId = params.subCategory.split("-").slice(-1)[0]

  const fetchProductdata = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId: categoryId,
          subCategoryId: subCategoryId,
          page: page,
          limit: 20,
        }
      })
console.log(response)
      const { data: responseData } = response

      if (responseData.success) {
        if (responseData.page == 1) {
          setData(responseData.data)
        } else {
          setData([...data, ...responseData.data])
        }
        setTotalPage(responseData.totalCount)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    fetchProductdata()
  }, [params])

  useEffect(() => {
    const sub = AllSubCategory.filter(s => {
      const filterData = s.category.some(el => {
        return el._id == categoryId
      })

      return filterData ? filterData : null
    })
    setDisplaySubCategory(sub)
  }, [params, AllSubCategory])

  return (
     <section className="w-full h-screen ">
  <div className="container mx-auto flex h-screen">
    {/* Left Sidebar */}
    <div className="w-[90px] md:w-[200px] lg:w-[280px] min-h-screen max-h-screen overflow-y-auto bg-white shadow-md p-2 scrollbarCustom">
      {DisplaySubCatory.map((s, index) => {
        const link = `/${validURLConvert(s?.category[0]?.name)}-${s?.category[0]?._id}/${validURLConvert(s.name)}-${s._id}`;
        return (
          <Link
            to={link}
            key={index}
            className={`block p-2 lg:flex items-center lg:gap-4 border-b hover:bg-green-100 cursor-pointer ${
              subCategoryId === s._id ? "bg-green-100" : ""
            }`}
          >
            <div className="w-fit max-w-28 mx-auto lg:mx-0 bg-white rounded box-border">
              <img
                src={s.image}
                alt="subCategory"
                className="w-14 h-14 object-scale-down"
              />
            </div>
            <p className="mt-1 lg:mt-0 text-xs text-center lg:text-left lg:text-base">
              {s.name}
            </p>
          </Link>
        );
      })}
 
 
    </div>

    {/* Right Product Content */}
    <div className="flex-1 flex flex-col h-full">
      <div className="bg-white shadow-md p-4 z-10 sticky top-0">
        <h3 className="font-semibold">{subCategoryName}</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((p, index) => (
            <CardProduct
              data={p}
              key={p._id + "productSubCategory" + index}
            />
          ))}
        </div>
        {loading && <Loading />}
      </div>
    </div>
  </div>
</section>

  )
}

export default ProductListPage
