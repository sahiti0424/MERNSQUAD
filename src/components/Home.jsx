import React from 'react'
import Header from './Header'
import Footer from './Footer'
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay'
import 'react-awesome-slider/dist/styles.css';
import SportsCarousel from './SportCard';
import Carousel from './SportCard';
import { FaAlignLeft } from 'react-icons/fa';
import TrendingProducts from './TrendingProducts';
const AutoplaySlider=withAutoplay(AwesomeSlider)


const Home = () => {
  const slides = [
    {
      id: 1,
      backgroundImage: "https://rwc.sdes.ucf.edu/wp-content/uploads/sites/32/2022/04/SportClubComposite-Dark11-scaled.jpg",
      // title: 'Buy Less,Buy Better!',
      description: 'Authentic source of truth for your sustainability needs.',
      buttonText: 'About us',
      buttonColor: 'bg-green-500',
      buttonTextColor: 'text-white',
      // FaAlignLeft:
    },
    {
      id: 2,
      backgroundImage: 'https://ecoyaan.com/images/carousel-2.png',
      // title: '         Follow us on Instagram',
      description: 'For climate news, lifestyle tips, & updates',
      buttonText: 'Follow us',
      buttonColor: 'bg-purple-500',
    },
  ];
  return (
    <div>
 
      
      
      <div className=' h-96 overflow-hidden'>
        <AutoplaySlider
          play={true}
          cancelOnInteraction={false}
          interval={6000}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              data-src={slide.backgroundImage}
              className="relative main"
            >
              <div className="text-black mr-96 content">
                <h2 className="text-4xl font-bold mb-60 text-white">{slide.title}</h2>
                <p className="text-lg mb-8 desc">{slide.description}</p>
                <button
                  className={`₹{slide.buttonColor} text-white px-6 py-3 rounded-full hover:opacity-75 transition-opacity duration-300 btns`}
                >
                  {slide.buttonText}
                </button>
              </div>
            </div>
            
          ))}
        </AutoplaySlider>
        </div>
        <Carousel />

<h1 className='text-center font-bold text-3xl mb-5 '>Trending Now</h1>

<TrendingProducts />
 
      </div>
  )
}

export default Home