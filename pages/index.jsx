import Link from 'next/link';
import PagesMetaHead from '../components/PagesMetaHead';
import ProjectsGrid from '../components/projects/ProjectsGrid';
import Button from '../components/reusable/Button';
import AppBanner from '../components/shared/AppBanner';
import { fetcher } from '../lib/api';

export default function Home({projecten}) {
	return (
		<div className="container mx-auto">
			<PagesMetaHead title="H16 Vastgoedontwikkeling" />

			<AppBanner />

			<ProjectsGrid projects={projecten}/>

			
		</div>
	);
}

export async function getServerSideProps() {
	const projectsResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/projects?populate=*`);
	return {
		props: {
			projecten: projectsResponse
		}
	}
}