import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import randomColor from 'randomcolor';
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';
import { fetchDoctors } from '../../redux/docter/doctorSlice';

const Doctors = () => {
  const doctors = useSelector((state) => state.doctors.doctors);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  const randomHexColor = randomColor();

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  const scrollRight = () => {
    sliderRef.current.slickNext();
  };

  const scrollLeft = () => {
    sliderRef.current.slickPrev();
  };

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    initialSlide: 0,
    slidesToShow: Math.min(3, doctors.length),
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: Math.min(2, doctors.length),
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  if (doctors.length === 0) {
    return <div>Doctors Loading...</div>;
  }

  return (
    <section className="home-page">
      <h1>DOCTORS LIST</h1>
      <p className="home-page-text">Select a Doctor</p>
      <div className="carousel-container">
        <div className="carousel-doctor">
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Slider ref={sliderRef} {...settings}>
            {doctors.map((doctor) => (
              <div key={doctor.id} className="doctors-list">
                <button
                  className=" border border-white details-link"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`${doctor.id}`);
                  }}
                >
                  <div className="doctor-card">
                    <div
                      className="circle-color"
                      style={{ backgroundColor: randomHexColor }}
                    >
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="doctor-image"
                      />
                    </div>
                    <div className="doctors-card-details">
                      <h5 className="doctor-name">{doctor.name}</h5>
                      <p className="doctor-details">
                        {doctor.bio.slice(0, 30)}
                        {doctor.bio.length > 30 && '...'}
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </Slider>
          <div className="carousel-buttons d-flex justify-content-between">
            <button type="button" className="btn-doctor2" onClick={scrollLeft}>
              <BiSolidLeftArrow />
            </button>
            <button type="button" className="btn-doctor" onClick={scrollRight}>
              <BiSolidRightArrow />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Doctors;
