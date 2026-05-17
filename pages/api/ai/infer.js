export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.GRADIENTAI_API_URL || !process.env.GRADIENTAI_API_KEY) {
    return res.status(200).json({ ok: true, message: "GradientAI is not configured." });
  }

  const response = await fetch(process.env.GRADIENTAI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GRADIENTAI_API_KEY}`,
    },
    body: JSON.stringify(req.body || {}),
  });

  const payload = await response.json();
  return res.status(response.status).json(payload);
}
