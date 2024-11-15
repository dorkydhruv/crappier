import { GITHUB_URL } from "@/constants/const";
import { Github } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className='flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t'>
      <p className='text-xs text-gray-500 dark:text-gray-400'>Made with ❤️</p>
      <nav className='sm:ml-auto flex gap-4 sm:gap-6'>
        <Link href={GITHUB_URL}>
          <Github />
        </Link>
      </nav>
    </footer>
  );
};
