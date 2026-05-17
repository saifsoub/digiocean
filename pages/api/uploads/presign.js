import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { filename, contentType } = req.body || {};
  if (!filename || !contentType) {
    return res.status(400).json({ error: "filename and contentType are required" });
  }

  if (!process.env.SPACES_ENDPOINT || !process.env.SPACES_BUCKET || !process.env.SPACES_KEY || !process.env.SPACES_SECRET) {
    return res.status(200).json({ ok: true, message: "Spaces not configured." });
  }

  const client = new S3Client({
    region: process.env.SPACES_REGION || "us-east-1",
    endpoint: process.env.SPACES_ENDPOINT,
    credentials: {
      accessKeyId: process.env.SPACES_KEY,
      secretAccessKey: process.env.SPACES_SECRET,
    },
    forcePathStyle: false,
  });

  const key = `uploads/${Date.now()}-${filename}`;
  const command = new PutObjectCommand({
    Bucket: process.env.SPACES_BUCKET,
    Key: key,
    ContentType: contentType,
  });

  const url = await getSignedUrl(client, command, { expiresIn: 300 });
  return res.status(200).json({ url, key });
}
