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
		Your account has been temporarily suspended <!-- Display a header indicating the account suspension -->
	</Typography>

	<!-- Display the reason for the account suspension -->
	<Typography color="#000000" weight={500}>
		Reason: {@html accountStatus.details?.reason} <!-- Display the accountStatus.details.reason if available -->
	</Typography>

	<!-- Display the date and time when the account will be unlocked -->
	<Typography color="#000000" weight={500}>
		Your account will be unlocked on {DateTime.now()
			.plus({ milliseconds: accountStatus.details?.actionLength }) // Calculate the unlock date and time by adding milliseconds to the current date
			.toLocaleString(DateTime.DATETIME_HUGE)} <!-- Format the unlock date and time to a human-readable string using the DATETIME_HUGE format -->
	</Typography>

	<!-- Add spacing between elements -->
	<div class="spacer" />

	<!-- Link to further reading -->
	<a href="https://docs.huelet.net/faq#account-suspended" target="_blank" class="button-link">
		<div class="button primary"> <!-- Style the link as a button -->
			<Typography>Further Reading</Typography> <!-- Display the link text using the Typography component -->
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

		background-color: #ff9100; // Set the background color of the warning icon to red (#ff9100)

		border-radius: 50%; // Make the warning icon circular by setting border-radius to 50%
	}
/* Styling for the component */
	a.button-link {
		text-decoration: none; // Remove underline from the link text
	}
</style>
