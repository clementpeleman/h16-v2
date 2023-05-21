import Image from 'next/image';
import { FiClock, FiTag } from 'react-icons/fi';
import PagesMetaHead from '../../components/PagesMetaHead';
import { projectsData } from '../../data/projectsData';
import RelatedProjects from '../../components/projects/RelatedProjects';
import { fetcher } from '../../lib/api';
import Link from 'next/link';
import AboutClientSingle from '../../components/about/AboutClientSingle';

function ProjectSingle(props) {
	return (
		<div className="container mx-auto">
			<PagesMetaHead title={props.project.attributes.naam} />

			{/* Header */}
			<div>
				<p className="font-general-medium text-left text-3xl sm:text-4xl font-bold text-primary-dark dark:text-primary-light mt-14 sm:mt-20 mb-7">
					{props.project.attributes.naam}
				</p>
				<div className="flex">
					<div className="flex items-center mr-10">
						<FiClock className="text-xl text-ternary-dark dark:text-ternary-light" />
						<span className="font-general-regular ml-2 leading-none text-primary-dark dark:text-primary-light">
							{props.project.attributes.publishedAt}
						</span>
					</div>
					<div className="flex items-center">
						<FiTag className="w-4 h-4 text-ternary-dark dark:text-ternary-light" />
						{props.project.attributes.tags.data.map((tag) => {
							return(
							<span className="font-general-regular ml-2 leading-none text-primary-dark dark:text-primary-light" key={tag.id}>
								{tag.attributes.Type}
							</span>
							);
						})}
						
					</div>
				</div>
			</div>

			{/* Gallery */}
			<div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-10 mt-12">
				{props.project.attributes.afbeeldingen.data.map((project) => {
					return (
						<div className="mb-10 sm:mb-0" key={project.id}>
							<Image
								src={process.env.NEXT_PUBLIC_STRAPI_ASSET_URL + project.attributes.url}
								className=" cursor-pointer shadow-lg sm:shadow-none"
								alt={project.name}
								key={project.id}
								layout="responsive"
								width={100}
								height={90}
							/>
						</div>
					);
				})}
			</div>

			{/* Info */}
			<div className="block sm:flex gap-0 sm:gap-10 mt-14">
				<div className="w-full sm:w-1/3 text-left">
					{/* Single project client details */}
					<div className="mb-7">
						<p className="font-general-medium text-2xl sm:text-3xl  text-secondary-dark dark:text-secondary-light mb-2">
							Over Project
						</p>
						<ul className="leading-loose">
							<li
								className="font-general-regular text-ternary-dark dark:text-ternary-light"
								key={props.project.attributes.naam}
							>
								<span>Adres: </span>
								<a
									href={"http://maps.google.com/?q=" + props.project.attributes.Adres}
									className={
										 'hover:underline hover:text-indigo-500 dark:hover:text-indigo-400 cursor-pointer duration-300'
											
									}
									aria-label="Project Website and Phone"
								>
									{props.project.attributes.naam}
								</a>
							</li>
						</ul>
					</div>

					{/* Single project social sharing */}
					{/* <div>
						<p className="font-general-regular text-2xl font-semibold text-ternary-dark dark:text-ternary-light mb-2">
							Share This
						</p>
						<div className="flex items-center gap-3 mt-5">
									<Link
										key={props.project.id}
										href={props.project.attributes.Link_Socialmedia}
										target="__blank"
										passHref={true}
										aria-label="Share Project"
										className="bg-ternary-light dark:bg-ternary-dark text-gray-400 hover:text-primary-dark dark:hover:text-primary-light p-2 rounded-lg shadow-sm duration-500"
									>
									</Link>;
						</div>
					</div> */}
				</div>

				{/*  Single project right section details */}
				<div className="w-full sm:w-2/3 text-left mt-10 sm:mt-0">
					<p className="text-primary-dark dark:text-primary-light text-2xl sm:text-3xl font-general-medium  mb-7">
						Beschrijving
					</p>
					<p>{props.project.attributes.beschrijving}</p>
				</div>
			</div>

			{/* <div className="mt-10 sm:mt-20">
			<p className="font-general-medium text-2xl sm:text-3xl  text-left text-primary-dark dark:text-primary-light">
				Samenwerkingen
			</p>
			<div className="grid grid-cols-2 sm:grid-cols-4 mt-10 sm:mt-14 gap-2">
				{props.project.attributes.samenwerkings.data.map((samenwerking) => (
					<AboutClientSingle
						title={samenwerking.naam}
						image={samenwerking.img}
						key={samenwerking.id}
					/>
				))}
			</div>
		</div> */}

			<RelatedProjects props={props.related}/>
		</div>
	);
}

function removeObjectWithId(arr, id) {
	// Making a copy with the Array from() method
	const arrCopy = Array.from(arr);
	const objWithIdIndex = arrCopy.findIndex((obj) => obj.id == id);
	arrCopy.splice(objWithIdIndex, 1);
	return arrCopy;
  }

export async function getServerSideProps({ query }) {
	const { id } = query;
	const projectsResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/projects?populate=*`);

	const projectFilter = projectsResponse.data.filter(
				(project) => project.id === parseInt(id)
			)[0]
	
	const negprojectFilter = removeObjectWithId(projectsResponse.data, id)

	return {
		props: {
			project: projectFilter,
			related: negprojectFilter
		},
	};
}

export default ProjectSingle;
