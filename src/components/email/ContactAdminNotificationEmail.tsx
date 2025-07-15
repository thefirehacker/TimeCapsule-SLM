import React from "react";
import {
  Html,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
} from "@react-email/components";

interface ContactAdminNotificationEmailProps {
  name: string;
  email: string;
  company: string;
  phoneNumber: string;
  subject: string;
  message: string;
}

export default function ContactAdminNotificationEmail({
  name,
  email,
  company,
  phoneNumber,
  subject,
  message,
}: ContactAdminNotificationEmailProps) {
  // Format subject for display
  const formatSubject = (subjectValue: string) => {
    const subjectMap: Record<string, string> = {
      "general-inquiry": "General Inquiry",
      "technical-support": "Technical Support",
      "sales-question": "Sales Question",
      partnership: "Partnership Opportunity",
      feedback: "Feedback",
      other: "Other",
    };
    return subjectMap[subjectValue] || subjectValue;
  };

  return (
    <Html>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>New Contact Form Submission</Heading>

          <Text style={text}>
            You&apos;ve received a new message from {name}.
          </Text>

          <Section>
            <Heading as="h2" style={subheading}>
              Contact Details
            </Heading>

            <div style={tableContainer}>
              <div style={tableRow}>
                <div style={labelColumn}>Name:</div>
                <div style={valueColumn}>{name}</div>
              </div>
              <div style={tableRow}>
                <div style={labelColumn}>Email:</div>
                <div style={valueColumn}>{email}</div>
              </div>
              <div style={tableRow}>
                <div style={labelColumn}>Company:</div>
                <div style={valueColumn}>{company}</div>
              </div>
              <div style={tableRow}>
                <div style={labelColumn}>Phone:</div>
                <div style={valueColumn}>{phoneNumber}</div>
              </div>
              <div style={tableRow}>
                <div style={labelColumn}>Subject:</div>
                <div style={valueColumn}>{formatSubject(subject)}</div>
              </div>
            </div>
          </Section>

          <Hr style={hr} />

          <Section>
            <Heading as="h2" style={subheading}>
              Message
            </Heading>
            <div style={messageContainer}>
              <Text style={messageText}>{message}</Text>
            </div>
          </Section>

          <Hr style={hr} />

          <Text style={noteText}>
            Please respond to this inquiry promptly. This message was submitted
            on {new Date().toLocaleDateString()} at{" "}
            {new Date().toLocaleTimeString()}.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// Shared email styles
const main = {
  backgroundColor: "#f5f5f5",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
  padding: "30px 0",
  margin: "0",
};

const container = {
  margin: "0 auto",
  padding: "32px",
  maxWidth: "600px",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  border: "1px solid #eaeaea",
};

const heading = {
  color: "#ff4747",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0 0 24px",
  padding: "0",
  textAlign: "left" as const,
};

const subheading = {
  color: "#333",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "16px 0",
  padding: "0",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "16px 0",
};

const noteText = {
  color: "#666",
  fontSize: "14px",
  fontStyle: "italic",
  lineHeight: "22px",
  margin: "16px 0",
};

const tableContainer = {
  width: "100%",
  border: "1px solid #eaeaea",
  borderRadius: "4px",
};

const tableRow = {
  display: "flex" as const,
  borderBottom: "1px solid #eaeaea",
};

const labelColumn = {
  padding: "8px 12px",
  width: "30%",
  fontWeight: "bold",
  color: "#666",
  backgroundColor: "#f9f9f9",
};

const valueColumn = {
  padding: "8px 12px",
  width: "70%",
};

const messageContainer = {
  backgroundColor: "#f8f9fa",
  border: "1px solid #e9ecef",
  borderRadius: "6px",
  padding: "16px",
};

const messageText = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
};

const hr = {
  margin: "24px 0",
  borderTop: "1px solid #eaeaea",
  borderBottom: "none",
  borderLeft: "none",
  borderRight: "none",
};
