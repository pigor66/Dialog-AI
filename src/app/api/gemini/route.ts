import { runGemini } from "@/utils/gemini";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const geminiResponse = await runGemini(prompt);

    return Response.json({ text: geminiResponse });
  } catch (error) {
    console.error("Erro ao chamar Gemini:", error);
    return Response.json({ error: "Erro ao chamar Gemini" }, { status: 500 });
  }
}
