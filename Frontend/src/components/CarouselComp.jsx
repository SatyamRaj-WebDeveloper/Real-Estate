import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

const CarouselComp = () => {
  return (
     <>
     <div className='h-[80vh] w-full overflow-hidden mb-10'>
     <Carousel>

      <Carousel.Item>
        <img
          className="object-cover d-block w-screen h-[80vh]"
          src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="First slide"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"></div>
        <Carousel.Caption>
          <h3 className='text-3xl font-poppins  font-bold text-white'>"Discover Your Dream Home"</h3>
          <p className='text-lg font-medium '>Explore a range of beautiful properties that match your lifestyle.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="object-cover d-block w-screen h-[80vh]  "
          src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg"
          alt="Second slide"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"></div>
        <Carousel.Caption>
          <h3 className='text-3xl font-poppins  font-bold text-white'>"Luxury Living Awaits"</h3>
          <p className='text-lg font-medium '>Experience modern amenities and stunning architecture in prime locations.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="object-cover d-block w-screen h-[80vh] "
          src="https://images.pexels.com/photos/208736/pexels-photo-208736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Third slide"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"></div>
        <Carousel.Caption>
          <h3 className='text-3xl font-poppins  font-bold text-white'>"Find Your Perfect Space"</h3>
          <p className='text-lg font-medium '>Whether you're buying or renting, we hawhitee ideal property for you.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="object-cover d-block w-screen h-[80vh] "
          src="https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Third slide"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"></div>
        <Carousel.Caption>
          <h3 className='text-3xl font-poppins  font-bold text-white'>"Exclusive Properties Just for You"</h3>
          <p className='text-lg font-medium '>Handpicked homes in the best neighborhoods for ultimate comfort.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="object-cover d-block w-screen h-[80vh] "
          src="https://images.pexels.com/photos/32870/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Third slide"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"></div>
        <Carousel.Caption>
          <h3 className='text-3xl font-poppins  font-bold text-white'>"Your Future Starts Here"</h3>
          <p className='text-lg font-medium '>Invest in properties that provide both style and convenience.

</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="object-cover d-block w-screen h-[80vh] "
          src="https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Third slide"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"></div>
        <Carousel.Caption>
          <h3 className='text-3xl font-poppins  font-bold text-white '>"Homes Tailored to Your Needs"
          </h3>
          <p className='text-lg font-medium '>From cozy apartments to spacious estates, find what suits you best.

</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
     </div>
     
     </>
  )
}

export default CarouselComp