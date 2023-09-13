<!-- Router.svelte -->
<script>
  import { Router, Route } from 'svelte-spa-router';
  import PlusPage from './+page.svelte'; // Import your +page component here

  // Define your routes
  const routes = {
    '/InfoCenter': PlusPage,
  };
</script>

<Router {routes}>
  <!-- Define any layout or navigation components here -->
  <Route path="/InfoCenter" component={PlusPage} />
</Router>
