import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch, params }) => {
	let { username } = params;

	username = username?.toLowerCase().replace('@', '');

	const creatorFetch = await fetch(`https://api.huelet.net/auth/user?username=${username}`);
	const user = (await creatorFetch.json()).data;
	const userVideosFetch = await fetch(
		`https://api.huelet.net/videos/search/fromcreator?creatorId=${user.uid}`
	);
	user.videos = (await userVideosFetch.json()).data;

	return {
		user: user
	};
};
