import '../styles/globals.css'; // Import global CSS
import Navbar from '../components/Navbar'; // Import a shared component
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from '../store';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  // You can include global JavaScript logic here, such as tracking analytics.

  return (
    <div className="bg-spheri-black-black-black dark:bg-spheri-black-black-black">
      <Provider store={store}>

      <Navbar />
      <ToastContainer />

      <Component {...pageProps} />
      {/* Additional layout components or footer can be added here */}

      </Provider>
    </div>
  );
}

export default MyApp;