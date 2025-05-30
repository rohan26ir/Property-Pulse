import React from "react";
import { BsInstagram } from "react-icons/bs";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaLocationDot, FaXTwitter } from "react-icons/fa6";
import { MdContactPhone, MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <div className="bg-gray-900 text-white ">

      <div className="w-11/12 mx-auto">
        <div className="flex flex-col md:flex-row justify-between py-5">
          <div className="flex items-center gap-2">
            <img className="h-28" src="/favicon.png" alt="" />
            <div>
              <p className="text-2xl font-bold text-white">PropertyPulse</p>
              <p>
                Pulse of Efficiency, <br />
                Heart of Building Management.
              </p>
            </div>
          </div>

          <div className="block md:hidden lg:block">
            <h2 className="text-2xl font-bold py-5  text-white">Pages</h2>
            <div className="flex flex-col">
              <div>Home</div>
              <div>Apartment</div>
              <div>Deshboard</div>
              <div></div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold py-5 text-white">Contact</h2>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center gap-2">
                <MdContactPhone />
                01777012666
              </div>
              <div className="flex items-center gap-2">
                <MdEmail />
                property@gmail.com
              </div>
              <div className="flex items-center gap-2">
                <FaLocationDot />
                <p>
                  Mirpur 1216 <br />
                  Dhaka, Bangladesh
                </p>
              </div>
              <div className="flex items-center gap-2"></div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold py-8  text-white">Social</h2>
            <div className="flex flex-row gap-5 text-2xl">
              <FaFacebookF />
              <FaXTwitter />
              <FaLinkedinIn />
              <BsInstagram />
            </div>
          </div>
        </div>
      </div>

        <div className="h-[1px] bg-gray-700"></div>
        {/* below part */}
        <div className="flex flex-col-reverse md:flex-row justify-between w-11/12 mx-auto py-5">
          <div>
            <p>Copyright © 2025 PropertyPulse</p>
          </div>

          <div>
            <p>Privacy Policy</p>
          </div>

          <div>
            <p>Terms & Services</p>
          </div>
        </div>
        {/* below part */}
    </div>
  );
};

export default Footer;
