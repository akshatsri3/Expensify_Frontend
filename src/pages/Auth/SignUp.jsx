import React, { useState, useContext } from 'react';
import Authlayout from '../../components/layouts/Authlayout';
import Input from '../../components/Inputs/Input';
import { useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from '../../utils/helper';
import ProfilePicSelector from '../../components/Inputs/ProfilePicSelector';
import { UserContext } from '../../context/UserContext';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import uploadImage from '../../utils/uploadImage';

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  //Handle Signup Form Submit
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!fullName) {
      setError("Please enter your full name.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character.");
      return;
    }

    setError("");

    //Sign Up API Call
    try {
      let profileImageUrl = "";
      //upload image if present
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  }

  return (
    <Authlayout>
      <div className="lg:w-[70%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join Expensify today and manage your expenses.
        </p>

        <form onSubmit={handleSignup}>
          <div className="flex justify-center mb-6">
            <ProfilePicSelector image={profilePic} setImage={setProfilePic} />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="Enter your full name"
              type="text"
            />

            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="hello@example.com"
              type="text"
            />

            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="Min. 8 characters"
              type="password"
            />
          </div>


          {error && <p className="text-red-500 text-xs mt-3">{error}</p>}

          <button type="submit" className="btn-primary mt-6">
            CREATE ACCOUNT
          </button>

          <p className="text-[12px] text-slate-800 text-center mt-3">
            Already have an account?{" "}
            <span
              className="font-medium text-primary underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </Authlayout>
  )
}

export default SignUp