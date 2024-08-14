import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdSportsCricket } from "react-icons/md";
import { IoIosFootball } from "react-icons/io";
import { GiHockey } from "react-icons/gi";
import { GiShuttlecock } from "react-icons/gi";
import { GiF1Car } from "react-icons/gi";
import { GiRollerSkate } from "react-icons/gi";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../redux/cartSlice";
const Header = () => {
  const [profile, setProfile] = useState(null);
  const [showAdminPopup, setShowAdminPopup] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalItems = useSelector(state => state.cart.totalItems);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setProfile(null); 
    } else {
      axios.get("http://localhost:5000/user/userprofile", { withCredentials: true })
        .then((res) => {
          if (res.data.status === false && res.data.message === "no token") {
            setProfile(null);
          } else {
            setProfile(res.data); 
            if (res.data.isAdmin) {
              setShowAdminPopup(true);
            }
            // Fetch cart data when profile is set
            dispatch(fetchCart(res.data._id));
          }
        })
        .catch((err) => {
          console.log(err);
          setProfile(null);
        });
    }
  }, [dispatch]);

  const handleAdminPopup = () => {
    setShowAdminPopup(false);
    navigate('/sell');
  };
  const logout = () => {
    axios.get("http://localhost:5000/user/logout", { withCredentials: true })
      .then(() => {
        localStorage.removeItem('token');
        setProfile(null);
        navigate('/');
      })
      .catch((err) => {
        console.log('Error during logout:', err);
      });
  };
  return (
    <>
    {showAdminPopup && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">It looks like you are an Admin!</h2>
          <p className="text-gray-600 mb-6">Would you like to go to the admin panel?</p>
          <Button variant="contained" color="primary" onClick={handleAdminPopup}>
            Yes
          </Button>
          <Button variant="contained" color="error" className="ml-6" onClick={() => setShowAdminPopup(false)}>
            No
          </Button>
        </div>
      </div>
    )}
    <header className='shadow-md bg-white font-[sans-serif] tracking-wide z-50 relative'>
    <section
      className='flex items-center flex-wrap lg:justify-center gap-4 py-3 sm:px-10 px-4 border-gray-200 border-b min-h-[75px]'>
  
      <div className='left-10 absolute z-50 bg-gray-100 flex px-4 py-3 rounded max-lg:hidden'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="20px"
          className="cursor-pointer fill-gray-400 mr-6 rotate-90 inline-block">
          <path
            d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
          </path>
        </svg>
        <input type='text' placeholder='Search...' className="outline-none bg-transparent w-full text-sm" />
      </div>

  
      <a href="javascript:void(0)" className="shrink-0"><img src="https://readymadeui.com/readymadeui.svg" alt="logo"
          className='md:w-[170px] w-36' />
      </a>
  {/*change here for signin/signup ,signout after backend */}

      <div className="lg:absolute lg:right-10 flex items-center ml-auto space-x-8">
        <span className="relative">
        {profile ? (
    <span className='text-sm text-gray-600'>Hello, {profile.username}<span className='px-8'><Button onClick={logout}   variant='contained' color='error' size='small'>logout</Button></span></span>
  ) : ( 
    <Link to='/login'>
      <button className='px-4 py-2 text-sm rounded font-semibold text-[#333] border-2 border-[#333] bg-transparent'>
        Sign In
      </button>
    </Link>
  )}
        </span>
<div
  class="max-w-32 bg-transparent items-center justify-center flex border-2 border-sky-500 shadow-lg hover:bg-sky-500 text-sky-500 hover:text-white duration-300 cursor-pointer active:scale-[0.98]"
>
 <Link to='/sell'> <button class="px-5 py-2"><a class="" href="">Sell +</a></button></Link>
