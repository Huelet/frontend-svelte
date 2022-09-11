<script lang="ts">
	import Logo from './logo.svelte';

	let query: string;
</script>

<div class="header-global row center">
	<a href="/"><Logo dimensions={32} /></a>
	<div class="row center">
		<input type="text" placeholder="Search" bind:value={query} class="search" />
		<div class="search-button button primary">
			<svg
				width={16}
				height={16}
				viewBox="0 0 16 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M13 6.5C13 2.91015 10.0899 0 6.5 0C2.91015 0 0 2.91015 0 6.5C0 10.0899 2.91015 13 6.5 13C7.85725 13 9.11734 12.584 10.1597 11.8726C10.2616 11.8031 10.399 11.8132 10.4862 11.9004L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L11.9004 10.4862C11.8132 10.399 11.8031 10.2616 11.8726 10.1597C12.584 9.11734 13 7.85725 13 6.5ZM11 6.5C11 4.01472 8.98528 2 6.5 2C4.01472 2 2 4.01472 2 6.5C2 8.98528 4.01472 11 6.5 11C8.98528 11 11 8.98528 11 6.5Z"
					fill="white"
				/>
			</svg>
		</div>
	</div>
	<div class="actions row center">
		<a href="https://dash.huelet.net">
			<svg
				width={28}
				height={28}
				viewBox="0 0 16 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M11 13C11 14.6569 9.65688 16 8.00003 16C6.34317 16 5.00003 14.6569 5.00003 13H1.59368C0.488417 13 -0.050689 11.697 0.649378 10.9026C1.08807 10.4047 1.8202 9.51513 2.43725 8.48926C3.07082 7.43593 3.50003 6.37349 3.50003 5.5C3.50003 4.32887 3.76505 2.99883 4.45552 1.92714C5.17497 0.810495 6.35009 0 8.00003 0C9.64997 0 10.8251 0.810495 11.5445 1.92714C12.235 2.99883 12.5 4.32887 12.5 5.5C12.5 6.37349 12.9292 7.43593 13.5628 8.48926C14.1799 9.51513 14.912 10.4047 15.3507 10.9026C16.0507 11.697 15.5116 13 14.4064 13H11ZM5.50003 5.5C5.50003 4.5878 5.71318 3.66784 6.13679 3.01036C6.53143 2.39784 7.10631 2 8.00003 2C8.89375 2 9.46863 2.39784 9.86327 3.01036C10.2869 3.66784 10.5 4.5878 10.5 5.5C10.5 6.92951 11.1619 8.37788 11.8489 9.52013C12.1739 10.0604 12.5233 10.5625 12.8525 11H3.1476C3.47677 10.5625 3.82615 10.0604 4.15111 9.52013C4.83817 8.37788 5.50003 6.92951 5.50003 5.5ZM7.00003 13H9.00003C9.00003 13.5523 8.55231 14 8.00003 14C7.44774 14 7.00003 13.5523 7.00003 13Z"
					fill="white"
				/>
			</svg>
		</a>
		<a href="https://dash.huelet.net">
			<svg
				width={32}
				height={32}
				viewBox="0 0 16 16"
				fill="white"
				xmlns="http://www.w3.org/2000/svg"
				><path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M0 5C0 3.34315 1.34315 2 3 2H9C10.6569 2 12 3.34315 12 5V5.32871L12.6713 4.73203C13.9611 3.58553 16 4.50115 16 6.22684V9.77316C16 11.4989 13.9611 12.4145 12.6713 11.268L12 10.6713V11C12 12.6569 10.6569 14 9 14H3C1.34315 14 0 12.6569 0 11V5ZM3 4H9C9.55228 4 10 4.44772 10 5V11C10 11.5523 9.55228 12 9 12H3C2.44772 12 2 11.5523 2 11V5C2 4.44772 2.44772 4 3 4ZM12.0052 8L14 6.22684V9.77316L12.0052 8Z"
				/></svg
			></a
		>
	</div>
</div>

<style>
	.header-global {
		width: 100vw;
		height: 32px;
		background-color: #1a1b1e;
		justify-content: space-between !important;
	}

	.search {
		width: 12em;
		height: 80%;
		padding: 0.1em;
		background-color: #303245;
		border: 2px solid rgba(15, 119, 255, 0.733);
		border-radius: 0.7em;
	}
	.search-button {
		height: auto !important;
		width: auto !important;
		padding: 0.2em !important;
		border-radius: 50%;
		margin-top: 0 !important;
	}

	@media (max-width: 600px) {
		.search {
			width: 8em;
		}
	}
</style>
