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
  const [txtVoice, setTxtVoice] = useState("");
  const [pdfVoice, setPdfVoice] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [textInput, setTextInput] = useState("");
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [txtErrorMessage, setTxtErrorMessage] = useState<any>(null);
  const [pdfErrorMessage, setPdfErrorMessage] = useState("");

  const maxWords = isSignedIn ? 300 : 100;

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
    if (!textInput.trim()) {
      setTxtErrorMessage("Please enter text to convert.");
      return;
    }

    if (textInput.length > maxWords) {
      isSignedIn
        ? setTxtErrorMessage(`The text exceeds the ${maxWords}-word limit.`)
        : setTxtErrorMessage(
            `The text exceeds the ${maxWords}-word limit. you need to login`
          );
      return;
    }

    if (!txtVoice) {
      setTxtErrorMessage("Please choose a voice to narrate your text.");
      return;
    }

    if (!isSignedIn && attempts >= 5) {
      setShowLoginPrompt(true);
      return;
    }

    setLoading(true);
    setTxtErrorMessage("");
    try {
      const buffer = await generateAudio({ input: textInput, voice: txtVoice });
      const blob = new Blob([buffer], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      setAudioBlob(blob);
      setAttempts(attempts + 1);
    } catch (error) {
      console.error("Error generating audio:", error);
      setTxtErrorMessage(
        "Error: 429 You exceeded your current quota, please check your plan and billing details."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateFromPdf = async () => {
    if (!pdfFile) {
      setPdfErrorMessage("Please upload a PDF file.");
      return;
    }

    // if (pdfFile && pdfFile.size > 1 * 1024 * 1024) {
    //   setPdfErrorMessage("The PDF file size exceeds the 1MB limit.");
    //   return;
    // }

    if (!pdfVoice) {
      setPdfErrorMessage("Please choose a voice to narrate your PDF file.");
      return;
    }

    if (!isSignedIn && attempts >= 5) {
      setShowLoginPrompt(true);
      return;
    }

    const text = await extractTextFromPdf(pdfFile);
    if (text.length > maxWords) {
      isSignedIn
        ? setPdfErrorMessage(
            `The text in you file exceeds the ${maxWords}-word limit.`
          )
        : setPdfErrorMessage(
            `The text exceeds the ${maxWords}-word limit. you need to login`
          );
      return;
    }

    setLoading(true);
    setPdfErrorMessage("");
    try {
      const buffer = await generateAudio({ input: text, voice: pdfVoice });
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
    <div
      id="generate-audio"
      className="flex flex-col items-center lg:m-40 bg-slate-100 text-gray-500 rounded-3xl m-10"
    >
      {audioUrl ? (
        <DownloadAudio
          audioUrl={audioUrl}
          onBack={handleBack}
          onDownload={handleDownload}
        />
      ) : (
        <div className="flex flex-col justify-between p-8">
          <h1 className="md:text-2xl font-bold mb-4">
            Easily transform your Text Or PDFs into MP3s.
          </h1>

          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setInputType("text")}
              className={`py-2 px-4 rounded-full font-semibold ${
                inputType === "text" ? "bg-[#3fcfa4] text-white" : "bg-gray-200"
              }`}
            >
              Text Input
            </button>
            <button
              onClick={() => setInputType("pdf")}
              className={`py-2 px-4 rounded-full font-semibold ${
                inputType === "pdf" ? "bg-[#3fcfa4] text-white" : "bg-gray-200"
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
                  Toggle Text Input
                </div>
              )}
              <div className="flex flex-col gap-4">
                <p>
                  Type your text and we&apos;ll convert it into a downloadable
                  MP3!{" "}
                </p>
                <Select onValueChange={(value) => setTxtVoice(value)}>
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
                  className="w-full p-2 border rounded"
                  value={textInput}
                  name="text-input"
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Type or paste your text here..."
                />
              </div>
              <div className="my-10">
                {txtErrorMessage && (
                  <div
                    role="alert"
                    className="alert alert-error flex items-center justify-center"
                  >
                    <button onClick={() => setTxtErrorMessage("")}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                    <span className="text-sm">{txtErrorMessage}</span>
                  </div>
                )}
                {!loading ? (
                  <p className="pt-2 lg:pt-6">
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
              </div>
            </div>

            <div
              className={`max-w-full flex flex-col h-[500px] justify-between border-2 p-4 rounded-xl relative ${inputType === "text" ? "opacity-50 pointer-events-none" : ""}`}
            >
              {inputType === "text" && (
                <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                  Toggle PDF Input
                </div>
              )}
              <div className="flex flex-col gap-4">
                <p>
                  Upload your PDF document and we&apos;ll create a downloadable
                  MP3 for you!{" "}
                </p>

                <Select onValueChange={(value) => setPdfVoice(value)}>
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
              <div className="my-10 flex flex-col">
                {pdfErrorMessage && (
                  <div
                    role="alert"
                    className="alert alert-error flex items-center justify-center"
                  >
                    <button onClick={() => setPdfErrorMessage("")}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                    <span className="text-sm">{pdfErrorMessage}</span>
                  </div>
                )}

                {!loading ? (
                  <p className="pt-2 lg:pt-6">
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
              </div>
            </div>
          </div>

          <button
            onClick={() =>
              inputType === "pdf"
                ? handleGenerateFromPdf()
                : handleGenerateFromText()
            }
            className="w-full bg-[#f6e067] rounded-full text-black my-5 py-4 text-xl font-thin flex items-center justify-center"
          >
            {loading ? (
              <span className="loading loading-dots loading-lg"></span>
            ) : (
              "Generate Audio"
            )}
          </button>
        </div>
      )}
      {showLoginPrompt && (
        <LoginPrompt onClose={() => setShowLoginPrompt(false)} />
      )}
    </div>
  );
};

export default GenerateSpeechUi;
