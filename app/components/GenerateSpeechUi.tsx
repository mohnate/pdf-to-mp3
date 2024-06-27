"use client";
import { useState } from "react";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import { Textarea } from "../components/ui/TextArea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/Select";
import DownloadAudio from "../components/DownloadAudio";
import { useUser } from "@clerk/clerk-react";
import LoginPrompt from "./LoginPrompt";

// Set the workerSrc property to specify the location of the worker script
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.mjs";

const GenerateSpeechUi = () => {
  const { isSignedIn } = useUser();
  const [inputType, setInputType] = useState<"text" | "pdf">("text");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [voice, setVoice] = useState("alloy");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [textInput, setTextInput] = useState("");
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
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
    if (!isSignedIn && attempts >= 3) {
      setShowLoginPrompt(true);
      return;
    }

    setLoading(true);
    try {
      const buffer = await generateAudio({ input: textInput, voice });
      const blob = new Blob([buffer], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      setAudioBlob(blob);
      setAttempts(attempts + 1);
    } catch (error) {
      console.error("Error generating audio:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateFromPdf = async () => {
    if (!isSignedIn && attempts >= 3) {
      setShowLoginPrompt(true);
      return;
    }

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
      setAttempts(attempts + 1);
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

  const handleBack = () => {
    setAudioUrl(null);
    setAudioBlob(null);
  };

  return (
    <div className="flex flex-col items-center lg:m-[100px] bg-slate-100 text-gray-500 rounded-lg m-10 p-8">
      {audioUrl ? (
        <DownloadAudio
          audioUrl={audioUrl}
          onBack={handleBack}
          onDownload={handleDownload}
        />
      ) : (
        <div className="flex flex-col justify-between">
          <h1 className="md:text-2xl font-bold mb-4">
            Easily transform your Text Or PDFs into MP3s.
          </h1>

          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setInputType("text")}
              className={`p-2 rounded ${
                inputType === "text" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              Text Input
            </button>
            <button
              onClick={() => setInputType("pdf")}
              className={`p-2 rounded ${
                inputType === "pdf" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              PDF Input
            </button>
          </div>

          <div className="lg:flex gap-4">
            <div
              className={`max-w-full flex flex-col mb-8 md:mb-0 justify-between border-2 p-4 rounded-xl relative ${inputType === "pdf" ? "opacity-50 pointer-events-none" : ""}`}
            >
              {inputType === "pdf" && (
                <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                  Toggel Text Input
                </div>
              )}
              <div className="flex flex-col gap-4">
                <p>
                  Type your text and we&apos;ll convert it into a downloadable
                  MP3!{" "}
                </p>
                <Select onValueChange={(value) => setVoice(value)}>
                  <SelectTrigger className="w-full p-2 border rounded mb-2">
                    <SelectValue placeholder="Select a voice to narrate your text." />
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
                <Textarea
                  className="w-full p-2 border rounded mb-2"
                  value={textInput}
                  name="text-input"
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Type or paste your text here..."
                />
              </div>
              <div className="my-10">
                {!loading ? (
                  <p className="">
                    🎧 Turn your PDFs and text into MP3s! 📚➡️🎶 Enjoy your
                    documents on the go by converting them into audio files.
                    Perfect for multitasking and making the most of your time!
                  </p>
                ) : (
                  <p className="">
                    🔄 Converting your text into audio... 🎧 Sit back and relax,
                    we’re almost there!
                  </p>
                )}
                <button
                  onClick={handleGenerateFromText}
                  className="w-[200px] bg-blue-500 text-white my-5 p-2 rounded flex items-center justify-center"
                >
                  {loading ? (
                    <span className="loading loading-dots loading-lg"></span>
                  ) : (
                    "Generate Audio"
                  )}
                </button>
              </div>
            </div>

            <div
              className={`max-w-full flex flex-col h-[500px] justify-between border-2 p-4 rounded-xl relative ${inputType === "text" ? "opacity-50 pointer-events-none" : ""}`}
            >
              {inputType === "text" && (
                <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                  Toggel PDF Input
                </div>
              )}
              <div className="flex flex-col gap-4">
                <p>
                  Upload your PDF document and we&apos;ll create a downloadable
                  MP3 for you!{" "}
                </p>

                <Select onValueChange={(value) => setVoice(value)}>
                  <SelectTrigger className="w-full p-2 border rounded mb-2">
                    <SelectValue placeholder="Select a voice to narrate your PDF file." />
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
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="file-input file-input-bordered file-input-info w-full max-w-xs text-white"
                />
              </div>
              <div className="my-10">
                {!loading ? (
                  <p className="">
                    🎧 Turn your PDFs and text into MP3s! 📚➡️🎶 Enjoy your
                    documents on the go by converting them into audio files.
                    Perfect for multitasking and making the most of your time!
                  </p>
                ) : (
                  <p className="">
                    🔄 Converting your text into audio... 🎧 Sit back and relax,
                    we’re almost there!
                  </p>
                )}
                <button
                  onClick={handleGenerateFromPdf}
                  className="w-[200px] bg-blue-500 text-white my-5 p-2 rounded flex items-center justify-center"
                >
                  {loading ? (
                    <span className="loading loading-dots loading-lg"></span>
                  ) : (
                    "Generate Audio"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showLoginPrompt && (
        <LoginPrompt onClose={() => setShowLoginPrompt(false)} />
      )}
    </div>
  );
};

export default GenerateSpeechUi;
