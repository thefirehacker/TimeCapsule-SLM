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

interface NewUserNotificationEmailProps {
  name: string;
  email: string;
  company: string;
  userType: string;
  registrationDate: string;
}

export default function NewUserNotificationEmail({
  name,
  email,
  company,
  userType,
  registrationDate,
}: NewUserNotificationEmailProps) {
  return (
    <Html>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>New User Registration</Heading>

          <Text style={text}>
            A new user has registered on BubblSpace platform.
          </Text>

          <Section>
            <Heading as="h2" style={subheading}>User Details</Heading>
            
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
                <div style={labelColumn}>User Type:</div>
                <div style={valueColumn}>{userType}</div>
              </div>
              <div style={tableRow}>
                <div style={labelColumn}>Registration Date:</div>
                <div style={valueColumn}>{registrationDate}</div>
              </div>
            </div>
          </Section>

          <Hr style={hr} />

          <Text style={noteText}>
            Please follow up with this new user to ensure they have a smooth onboarding experience. The user has been automatically sent a welcome email with next steps.
          </Text>

          <Text style={actionText}>
            <strong>Recommended Actions:</strong>
          </Text>
          <Text style={bulletText}>• Send personalized follow-up email within 24 hours</Text>
          <Text style={bulletText}>• Schedule onboarding call if user type is Free (potential upgrade opportunity)</Text>
          <Text style={bulletText}>• Add to appropriate email campaigns based on company size and industry</Text>
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

const actionText = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "16px 0 8px",
};

const bulletText = {
  color: "#555",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "4px 0",
  paddingLeft: "16px",
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

const hr = {
  margin: "24px 0",
  borderTop: "1px solid #eaeaea",
  borderBottom: "none",
  borderLeft: "none",
  borderRight: "none",
}; 