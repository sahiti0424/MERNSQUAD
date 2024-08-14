import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const categories = [
  { name: 'Cricket', image: 'https://crictoday.com/wp-content/uploads/2023/01/109e38ad139dd9b2066cf375ecafbd7f.webp?auto=compress&cs=tinysrgb&w=600' },
  { name: 'FootBall', image: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Badminton', image: 'https://images.pexels.com/photos/2202685/pexels-photo-2202685.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Hockey', image: 'https://e0.pxfuel.com/wallpapers/263/984/desktop-wallpaper-field-hockey-ice-hockey.jpg?auto=compress&cs=tinysrgb&w=600' },
  // { name: 'Kabbadi', image: 'https://globalsportmatters.com/wp-content/uploads/2018/09/Kabaddi.jpg' },
  // { name: 'Racing', image: 'https://images.pexels.com/photos/12795/pexels-photo-12795.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  // { name: 'Skating', image: 'https://5.imimg.com/data5/ANDROID/Default/2022/11/AM/RM/UZ/142375023/product-jpeg.jpg' },
  // { name: 'Accessories', image: 'https://www.thesportsbank.net/wp-content/uploads/2021/02/AdobeStock_255447164.jpeg' },
];

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  const handleShopNowClick = () => {
    navigate(`/${category.name.toLowerCase()}`);
  };

  return (
    <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
      <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4">
        <h3 className="text-white text-2xl font-bold mb-2">{category.name}</h3>
        <button
          onClick={handleShopNowClick}
          className="bg-white text-black py-2 px-4 rounded-full font-semibold"
        >
          Shop
        </button>
      </div>
    </div>
  );
};

const Carousel = () => {
  const [startIndex, setStartIndex] = useState(0);

  const nextSlide = () => {
    if (startIndex < categories.length - 4) {
      setStartIndex(startIndex + 1);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const visibleCategories = categories.slice(startIndex, startIndex + 4);

  return (
    <div className="relative w-full overflow-hidden p-12">
      <div className="flex justify-between items-center">
        <button
          onClick={prevSlide}
          className={`z-10 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none ${
            startIndex === 0 ? 'invisible' : ''
          }`}
        >
          <FaChevronLeft className="text-black text-xl" />
        </button>
        <div className="flex-grow grid grid-cols-4 gap-4">
          {visibleCategories.map((category, index) => (
            <CategoryCard key={index} category={category} />
          ))}
        </div>
        <button
          onClick={nextSlide}
          className={`z-10 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none ${
            startIndex === categories.length - 4 ? 'invisible' : ''
          }`}
        >
          <FaChevronRight className="text-black text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
