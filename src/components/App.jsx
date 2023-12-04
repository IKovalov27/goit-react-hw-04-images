import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import fetchImages from '../utils/pixabay-api';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [imagesOnPage, setImagesOnPage] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState(null);
  const [, setError] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [currentImageDescription, setCurrentImageDescription] = useState(null);
  const [isNewQuery, setIsNewQuery] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const { hits, totalHits } = await fetchImages(query, page);
        const imagesArray = hits.map(hit => ({
          id: hit.id,
          description: hit.tags,
          smallImage: hit.webformatURL,
          largeImage: hit.largeImageURL,
        }));

        if (page === 1 || isNewQuery) {
          setImages(imagesArray);
          setImagesOnPage(imagesArray.length);
          setTotalImages(totalHits);
          setIsNewQuery(false); /* Скидання статусу isNewQuery */
        } else {
          setImages(prevImages => [...prevImages, ...imagesArray]);
          setImagesOnPage(prevImagesOnPage => prevImagesOnPage + imagesArray.length);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      fetchData();
    }
  }, [query, page, isNewQuery]);

  const getSearchRequest = query => {
    setQuery(query);
    setIsNewQuery(true); /* Встановлення статусу isNewQuery в true при новому запиті */
  };

  const onNextFetch = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  const openModal = e => {
    const currentImageUrl = e.target.dataset.large;
    const currentImageDescription = e.target.alt;

    if (e.target.nodeName === 'IMG') {
      setShowModal(prevShowModal => !prevShowModal);
      setCurrentImageUrl(currentImageUrl);
      setCurrentImageDescription(currentImageDescription);
    }
  };

  console.warn = () => {};

  return (
    <>
      <Searchbar onSubmit={getSearchRequest} />

      {images && <ImageGallery images={images} openModal={openModal} />}

      {isLoading && <Loader />}

      {imagesOnPage >= 12 && imagesOnPage < totalImages && <Button onNextFetch={onNextFetch} />}

      {showModal && (
        <Modal
          onClose={toggleModal}
          currentImageUrl={currentImageUrl}
          currentImageDescription={currentImageDescription}
        />
      )}

      <ToastContainer />
    </>
  );
};

export default App;