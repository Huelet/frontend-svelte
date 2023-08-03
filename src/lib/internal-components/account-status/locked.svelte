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
		<WarningFilled fill="black" /> <!-- Render the WarningFilled component with a black fill -->
	</div>
	<Typography color="#000000" fontSize={2} weight={900} element="h1">
		Your account has been temporarily locked <!-- Display a header indicating the account lock -->
	</Typography>

	<!-- Display the reason for the account lock -->
	<Typography color="#000000" weight={500}>
		Reason: {@html accountStatus.details?.reason} <!-- Display the accountStatus.details.reason if available -->
	</Typography>

	<!-- Display the date and time when the account will be unlocked -->
	<Typography color="#000000" weight={500}>
		Your account will be unlocked on {DateTime.now()
			.plus({ milliseconds: accountStatus.details?.actionLength }) // Calculate the unlock date and time by adding milliseconds to the current date
			.toLocaleString(DateTime.DATETIME_HUGE)} <!-- Format the unlock date and time to a human-readable string using the DATETIME_HUGE format -->
	</Typography>

	<!-- Button to return to Huelet -->
	<div
		class="button primary"
		on:click={() => {
			location.assign('/#locked-accepted'); // On button click, redirect to the '/#locked-accepted' location (URL)
		}}
	>
		<Typography>Return to Huelet</Typography> <!-- Display the button text using the Typography component -->
	</div>
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

		background-color: #d3e200; // Set the background color of the warning icon to a shade of yellow (#d3e200)

		border-radius: 50%; // Make the warning icon circular by setting border-radius to 50%
/* Styling for button */
	}

	a.button-link {
		text-decoration: none; // Remove underline from the link text (Note: The button-link class is defined but not used in the template)
	}
</style>
