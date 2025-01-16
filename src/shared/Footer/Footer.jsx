import React from 'react';

const Footer = () => {
  return (
    <div className='bg-gray-900 text-white'>
      <div className=' flex  px-4 py-4'>
        <div></div>
        <div></div>
        <div>
          <h2>Socials</h2>
          <div className='flex flex-col'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>

      <div className='flex justify-between border-t-2 border-gray-700 px-4 py-4'>
        <div>
          <p>Copyright © 2025 PropertyPulse</p>
        </div>
        <div className='flex justify-between  gap-5'>
          <div>
            <p>Privacy Policy</p>
          </div>
          <div>
            <p>Terms & Services</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;