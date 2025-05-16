import { useEffect } from 'react'
import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import Header from './components/Header';
import { setUserDetails } from './store/userSlice';
import fetchUserDetails from './utils/fetchUserDetails';
import { setAllCategory,setAllSubCategory,setLoadingCategory } from './store/product.Slice';
import AxiosToastError from './utils/AxiosToasrError';
import { useDispatch } from 'react-redux';
import SummaryApi from './common/SummaryApi';
import Axios from './utils/Axios';
import GlobalProvider from './provider/GlobalProvider'
import CartMobileLink from './components/CartMobile'


function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const fetchUser = async()=>{
    const userData = await fetchUserDetails();
    //console.log(userData)
    // if(!userData) return Navigate("/login")
    dispatch(setUserDetails(userData.data));
  }

  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true)); // Set loading to true
  
      const response = await Axios({ ...SummaryApi.getCategory });
      //console.log(response);
  
      const { data: responseData } = response;
  
      if (responseData?.success) {
        // Sort categories alphabetically by name before setting
        const sortedData = responseData.data.sort((a, b) => 
          a.name.localeCompare(b.name)
        );
        dispatch(setAllCategory(sortedData));
      }
    } catch (error) {
      AxiosToastError(error); // Handle and display error
    } finally {
      dispatch(setLoadingCategory(false)); // Set loading to false
    }
  };
  
  const fetchSubCategory = async()=>{
    try {
      dispatch(setLoadingCategory(true));
        const response = await Axios({
            ...SummaryApi.getSubCategory
        })
        const { data : responseData } = response

        if(responseData.success){
           dispatch(setAllSubCategory(responseData.data.sort((a, b) => a.name.localeCompare(b.name)))) 
        }
    } catch (error) {
        AxiosToastError(error);
    }finally{
        dispatch(setLoadingCategory(false));
    }
  }
  useEffect(()=>{
    fetchUser()
    fetchCategory()
    fetchSubCategory()
    
  },[])
  return (
    <GlobalProvider>
    <Header />
    <main className='min-h-[78vh]'> <Outlet /></main>
    <Footer />  
    <Toaster />
    {
        location.pathname !== '/checkout' && (
          <CartMobileLink/>
        )
      }
    </GlobalProvider>
   
  )
}

export default App;
