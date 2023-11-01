import { Resend } from 'resend';
import { RESEND_KEY } from '$env/static/private';

export async function POST({ request }) {
    const requestBody = await request.json();
    const { email, subject, message } = requestBody;
    let errors = [];
    
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) errors.push({email:true})
    if (subject.length < 1) errors.push({subject:true})
    if (message.length < 1) errors.push({message:true})

    if (errors.length == 0) {
        const resend = new Resend(RESEND_KEY);
        try {
            const response = await resend.sendEmail({
                from: 'Mark Horn <onboarding@resend.dev>', //linkto markhorn.dev later
                to: 'markhorn.dev@gmail.com',
                subject: subject, 
                text: message, 
                reply_to: email 
            });
            if (response.id) {
                return new Response(JSON.stringify({success: true}), { status: 200 });
            }
            errors.push({resend:response})
        } catch (error) {
            errors.push({resend:error})
        }
    }
    
    return new Response(JSON.stringify(errors), { status: 422 });
}