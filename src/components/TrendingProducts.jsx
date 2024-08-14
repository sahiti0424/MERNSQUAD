import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCartPlus } from 'react-icons/fa';

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/products/trending-products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 m-20">
      {products.map(product => (
        <div key={product.id} className="bg-gray-200 rounded-xl cursor-pointer hover:scale-[1.03] transition-all relative overflow-hidden">
          <div className="p-3">
            <div className="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-4 right-4">
             <FaCartPlus />
            </div>
            <div className="w-50 h-[220px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 rounded-md">
              <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="text-center bg-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
            <h4 className="text-lg text-gray-800 font-bold mt-6">
              ₹{product.price} <strike className="text-gray-400 ml-2 font-medium">₹{product.original_price}</strike>
            </h4>
            {/* {/* <button type="button" className="w-full flex items-center justify-center gap-3 mt-6 px-6 py-3 bg-yellow-400 text-base text-gray-800 font-semibold rounded-xl"> */}
           
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrendingProducts;
