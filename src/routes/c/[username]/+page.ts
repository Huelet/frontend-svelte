import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	let { username } = params;

	username = username.toLowerCase().replace('@', '');

	let user: any | undefined;

	const creatorFetch = await fetch(`https://api.huelet.net/auth/user?username=${username}`);
	user = (await creatorFetch.json()).data;
	const userVideosFetch = await fetch(
		`https://api.huelet.net/videos/search/fromcreator?creatorId=${user.uid}`
	);
	user.videos = (await userVideosFetch.json()).data;

	return {
		user: user
	};
};
