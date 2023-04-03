import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	let videoList: any[] | undefined;

	const videosFetch = await fetch(' https://api-production-3cf9.up.railway.app/videos/get?bulk=true      ');
	videoList = (await videosFetch.json()).data;

	return {
		videoList: videoList
	};
};
