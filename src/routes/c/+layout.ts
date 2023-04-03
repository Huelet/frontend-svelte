import type { LayoutLoad } from './$types';
import {api_url} from '../../env';

export const load: LayoutLoad = async ({ fetch, params }) => {
	let { username } = params;

	username = username?.toLowerCase().replace('@', '');

	const creatorFetch = await fetch(`${api_url}/auth/user?username=${username}`);
	const user = (await creatorFetch.json()).data;
	const userVideosFetch = await fetch(
		`${api_url}/videos/search/fromcreator?creatorId=${user.uid}`
	);
	user.videos = (await userVideosFetch.json()).data;

	return {
		user: user
	};
};
