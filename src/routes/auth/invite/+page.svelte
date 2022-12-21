<script lang="ts">
    import { onMount } from 'svelte';
    // import Card from '../../../components/card.svelte';
	// import Meta from '../../../components/meta.svelte';
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
	
    let inviteLink: String;

    onMount(async () => {
		user = JSON.parse(localStorage.getItem('huelet:auth:user') as string) as User;
		accessibility = JSON.parse(
			localStorage.getItem('huelet:auth:accessibility') as string
		) as AccessibilitySettings;
		token = localStorage.getItem('huelet:auth:token') as string;

		if (!user || !token) return;
    });

    const handleChange = async (e: any) => {
        fetch(`https://api.huelet.net/auth/invite?username=${user.username}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            if (data.success === true) 
                inviteLink = `https://huelet.net/invite/${data.data.inviteId}`;
        });
    }

    
</script>

<div class="action" data-action="captions">
   
    {#if inviteLink}
        <p>Invite Link: {inviteLink}</p>
    {:else}
        <p>Generate Invite Link</p>
        <div on:click={(e) => handleChange(e)}>
            <p>Press here</p>
        </div>
    {/if}
        
</div>