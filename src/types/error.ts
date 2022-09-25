export interface Error {
	title: string;
	message: string;
	severity: 'success' | 'error' | 'warning' | 'neutral';
	code?: number;
	fatal?: boolean;
}
