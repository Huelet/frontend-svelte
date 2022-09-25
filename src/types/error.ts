export interface Error {
	title: string;
	message: string;
	severity: 'error' | 'warning' | 'info';
	code?: number;
	fatal?: boolean;
}
