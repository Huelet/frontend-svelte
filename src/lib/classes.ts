import { onMount } from 'svelte';

export interface ManagedClass {
	identifier: string;
	count: number;
}

export class CSSManager {
	constructor(private readonly identifier?: string, private classCount: number = 0) {
		this.identifier = [...Array(20)]
			.map(() => (Math.random() * Date.now()).toString(36)[2])
			.join('');
		this.classCount = 0;
	}

	createClass(style: string | string[]) {
		this.classCount = this.classCount++;

		const className = `css-${this.identifier}-${this.classCount}`;
		onMount(() => {
			const styleElement = document.createElement('style');
			styleElement.innerHTML = this.parseStyleIntoClass(style, className, true);
			document.head.appendChild(styleElement);
		});

		return {
			identifier: this.identifier,
			count: this.classCount
		} as ManagedClass;
	}

	accessClass(managed: ManagedClass) {
		return `css-${managed.identifier}-${managed.count}`;
	}

	private parseStyleIntoClass(style: string | string[], className: string, minify: boolean) {
		let parsedClass;

		parsedClass = `
            .${className} {
                ${typeof style === 'string' ? style : style.join(';\n')}
            }
        `;
		if (minify) parsedClass = parsedClass.replace(/\s+/g, ' ').trim();

		return parsedClass;
	}
}
