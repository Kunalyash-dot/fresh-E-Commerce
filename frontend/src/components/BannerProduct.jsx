import React, {use, useEffect,useState} from 'react'
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

// For laptop and tablet
import image1 from '../assets/banner/img7.webp'
import image2 from '../assets/banner/img2.webp'
import image3 from '../assets/banner/img3.jpg'
import image4 from '../assets/banner/img4.jpg'
import image5 from '../assets/banner/img6.webp'

// for mobile 

import image1Mobile from '../assets/banner/img1_mobile.jpg'
import image2Mobile from '../assets/banner/img2_mobile.webp'
import image3Mobile from '../assets/banner/img3_mobile.jpg'
import image4Mobile from '../assets/banner/img4_mobile.jpg'
import image5Mobile from '../assets/banner/img5_mobile.png'

function BannerProduct() {
    const [currentImage, setCurrentImage] = useState(0)

    const desktopImages = [image1,image2,image3,image4,image5]
    const mobileImages = [image1Mobile,image2Mobile,image3Mobile,image4Mobile,image5Mobile];
    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % desktopImages.length)
    }
    const preveImage = () => {
        setCurrentImage((prev) => (prev - 1 + desktopImages.length) % desktopImages.length)
    }
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % desktopImages.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [currentImage])

    
  return (
    <div className=' mx-auto px-4 rounded '>
        <div className='h-56 md:h-72 w-full bg-slate-200 relative'>
        <div className='absolute z-10 h-full w-full md:flex items-center hidden '>
                    <div className=' flex justify-between w-full text-2xl'>
                        <button onClick={preveImage} className='bg-white shadow-md w-10 h-25 p-1'><FaAngleLeft/></button>
                        <button onClick={nextImage} className='bg-white shadow-md w-10 h-25 p-1'><FaAngleRight/></button> 
                    </div>
                </div>
                  {/**desktop and tablet version */}
              <div className='hidden md:flex h-full w-full overflow-hidden'>
                {
                        desktopImages.map((imageURl,index)=>{
                            return(
                            <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURl} style={{transform : `translateX(-${currentImage * 100}%)`}}>
                                <img src={imageURl} className='w-full h-full'/>
                            </div>
                            )
                        })
                }
              </div>


                {/**mobile version */}
                <div className='flex h-full w-full overflow-hidden md:hidden'>
                {
                        mobileImages.map((imageURl,index)=>{
                            return(
                            <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURl} style={{transform : `translateX(-${currentImage * 100}%)`}}>
                                <img src={imageURl} className='w-full h-full '/>
                            </div>
                            )
                        })
                }
              </div>

        </div>
      
    </div>
  )
}

export default BannerProduct
