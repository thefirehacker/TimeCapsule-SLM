import React from "react";
import {
  Html,
  Body,
  Container,
  Section,
  Text,
  Button,
  Heading,
  Hr,
} from "@react-email/components";

interface ContactConfirmationEmailProps {
  name: string;
  subject: string;
}

export default function ContactConfirmationEmail({
  name,
  subject,
}: ContactConfirmationEmailProps) {
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
          <Heading style={heading}>Thank You for Contacting Us</Heading>

          <Text style={text}>Hi {name},</Text>

          <Text style={text}>
            Thank you for reaching out to BubblSpace! We&apos;ve received your
            message regarding <strong>{formatSubject(subject)}</strong> and
            wanted to confirm that it&apos;s been successfully submitted.
          </Text>

          <Section style={infoBox}>
            <Text style={infoHeading}>What happens next?</Text>
            <Text style={infoText}>
              1. Our team will review your message within 24 hours.
            </Text>
            <Text style={infoText}>
              2. A BubblSpace representative will respond to your inquiry via
              email or phone as appropriate.
            </Text>
            <Text style={infoText}>
              3. For urgent technical support issues, we typically respond
              within 4-6 hours during business hours.
            </Text>
          </Section>

          <Text style={text}>
            While you wait, feel free to explore more about BubblSpace:
          </Text>

          <Section style={buttonContainer}>
            <Button href="https://bubblspace.com" style={button}>
              Visit Our Website
            </Button>
          </Section>

          <Hr style={hr} />

          <Text style={brandFooter}>The BubblSpace Team</Text>

          <Text style={disclaimerText}>
            If you have any urgent concerns or didn&apos;t send this message,
            please contact us immediately at support@bubblspace.com
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

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "16px 0",
};

const infoBox = {
  backgroundColor: "#f8f9fa",
  borderRadius: "6px",
  padding: "16px",
  margin: "24px 0",
  border: "1px solid #e9ecef",
};

const infoHeading = {
  color: "#333",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "0 0 16px",
};

const infoText = {
  color: "#333",
  fontSize: "15px",
  lineHeight: "22px",
  margin: "8px 0",
};

const buttonContainer = {
  margin: "24px 0",
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#ff4747",
  color: "#ffffff",
  padding: "12px 24px",
  borderRadius: "6px",
  fontWeight: "500",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  border: "none",
  fontSize: "16px",
};

const hr = {
  margin: "24px 0",
  borderTop: "1px solid #eaeaea",
  borderBottom: "none",
  borderLeft: "none",
  borderRight: "none",
};

const brandFooter = {
  color: "#ff4747",
  fontSize: "14px",
  fontWeight: "500",
  margin: "16px 0 0",
};

const disclaimerText = {
  color: "#999",
  fontSize: "12px",
  lineHeight: "18px",
  margin: "16px 0 0",
};