</div>

        <span className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px"
            className="cursor-pointer fill-[#333] hover:fill-[#007bff] inline-block" viewBox="0 0 512 512">
            <path
              d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"
              data-original="#000000"></path>
          </svg>
          <span className="absolute left-auto -ml-1 top-0 rounded-full bg-black px-1 py-0 text-xs text-white">{totalItems}</span>
        </span>
        <div className="inline-block cursor-pointer border-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24"
            className="hover:fill-[#007bff]">
            <circle cx="10" cy="7" r="6" data-original="#000000" />
            <path
              d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
              data-original="#000000" />
          </svg>
        </div>
      </div>
    </section>
  
    <div className='flex flex-wrap justify-center px-10 py-3 relative'>
  
      <div id="collapseMenu"
        className='max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-40 max-lg:before:inset-0 max-lg:before:z-50'>
        <button id="toggleClose" className='lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3'>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 fill-black" viewBox="0 0 320.591 320.591">
            <path
              d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
              data-original="#000000"></path>
            <path
              d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
              data-original="#000000"></path>
          </svg>
        </button>
  
        <ul
          className='lg:flex lg:gap-x-10 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-2/3 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-4 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50'>
          <li className='max-lg:border-b max-lg:pb-4 px-3 lg:hidden'>
            <a href="javascript:void(0)"><img src="https://readymadeui.com/readymadeui.svg" alt="logo" className='w-36' />
            </a>
          </li>
          <Link to='/'>
          <li className='max-lg:border-b max-lg:px-3 max-lg:py-3'><a href='javascript:void(0)'
              className='hover:text-[#007bff] text-[#007bff] font-semibold block text-[15px]'>Home</a></li></Link>
          <li className='group max-lg:border-b max-lg:px-3 max-lg:py-3 relative'>
            <a href='javascript:void(0)'
              className='hover:text-[#007bff] hover:fill-[#007bff] text-red-600 font-semibold text-[15px] block'>Store<svg
                xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" className="ml-1 inline-block"
                viewBox="0 0 24 24">
                <path
                  d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z"
                  data-name="16" data-original="#000000" />
              </svg>
            </a>
            <ul
              className='absolute top-5 max-lg:top-8 left-0 z-50 block space-y-2 shadow-lg bg-white max-h-0 overflow-hidden min-w-[250px] group-hover:opacity-100 group-hover:max-h-[700px] px-6 group-hover:pb-4 group-hover:pt-6 transition-all duration-500'>
               
              <li className='border-b py-3'> 
                <Link to="/cricket">
               
                 <p className='hover:text-[#007bff] hover:fill-[#007bff] text-gray-600 font-semibold text-[15px] block'>
                  <MdSportsCricket className="mr-4 inline-block size-6" />

                  Cricket
            </p>
                </Link>
              </li>
             
              <li className='border-b py-3'>
              <Link to="/football">
               
               <p className='hover:text-[#007bff] hover:fill-[#007bff] text-gray-600 font-semibold text-[15px] block'>
                  
                  <IoIosFootball className="mr-4 inline-block size-6"/>
                  Football
                </p>
                </Link>
              </li>
              <li className='border-b py-3'>
                
              <Link to="/hockey">
                <p  className='hover:text-[#007bff] hover:fill-[#007bff] text-gray-600 font-semibold text-[15px] block'>
                  <GiHockey className="mr-4 inline-block size-6" />
                  Hockey
                </p>
                </Link>
              </li>
              <li className='border-b py-3'>
              <Link to="/badminton">
                <p className='hover:text-[#007bff] hover:fill-[#007bff] text-gray-600 font-semibold text-[15px] block'>
                  <GiShuttlecock className="mr-4 inline-block size-6"/>

                  Badminton
                </p>
                </Link>
              </li>
              {/* <li className='border-b py-3'>
                <a href='javascript:void(0)'
                  className='hover:text-[#007bff] hover:fill-[#007bff] text-gray-600 font-semibold text-[15px] block'>
                  <GiF1Car className="mr-4 inline-block size-8"/>
                  Racing
                </a>
              </li> */}
              {/* <li className='border-b py-3'>
                <a href='javascript:void(0)'
                  className='hover:text-[#007bff] hover:fill-[#007bff] text-gray-600 font-semibold text-[15px] block'>
                  <GiRollerSkate className="mr-4 inline-block size-6"/>
                  Skating
                </a>
              </li> */}
              {/* <li className='border-b py-3'>
                <a href='javascript:void(0)'
                  className='hover:text-[#007bff] hover:fill-[#007bff] text-gray-600 font-semibold text-[15px] block'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" className="mr-4 inline-block"
                    viewBox="0 0 512 512">
                    <path
                      d="M434.1 243.904h-5.955a95.572 95.572 0 0 1-61.022-22.072l-117.812-98.055a49.716 49.716 0 0 0-31.743-11.481c-27.361 0-49.621 22.26-49.621 49.621v11.586c0 22.572-18.364 40.937-40.937 40.937-15.844 0-30.407-9.279-37.102-23.639l-3.261-6.995c-7.434-15.944-23.604-26.246-41.195-26.246C20.39 157.56 0 177.949 0 203.012v118.792c0 42.954 34.946 77.9 77.9 77.9h356.2c42.954 0 77.9-34.946 77.9-77.9 0-42.954-34.946-77.9-77.9-77.9zm0 125.8H77.9c-17.829 0-33.403-9.799-41.65-24.287h439.5c-8.247 14.488-23.821 24.287-41.65 24.287zM30 315.419V203.012c0-8.521 6.932-15.452 15.452-15.452 5.98 0 11.478 3.503 14.005 8.923l3.261 6.994c11.601 24.884 36.837 40.963 64.293 40.963 39.115 0 70.937-31.822 70.937-70.937v-11.586c0-10.819 8.802-19.621 19.621-19.621a19.66 19.66 0 0 1 12.552 4.54l28.901 24.055-32.93 32.93 21.213 21.213 34.872-34.871 13.031 10.846-31.444 31.444 21.213 21.213 33.386-33.385 13.031 10.846-29.958 29.958 21.213 21.213 32.115-32.115c21.284 15.35 47.024 23.723 73.383 23.723h5.955c24.246 0 44.328 18.112 47.461 41.513H30z"
                      data-original="#000000" />
                  </svg>
                  Accessories
                </a>
              </li> */}
            </ul>
          </li>
          <li className='max-lg:border-b max-lg:px-3 max-lg:py-3'><a href='javascript:void(0)'
              className='hover:text-[#007bff] text-pink-600 font-semibold text-[15px] block'>Feature</a></li>
          <li className='max-lg:border-b max-lg:px-3 max-lg:py-3'><a href='javascript:void(0)'
              className='hover:text-[#007bff] text-green-600 font-semibold text-[15px] block'>Blog</a></li>
          <li className='max-lg:border-b max-lg:px-3 max-lg:py-3'><a href='javascript:void(0)'
              className='hover:text-[#007bff] text-yellow-600 font-semibold text-[15px] block'>About</a></li>
          <li className='max-lg:border-b max-lg:px-3 max-lg:py-3'><a href='javascript:void(0)'
              className='hover:text-[#007bff] text-blue-600 font-semibold text-[15px] block'>Contact</a></li>
          <li className='max-lg:border-b max-lg:px-3 max-lg:py-3'><a href='javascript:void(0)'
              className='hover:text-[#007bff] text-pink-600 font-semibold text-[15px] block'>Source</a></li>
          <li className='max-lg:border-b max-lg:px-3 max-lg:py-3'><a href='javascript:void(0)'
              className='hover:text-[#007bff] text-green-600 font-semibold text-[15px] block'>Partner</a></li>
          <li className='max-lg:border-b max-lg:px-3 max-lg:py-3'><a href='javascript:void(0)'
              className='hover:text-[#007bff] text-yellow-600 font-semibold text-[15px] block'>More</a></li>
        </ul>
      </div>
  
      <div id="toggleOpen" className='flex ml-auto lg:hidden'>
        <button>
          <svg className="w-7 h-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>
    </div>
  </header>
  </>
  );
};

export default Header;
