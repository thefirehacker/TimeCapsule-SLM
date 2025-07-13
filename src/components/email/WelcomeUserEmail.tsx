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

interface WelcomeUserEmailProps {
  name: string;
  email: string;
  company: string;
}

export default function WelcomeUserEmail({
  name,
  email,
  company,
}: WelcomeUserEmailProps) {
  return (
    <Html>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Welcome to BubblSpace!</Heading>

          <Text style={text}>Hi {name},</Text>

          <Text style={text}>
            Welcome to BubblSpace! We&apos;re thrilled to have {company} join our community of innovative organizations leveraging AI-powered personas for better business outcomes.
          </Text>

          <Section style={infoBox}>
            <Text style={infoHeading}>What&apos;s Next?</Text>
            <Text style={infoText}>
              🚀 Our team will reach out to you soon to help you get started with your personalized demo.
            </Text>
            <Text style={infoText}>
              📧 You&apos;ll receive a follow-up email with detailed information about your account and next steps.
            </Text>
            <Text style={infoText}>
              🎯 We&apos;ll help you create your first AI persona tailored to your business needs.
            </Text>
          </Section>

          <Text style={text}>
            In the meantime, feel free to explore our platform and learn more about how BubblSpace can transform your business operations.
          </Text>

          <Section style={buttonContainer}>
            <Button href="https://bubblspace.com/dashboard" style={button}>
              Access Your Dashboard
            </Button>
          </Section>

          <Hr style={hr} />

          <Text style={text}>
            If you have any questions or need immediate assistance, don&apos;t hesitate to reach out to our support team.
          </Text>

          <Text style={brandFooter}>
            Welcome aboard!<br />
            The BubblSpace Team
          </Text>

          <Text style={disclaimerText}>
            Need help? Contact us at support@bubblspace.com or visit our help center.
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
  lineHeight: "20px",
};

const disclaimerText = {
  color: "#999",
  fontSize: "12px",
  lineHeight: "18px",
  margin: "16px 0 0",
}; 