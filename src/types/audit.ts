type ActionParent = 'user' | 'video' | 'comment' | 'playlist';
type ActionChild = 'create' | 'edit' | 'delete';
type AuthActionChild =
	| 'login'
	| 'signup'
	| 'logout'
	| 'token'
	| 'invite'
	| 'pfp'
	| 'bio'
	| 'location'
	| 'follow'
	| 'unfollow'
	| 'token-refresh'
	| 'verify';

type Action = `${ActionParent}.${ActionChild | AuthActionChild}`;

interface AuditLogAction {
	action: Action;
	timestamp: number;
	userAgent: string;
	// resource is the target for the action. for example, if the action is "user.follow", the resource is the user being followed and if the action is "video.create" the resource would be the video id. for this field, please use only IDs when possible
	resource?: string;
}

export type { AuditLogAction, Action, ActionParent, ActionChild, AuthActionChild };
