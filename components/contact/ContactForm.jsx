import { useState } from 'react';
import Button from '../reusable/Button';
import FormInput from '../reusable/FormInput';

function ContactForm() {
	const [values, setValues] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	  });
	  const { name, email, subject, message } = values;
	
	  const handleChange = (e) =>
		setValues({ ...values, [e.target.name]: e.target.value });
	
	  const handleSubmit = async (e) => {
		e.preventDefault();
		await fetch("/api/contact", {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify(values),
		});
	  };

	return (
		<div className="w-full lg:w-1/2">
			<div className="leading-loose">
				<form
					onSubmit={handleSubmit}
					className="max-w-xl m-4 p-6 sm:p-10 bg-secondary-light dark:bg-secondary-dark rounded-xl shadow-xl text-left"
				>
					<p className="font-general-medium text-primary-dark dark:text-primary-light text-2xl mb-8">
						Contact Formulier
					</p>

					{/* <FormInput
						inputLabel="Naam"
						labelFor="name"
						inputType="text"
						inputId="name"
						value={name}
						inputName="name"
						onChange={handleChange}
						placeholderText="Your Name"
						ariaLabelName="Name"
					/> */}
					<div className="font-general-regular mb-4">
						<label
							className="block text-lg text-primary-dark dark:text-primary-light mb-1"
							htmlFor="name"
						>
							Naam
						</label>
						<input
							className="w-full px-5 py-2 border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm text-md"
							type="inputType"
							id="name"
							name="name"
							placeholder="Your Name"
							aria-label="Name"
							value={name}
							onChange={handleChange}
							required
						/>
					</div>
					{/* <FormInput
						inputLabel="Email"
						labelFor="email"
						inputType="email"
						inputId="email"
						inputName="email"
						value={email}
						onChange={handleChange}
						placeholderText="Your email"
						ariaLabelName="Email"
					/> */}
					<div className="font-general-regular mb-4">
						<label
							className="block text-lg text-primary-dark dark:text-primary-light mb-1"
							htmlFor="email"
						>
							Email
						</label>
						<input
							className="w-full px-5 py-2 border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm text-md"
							type="email"
							id="email"
							name="email"
							placeholder="Your email"
							aria-label="Email"
							value={email}
							onChange={handleChange}
							required
						/>
					</div>
					
					{/* <FormInput
						inputLabel="Onderwerp"
						labelFor="subject"
						inputType="text"
						inputId="subject"
						inputName="subject"
						value={subject}
						onChange={handleChange}
						placeholderText="Onderwerp"
						ariaLabelName="Subject"
					/> */}
					<div className="font-general-regular mb-4">
						<label
							className="block text-lg text-primary-dark dark:text-primary-light mb-1"
							htmlFor="subject"
						>
							Onderwerp
						</label>
						<input
							className="w-full px-5 py-2 border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm text-md"
							type="text"
							id="subject"
							name="subject"
							placeholder="Onderwerp"
							aria-label="Subject"
							value={subject}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="mt-6">
						<label
							className="block text-lg text-primary-dark dark:text-primary-light mb-2"
							htmlFor="message"
						>
							Bericht
						</label>
						<textarea
							className="w-full px-5 py-2 border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm text-md"
							id="message"
							name="message"
							cols="14"
							rows="6"
							aria-label="Message"
							value={message}
							onChange={handleChange}
						></textarea>
					</div>

					<div className="mt-6">
						<span className="font-general-medium  px-7 py-4 text-white text-center font-medium tracking-wider bg-primary hover:bg-indigo-600 focus:ring-1 focus:ring-indigo-900 rounded-lg mt-6 duration-500">
							<Button
								title="Send Message"
								type="submit"
								aria-label="Send Message"
							/>
						</span>
					</div>
				</form>
			</div>
		</div>
	);
}

export default ContactForm;
