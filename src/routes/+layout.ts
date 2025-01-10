export const ssr = false;

import { supabase } from '@/supabase';

export const load = async () => {
	const session = await supabase.auth.getSession();

	if (!session.data.session) {
		const { data } = await supabase.auth.signInAnonymously();
		if (!data.session) {
			return Error('Failed to get session');
		}
		return {
			session: data.session,
			userId: data.session.user.id
		};
	}

	return {
		session: session.data.session,
		userId: session.data.session.user.id
	};
};
