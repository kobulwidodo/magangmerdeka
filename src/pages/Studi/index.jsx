import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import moment from "moment/moment";
import { getStudpen } from "../../api/model/studpen";

const Studi = () => {
  const [magangs, setMagangs] = useState([]);
  const [limit, setLimit] = useState(12);
  const [position, setPosition] = useState("");
  const [location, setLocation] = useState("");
  const [mitra, setMitra] = useState("");
  const [total, setTotal] = useState(0);

  const fetchMagang = async () => {
    try {
      const res = await getStudpen();
      let dataMagang = res.data.data;
      setMagangs(dataMagang);
      if (position.length > 0) {
        dataMagang = dataMagang.filter(function (magang) {
          return magang.name.toLowerCase().includes(position.toLowerCase());
        });
        setMagangs(dataMagang);
      }
      if (location.length > 0) {
        dataMagang = dataMagang.filter(function (magang) {
          return magang.location.toLowerCase().includes(location.toLowerCase());
        });
        setMagangs(dataMagang);
      }
      if (mitra.length > 0) {
        dataMagang = dataMagang.filter(function (magang) {
          return magang.mitra_name.toLowerCase().includes(mitra.toLowerCase());
        });
        setMagangs(dataMagang);
      }
      setTotal(dataMagang.length);
    } catch (error) {}
  };

  const handlerMore = () => {
    setLimit(limit + 12);
  };

  useEffect(() => {
    fetchMagang();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position, mitra, location]);

  return (
    <>
      <div className="max-w-7xl mx-auto py-14 px-4">
        <p className="text-[#31B380] text-center font-semibold mb-3">
          Kampus Merdeka
        </p>
        <h1 className="text-[#211B3D] text-center font-semibold text-3xl">
          Studi Independen
        </h1>
        <p className="text-[#211B3D] text-center font-light text-sm mt-4">
          * kuota didapatkan dari sumber data website mbkm <br />
          data bisa saja valid bisa jadi tidak
        </p>
        <p className="text-[#211B3D] mt-5">Total Posisi : {total}</p>
        <div className="sm:flex sm:gap-x-4 mt-3">
          <input
            type="text"
            name="position"
            placeholder="Cari bedasarkan posisi"
            className="text-[#211B3D] font-medium w-full px-7 py-2 border rounded-full mb-5 sm:mb-0"
            onChange={(e) => setPosition(e.target.value)}
          />
          <input
            type="text"
            name="location"
            placeholder="Cari bedasarkan lokasi"
            className="text-[#211B3D] font-medium w-full px-7 py-2 border rounded-full mb-5 sm:mb-0"
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            type="text"
            name="mitra"
            placeholder="Cari bedasarkan mitra"
            className="text-[#211B3D] font-medium w-full px-7 py-2 border rounded-full"
            onChange={(e) => setMitra(e.target.value)}
          />
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 sm:grid-cols-2 mt-10 gap-6">
          {magangs.slice(0, limit).map((magangs, index) => (
            <a
              href={`https://kampusmerdeka.kemdikbud.go.id/program/studi-independen/browse/${magangs.mitra_id}/${magangs.id}`}
              target="__blank"
              className="bg-[#FAFAFA] rounded-2xl py-6 px-5 shadow-sm hover:bg-[#fff3f3]"
            >
              <img
                src={magangs.logo}
                className="mx-auto mt-5 max-h-[88px]"
                alt=""
              />
              <h1 className="text-[#433a63] font-medium text-lg mt-7">
                {magangs.name}
              </h1>
              <p className="text-[#2E405C] mt-1">{magangs.mitra_name}</p>
              <p className="text-[#2E405C] mt-1">{magangs.location}</p>
              <p className="text-[#2E405C] mt-1">
                {moment(magangs.start_duration).format("ll")} -{" "}
                {moment(magangs.end_duration).format("ll")}
              </p>
              <hr className="my-5" />
              <div className="flex justify-between">
                <p className="text-[#2E405C] mt-1">
                  {magangs.participants_count} Kuota
                </p>
                <p className="text-[#2E405C] mt-1">{magangs.activity_type}</p>
              </div>
            </a>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <button
            className="bg-gray-400 px-4 py-2 rounded-lg text-white"
            onClick={handlerMore}
          >
            Muat Lagi
          </button>
        </div>
      </div>
    </>
  );
};

export default Studi;
