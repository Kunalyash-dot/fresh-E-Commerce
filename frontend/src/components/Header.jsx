import React , { useState }   from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/icons8-wink.gif';
import { BsCart4 } from 'react-icons/bs';
import { FaRegCircleUser } from "react-icons/fa6";
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import Search from './Search';
import UserMenu from './UserMenu';
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import { useSelector } from 'react-redux';
import { useGlobalContext } from '../provider/GlobalProvider';
import DisplayCartItem from './DisplayCartItem';
import useMobile from '../hooks/useMobile';
function Header() {
    const [ isMobile ] = useMobile();
    const location = useLocation()
    const isSearchPage = location.pathname === "/search"
    const navigate = useNavigate()
    const user = useSelector((state) => state?.user)
    const [openUserMenu, setOpenUserMenu] = useState(false)
    const cartItem = useSelector(state => state.cartItem.cart)
    const { totalPrice, totalQty } = useGlobalContext()
    const [openCartSection, setOpenCartSection] = useState(false)
// console.log(user)
    const redirectToLoginPage = () => {
      navigate("/login")
  }
  const handleCloseUserMenu = () => {
    setOpenUserMenu(false)
}
const handleMobileUser = () => {
  if (!user._id) {
      navigate("/login")
      return
  }

  navigate("/user")
}

  return (
    <header className='h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white '>
      {
        !(isSearchPage && isMobile) && (
        //   <div className='container mx-auto flex items-center px-2 w-full justify-between'>
        <div className='flex items-center justify-between container mx-auto px-2 w-full'>
             {/**logo */}
             <div className='h-full'>
                            <Link to={"/"} className='h-full flex justify-center items-center'>
                                <img
                                    src={logo}
                                    width={50}
                                    height={5}
                                    alt='logo'
                                    className='hidden lg:block'
                                />
                                {/* <span className='text-2xl mt-6 hidden lg:block'> Earthcart </span> */}
                                <img
                                    src={logo}
                                    width={30}
                                    height={2}
                                    alt='logo'
                                    className='lg:hidden'
                                />
                                 {/* <span className='text-1xl mt-2 lg:hidden'> Earthcart </span> */}
                            </Link>
                        </div>
                         {/**Search */}
                         <div className='hidden lg:block'>
                            <Search />
                        </div>
                         {/**login and my cart */}
                         <div className=''>
                            {/**user icons display in only mobile version**/}
                            <button className='text-neutral-600 lg:hidden' onClick={handleMobileUser}>
                                <FaRegCircleUser size={26} />
                            </button>

                            {/**Desktop**/}
                            <div className='hidden lg:flex  items-center gap-10'>
                                {
                                    user?._id ? (
                                        <div className='relative'>
                                            <div onClick={() => setOpenUserMenu(preve => !preve)} className='flex select-none items-center gap-1 cursor-pointer'>
                                                <p>Account</p>
                                                {
                                                    openUserMenu ? (
                                                        <GoTriangleUp size={25} />
                                                    ) : (
                                                        <GoTriangleDown size={25} />
                                                    )
                                                }

                                            </div>
                                            {
                                                openUserMenu && (
                                                    <div className='absolute right-0 top-12'>
                                                        <div className='bg-white rounded p-4 min-w-52 lg:shadow-lg'>
                                                            <UserMenu close={handleCloseUserMenu} />
                                                        </div>
                                                    </div>
                                                )
                                            }

                                        </div>
                                    ) : (
                                        <button onClick={redirectToLoginPage} className='text-lg px-2'>Login</button>
                                    )
                                }

                          {user._id ? <button onClick={() => setOpenCartSection(true)} className='flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-2 rounded text-white'>
                                    {/**add to card icons  */}
                                    <div className='animate-bounce'>
                                        <BsCart4 size={26} />
                                    </div>
                                    <div className='font-semibold text-sm'>
                                        {
                                            cartItem[0] ? (
                                                <div>
                                                    <p>{totalQty} Items</p>
                                                    <p>{DisplayPriceInRupees(totalPrice)}</p>
                                                </div>
                                            ) : (
                                                <p>My Cart</p>
                                            )
                                        }
                                    </div>
                                </button>  :""}      
                            </div>
                        </div>
          </div>
        )
      }
       <div className='container mx-auto px-2 lg:hidden'>
                <Search />
            </div>

            {
                openCartSection && (
                    <DisplayCartItem close={() => setOpenCartSection(false)} />
                )
            }
      </header>
  )
}

export default Header
