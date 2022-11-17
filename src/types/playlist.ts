interface Playlist {
	_id: string;
	owner: string;
	name: string;
	description?: string;
	image?: string;
	status: boolean;
	videos?: boolean;
}

export type { Playlist };
