import { useContext, useState } from 'react';
import { AuthContext } from '../../Provider/Provider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import LoginWith from '../LoginWith/LoginWith';

const SignIn = () => {
    const [disabled, setDisabled] = useState(true);
    const [showPassword, setShowPassword] = useState(false);  // Add state for password visibility
    const { logIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";
    console.log('state in the location login page', location.state);

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        logIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: 'User Login Successful.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
                navigate(from, { replace: true });
            });
    };

    return (
        <>
            <Helmet>
                <title>SignIn  - PropertyPulse</title>
            </Helmet>
            <div className="hero py-5 bg-base-200">
                {/* <div className="hero-content flex-col md:flex-row-reverse"> */}

                    {/* <div className="text-center md:w-1/2 lg:text-left">
                        <h1 className="text-5xl font-bold">Welcome Back to PropertyPulse!</h1>
                        <p className="py-6">Log in to PropertyPulse to easily manage your properties, tenants, and finances, all in one place. Stay organized and efficient with our user-friendly dashboard.</p>
                    </div> */}

                    <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <div className='flex justify-center border-b-2'>
                                    <h2 className='text-2xl font-bold mb-1'>Log In to PropertyPulse</h2>

                                </div>
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" />
                            </div>

                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}  // Toggle password visibility
                                    name="password"
                                    placeholder="password"
                                    className="input input-bordered"
                                />
                                <div
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="h-8 w-8 cursor-pointer text-orange-500 absolute right-4 top-12 rounded-full flex justify-center items-center"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                </div>

                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>

                            <div className="form-control">
                                <input disabled={false} className="btn bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600 transition" type="submit" value="Login" />
                            </div>
                        </form>

                        <div className='px-6 w-96'>
                            <small>New Here? <Link to="/signup"><span className='text-blue-600'>Create an account!</span></Link> </small>
                        </div>

                        <div className=''>
                            <LoginWith></LoginWith>
                        </div>
                    </div>
                {/* </div> */}
            </div>
        </>
    );
};

export default SignIn;
