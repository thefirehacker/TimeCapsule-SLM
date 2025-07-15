import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "TimeCapsule - AI-Powered Learning Platform";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
          color: "white",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {/* Logo/Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "16px",
              background: "rgba(255, 255, 255, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
              fontWeight: "bold",
            }}
          >
            🕰️
          </div>
          <div
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              background: "linear-gradient(45deg, #ffffff, #f0f0f0)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            TimeCapsule
          </div>
        </div>

        {/* Main Title */}
        <h1
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            textAlign: "center",
            margin: "0 0 20px 0",
            lineHeight: "1.2",
          }}
        >
          AI-Powered Learning Platform
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "32px",
            textAlign: "center",
            margin: "0 0 40px 0",
            opacity: "0.9",
            maxWidth: "800px",
            lineHeight: "1.4",
          }}
        >
          Transform your learning with AI-Frames, Deep Research, and Interactive
          Knowledge Graphs
        </p>

        {/* Features */}
        <div
          style={{
            display: "flex",
            gap: "40px",
            marginTop: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: "24px",
              opacity: "0.9",
            }}
          >
            <span>🎯</span>
            <span>AI-Frames</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: "24px",
              opacity: "0.9",
            }}
          >
            <span>🔍</span>
            <span>Deep Research</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: "24px",
              opacity: "0.9",
            }}
          >
            <span>📊</span>
            <span>Knowledge Graphs</span>
          </div>
        </div>

        {/* Bottom Text */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            fontSize: "20px",
            opacity: "0.7",
          }}
        >
          timecapsuleslm.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
