<script lang="ts">
	import { onMount } from 'svelte';
	import Card from '../../../components/card.svelte';
	import Meta from '../../../components/meta.svelte';
	import type { AccessibilitySettings } from '../../../types/accessibility';
	import type { User } from '../../../types/account';

	let success: boolean = false;
	let failure: boolean = false;
	let user: User;
	let token: string;
	let accessibility: AccessibilitySettings = {
		sounds: true,
		captions: false,
		motion: true,
		highContrast: false,
		zoom: 'x1',
		invertColors: false,
		grayscale: false,
		autoplay: true
	};

	onMount(async () => {
		user = JSON.parse(localStorage.getItem('huelet:auth:user') as string) as User;
		accessibility = JSON.parse(
			localStorage.getItem('huelet:auth:accessibility') as string
		) as AccessibilitySettings;
		token = localStorage.getItem('huelet:auth:token') as string;
		if (!user || !token) return;
	});	

   </script>

<Meta title=" Settings | User Settings | Huelet" />
	
<Card full={true} title="This page is currently unavailable" />


>
		
