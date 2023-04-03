import type { PageLoad } from './$types';
import {api_url} from '../../env';

export const load: PageLoad = async ({ fetch }) => {
	let videoList: any[] | undefined;

	const videosFetch = await fetch(`${api_url}/videos/get?bulk=true`);
	videoList = (await videosFetch.json()).data;

	return {
		videoList: videoList
	};
};
