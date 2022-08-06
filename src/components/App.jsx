import { useState, useEffect } from 'react';
import { Title, TitleBox, BigPick } from './App.styled';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchedImages } from 'services/api';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tag, setTag] = useState('');
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [status, setStatus] = useState('idle');
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!query) return;
    setStatus('pending');

    const getImages = async (page, query) => {
      try {
        const perPage = 12;
        const { hits } = await fetchedImages(query, page, perPage);
        const pictures = hits;

        if (pictures.length === 0) {
          setStatus('rejected');
          setShowLoadMore(false);
        } else {
          setImages(prevState => [...prevState, ...pictures]);
          setStatus('resolved');
          setShowLoadMore(true);
        }
        if (pictures.length < perPage) {
          setShowLoadMore(false);
        }
      } catch (error) {
        alert(error);
      }
    };

    getImages(page, query);
  }, [query, page]);

  const submitForm = async value => {
    setQuery(value);
    setPage(1);
    setImages([]);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const togleModal = () => {
    if (openModal) {
      setOpenModal(false);
    } else {
      setOpenModal(true);
    }
  };

  const openBigPick = (largeImageURL, tag) => {
    setLargeImageURL(largeImageURL);
    setTag(tag);
    togleModal();
  };

  return (
    <div>
      <ToastContainer autoClose={3000} closeOnClick={true} />
      <Searchbar onSubmit={submitForm} />
      {status === 'idle' && (
        <TitleBox>
          <Title>What are you looking for?</Title>
        </TitleBox>
      )}
      {status === 'pending' && <Loader />}
      {status === 'resolved' && (
        <ImageGallery images={images} openBigPick={openBigPick} />
      )}
      {status === 'rejected' && (
        <TitleBox>
          <Title>I could`n find images with the name "{query}"</Title>
        </TitleBox>
      )}
      {showLoadMore && <Button onLoadMore={loadMore} />}
      {openModal && (
        <Modal togleModal={togleModal}>
          <BigPick src={largeImageURL} alt={tag} />
        </Modal>
      )}
    </div>
  );
}
