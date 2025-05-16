import React from 'react'
import BannerProduct from '../components/BannerProduct'
import { useSelector } from 'react-redux'
import { useNavigate} from 'react-router-dom'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'
import {validURLConvert} from '../utils/validURLConvert'

function Home() {
  const loadingCategory = useSelector(state => state.product.loadingCategory)
  const categoryData = useSelector(state => state.product.allCategory)
  const subCategoryData = useSelector(state => state.product.allSubCategory)
  const navigate = useNavigate();
  const handleRedirectProductListpage = (id,cat)=>{
    console.log(id,cat)
    const subcategory = subCategoryData.find(sub =>{
      const filterData = sub.category.some(c => {
        return c._id == id
      })

      return filterData ? true : null
    })
    const url = `/${validURLConvert(cat)}-${id}/${validURLConvert(subcategory.name)}-${subcategory._id}`

    navigate(url)
    console.log(url)
}


  return (
    <section className='bg-white'>
     
     <div className='container mx-auto px-4 my-2 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10  gap-2'>
          {
            loadingCategory ? (
              new Array(12).fill(null).map((c,index)=>{
                return(
                  <div key={index+"loadingcategory"} className='bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse'>
                    <div className='bg-blue-100 min-h-24 rounded'></div>
                    <div className='bg-blue-100 h-8 rounded'></div>
                  </div>
                )
              })
            ) : (
              categoryData.map((cat,index)=>{
                return(
                  <div key={cat._id+"displayCategory"} className='w-full h-full cursor-pointer flex flex-col items-center justify-center' onClick={()=>handleRedirectProductListpage(cat._id,cat.name)}>
                    {/* <div>
                        <img 
                          src={cat.image}
                          className='w-full h-full object-scale-down'
                        />
                    </div> */}
                    <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
                        <img 
                          src={cat.image}
                          className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all '
                        />
                    </div>
                    <p className='text-center text-sm md:text-base capitalize'>{cat?.name}</p>
                  </div>
                )
              })
              
            )
          }
         
      </div>
       <BannerProduct/>
       {/***display category product */}
       {
        categoryData?.map((c,index)=>{
          return(
            <CategoryWiseProductDisplay 
              key={c?._id+"CategorywiseProduct"} 
              id={c?._id} 
              name={c?.name}
            />
          )
        })
      }

    </section>
  )
}

export default Home
