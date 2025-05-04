import React from 'react';
import conImg from "../../assets/contactus.svg"
import Swal from 'sweetalert2';

const ContactUs = () => {

  const handleForm = (e) =>{
    e.preventDefault()

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    const formData = {
      name,
      email,
      message
    }
    console.log(formData)
    form.reset()

    // notify the user that the message has been sent
    // Swal.fire({
    //   title: 'Message Sent!',
    //   text: `Thank you, ${name}, your message has been sent successfully!`,
    //   icon: 'success',
    //   showConfirmButton: false,
    //   timer: 1500,
    // })

    Swal.mixin({
      toast: true,
      position: 'top-right',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    }).fire({
      icon: 'success',
      title: `Thank you, ${name}, your message has been sent!`
    });
    
  }

  return (
    <div className='bg-gray-100 py-8'>
      <div className="w-11/12 mx-auto min-h-screen flex items-center justify-center bg-white shadow-lg p-4 rounded-lg">
      <div className=" rounded-lg p-6 flex flex-col-reverse md:flex-row ">
        {/* Left side - Form */}
        <div className="md:w-1/2 p-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Contact Us</h1>
          <p className="text-gray-600 mb-6">Have any questions? Reach out to us through the form below or via our contact details.</p>
          <form className="space-y-4"  onSubmit={handleForm}>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Name</label>
              <input 
                type="text" 
                name='name'
                placeholder="Enter your name" 
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input 
                type="email" 
                name='email'
                placeholder="Enter your email" 
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Message</label>
              <textarea 
                rows="4" 
                name='message'
                placeholder="Enter your message" 
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="w-full border-2 text-black py-2 rounded-lg hover:bg-gray-300 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
        {/* Right side - Contact Info & Image */}
        <div className="md:w-1/2 p-4 flex flex-col items-center justify-center text-center">
          <img src={conImg} alt="Contact" className="w-64 h-64 object-cover rounded-lg mb-4" />
          <p className="text-gray-700"><strong>Email:</strong> contact@propertypulse.com</p>
          <p className="text-gray-700"><strong>Phone:</strong> +1 (123) 456-7890</p>
          <p className="text-gray-700"><strong>Address:</strong> 1234 Property St, Building City, BC 56789</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ContactUs;
