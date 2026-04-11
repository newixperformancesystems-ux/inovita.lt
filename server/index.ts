import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { Resend } from "resend";
import dotenv from "dotenv";
import cors from "cors";

// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Enable CORS for all origins during development
  app.use(cors());
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  const RECIPIENT_EMAIL = "info@inovita.lt";
  const FROM_EMAIL = "Inovita <noreply@inovita.lt>";

  // Logging middleware
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

  // ── Email sending endpoint (Simple Contact / Quiz) ──────────────
  app.post("/api/contact", async (req, res) => {
    console.log("Received /api/contact request:", req.body);
    try {
      const { name, contact, source, quizData } = req.body as {
        name: string;
        contact: string;
        source: string;
        quizData?: Record<string, unknown>;
      };

      if (!name || !contact) {
        console.error("Missing name or contact");
        return res.status(400).json({ error: "Missing required fields" });
      }

      const resendApiKey = process.env.RESEND_API_KEY;
      if (!resendApiKey) {
        console.error("RESEND_API_KEY not set");
        return res.status(500).json({ error: "Server configuration error" });
      }

      const resend = new Resend(resendApiKey);

      const quizSection = quizData
        ? `<h3 style="margin-top:16px;">Kvizo atsakymai:</h3><ul>${Object.entries(quizData)
            .map(([k, v]) => `<li><strong>${k}:</strong> ${v}</li>`)
            .join("")}</ul>`
        : "";

      const sourceLabel = source === "quiz" ? "Kvizas (/analize)" : "Pagrindinis puslapis";

      const { data, error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: RECIPIENT_EMAIL,
        subject: `Nauja užklausa iš inovita.lt – ${name}`,
        html: `
<div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#222;">
  <h2 style="color:#0A0A0E;background:#A8FF3E;padding:16px 20px;border-radius:6px 6px 0 0;margin:0;">
    📬 Nauja užklausa – inovita.lt
  </h2>
  <div style="border:1px solid #e5e7eb;border-top:none;padding:20px;border-radius:0 0 6px 6px;">
    <p><strong>Šaltinis:</strong> ${sourceLabel}</p>
    <p><strong>Vardas:</strong> ${name}</p>
    <p><strong>El. paštas / Telefonas:</strong> ${contact}</p>
    ${quizSection}
    <hr style="margin:16px 0;border:none;border-top:1px solid #e5e7eb;"/>
    <p style="color:#888;font-size:12px;">Gauta: ${new Date().toLocaleString("lt-LT", { timeZone: "Europe/Vilnius" })}</p>
  </div>
</div>`,
      });

      if (error) {
        console.error("Resend API error:", error);
        return res.status(400).json({ error: error.message });
      }

      console.log("Email sent successfully:", data);
      return res.json({ ok: true, id: data?.id });
    } catch (err) {
      console.error("Unexpected error in /api/contact:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // ── Becoming Client endpoint (Full Form with Attachments) ────────
  app.post("/api/becoming-client", async (req, res) => {
    console.log("Received /api/becoming-client request");
    try {
      const { formData, attachments } = req.body as {
        formData: any;
        attachments: Array<{ filename: string; content: string }>;
      };

      const resendApiKey = process.env.RESEND_API_KEY;
      if (!resendApiKey) {
        console.error("RESEND_API_KEY not set");
        return res.status(500).json({ error: "Server configuration error" });
      }

      const resend = new Resend(resendApiKey);

      const rows = Object.entries(formData)
        .filter(([_, v]) => v !== undefined && v !== null && v !== "")
        .map(([k, v]) => {
          const val = typeof v === 'object' ? JSON.stringify(v, null, 2) : String(v);
          return `<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;width:160px;">${k}</td><td style="padding:8px;border-bottom:1px solid #eee;">${val}</td></tr>`;
        })
        .join("");

      const { data, error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: RECIPIENT_EMAIL,
        subject: `Nauja kliento paraiška – ${formData.firstName} ${formData.lastName}`,
        attachments: attachments.map(a => ({
          filename: a.filename,
          content: a.content.split(',')[1],
        })),
        html: `
<div style="font-family:sans-serif;max-width:700px;margin:0 auto;color:#222;">
  <h2 style="color:#0A0A0E;background:#A8FF3E;padding:16px 20px;border-radius:6px 6px 0 0;margin:0;">
    📋 Nauja kliento paraiška – inovita.lt
  </h2>
  <div style="border:1px solid #e5e7eb;border-top:none;padding:20px;border-radius:0 0 6px 6px;">
    <table style="width:100%;border-collapse:collapse;">
      ${rows}
    </table>
    <p style="margin-top:20px;color:#888;font-size:12px;">Gauta: ${new Date().toLocaleString("lt-LT", { timeZone: "Europe/Vilnius" })}</p>
  </div>
</div>`,
      });

      if (error) {
        console.error("Resend API error:", error);
        return res.status(400).json({ error: error.message });
      }

      console.log("Email sent successfully:", data);
      return res.json({ ok: true, id: data?.id });
    } catch (err) {
      console.error("Unexpected error in /api/becoming-client:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  const staticPath = path.resolve(__dirname, "..", "dist", "public");
  app.use(express.static(staticPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3001;
  server.listen(port, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${port}/`);
  });
}

startServer().catch(console.error);
