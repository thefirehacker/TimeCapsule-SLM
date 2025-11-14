import { NextRequest, NextResponse } from "next/server";
import ContactConfirmationEmail from "@/components/email/ContactConfirmationEmail";
import ContactAdminNotificationEmail from "@/components/email/ContactAdminNotificationEmail";
import { saveContactToDynamoDB, ContactFormData } from "@/lib/contact/contact";
import { getResendClient } from "@/lib/email/resendClient";

const resend = getResendClient();

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    const { name, email, company, phoneNumber, subject, message } = formData;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Prepare contact data for DynamoDB
    const contactData: ContactFormData = {
      name,
      email,
      company: company || undefined,
      phoneNumber: phoneNumber || undefined,
      subject,
      message,
    };

    // Save to DynamoDB first
    let contactRecord;
    try {
      contactRecord = await saveContactToDynamoDB(contactData);
      console.log(
        `Contact form saved to DynamoDB with ID: ${contactRecord.contactUserId}`
      );
    } catch (dbError) {
      console.error("Failed to save to DynamoDB:", dbError);
      return NextResponse.json(
        { error: "Failed to save contact information" },
        { status: 500 }
      );
    }

    if (!resend) {
      console.info(
        "Skipping contact emails: RESEND_API_KEY not set (local mode)."
      );
      return NextResponse.json({
        success: true,
        message:
          "Contact saved locally. Email notifications are disabled in local mode.",
        contactId: contactRecord.contactUserId,
      });
    }

    // Send confirmation email to user
    try {
      await resend.emails.send({
        from: "Bubblspace Support <support@bubblspace.com>",
        to: email,
        subject: "We received your message - BubblSpace",
        react: ContactConfirmationEmail({
          name,
          subject,
        }),
      });
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError);
      // We still want to send the admin notification, so don't throw here
    }

    // Send notification email to admin
    try {
      await resend.emails.send({
        from: "Bubblspace Notifications <notifications@bubblspace.com>",
        to: "contact@bubblspace.com",
        subject: `New Contact Form Submission: ${subject}`,
        react: ContactAdminNotificationEmail({
          name,
          email,
          company: company || "Not provided",
          phoneNumber: phoneNumber || "Not provided",
          subject,
          message,
        }),
      });
    } catch (emailError) {
      console.error("Failed to send admin notification email:", emailError);
      return NextResponse.json(
        { error: "Failed to process your message" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Contact form submitted successfully",
      contactId: contactRecord.contactUserId,
    });
  } catch (error) {
    console.error("Contact form submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit contact form" },
      { status: 500 }
    );
  }
}
