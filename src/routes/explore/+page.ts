import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	let videoList: any | undefined;

	fetch('https://api.huelet.net/videos/get?bulk=true')
		.then((response) => response.json())
		.then((videos) => {
			videoList = videos.data;
		});

	return {
		videoList: videoList
	};
};
