export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Only GET allowed" });
  }

  const { number, message } = req.query;

  if (!number || !message) {
    return res.status(400).json({ error: "Missing number or message" });
  }

  const BOT_TOKEN = "7603100372:AAHJB96kQ8sQ72dxsCclEUPO8au066_EifA";
  const CHAT_ID = "7768128007";

  const fullMessage = `📲 New SMS Request\n\n👤 Number: ${number}\n💬 Message: ${message}`;

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(fullMessage)}`;

  try {
    const telegramRes = await fetch(url);
    const data = await telegramRes.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
