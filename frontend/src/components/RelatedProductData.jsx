import React, { useEffect, useState } from 'react'
import Axios from '../utils/Axios';

import CardLoading from './CardLoading';
import CardProduct from './CardProduct';
import SummaryApi from '../common/SummaryApi';
import scrollTop from '../utils/ScrollTop';

function RelatedProductData({id,heading}) {
    console.log(id)
     const [data, setData] = useState([])
        const [loading, setLoading] = useState(false)
     
            const loadingCardNumber = new Array(6).fill(null);
             const fetchCategoryWiseProduct = async () => {
        try {
            setLoading(true)
            console.log(id)
            const response = await Axios({
                ...SummaryApi.getProductByCategory,
                data: {
                    id: id
                }
            })

            const { data: responseData } = response
console.log(responseData)
            if (responseData.success) {
                setData(responseData.data)
            }
        } catch (error) {
            console.log(error)
            // AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchCategoryWiseProduct()
    }, [id])
//  const handleRedirectProductListpage = ()=>{
//         const subcategory = subCategoryData.find(sub =>{
//           const filterData = sub.category.some(c => {
//             return c._id == id
//           })
  
//           return filterData ? true : null
//         })
//         const url = `/${validURLConvert(name)}-${id}/${validURLConvert(subcategory?.name)}-${subcategory?._id}`
  
//         return url
//     }
//     const redirectURL =  handleRedirectProductListpage()
  return (
   
           <div className="container mx-auto px-4 my-6">
  <h3 className="text-2xl font-semibold py-4">{heading}</h3>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" onClick={scrollTop}>
    {loading &&
      loadingCardNumber.map((_, index) => (
        <CardLoading key={"CategorywiseProductDisplay123" + index} />
      ))}

    {data.map((p, index) => (
      <CardProduct
        data={p}
        key={p._id + "CategorywiseProductDisplay" + index}
      />
    ))}
  </div>
</div>

  )
}

export default RelatedProductData
