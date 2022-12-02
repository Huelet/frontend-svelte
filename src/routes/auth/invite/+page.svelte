<script lang="ts">
    import { onMount } from 'svelte';
	import type { User } from '../../../types/account';

    let success: boolean = false;
	let failure: boolean = false;
	let user: User;
	let token: string;
	
    let inviteLink: String;
    onMount(async () => {
		user = JSON.parse(localStorage.getItem('huelet:auth:user') as string) as User;
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
                // setInviteLink(
                //     `https://huelet.net/invite/${data.data.inviteId}`
                // );
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