import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import banner from '../../assets/images/banner.png';
import { ButtonMain } from '../../components/Button/ButtonMain';

const Home = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto py-20 px-4 flex flex-row">
        <div className="flex-1">
          <p className="font-semibold text-[#31B380] text-center md:text-start">
            Batch 4
          </p>
          <h1 className="text-[#211B3D] font-semibold text-4xl mt-8 text-center md:text-start">
            Magang Studi
          </h1>
          <h1 className="text-[#211B3D] font-semibold text-4xl mt-4 text-center md:text-start">
            Merdeka Belajar
          </h1>
          <p className="text-[#5B5575] mt-8 mb-10 text-center md:text-start">
            Disini bisa liat kuota magang dan studpen + live update cuy !
          </p>
          <div className="flex gap-x-5 justify-center md:justify-start">
            <Link to="/magang">
              <ButtonMain className="rounded-full">Magang</ButtonMain>
            </Link>
            <Link to="/studi">
              <ButtonMain className="rounded-full">Studi</ButtonMain>
            </Link>
          </div>
        </div>
        <div className="hidden md:flex justify-end md:flex-1">
          <img src={banner} className="w-full max-w-[490px]" alt="" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-5 px-4">
        <p className="text-center">
          Created with love by KobulWidodo and PW Homebase
        </p>
      </div>
    </>
  );
};

export default Home;
