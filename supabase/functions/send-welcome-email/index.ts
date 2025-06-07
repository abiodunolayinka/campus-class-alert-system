
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailRequest {
  email: string;
  firstName: string;
  lastName: string;
  userType: 'student' | 'admin';
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, firstName, lastName, userType }: WelcomeEmailRequest = await req.json();

    const subject = userType === 'student' 
      ? "Welcome to EduReminder - Student Registration Confirmed!"
      : "Welcome to EduReminder - Admin Account Created!";

    const emailContent = userType === 'student' 
      ? `
        <h1>Welcome to EduReminder, ${firstName}!</h1>
        <p>Your student registration has been successfully completed.</p>
        <p>You will now receive notifications about your classes and important announcements.</p>
        <p>Best regards,<br>The EduReminder Team</p>
      `
      : `
        <h1>Welcome to EduReminder Admin Panel, ${firstName}!</h1>
        <p>Your admin account has been successfully created.</p>
        <p>You can now access the admin dashboard to manage class notifications.</p>
        <p>Best regards,<br>The EduReminder Team</p>
      `;

    const emailResponse = await resend.emails.send({
      from: "EduReminder <onboarding@resend.dev>",
      to: [email],
      subject: subject,
      html: emailContent,
    });

    console.log("Welcome email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-welcome-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
