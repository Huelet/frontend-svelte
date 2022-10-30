import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const { vuid } = params;

	let video: any | undefined;
	let creator: any | undefined;

	const videoFetch = await fetch(`https://api.huelet.net/videos/lookup/${vuid}`);
	video = (await videoFetch.json()).data;

	const creatorFetch = await fetch(`https://api.huelet.net/auth/user?uid=${video.authorId}`);
	creator = (await creatorFetch.json()).data;

	return {
		video: video,
		creator: creator
	};
};
