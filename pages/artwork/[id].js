import { useRouter } from 'next/router';
import Image from 'next/image'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { EyeIcon as EyeIconSolid } from '@heroicons/react/24/solid'
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline'

export default function Artwork() {
  const router = useRouter();
  const URL_DOMAIN = process.env.NEXT_PUBLIC_URL_DOMAIN;
  const [artwork, setArtwork] = useState({});
  const [artist, setArtist] = useState({});
  const [loading, setLoading] = useState(true);

  //get the artwork id from the url param
  const { id } = router.query;

  useEffect(() => {

    async function fetchData() {

      try {



        console.log('ei', id);
        const res = await axios.get(`${URL_DOMAIN}/api/artwork/getArtworkById/${id}`,);
        let artwork = res.data;

        // Convert thumbnailImage to base64
        let image = Buffer.from(artwork.thumbnailImage).toString('base64');
        artwork.thumbnailImage = `data:image/jpeg;base64,${image}`;

        // Convert artworkImages to base64 (assuming it's an array of binary data)
        for (let i = 0; i < artwork.artworkImages.length; i++) {
          let imageArtwork = Buffer.from(artwork.artworkImages[i]).toString('base64');
          artwork.artworkImages[i] = `data:image/jpeg;base64,${imageArtwork}`;
        }

        //artwork.softwareused is an array but it always have on the first positoion an string with all the softwares separated by comma
        artwork.softwareUsed = artwork.softwareUsed[0].split(',');


        setArtwork(artwork);
        console.log(artwork);
        //now with the artist id, we can get the artist's data
        const artistRes = await axios.get(`${URL_DOMAIN}/api/users/getUserById/${artwork.artist}`);
        const artist = artistRes.data;
        setArtist(artist);
        console.log(artist);


      } catch (error) {
        console.log(error);
      }
      setLoading(false);

    }
    if (id) { // Make sure id is not undefined
      fetchData();
    }
  }, [id]);



  return (
    <div className="flex flex-col sm:flex-row">
      {/* Left column */}
      <div className="w-full sm:mt-4 sm:ml-4 mr-2 sm:w-1/3 sm:mb-0 mt-2">
        <div className="w-full py-5 px-5 mb-2 bg-spheri-black rounded-lg shadow dark:border border border-spheri-grey dark:bg-spheri-black dark:border-spheri-grey">
    
        {loading ? (
          <div className='animate-pulse'>
            <div className='h-6 bg-spheri-medium-grey mb-4'></div>
            <div className='h-64 bg-spheri-medium-grey mb-4'></div>
            <div className='h-4 bg-spheri-medium-grey mb-4'></div>
            <div className='h-4 bg-spheri-medium-grey mb-4'></div>
            <div className='h-4 bg-spheri-medium-grey mb-4'></div>
            <div className='h-4 bg-spheri-medium-grey mb-4'></div>
          </div>
        ) : (
          <>
        
          <h1 className="text-2xl font-bold text-spheri-violet mb-4">{artwork.title}</h1>
          <div className="hidden sm:block mb-4 aspect-w-1 aspect-h-1">
            <Image src={artwork.thumbnailImage} alt="Artwork thumbnail" layout="fill" objectFit="cover" />
          </div>
          <p className="mb-4 text-white">{artwork.description}</p>
          <div className="flex justify-between mb-4 space-x-4 text-spheri-light-grey dark:text-spheri-light-grey">
            <div>
              <span>{new Date(artwork.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <EyeIconSolid className="h-5 w-5 mr-2" />
                <span>0 </span>
              </div>
              <div className="flex items-center">
                <HeartIconOutline className="h-5 w-5 mr-2" />
                <span>{artwork.likes}</span>
              </div>
            </div>
          </div>





          <div className="mb-4">
            <h2 className="text-spheri-violet">Softwares</h2>
            {artwork.softwareUsed?.map((software, index) => (
              <button key={index} className="bg-spheri-violet text-white rounded p-2 m-1">{software}</button>
            ))}
          </div>
          <div className="mb-4">
            <h2 className="text-spheri-violet">Type</h2>
            <p className="text-white">{artwork.typeOfArtwork}</p>
          </div>
          <div className="mb-4">
            <p className="text-white">{artwork.likes}</p>
          </div>
          </>
          )}
        </div>
        <div className="w-full px-5 pt-5 mb-2 bg-spheri-black rounded-lg shadow dark:border border border-spheri-grey dark:bg-spheri-black dark:border-spheri-grey">
          
        {loading ? (
  <div className="mb-4 animate-pulse">
    <div className="h-4 bg-spheri-medium-grey mb-2"></div>
    <div className="h-4 bg-spheri-medium-grey"></div>
  </div>
) : (
  <div className="mb-4">
    <h2 className="text-spheri-violet">Artist:</h2>
    <p className="text-white">{artist.username}</p>
  </div>
)}

        </div>
      </div>


      {/* Right column */}

     {loading ? (
       <div className="w-full sm:w-2/3 sm:ml-2 flex flex-col mr-4 mt-4 bg-spheri-black rounded-lg shadow dark:border border dark:bg-spheri-black dark:border-spheri-grey border-spheri-grey">
        <div className="mx-4 w-80% h-screen relative flex items-center justify-center max-w-full animate-pulse bg-spheri-medium-grey">

   <div className=" w-full h-screen relative flex items-center justify-center max-w-full animate-pulse bg-spheri-medium-grey"></div>
   <div className="w-full h-screen relative flex items-center justify-center max-w-full animate-pulse bg-spheri-medium-grey"></div>
        </div>
 </div>

  ) : (
    <>
          <div className="w-full sm:w-2/3sx-2 sm:ml-2 flex flex-col mr-4 mt-4 bg-spheri-black rounded-lg shadow dark:border border dark:bg-spheri-black  dark:border-spheri-grey border-spheri-grey">

    {artwork.artworkImages?.map((image, index) => (
      <div key={index} className="mb-4 w-full h-screen relative flex items-center justify-center max-w-full">
        <div style={{ maxHeight: '100vh' }}>
          <Image
            src={image}
            alt={`Artwork ${index + 1}`}
            layout='fill' // This will make the image take the full width and height of the parent div
            objectFit='contain' // This will ensure that the entire image is visible and the aspect ratio is preserved
          />
        </div>
      </div>

    ))}
  </div>
    </>
  )}
 







    </div>
  )
}
