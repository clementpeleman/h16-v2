import PagesMetaHead from '../../components/PagesMetaHead';
import ProjectsGrid from '../../components/projects/ProjectsGrid';
import { fetcher } from '../../lib/api';

function index({projecten}) {
	return (
		<div className="container mx-auto">
			<PagesMetaHead title="Projects" />

			<ProjectsGrid projects={projecten}/>
		</div>
	);
}

export default index;

export async function getServerSideProps() {
	const projectsResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/projects?populate=*`);
	return {
		props: {
			projecten: projectsResponse
		}
	}
}