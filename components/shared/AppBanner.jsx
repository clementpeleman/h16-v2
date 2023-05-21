import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiArrowDownCircle } from 'react-icons/fi';
import useThemeSwitcher from '../../hooks/useThemeSwitcher';

function AppBanner() {
	const [activeTheme] = useThemeSwitcher();

	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ ease: 'easeInOut', duration: 0.9, delay: 0.2 }}
			className="flex flex-col sm:justify-between items-center sm:flex-row md:my-10 md:mb-20"
		>
			<div className="w-full md:w-1/2 text-left">
				{/* <motion.h1
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						ease: 'easeInOut',
						duration: 0.9,
						delay: 0.1,
					}}
					className="font-balerno text-2xl lg:text-3xl xl:text-4xl text-center sm:text-left text-ternary-dark dark:text-primary-light uppercase"
				>
					
				</motion.h1> */}
				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						ease: 'easeInOut',
						duration: 0.9,
						delay: 0.2,
					}}
					className="md:font-general-regular ml-3 w-5/6 sm:w-full mt-8 md:-mt-5 lg:-mt-26 xl:-mt-32 text-3xl md:text-4xl lg:text-5xl xl:text-7xl text-left sm:text-left leading-normal text-gray-800 dark:text-gray-200"
				>
					Wij geven een nieuwe invulling aan <span className=' text-black font-balerno underline underline-offset-4 decoration-1 hover:text-accent cursor-pointer'>huizen</span> en <span className='text-black font-balerno underline underline-offset-4 decoration-1 sm: hover:text-accent cursor-pointer'>gronden</span>
				</motion.p>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						ease: 'easeInOut',
						duration: 0.9,
						delay: 0.3,
					}}
					className="flex justify-center sm:block"
				>
					{/* <a
						download="Stoman-Resume.pdf"
						href="/files/Stoman-Resume.pdf"
						className="font-general-medium flex justify-center items-center w-36 sm:w-48 mt-12 mb-6 sm:mb-0 text-lg border border-indigo-200 dark:border-ternary-dark py-2.5 sm:py-3 shadow-lg rounded-lg bg-indigo-50 focus:ring-1 focus:ring-indigo-900 hover:bg-indigo-500 text-gray-500 hover:text-white duration-500"
						aria-label="Download Resume"
					>
						<FiArrowDownCircle className="ml-0 sm:ml-1 mr-2 sm:mr-3 h-5 w-5 sn:w-6 sm:h-6 duration-100"></FiArrowDownCircle>
						<span className="text-sm sm:text-lg duration-100">
							Download CV
						</span>
					</a> */}
				</motion.div>
			</div>
			<motion.div
				initial={{ opacity: 0, y: -180 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ ease: 'easeInOut', duration: 0.6, delay: 0.1 }}
				className="w-full md:w-3/5 text-right float-right mt-2 "
			>
				<img
					layout="responsive"
					src={"/images/kolibri.png"
					}
					alt="Kolibri"
				/>
			</motion.div>
		</motion.section>
	);
}

export default AppBanner;
