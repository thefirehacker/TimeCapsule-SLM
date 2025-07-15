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

interface AdminNotificationEmailProps {
  name: string;
  designation: string;
  orgName: string;
  location: string;
  email: string;
  phoneNumber: string;
  pocOption: string;
  capabilities: string[];
  additionalNote: string;
}

export default function AdminNotificationEmail({
  name,
  designation,
  orgName,
  location,
  email,
  phoneNumber,
  pocOption,
  capabilities,
  additionalNote,
}: AdminNotificationEmailProps) {
  // Format capabilities for display
  const formattedCapabilities = capabilities.map((id) => {
    const labelMap: Record<string, string> = {
      "sales-automation": "Sales Automation",
      "recruitment-intelligence": "Recruitment Intelligence",
      "operations-management": "Operations Management",
      "marketing-insights": "Marketing Insights",
      "knowledge-discovery": "Knowledge Discovery",
      "workflow-automation": "Workflow Automation",
      "real-time-collaboration": "Real-time Collaboration",
    };
    return labelMap[id] || id;
  }).join(", ");

  // Format POC option for display
  const formatPocOption = (option: string) => {
    switch (option) {
      case "email":
        return "Email";
      case "phone":
        return "Phone";
      case "both":
        return "Both Email and Phone";
      default:
        return option;
    }
  };

  return (
    <Html>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>New Enterprise Demo Request</Heading>

          <Text style={text}>
            You&apos;ve received a new enterprise demo request from {name} at {orgName}.
          </Text>

          <Section>
            <Heading as="h2" style={subheading}>Contact Details</Heading>
            
            <div style={tableContainer}>
              <div style={tableRow}>
                <div style={labelColumn}>Name:</div>
                <div style={valueColumn}>{name}</div>
              </div>
              <div style={tableRow}>
                <div style={labelColumn}>Designation:</div>
                <div style={valueColumn}>{designation}</div>
              </div>
              <div style={tableRow}>
                <div style={labelColumn}>Organization:</div>
                <div style={valueColumn}>{orgName}</div>
              </div>
              <div style={tableRow}>
                <div style={labelColumn}>Location:</div>
                <div style={valueColumn}>{location}</div>
              </div>
              <div style={tableRow}>
                <div style={labelColumn}>Email:</div>
                <div style={valueColumn}>{email}</div>
              </div>
              <div style={tableRow}>
                <div style={labelColumn}>Phone:</div>
                <div style={valueColumn}>{phoneNumber}</div>
              </div>
              <div style={tableRow}>
                <div style={labelColumn}>Preferred Contact:</div>
                <div style={valueColumn}>{formatPocOption(pocOption)}</div>
              </div>
            </div>
          </Section>

          <Hr style={hr} />

          <Section>
            <Heading as="h2" style={subheading}>Request Details</Heading>
            
            <div style={tableContainer}>
              <div style={tableRow}>
                <div style={labelColumn}>Capabilities:</div>
                <div style={valueColumn}>{formattedCapabilities}</div>
              </div>
              <div style={tableRow}>
                <div style={labelColumn}>Additional Notes:</div>
                <div style={valueColumn}>{additionalNote}</div>
              </div>
            </div>
          </Section>

          <Hr style={hr} />

          <Text style={noteText}>
            Please respond to this request within 24 hours. This request was submitted on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}.
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

const hr = {
  margin: "24px 0",
  borderTop: "1px solid #eaeaea",
  borderBottom: "none",
  borderLeft: "none",
  borderRight: "none",
}; 