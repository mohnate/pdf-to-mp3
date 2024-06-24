"use client";
import { useState } from "react";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import * as pdfjsLib from "pdfjs-dist/webpack";
import { Textarea } from "../components/ui/TextArea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/Select";

const GenerateSpeechUi = () => {
  const [inputType, setInputType] = useState<"text" | "pdf">("text");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [voice, setVoice] = useState("alloy");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [textInput, setTextInput] = useState("");
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const generateAudio = useAction(api.generateSpeech.generateAudioAction);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setPdfFile(file);
  };

  const extractTextFromPdf = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let text = "";

    for (let i = 0; i < pdf.numPages; i++) {
      const page = await pdf.getPage(i + 1);
      const content = await page.getTextContent();
      const strings = content.items.map((item: any) => item.str).join(" ");
      text += strings + " ";
    }

    return text;
  };

  const handleGenerateFromText = async () => {
    setLoading(true);
    try {
      const buffer = await generateAudio({ input: textInput, voice });
      const blob = new Blob([buffer], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      setAudioBlob(blob);
    } catch (error) {
      console.error("Error generating audio:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateFromPdf = async () => {
    if (!pdfFile) {
      alert("Please upload a PDF file.");
      return;
    }

    setLoading(true);
    try {
      const text = await extractTextFromPdf(pdfFile);
      const buffer = await generateAudio({ input: text, voice });
      const blob = new Blob([buffer], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      setAudioBlob(blob);
    } catch (error) {
      console.error("Error generating audio:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "output.mp3";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-full overflow-hidden">
      <h1 className="text-2xl font-bold mb-4">PDF to MP3 Generator</h1>
      <div className="flex flex-wrap space-x-4 mb-4">
        <label className="flex items-center">
          <input
            type="radio"
            name="inputType"
            value="text"
            checked={inputType === "text"}
            onChange={() => setInputType("text")}
            className="mr-2"
          />
          Text Input
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="inputType"
            value="pdf"
            checked={inputType === "pdf"}
            onChange={() => setInputType("pdf")}
            className="mr-2"
          />
          PDF Input
        </label>
      </div>

      {inputType === "text" && (
        <div className="mb-4 p-4 border rounded shadow-sm min-h-[300px] max-w-full flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <Textarea
              className="w-full p-2 border rounded mb-2"
              value={textInput}
              name="text-input"
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Enter text"
            />
            <Select onValueChange={(value) => setVoice(value)}>
              <SelectTrigger className="w-full p-2 border rounded mb-2">
                <SelectValue placeholder="Select Voice" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alloy">Alloy</SelectItem>
                <SelectItem value="echo">Echo</SelectItem>
                <SelectItem value="fable">Fable</SelectItem>
                <SelectItem value="onyx">Onyx</SelectItem>
                <SelectItem value="nova">Nova</SelectItem>
                <SelectItem value="shimmer">Shimmer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <button
            onClick={handleGenerateFromText}
            className="w-full bg-blue-500 text-white p-2 rounded flex items-center justify-center"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM2 12a10 10 0 0110-10v4a6 6 0 00-6 6H2z"
                ></path>
              </svg>
            ) : (
              "Generate Audio"
            )}
          </button>
        </div>
      )}

      {inputType === "pdf" && (
        <div className="mb-4 p-4 border rounded shadow-sm min-h-[300px] max-w-full flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="w-full p-2 border rounded mb-2"
            />
            <Select onValueChange={(value) => setVoice(value)}>
              <SelectTrigger className="w-full p-2 border rounded mb-2">
                <SelectValue placeholder="Select Voice" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alloy">Alloy</SelectItem>
                <SelectItem value="echo">Echo</SelectItem>
                <SelectItem value="fable">Fable</SelectItem>
                <SelectItem value="onyx">Onyx</SelectItem>
                <SelectItem value="nova">Nova</SelectItem>
                <SelectItem value="shimmer">Shimmer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <button
            onClick={handleGenerateFromPdf}
            className="w-full bg-blue-500 text-white p-2 rounded flex items-center justify-center"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM2 12a10 10 0 0110-10v4a6 6 0 00-6 6H2z"
                ></path>
              </svg>
            ) : (
              "Generate Audio"
            )}
          </button>
        </div>
      )}

      {audioUrl && (
        <div className="mt-4 max-w-full">
          <audio controls className="w-full">
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <button
            onClick={handleDownload}
            className="w-full my-4 bg-white text-black p-2 rounded"
          >
            Download Audio
          </button>
        </div>
      )}
    </div>
  );
};

export default GenerateSpeechUi;
