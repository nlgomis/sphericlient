"use client";
import 'tailwindcss/tailwind.css';
import React, { Fragment, useState, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { ArrowUpOnSquareIcon, Bars3Icon, BellIcon, EnvelopeIcon, XMarkIcon, CheckIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import logo from '../public/logo5.png'
import Image from 'next/image';
import { redirect } from 'next/navigation'

import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { config } from 'dotenv';
import { softwareUsed } from '../constants';


export default function Upload() {

  const router = useRouter(); // Initialize the router

  const [isLogged, setIsLogged] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const URL_DOMAIN = process.env.NEXT_PUBLIC_URL_DOMAIN;
  const [userId, setUserId] = useState(null);


  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {

    if (!userInfo) {
      router.push('/Login')
      console.log('hola');
    }
    console.log('userinfo', userInfo);
    setUserId(userInfo?.data._id);
    setFormData((prevFormData) => ({
      ...prevFormData,
      artist: userInfo?.data._id,
    }));
  }

    , [userInfo])

  const [formData, setFormData] = useState({
    artworkName: '',
    thumbnail: null,
    artworkDetails: '',
    artworkImages: null,
    artworkType: '',
    softwareUsed: [],
    artist: userId,
  });

  
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const handleArtworkTypeChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      artworkType: value,
    });
  };
  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    // For file inputs (e.g., thumbnail, artworkImages)
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    console.log(formData)

  };

  const handleMultipleInputChange = (e) => {
    const { name, type } = e.target;
    // For file inputs (e.g., thumbnail, artworkImages)
    if (type === 'file') {
      // Convert FileList to Array
      const filesArray = Array.from(e.target.files);
      setFormData({
        ...formData,
        [name]: filesArray, // Save all files as an array
      });
    } else {
      setFormData({
        ...formData,
        [name]: e.target.value,
      });
    }

    console.log(formData);
  };

  // Function to handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      softwareUsed: checked
        ? [...prevFormData.softwareUsed, name]
        : prevFormData.softwareUsed.filter((software) => software !== name),
    }));
    console.log(formData)

  };

  // Function to check if all fields are filled
  const areAllFieldsFilled = () => {
    const values = Object.values(formData);
    return values.every((value) => value !== '' && value !== null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new FormData instance
    const data = new FormData();

    // Append all fields to the new FormData instance
    Object.keys(formData).forEach((key) => {
      if (key !== 'artworkImages') {
        data.append(key, formData[key]);
      }
    });

    // Append each file in the artworkImages array to the new FormData instance
    for (let i = 0; i < formData.artworkImages.length; i++) {
      data.append('artworkImages', formData.artworkImages[i]);
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    try {
      const res = await axios.post(`${URL_DOMAIN}/api/artwork/upload`, data, config);
      console.log(res);
      router.replace('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };


  useEffect(() => {
    setIsButtonDisabled(!areAllFieldsFilled());
    console.log(isButtonDisabled);
  }, [formData]);


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

      <div className="bg-spheri-black-black dark:bg-spheri-black-black sm:mx-8 md:mx-16 lg:mx-24 xl:mx-48">

        <form onSubmit={handleSubmit} encType="multipart/form-data">

 

<div className="flex items-center justify-center py-12 px-8 mb-4  rounded-lg shadow-md mx-10">
  <h1 className="text-4xl font-bold text-spheri-violet-button">
    New Artwork
  </h1>
  <hr className="border-t border-spheri-violet-button w-full mt-4"/>
</div>


{/* 
<div className="flex items-center justify-center py-6 px-8 mb-4 bg-spheri-violet rounded-lg shadow-md mx-10">
  <h1 className="text-4xl font-bold text-spheri-black">
    New Artwork
  </h1>
  <hr className="border-t border-spheri-black w-full mt-4"/>
</div>

*/}



          <div className="flex flex-col items-start justify-center w-98 mx-8 md:mx-28">
            <div className="w-full px-5 pt-5 mb-2  rounded-lg shadow dark:border   dark:bg-spheri-black  dark:border-spheri-grey border   bg-spheri-black  border-spheri-grey">

              <label for="artwork_name" className="block mb-2 text-sm font-medium text-white dark:text-white">Artwork Name</label>
              <input id="artwork_name" name="artworkName"
                value={formData.artworkName}
                onChange={handleInputChange} type="text" className="w-full px-3 py-2 mb-4 dark:bg-spheri-black bg-spheri-black  rounded-lg focus:outline-none focus:ring-0 active:outline-none focus:border-spheri-violet dark:active:border-spheri-violet active:border-spheri-violet dark:text-gray-300 text-gray-300 dark:border-spheri-medium-grey border-spheri-medium-grey" placeholder="Enter artwork name here" required />
            </div>

            <div className="w-full  px-5 pt-5 mb-2 bg-spheri-black rounded-lg shadow dark:border  border  dark:bg-spheri-black  dark:border-spheri-grey border-spheri-grey">

              <label for="thumbnail" className="block mb-2 text-sm font-medium text-white dark:text-white">Thumbnail Image</label>
              <div className="w-full mb-4">
                <div className="relative border-dashed border-2 border-gray-600 dark:border-gray-600 rounded-lg w-56 h-56">
                  <input type="file" onChange={handleInputChange}
                    className="absolute inset-0 z-50 w-full h-full p-0 m-0 opacity-0" id="thumbnail" name="thumbnail" accept="image/*" required />
                  <div className="absolute inset-0 z-40 flex flex-col items-center justify-center w-full h-full text-gray-400">
                  {formData.thumbnail ? (
            <>
              <CheckIcon className="w-8 h-8 mb-1 text-white" />
              <p className="mb-1 text-sm text-white">Image Uploaded</p>
            </>
          ) : (
            <>
              <svg className="w-8 h-8 mb-1 text-gray-400 fill-current" viewBox="0 0 20 20">
                <path d="M17.5,7.5h-3.8c-0.3-0.9-1.1-1.5-2-1.5H8.3c-0.9,0-1.7,0.6-2,1.5H2.5c-0.8,0-1.5,0.7-1.5,1.5v6c0,0.8,0.7,1.5,1.5,1.5h15 c0.8,0,1.5-0.7,1.5-1.5v-6C19,8.2,18.3,7.5,17.5,7.5z M10,12.5c-1.4,0-2.5-1.1-2.5-2.5S8.6,7.5,10,7.5s2.5,1.1,2.5,2.5 S11.4,12.5,10,12.5z M17.5,14.5h-15v-6h15V14.5z"></path>
              </svg>
              <p className="mb-1 text-sm">Drag and drop your file here</p>
              <p className="text-sm">or</p>
              <button type="button" className="px-4 py-2 mt-2 text-sm font-medium text-white bg-spheri-violet-button rounded-lg hover:bg-spheri-violet-button focus:outline-none focus:bg-spheri-violet-button dark:bg-spheri-violet-button dark:hover:bg-spheri-violet-button dark:focus:bg-spheri-violet-button">Browse Files</button>
            </>
          )}  </div>
                </div>
              </div>
            </div>
            <div className="w-full px-5 pt-5 mb-2 bg-spheri-black rounded-lg shadow dark:border   dark:bg-spheri-black  dark:border-spheri-grey">
            <label for="artwork_details" className="block mb-2 text-sm font-medium text-white dark:text-white">Artwork Details</label>
            <textarea id="artwork_details"
  name="artworkDetails"
  value={formData.artworkDetails}
  onChange={handleInputChange} 
  className="w-full px-3 py-2 mb-4 text-gray-300 border rounded-lg dark:bg-spheri-black bg-spheri-black  border rounded-lg focus:outline-none focus:ring-0 active:outline-none focus:border-spheri-violet dark:active:border-spheri-violet dark:text-gray-300 dark:border-spheri-medium-grey min-h-32 h-32" 
  placeholder="Enter artwork details here" required>
</textarea></div>

<div className="w-full px-5 pt-5 mb-2 bg-spheri-black rounded-lg shadow dark:border   dark:bg-spheri-black  dark:border-spheri-grey">

            <label for="artworkImages" className="block mb-2 text-sm font-medium text-white dark:text-white">Artwork Images</label>
            <div className="w-full mb-4">
              <div className="relative border-dashed border-2 border-gray-400 dark:border-gray-600 rounded-lg h-40">
                <input type="file"
                  onChange={handleMultipleInputChange} className="absolute inset-0 z-50 w-full h-full p-0 m-0 opacity-0" id="artworkImages" name="artworkImages" accept="image/*" multiple required />
                <div className="absolute inset-0 z-40 flex flex-col items-center justify-center w-full h-full text-gray-400">

                {formData.artworkImages && formData.artworkImages.length > 0 ? (
            <>
              <CheckIcon className="w-8 h-8 mb-1 text-white" />
              <p className="mb-1 text-sm text-white">Image Uploaded</p>
            </>
          ) : (
            <>
              <svg className="w-8 h-8 mb-1 text-gray-400 fill-current" viewBox="0 0 20 20">
                <path d="M17.5,7.5h-3.8c-0.3-0.9-1.1-1.5-2-1.5H8.3c-0.9,0-1.7,0.6-2,1.5H2.5c-0.8,0-1.5,0.7-1.5,1.5v6c0,0.8,0.7,1.5,1.5,1.5h15 c0.8,0,1.5-0.7,1.5-1.5v-6C19,8.2,18.3,7.5,17.5,7.5z M10,12.5c-1.4,0-2.5-1.1-2.5-2.5S8.6,7.5,10,7.5s2.5,1.1,2.5,2.5 S11.4,12.5,10,12.5z M17.5,14.5h-15v-6h15V14.5z"></path>
              </svg>
              <p className="mb-1 text-sm">Drag and drop your file here</p>
              <p className="text-sm">or</p>
              <button type="button" className="px-4 py-2 mt-2 text-sm font-medium text-white bg-spheri-violet-button rounded-lg hover:bg-spheri-violet-button focus:outline-none focus:bg-spheri-violet-button dark:bg-spheri-violet-button dark:hover:bg-spheri-violet-button dark:focus:bg-spheri-violet-button">Browse Files</button>
            </>
          )}  </div>
              </div>
            </div>
            </div>
            <div className="w-full px-5 pt-5 mb-2 bg-spheri-black rounded-lg shadow dark:border   dark:bg-spheri-black  dark:border-spheri-grey">

            <label for="artwork_type" className="block mb-2 text-sm font-medium text-white dark:text-white">Type of Artwork</label>
            <select
              id="artwork_type"
              value={formData.artworkType}
              onChange={handleArtworkTypeChange}
              className="w-full px-3 py-2 mb-4 text-gray-300 border rounded-lg dark:bg-spheri-black  bg-spheri-black border rounded-lg focus:outline-none focus:ring-0 active:outline-none focus:border-spheri-violet dark:active:border-spheri-violet dark:text-gray-300 dark:border-spheri-medium-grey"
              required
            >
              <option value="" disabled defaultValue>
                Select artwork type
              </option>
              <option value="painting">Painting</option>
              <option value="sculpture">Sculpture</option>
              <option value="photography">Photography</option>
              <option value="digital_art">Digital Art</option>
              <option value="mixed_media">Mixed Media</option>
            </select>
            </div>
            <div className="w-full px-5 pt-5 mb-2 bg-spheri-black rounded-lg shadow dark:border   dark:bg-spheri-black  dark:border-spheri-grey">

            <label for="software_used" className="block mb-2 text-sm font-medium text-white dark:text-white">Software Used</label>
            
            
            
            <div className="flex flex-wrap mb-4">
    {softwareUsed.map((software, index) => (
        <label key={index} className="inline-flex items-center mr-4">
            <input type="checkbox" className="text-blue-500 form-checkbox" id={`software_${software.name.toLowerCase()}`} name={software.name.toLowerCase()} checked={formData.softwareUsed.includes(software.name.toLowerCase())}
                onChange={handleCheckboxChange} />
            <span className="ml-2 text-gray-300 dark:text-gray-300">{software.name}</span>
        </label>
    ))}
</div>

            </div>
                         <button type="submit" disabled={isButtonDisabled} className="px-4 py-2 mt-2 mb-10 text-sm font-medium text-white bg-spheri-violet-button rounded-lg hover:bg-spheri-violet-button focus:outline-none focus:bg-spheri-violet-button dark:bg-spheri-violet-button dark:hover:bg-spheri-violet-button dark:focus:bg-spheri-violet-button">Upload Artwork</button>
          </div>
        </form>
      </div>

    </>



  );
}
