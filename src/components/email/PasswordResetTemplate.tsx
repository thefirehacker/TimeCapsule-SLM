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

interface PasswordResetTemplateProps {
  resetUrl: string;
}

export default function PasswordResetTemplate({
  resetUrl,
}: PasswordResetTemplateProps) {
  return (
    <Html>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Password Reset Request</Heading>

          <Text style={text}>
            You requested to reset your password. Click the button below to set
            a new password:
          </Text>

          <Section style={buttonContainer}>
            <Button href={resetUrl} style={button}>
              Reset Password
            </Button>
          </Section>

          <Text style={smallText}>
            Or copy and paste this URL in your browser:
          </Text>

          <Text style={codeBlock}>{resetUrl}</Text>

          <Text style={italicText}>This link will expire in 1 hour.</Text>

          <Text style={italicText}>
            If you didn&apos;t request this, please ignore this email.
          </Text>

          <Hr style={hr} />

          <Text style={brandFooter}>Bubblspace Support Team</Text>
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
  margin: "16px 0 24px",
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

const smallText = {
  color: "#666",
  fontSize: "14px",
  lineHeight: "22px",
  margin: "16px 0 8px",
};

const codeBlock = {
  color: "#333",
  wordBreak: "break-all" as const,
  backgroundColor: "#f5f5f5",
  padding: "12px",
  borderRadius: "4px",
  fontFamily: "monospace",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "0 0 16px",
};

const italicText = {
  color: "#666",
  fontSize: "14px",
  lineHeight: "22px",
  margin: "16px 0",
  fontStyle: "italic",
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
