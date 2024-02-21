"use client";
import 'tailwindcss/tailwind.css';
import React, { Fragment, useState, useEffect } from 'react'
import logo from '../public/logo5.png'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { ArrowUpOnSquareIcon, Bars3Icon, BellIcon, EnvelopeIcon, XMarkIcon, PencilSquareIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import Image from 'next/image';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import { useRouter } from 'next/router';
import { logout } from '../slices/authSlice';


function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);
  
  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
}


const navigationNotLogged = [
  { name: 'Sign Up', href: '/Register', current: false },
  { name: 'Sign In', href: '/Login', current: false },

]

const navigation = [
  { name: 'Discover', href: '#', current: false },
  { name: 'Resources', href: '#', current: false },

]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



export default function Navbar() {
  const hasMounted = useHasMounted();
  

  
  const [isLogged, setIsLogged] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const URL_DOMAIN = process.env.NEXT_PUBLIC_URL_DOMAIN;

  const dispatch = useDispatch();
  const router  = useRouter();


  const handleLogout = async (e) => {

    try {
      e.preventDefault();

      const res = await axios.post(`${URL_DOMAIN}/api/users/logout`);
      console.log('hola')
      dispatch(logout());
      router.replace('/Login')
      //el router replace es molt rapid i bo ja que intercambia els components directament i no refresca la pagina diria
      //router.replace('/Login');
    } catch (err) {
      console.error(err);
    }
  };
  function redirectToUpload() {
    router.replace('/Upload');
  }

  function redirectToMain() {
    router.replace('/');
  }
  useEffect(() => {
   console.log(userInfo);
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
  if (!hasMounted) {
    return null;
  } 
  return (
    

      <Disclosure as="nav" className="bg-spheri-black sticky top-0 z-50">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-9xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between ">
                <div className={classNames(userInfo ? 'absolute inset-y-0 left-0 flex items-center sm:hidden' : 'absolute inset-y-0 left-0 flex items-center sm:hidden')}>
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div onClick={redirectToMain} className="flex flex-shrink-0 items-center">

                    <Image
                      className="h-10 w-auto"
                      src={logo}
                      width={50}
                      height={50}
                      alt='spheriart'
                    />
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current ? 'bg-gray-900 cursor-pointer text-white' : 'text-gray-300 cursor-pointer hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-base font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      ))}


                    </div>
                  </div>

                  {!isMobile && (
                    <form action="/search" className=" w-full px-4 ml-4 ">
                      <div className="relative">
                        <input type="text" name="q" className="w-full focus:outline-none border h-10 shadow p-4 rounded-full text-sm focus:border-spheri-violet text-spheri-light-grey border border-spheri-violet rounded-lg dark:bg-spheri-black bg-spheri-black dark:focus:ring-spheri-violet-button dark:focus:border-spheri-violet dark:bg-spheri-black dark:border-spheri-violet dark:placeholder-spheri-medium-grey placeholder-spheri-medium-grey  dark:text-white dark:focus:border-spheri-violet-button dark:hover:border-spheri-violet-button dark:active:border-spheri-violet-button" placeholder="Search..." />
                        <button type="submit">
                          <svg className="text-spheri-light-grey h-5 w-5 absolute top-2.5 right-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56.966 56.966">


                            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                          </svg>
                        </button>
                      </div>
                    </form>
                  )}



                </div>
                {userInfo ? (<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    onClick={redirectToUpload}
                    className="relative cursor-pointer rounded-full bg-spheri-black mx-1 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Upload</span>
                    <ArrowUpOnSquareIcon className="h-8 w-8 pb-1 cursor-pointer" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="relative cursor-pointer rounded-full bg-spheri-black mx-4 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Messages</span>
                    <EnvelopeIcon className="h-6 w-6 cursor-pointer" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-spheri-black text-sm focus:outline-none">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://img.freepik.com/premium-vector/robot-icon-circle-vector-illustration_418020-199.jpg"
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-spheri-black py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none cursor-pointer">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(active ? 'bg-spheri-black' : '', 'block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-700 cursor-pointer')}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(active ? 'bg-spheri-black' : '', 'block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-700 cursor-pointer')}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (

                            <button
                              onClick={handleLogout} className={classNames(active ? 'bg-spheri-black' : '', ' w-full text-left block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-700 cursor-pointer')}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>) : (<div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-2"> {/* Added 'flex' and adjusted 'space-x' */}
                    {navigationNotLogged.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-gray-900 cursor-pointer text-white'
                            : item.href === '/Login'
                              ? 'bg-spheri-violet cursor-pointer text-spheri-black hover:text-white'
                              : 'text-gray-300 bg-spheri-grey cursor-pointer hover:text-white',
                          'flex items-center rounded-md px-3 py-2 text-sm font-medium mr-5'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.href == '/Register' &&
                          <PencilSquareIcon className="h-5 w-5 mb-0.3 mr-2 cursor-pointer" aria-hidden="true" />
                        }
                        {item.href == '/Login' &&
                          <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2 cursor-pointer" aria-hidden="true" />
                        }

                        <span>{item.name}</span>
                      </a>
                    ))}
                  </div>
                </div>)}

              </div>
            </div>
            {isLogged ? (<Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                <form action="/search" className="w-full px-4 pb-5">
                  <div className="relative">
                    <input type="text" name="q" className="w-full focus:outline-none border h-10 shadow p-4 rounded-full text-sm focus:border-spheri-violet text-spheri-light-grey border border-spheri-violet rounded-lg dark:bg-spheri-black dark:focus:ring-spheri-violet-button dark:focus:border-spheri-violet dark:bg-spheri-black dark:border-spheri-violet dark:placeholder-spheri-medium-grey dark:text-white dark:focus:border-spheri-violet-button dark:hover:border-spheri-violet-button dark:active:border-spheri-violet-button" placeholder="Search..." />
                    <button type="submit">
                      <svg className="text-spheri-light-grey h-5 w-5 absolute top-2.5 right-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56.966 56.966">


                        <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                      </svg>
                    </button>
                  </div>
                </form>
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}

              </div>
            </Disclosure.Panel>) : (


              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                  <form action="/search" className="w-full px-4 pb-5">
                    <div className="relative">
                      <input type="text" name="q" className="w-full focus:outline-none border h-10 shadow p-4 rounded-full text-sm focus:border-spheri-violet text-spheri-light-grey border border-spheri-violet rounded-lg dark:bg-spheri-black dark:focus:ring-spheri-violet-button dark:focus:border-spheri-violet dark:bg-spheri-black dark:border-spheri-violet dark:placeholder-spheri-medium-grey dark:text-white dark:focus:border-spheri-violet-button dark:hover:border-spheri-violet-button dark:active:border-spheri-violet-button" placeholder="Search..." />
                      <button type="submit">
                        <svg className="text-spheri-light-grey h-5 w-5 absolute top-2.5 right-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56.966 56.966">


                          <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                        </svg>
                      </button>
                    </div>
                  </form>
                  <div className="flex space-x-2"> {/* Added 'flex' and adjusted 'space-x' */}
                    {navigationNotLogged.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 cursor-pointer text-white' : 'text-gray-300 cursor-pointer hover:bg-gray-700 hover:text-white',
                          'flex items-center rounded-md px-3 py-2 text-sm font-medium' // Added 'flex items-center'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.href == '/Register' &&
                          <PencilSquareIcon className="h-5 w-5 mr-2 cursor-pointer" aria-hidden="true" />
                        }
                        {item.href == '/Login' &&
                          <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2 cursor-pointer" aria-hidden="true" />
                        }

                        <span>{item.name}</span>
                      </a>
                    ))}
                  </div>
                  <div>
                    {navigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'block rounded-md px-3 py-2 text-base font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>


                </div>
              </Disclosure.Panel>
            )}
          </>
        )}
      </Disclosure>
    
  )
}
