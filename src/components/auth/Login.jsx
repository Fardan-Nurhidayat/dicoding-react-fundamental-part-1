import { Input } from "@components/form";
import { Label } from "@components/form";
import { EnvelopeIcon, LockOpenIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router";
import { loginUser } from "@utils/api";
import { Spinner } from "@material-tailwind/react";

const validators = {
  email: (value) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value),
  password: (value) => value.length >= 6,
};

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [apiError, setApiError] = useState("");

  const handleChangeEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
    setApiError("");
    if (value.length > 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: !validators.email(value) ? "Invalid email address." : "",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "",
      }));
    }
  };

  const handleChangePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
    setApiError("");
    if (value.length > 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: !validators.password(value) ? "Password must be at least 6 characters long." : "",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    const emailError = !validators.email(email) ? "Invalid email address." : "";
    const passwordError = !validators.password(password) ? "Password must be at least 6 characters long." : "";

    setErrors({
      email: emailError,
      password: passwordError,
    });

    if (!emailError && !passwordError) {
      setLoading(true);
      try {
        const response = await loginUser({ email, password });
        
        // Store token
        if (response.data?.accessToken) {
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("userEmail", email);
        }

        // Reset form
        setEmail("");
        setPassword("");
        setErrors({ email: "", password: "" });

        // Redirect to home page
        setTimeout(() => {
          setLoading(false);
          navigate("/");
        }, 500);
      } catch (error) {
        setLoading(false);
        setApiError(error.message || "Login failed. Please try again.");
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300'>
      {loading && (
        <div className='absolute top-0 left-0 w-full h-full bg-gray-500/50 dark:bg-gray-900/70 flex items-center justify-center z-50'>
          <Spinner className='h-12 w-12 text-blue-500' color='blue' />
        </div>
      )}
      <div className='min-w-xl min-h-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 transition-colors duration-300'>
        <h2 className='text-2xl font-semibold mb-2 text-center text-gray-900 dark:text-gray-100'>Login</h2>
        <p className='text-md font-semibold text-gray-500 dark:text-gray-400 text-center'>
          Enter your email and password to log in to your account.
        </p>
        
        {apiError && (
          <div className='mt-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 rounded-lg text-sm'>
            {apiError}
          </div>
        )}

        <div className='my-5 md:mx-10'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label
                icon={<EnvelopeIcon className='w-5 h-5 text-gray-400 dark:text-gray-500' />}
                htmlFor='email'
                className='block mb-1 font-medium text-gray-700 dark:text-gray-300'
              >
                Email
              </Label>
              <Input
                value={email}
                onChange={handleChangeEmail}
                type='email'
                id='email'
                name='email'
                placeholder='Enter your email'
                required
                autoComplete='email'
                disabled={loading}
              />
              {errors.email && (
                <span className='text-red-500 dark:text-red-400 text-xs font-bold'>
                  {errors.email}
                </span>
              )}
            </div>

            <div>
              <Label
                icon={<LockOpenIcon className='w-5 h-5 text-gray-400 dark:text-gray-500' />}
                htmlFor='password'
                className='block mb-1 font-medium text-gray-700 dark:text-gray-300'
              >
                Password
              </Label>
              <Input
                value={password}
                onChange={handleChangePassword}
                type='password'
                id='password'
                name='password'
                placeholder='Enter your password'
                required
                autoComplete='current-password'
                disabled={loading}
              />
              {errors.password && (
                <span className='text-red-500 dark:text-red-400 text-xs font-bold'>
                  {errors.password}
                </span>
              )}
            </div>

            <button
              type='submit'
              disabled={loading}
              className='w-full cursor-pointer bg-teal-500 hover:bg-teal-600 dark:bg-teal-700 dark:hover:bg-teal-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 mt-4 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className='text-gray-700 dark:text-gray-400 font-medium text-base text-center mt-4'>
              Don't have an account?{" "}
              <a
                href='/register'
                className='text-teal-500 dark:text-teal-400 hover:underline'
              >
                Register here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
