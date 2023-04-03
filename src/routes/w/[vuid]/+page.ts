import type { PageLoad } from './$types';
import {api_url} from '../../../env';

export const load: PageLoad = async ({ fetch, params }) => {
	const { vuid } = params;

	let video: any | undefined;
	let creator: any | undefined;

	const videoFetch = await fetch(`${api_url}/videos/lookup/${vuid}`);
	video = (await videoFetch.json()).data;

	const creatorFetch = await fetch(`${api_url}/auth/user?uid=${video.authorId}`);
	creator = (await creatorFetch.json()).data;

	return {
		video: video,
		creator: creator
	};
};
