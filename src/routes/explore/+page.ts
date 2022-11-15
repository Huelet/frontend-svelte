import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	let videoList: any[] | undefined;

	const videosFetch = await fetch('https://api.huelet.net/videos/get?bulk=true');
	videoList = (await videosFetch.json()).data;

	return {
		videoList: videoList
	};
};
