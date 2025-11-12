import { Input } from "@components/form";
import { Label } from "@components/form";
import { UserCircleIcon , LockOpenIcon , EnvelopeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { registerUser } from "@utils/api";
import { Spinner } from "@material-tailwind/react";
const validators = {
  name : (value) => value.length >= 3,
  email : (value) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value),
  password : (value) => value.length >= 6,
  samePassword : (pass, samePass) => pass === samePass,
}
export default function Register() {
  const [loading , setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [samePassword, setSamePassword] = useState("");
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    password: null,
    samePassword: null,
  });
  const handleChangeName = (e) => {
    const value = e.target.value;
    setName(value);
    if (value.length > 0){
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: !validators.name(value) ? "Name must be at least 3 characters long." : null,
      }) );
    }else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: null,
      }) );
    }
  };

  const handleChangeEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value.length > 0){
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: !validators.email(value) ? "Invalid email address." : null,
      }) );
    }else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: null,
      }) );
    }
  }

  const handleChangePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length > 0){
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: !validators.password(value) ? "Password must be at least 6 characters long." : null,
      }) );
    }else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: null,
      }) );
    }
  }

  const handleChangeSamePassword = (e) => {
    const value = e.target.value;
    setSamePassword(value);
    if (value.length > 0){
      setErrors((prevErrors) => ({
        ...prevErrors,
        samePassword: !validators.samePassword(password, value) ? "Passwords do not match." : null,
      }) );
    }else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        samePassword: null,
      }) );
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const nameError = !validators.name(name) ? "Name must be at least 3 characters long." : null;
    const emailError = !validators.email(email) ? "Invalid email address." : null;
    const passwordError = !validators.password(password) ? "Password must be at least 6 characters long." : null;
    const samePasswordError = !validators.samePassword(password, samePassword) ? "Passwords do not match." : null;
    setErrors({
      name: nameError,
      email: emailError,
      password: passwordError,
      samePassword: samePasswordError,
    });
    if (!nameError && !emailError && !passwordError && !samePasswordError) {
      try {
        await registerUser({ name, email, password });
        setLoading(false);
        alert("Registration successful! You can now log in.");
      } catch (error) {
        setLoading(false);
        alert(`Registration failed: ${error.message}`);
      }
      // Reset form
      setName("");
      setEmail("");
      setPassword("");
      setSamePassword("");
      setErrors({
        name: null,
        email: null,
        password: null,
        samePassword: null,
      });
    }
  }



  return (
    <div className='w-full h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300'>
      {loading && (
        <div className='absolute top-0 left-0 w-full h-full bg-gray-500/50 dark:bg-gray-900/70 flex items-center justify-center z-50'>
          <Spinner
            className='h-12 w-12 text-gray-900/50 dark:text-gray-100/50'
            color='blue'
          />
        </div>
      )}
      <div className='min-w-xl min-h-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 transition-colors duration-300'>
        <h2 className='text-2xl font-semibold mb-2 text-center text-gray-900 dark:text-gray-100'>Register</h2>
        <p className='text-md font-semibold text-gray-500 dark:text-gray-400 text-center'>
          Enter your name , email , and password to register an account.
        </p>
        <div className='my-5 md:mx-10'>
          <form
            className='flex flex-col gap-4'
            onSubmit={handleSubmit}
          >
            <div>
              <Label
                icon={<UserCircleIcon className='w-5 h-5 text-gray-400 dark:text-gray-500' />}
                htmlFor='name'
                className='block mb-1 font-medium text-gray-700 dark:text-gray-300'
              >
                Name
              </Label>
              <Input
                value={name}
                onChange={handleChangeName}
                type='text'
                id='name'
                name='name'
                placeholder='Enter your name'
                required
                autoComplete='name'
              />
              {errors.name && (
                <span className='text-red-500 dark:text-red-400 text-xs font-bold'>
                  {errors.name}
                </span>
              )}
            </div>
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
                autoComplete='new-password'
              />
              {errors.password && (
                <span className='text-red-500 dark:text-red-400 text-xs font-bold'>
                  {errors.password}
                </span>
              )}
            </div>
            <div>
              <Label
                icon={<LockOpenIcon className='w-5 h-5 text-gray-400 dark:text-gray-500' />}
                htmlFor='samePassword'
                className='block mb-1 font-medium text-gray-700 dark:text-gray-300'
              >
                Confirm Password
              </Label>
              <Input
                value={samePassword}
                onChange={handleChangeSamePassword}
                type='password'
                id='samePassword'
                name='samePassword'
                placeholder='Confirm your password'
                required
                autoComplete='new-password'
              />
              {errors.samePassword && (
                <span className='text-red-500 dark:text-red-400 text-xs font-bold'>
                  {errors.samePassword}
                </span>
              )}
            </div>
            <button
              type='submit'
              disabled={loading}
              className='w-full cursor-pointer bg-teal-500 hover:bg-teal-600 dark:bg-teal-700 dark:hover:bg-teal-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 mt-4 disabled:cursor-not-allowed disabled:opacity-50'
            >
              Register
            </button>

            <p className='text-gray-700 dark:text-gray-400 font-medium text-base text-center mt-4'>
              Already have an account?{" "}
              <a
                href='/login'
                className='text-teal-500 dark:text-teal-400 hover:underline'
              >
                Login here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}