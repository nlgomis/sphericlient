"use client";
import 'tailwindcss/tailwind.css';
import React, { Fragment, useState, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { ArrowUpOnSquareIcon, Bars3Icon, BellIcon, EnvelopeIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'; // Import the useRouter hook
import Navbar from '../components/Navbar';
import axios from 'axios';

import logo from '../public/logo5.png'
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Image from 'next/image';

// Define your navigation links
const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Login() {
  const URL_DOMAIN = process.env.NEXT_PUBLIC_URL_DOMAIN;

  const router = useRouter();
  const [isLogged, setIsLogged] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userInfo) {
      setIsLogged(true)
      router.replace('/')
    }
  }

    , [userInfo])

  const [formData, setFormData] = useState({

    email: '',
    password: '',

  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${URL_DOMAIN}/api/users/login`, formData);
      dispatch(setCredentials({ ...res }));
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

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
  }, []);

  return (
    <>
      <section className="bg-spheri-black-black dark:bg-spheri-black-black">
        <div className="flex flex-col items-center mt-10 px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mt-5 mb-6 text-4xl font-semibold text-gray-900 dark:text-white">
            <Image
              className="h-14 w-auto mr-2"
              src={logo}
              width={50}
              height={50}
              alt='spheriart'
            />
            SpheriArt
          </a>
          <div className="w-full bg-spheri-black rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-spheri-black  dark:border-spheri-grey border border-spheri-grey">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Log In
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                <div>
                  <label for="email" className="block mb-2 text-sm font-medium text-white dark:text-white">Your email</label>
                  <input type="email" name="email" id="email" value={formData.email}
                    onChange={handleInputChange} className="bg-spheri-black border sm:text-sm rounded-lg focus:outline-none block w-full p-2.5 dark:bg-spheri-black-black-black bg-spheri-black-black-black dark:border-gray-600 border-gray-600 dark:placeholder-gray-400 placeholder-gray-400 dark:text-white text-white dark:focus:ring-gray-600 focus:ring-gray-600 dark:focus:order-gray-600 focus:order-gray-600 dark:placeholder-spheri-medium-grey placeholder-spheri-medium-grey" placeholder="name@company.com" required="" />
                </div>
                <div>
                  <label for="password" className="block mb-2 text-sm font-medium text-white dark:text-white">Password</label>
                  <input type="password" name="password" id="password" value={formData.password}
                    onChange={handleInputChange} placeholder="••••••••" className="bg-spheri-black border sm:text-sm rounded-lg focus:outline-none block w-full p-2.5 dark:bg-spheri-black-black-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-600 dark:focus:order-gray-600 dark:placeholder-spheri-medium-grey bg-spheri-black-black-black border-gray-600 text-white focus:ring-gray-600 focus:order-gray-600 placeholder-spheri-medium-grey" required="" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="remember" className="text-white dark:text-white">Remember me</label>
                    </div>
                  </div>
                  <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-spheri-violet-button">Forgot password?</a>
                </div>
                <button type="submit" className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-spheri-violet dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-spheri-violet cursor-pointer text-spheri-black hover:text-white">Sign In</button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't have an account yet? <a href="Register" className="font-medium text-primary-600 hover:underline dark:text-spheri-violet-button">Register here</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>

  );
}