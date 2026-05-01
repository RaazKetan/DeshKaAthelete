import Link from "next/link";
import { Topbar } from "@/components/crests/Topbar";
import { Footer } from "@/components/crests/Footer";

export default function ConfirmedPage() {
  return (
    <>
      <Topbar />
      <main
        style={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 32px",
        }}
      >
        <div style={{ maxWidth: 540, textAlign: "center" }}>
          <div
            style={{
              width: 56,
              height: 56,
              margin: "0 auto 28px",
              borderRadius: "50%",
              background: "var(--neem-soft)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path
                d="M5 11 L9 15 L17 7"
                stroke="oklch(0.42 0.07 155)"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="eyebrow">Request sent</div>
          <h1
            className="serif"
            style={{ fontSize: 48, margin: "14px 0 18px", fontWeight: 400, lineHeight: 1.05 }}
          >
            Now we wait — and we wait well.
          </h1>
          <p style={{ color: "var(--ink-2)", fontSize: 17, lineHeight: 1.5, margin: 0 }}>
            The speaker has 48 hours to respond. We&apos;ll email you the moment they do. Reference{" "}
            <span className="mono" style={{ color: "var(--ink)" }}>
              #CR-2026-0421
            </span>
            .
          </p>
          <div style={{ marginTop: 36, display: "flex", gap: 12, justifyContent: "center" }}>
            <Link href="/" className="btn ghost">
              Back to home
            </Link>
            <Link href="/browse" className="btn saffron">
              Browse more speakers
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
