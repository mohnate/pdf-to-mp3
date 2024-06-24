"use client";
import { useState } from "react";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import * as pdfjsLib from "pdfjs-dist/webpack";

const GenerateSpeechUi = () => {
  const [inputType, setInputType] = useState<"text" | "pdf">("text");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [voice, setVoice] = useState("alloy");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [textInput, setTextInput] = useState("");
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
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
    try {
      const buffer = await generateAudio({ input: textInput, voice });
      const blob = new Blob([buffer], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      setAudioBlob(blob);
    } catch (error) {
      console.error("Error generating audio:", error);
    }
  };

  const handleGenerateFromPdf = async () => {
    if (!pdfFile) {
      alert("Please upload a PDF file.");
      return;
    }

    try {
      const text = await extractTextFromPdf(pdfFile);
      const buffer = await generateAudio({ input: text, voice });
      const blob = new Blob([buffer], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      setAudioBlob(blob);
    } catch (error) {
      console.error("Error generating audio:", error);
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
    <div>
      <h1>PDF to Speech Generator</h1>
      <div>
        <label>
          <input
            type="radio"
            name="inputType"
            value="text"
            checked={inputType === "text"}
            onChange={() => setInputType("text")}
          />
          Text Input
        </label>
        <label>
          <input
            type="radio"
            name="inputType"
            value="pdf"
            checked={inputType === "pdf"}
            onChange={() => setInputType("pdf")}
          />
          PDF Input
        </label>
      </div>

      {inputType === "text" && (
        <div>
          <textarea
            value={textInput}
            name="text-input"
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Enter text"
          />
          <select
            name="voice"
            value={voice}
            onChange={(e) => setVoice(e.target.value)}
          >
            <option value="alloy">Alloy</option>
            <option value="echo">Echo</option>
            <option value="fable">Fable</option>
            <option value="onyx">Onyx</option>
            <option value="nova">Nova</option>
            <option value="shimmer">Shimmer</option>
          </select>
          <button onClick={handleGenerateFromText}>Generate Audio</button>
        </div>
      )}

      {inputType === "pdf" && (
        <div>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />
          <select
            name="voice"
            value={voice}
            onChange={(e) => setVoice(e.target.value)}
          >
            <option value="alloy">Alloy</option>
            <option value="echo">Echo</option>
            <option value="fable">Fable</option>
            <option value="onyx">Onyx</option>
            <option value="nova">Nova</option>
            <option value="shimmer">Shimmer</option>
          </select>
          <button onClick={handleGenerateFromPdf}>Generate Audio</button>
        </div>
      )}

      {audioUrl && (
        <>
          <audio controls>
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <button onClick={handleDownload}>Download Audio</button>
        </>
      )}
    </div>
  );
};

export default GenerateSpeechUi;
