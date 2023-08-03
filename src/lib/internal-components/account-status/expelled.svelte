<script lang="ts">
	// Import statements
	import { DateTime } from 'luxon'; // Import the DateTime class from the 'luxon' library for date and time manipulation
	import Typography from '../../../components/typography.svelte'; // Import the Typography component from the specified relative path
	import WarningFilled from '../../../components/icons/WarningFilled.svelte'; // Import the WarningFilled component from the specified relative path
	import type { AccountStatus } from '../../../types/account'; // Import the AccountStatus type from the specified relative path

	// Exported variable
	export let accountStatus: AccountStatus; // Exports a variable 'accountStatus' with type 'AccountStatus' that holds information about the account's status
</script>

<div class="white full center column suspended">
	<!-- Warning icon and text -->
	<div class="warning-icon-red center">
		<WarningFilled fill="white" /> <!-- Render the WarningFilled component with a white fill -->
	</div>
	<Typography color="#000000" fontSize={2} weight={900} element="h1">
		Your account has been permanently removed <!-- Display a header indicating the permanent account removal -->
	</Typography>

	<!-- Display the reason for the account removal -->
	<Typography color="#000000" weight={500}>
		Reason: {@html accountStatus.details?.reason} <!-- Display the accountStatus.details.reason if available -->
	</Typography>

	<!-- Add spacing between elements -->
	<div class="spacer" />

	<!-- Link to submit an appeal via email -->
	<a href="mailto:hi@huelet.net" target="_blank" class="button-link">
		<div class="button primary"> <!-- Style the link as a primary button -->
			<Typography>Submit an appeal</Typography> <!-- Display the link text using the Typography component -->
		</div>
	</a>

	<!-- Link to further reading about account expulsion -->
	<a href="https://docs.huelet.net/users/account-expelled" target="_blank" class="button-link">
		<div class="button secondary"> <!-- Style the link as a secondary button -->
			<Typography color="#000000">Further reading</Typography> <!-- Display the link text using the Typography component with custom color -->
		</div>
	</a>
</div>

<style>
	/* Styling for the component */
	.white {
		background-color: white; // Set the background color to white
	}

	.warning-icon-red {
		width: 1em; // Set the width of the warning icon
		height: 1em; // Set the height of the warning icon
		padding: 1em; // Add padding around the warning icon

		background-color: #ff0077; // Set the background color of the warning icon to a shade of pink (#ff0077)

		border-radius: 50%; // Make the warning icon circular by setting border-radius to 50%
	}

	a.button-link {
		text-decoration: none; // Remove underline from the link text (Note: The button-link class is defined but not used in the template)
	}
</style>

