"use client";
import 'tailwindcss/tailwind.css';
import React, { Fragment, useState, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { ArrowUpOnSquareIcon, Bars3Icon, BellIcon, EnvelopeIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useRouter } from 'next/router'; // Import the useRouter hook
import Navbar from '../components/Navbar';
import axios from 'axios';
// Define your navigation links
const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Main() {
  const router = useRouter(); // Initialize the router
  const URL_DOMAIN = process.env.NEXT_PUBLIC_URL_DOMAIN;
  const [itemList, setItemList] = useState([]);
  const [isLogged, setIsLogged] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);


  const handleClick = (id) => {
    router.replace(`/artwork/${id}`)
  }


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

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem('token')) {
        console.log(localStorage.getItem('token'));
      } else {
        console.log('No token');
      }
      try {
        const res = await axios.get(`${URL_DOMAIN}/api/artwork/getArtworkList`, {
          withCredentials: true,
          headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3000', // or your client's origin
            'Access-Control-Allow-Credentials': 'true'
          }
        });
        
        console.log(res.data);
        res.data.forEach(artwork => {
          const imgSrc = artwork.thumbnailImage;

          setItemList(prevState => [...prevState, { id: artwork._id, thumbnailImage: imgSrc }]);

        });
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className='dark:bg-spheri-black-black bg-spheri-black-black'>

      <div className="grid m-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {loading ? (
          Array(18).fill().map((_, i) => (
            <div className='relative aspect-w-1 aspect-h-1 animate-pulse bg-spheri-medium-grey rounded'>
              <svg class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-spheri-grey dark:text-spheri-grey" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
          ))
        ) : (
          <>
            {itemList.map((item) => (
              <div onClick={() => handleClick(item.id)} key={item.id} className="aspect-w-1 aspect-h-1 cursor-pointer">
                <Image src={item.thumbnailImage} alt="" layout="fill" objectFit="cover" />
                
              </div>
            ))}

          </>)}
      </div>
    </div>
  );
}
