import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { registerfunction } from "../services/Apis";
import { useNavigate } from "react-router-dom"
import "../styles/mix.css"
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

    const [passhow, setPassShow] = useState(false);

    const [inputdata, setInputdata] = useState({
        fname: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();


    // setinputvalue
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputdata({ ...inputdata, [name]: value })
    }


    // register data
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { fname, email, password } = inputdata;

        if (fname === "") {
            toast.error("Enter Your Name");
        } else if (email === "") {
            toast.error("Enter Your Email");
        } else if (!email.includes("@")) {
            toast.error("Enter Valid Email");
        } else if (password === "") {
            toast.error("Enter Your Password");
        } else if (password.length < 6) {
            toast.error("Password length must be at least 6 characters");
        } else {
            try {
                const response = await registerfunction(inputdata);

                if (response.status === 200) {
                    setInputdata({ ...inputdata, fname: "", email: "", password: "" });
                    //navigate("/login");
                    navigate("/login");
                } else {
                    const errorMessage = response?.response?.data?.error;
                    toast.error(errorMessage);
                }
            } catch (error) {
                console.error(error);
                toast.error("An error occurred during registration");
            }
        }
    };


    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Sign Up</h1>
                        <p style={{ textAlign: "center" }}>Register here, and ride on your own terms.</p>
                    </div>
                    <form>
                        <div className="form_input">
                            <label htmlFor="fname">Name</label>
                            <input type="text" name="fname" id="" onChange={handleChange} placeholder='Enter Your Name' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="" onChange={handleChange} placeholder='Enter Your Email Address' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className='two'>
                                <input type={!passhow ? "password" : "text"} name="password" id="" onChange={handleChange} placeholder='Enter Your password' />
                                <div className='showpass' onClick={() => setPassShow(!passhow)} >
                                    {!passhow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>
                        <button className='btn' onClick={handleSubmit}>Sign Up</button>
                        <p>Don't have and account </p>
                    </form>
                </div>
                <ToastContainer className="custom-toast" autoClose={2000}
                    position="top-center"// Adjust the time (in milliseconds) the toast stays visible (e.g., 3000ms = 3 seconds)
                    hideProgressBar />
            </section>
        </>
    )
}

export default Register