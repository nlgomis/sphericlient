"use client";
import 'tailwindcss/tailwind.css';
import React, { Fragment, useState, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowUpOnSquareIcon, Bars3Icon, BellIcon, EnvelopeIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import logo from '../public/logo5.png'
import Image from 'next/image';
import { redirect } from 'next/navigation'



// Define your navigation links
const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Register() {
  const URL_DOMAIN = process.env.NEXT_PUBLIC_URL_DOMAIN;

  const router = useRouter(); 
  const [isLogged, setIsLogged] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
useEffect(()=>{
if (userInfo) {
  setIsLogged(true)
  router.replace('/') }  
}

,[userInfo])
 
  useEffect(() => {
    
  
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth <= 640);

      const handleResize = () => {
        setIsMobile(window.innerWidth <= 640);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [userInfo]);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  const { password, confirmPassword, ...restFormData } = formData;

    if (password !== confirmPassword) {
      console.log('ei')
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await axios.post(`http://${URL_DOMAIN}/api/users/register`, formData);
        dispatch(setCredentials({ ...res }));
  //router.replace('/')     
 } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return !isLogged ? (
    <>
      <section className="bg-spheri-black dark:bg-spheri-black-black">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-4xl font-semibold text-gray-900 dark:text-white">
            <Image
              className="h-14 w-auto mr-2"
              src={logo}
              width={50}
              height={50}
              alt='spheriart'
            />
            SpheriArt
          </a>
          <div className="w-full bg-spheri-black rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-spheri-black  dark:border-spheri-grey">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign Up
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label for="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                  <input type="text" name="username" id="username" value={formData.username}
            onChange={handleInputChange} className="bg-spheri-black border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none block w-full p-2.5 dark:bg-spheri-black-black-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-600 dark:focus:order-gray-600 dark:placeholder-spheri-medium-grey" placeholder="pick a username" required={true} />
                </div>
                <div>
                  <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" name="email" id="email" value={formData.email}
            onChange={handleInputChange} className="bg-spheri-black border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none block w-full p-2.5 dark:bg-spheri-black-black-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-600 dark:focus:order-gray-600 dark:placeholder-spheri-medium-grey" placeholder="name@company.com" required={true} />
                </div>
                <div>
                  <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" name="password" value={formData.password}
            onChange={handleInputChange} id="password" placeholder="••••••••" className="bg-spheri-black border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none block w-full p-2.5 dark:bg-spheri-black-black-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-600 dark:focus:order-gray-600 dark:placeholder-spheri-medium-grey" required={true}/>
                </div>
                <div>
                  <label for="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                  <input type="password" name="confirmPassword"  value={formData.confirmPassword}
            onChange={handleInputChange} id="confirmPassword" placeholder="••••••••" className="bg-spheri-black border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none block w-full p-2.5 dark:bg-spheri-black-black-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-600 dark:focus:order-gray-600 dark:placeholder-spheri-medium-grey" required={true} />
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                  </div>
                  <div className="ml-3 text-sm">
                    <label for="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                  </div>
                </div>
                <button type="submit" className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-spheri-violet dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-spheri-violet cursor-pointer text-spheri-black hover:text-white">Create an account</button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account? <a href="Login" className="font-medium text-primary-600 hover:underline dark:text-spheri-violet-button">Login here</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>

  ) : (<></>);
}