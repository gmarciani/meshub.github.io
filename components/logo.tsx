import { motion } from 'framer-motion';
import Image from 'next/image';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const Logo = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-2 leading-0"
    >
      <Image
        src={`${basePath}/meshub-logo.png`}
        alt="Meshub Logo"
        width={40}
        height={40}
        className="w-[40px] h-[40px]"
      />

      <span className="text-2xl font-bold bg-gradient-to-r from-indigo-700 dark:from-indigo-400 to-indigo-400 dark:to-indigo-300 bg-clip-text text-transparent">
        Meshub
      </span>
    </motion.div>
  );
};

export default Logo;