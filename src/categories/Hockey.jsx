import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, fetchCart } from '../redux/cartSlice';

const Hockey = () => {
  const [products, setProducts] = useState([]);
  const [profile, setProfile] = useState(null);
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Fetch products
    axios.get("http://localhost:5000/products/hockey")
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
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
  }, [dispatch]);

  const handleAddToCart = (productId) => {
    if (profile) {
      dispatch(addToCart({ userId: profile._id, productId, quantity: 1 }));
    } else {
      alert('Please log in to add items to your cart');
    }
  };

  return (
    <div className="font-[sans-serif] py-4 mx-auto lg:max-w-7xl sm:max-w-full">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-12">Hockey Store</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-50 shadow-md overflow-hidden rounded-lg cursor-pointer hover:-translate-y-2 transition-all relative"
          >
            <div
              className="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-3 right-3"
              onClick={() => handleAddToCart(product._id)}
            >
              <FaCartPlus />
            </div>
          
            <div className="w-45 h-[260px] p-4 overflow-hidden mx-auto aspect-w-16 aspect-h-8">
              <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
            </div>

            <div className="p-6 bg-white">
              <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
              <h4 className="text-lg text-gray-800 font-bold mt-2">₹{product.price}</h4>
              <p className="text-gray-600 text-sm mt-2">{product.description}</p>
              <Link to={`/hockey/${product.id}`}>
  <button    className='border-purple-400 text-purple-500'>Buy now</button>
</Link>
              <div className="flex space-x-2 mt-4">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`w-4 ₹{index < product.rating ? 'fill-[#facc15]' : 'fill-[#CED5D8]'}`}
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                    />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hockey;
