import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const { inviteId } = params;

	let invite: any | undefined;
	let invitedBy: any | undefined;

	try {
		invite = await fetch(`https://api.huelet.net/auth/invite/?inviteId=${inviteId}`)
			.then((r) => r.json())
			.then((d) => d.data.inviteInformation);

		if (invite.uses >= 4)
			return {
				status: 400,
				error: new Error('Invite was used too many times')
			};
		else if (invite.expires < Math.floor(Date.now() / 1000))
			return {
				status: 400,
				error: new Error('Invite has expired')
			};

		invitedBy = await fetch(`https://api.huelet.net/auth/user?uid=${invite.userId}`)
			.then((r) => r.json())
			.then((d) => d.data);
	} catch (e) {
		console.error(e);
		return {
			status: 500,
			error: e
		};
	}

	return {
		invite: invite,
		invitedBy: invitedBy
	};
};
