import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa';
import SellerDetails from './SellerDetails';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, fetchCart } from '../redux/cartSlice';
import toast, { Toaster } from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [profile, setProfile] = useState(null);
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  useEffect(() => {
    // Fetch product details
    axios.get(`http://localhost:5000/products/cricket/${id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the product!', error);
      });

    // Fetch user profile
    const token = localStorage.getItem('token');
    if (token) {
      axios.get("http://localhost:5000/user/userprofile", { withCredentials: true })
        .then((res) => {
          if (res.data.status !== false) {
            setProfile(res.data);
            dispatch(fetchCart(res.data._id));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id, dispatch]);

  const handleAddToCart = () => {
    if (profile && product) {
      dispatch(addToCart({ userId: profile._id, productId: product._id, quantity: 1 }));
      toast.success("Added to cart");
    } else {
      toast.error('Please log in to add items to your cart');
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="font-sans tracking-wide p-4 lg:max-w-6xl max-w-2xl mx-auto">
      <Toaster />
      <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 text-center">
          <div className="lg:h-[450px] p-4 relative before:absolute before:inset-0 before:opacity-20 before:rounded">
            <img src={product.image} alt={product.name} className="lg:w-11/12 w-full h-full rounded object-contain object-top " />
          </div>
        </div>

        <div className="lg:col-span-2 m-10">
          <h2 className="text-2xl font-extrabold text-gray-800">{product.name}</h2>
          <p className="text-gray-800 text-4xl font-bold mt-7">₹{product.price}</p>
          <p className="text-gray-600 mt-6">{product.description}</p>

          <button className="min-w-[200px] px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded mt-3">Contact Us</button>
          <button 
            className="min-w-[200px] px-4 py-2.5 border border-orange-500 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded mt-5"
            onClick={handleAddToCart}
          >
            <FaCartPlus className='mr-4 inline-block' />Add to cart
          </button>
        </div>
      </div>
      <div>
        <h1 className='font-bold font-serif text-3xl ml-15 text-center ml-64 '>Seller Details</h1>
        <SellerDetails />
      </div>
    </div>
  );
};

export default ProductDetails;