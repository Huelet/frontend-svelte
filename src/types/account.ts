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

export type { AccountStatus };
