import { supabase } from '$lib/supabase';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
    try {
        let code: string;
        let userId: string;

        // Check content type to determine how to parse the request
        const contentType = request.headers.get('content-type') || '';
        
        if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
            // Handle FormData from sendBeacon
            const formData = await request.formData();
            code = formData.get('code') as string;
            userId = formData.get('userId') as string;
        } else {
            // Handle JSON from regular fetch requests
            const body = await request.json();
            code = body.code;
            userId = body.userId;
        }
        
        if (!code || !userId) {
            return new Response('Missing required parameters', { status: 400 });
        }
        
        // Use the correct parameter name that matches the function
        const { error } = await supabase.rpc('mark_player_inactive_by_user', {
            game_code: code,
            p_user_id: userId // ← Changed from user_id to p_user_id
        });
        
        if (error) {
            return new Response(`Database error: ${error.message}`, { status: 500 });
        }
        return new Response('OK');
    } catch (error) {
        console.error('Error marking player inactive:', error);
        return new Response('Server error', { status: 500 });
    }
};