import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
 
export const load: PageServerLoad = ({ locals }: any) => {
  if (!locals.user) {
    throw redirect(308, '/collection/playlists/');
  }
}