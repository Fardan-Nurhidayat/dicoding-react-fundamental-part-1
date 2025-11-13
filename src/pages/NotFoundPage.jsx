import React from "react";
import { Typography, Button } from "@material-tailwind/react";
import { FlagIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router";
import { useLang } from "@/hooks/useLang";
export default function NotFoundPage() {
  const navigate = useNavigate();
  const { t } = useLang();
  return (
    <div className='h-screen mx-auto grid place-items-center text-center px-8 bg-white dark:bg-gray-900 transition-colors duration-300'>
      <div>
        <FlagIcon className='w-20 h-20 mx-auto text-gray-800 dark:text-gray-200' />
        <Typography
          variant='h1'
          color='blue-gray'
          className='mt-10 text-3xl! leading-snug! md:text-4xl! dark:text-gray-100'
        >
          {t("notFoundPage.title")} <br /> {t("notFoundPage.subtitle")}
        </Typography>
        <Typography className='mt-8 mb-14 text-[18px] font-normal text-gray-500 dark:text-gray-400 mx-auto md:max-w-sm'>
          {t("notFoundPage.description")}
        </Typography>
        <Button
          onClick={() => navigate("/")}
          className='w-full px-4 md:w-32 bg-black dark:bg-gray-800 p-3 cursor-pointer font-semibold hover:bg-gray-900 dark:hover:bg-gray-700'
        >
          {t("notFoundPage.backButton")}
        </Button>
      </div>
    </div>
  );
}
