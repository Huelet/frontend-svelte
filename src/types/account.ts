import type { AccessibilitySettings } from './accessibility';
import type { AuditLogAction } from './audit';

interface AccountStatus {
	online: boolean;
	suspended: boolean;
	locked: boolean;
	expelled: boolean;
	underReview: boolean;
	details?: {
		reason: string;
		actionLength: number;
	};
}

interface User {
	username: string;
	uid: string;
	email: string;
	phoneNumber: number;
	password: string;
	bio: string;
	avatar: string;
	pfpColor: string;
	location: string;
	private: boolean;
	pronouns: string[];
	creator: boolean;
	approved: boolean;
	followers: string[] | number;
	following: string[];
	userCreated: number;
	userAuth: number;
	accessibility: AccessibilitySettings;
	audit: AuditLogAction[];
	status: AccountStatus;
}

export type { AccountStatus, User };
