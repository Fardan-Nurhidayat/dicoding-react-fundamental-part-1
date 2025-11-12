import React from "react";
import { Typography, Button } from "@material-tailwind/react";
import { FlagIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router";
export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className='h-screen mx-auto grid place-items-center text-center px-8 bg-white dark:bg-gray-900 transition-colors duration-300'>
      <div>
        <FlagIcon className='w-20 h-20 mx-auto text-gray-800 dark:text-gray-200' />
        <Typography
          variant='h1'
          color='blue-gray'
          className='mt-10 text-3xl! leading-snug! md:text-4xl! dark:text-gray-100'
        >
          Error 404 <br /> It looks like something went wrong.
        </Typography>
        <Typography className='mt-8 mb-14 text-[18px] font-normal text-gray-500 dark:text-gray-400 mx-auto md:max-w-sm'>
          Don&apos;t worry, our team is already on it.Please try refreshing the
          page or come back later.
        </Typography>
        <Button
          onClick={() => navigate("/")}
          className='w-full px-4 md:w-32 bg-black dark:bg-gray-800 p-3 cursor-pointer font-semibold hover:bg-gray-900 dark:hover:bg-gray-700'
        >
          back home
        </Button>
      </div>
    </div>
  );
}
