import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is the PDF to MP3 Converter?",
    answer:
      "The PDF to MP3 Converter is a web application that uses AI to convert text from PDF files into MP3 audio files, which can be downloaded for easy listening.",
  },
  {
    question: "How does the PDF to MP3 conversion work?",
    answer:
      "The application extracts text from the uploaded PDF file and uses AI-powered text-to-speech technology to convert the text into an audio file. The resulting MP3 file can then be downloaded directly from the platform.",
  },
  {
    question: "Is there a limit to the size of the PDF file I can upload?",
    answer:
      "Yes, there may be a file size limit depending on the plan you use. Please check the platform's upload guidelines for details on the maximum file size supported.",
  },
  {
    question: "Can I choose different voices for the audio output?",
    answer:
      "Yes, the PDF to MP3 Converter offers a selection of AI voices, allowing you to choose the voice that best suits your preferences for the audio file.",
  },
  {
    question: "Is my data safe when using the PDF to MP3 Converter?",
    answer:
      "Yes, we prioritize your privacy and ensure that the uploaded PDF files are processed securely. Files are not stored on our servers after conversion is complete.",
  },
  {
    question: "Can I use this service for free?",
    answer:
      "The basic version of the PDF to MP3 Converter is available for free with limited features. For access to advanced options, including more AI voices and larger file sizes, you can upgrade to a premium plan.",
  },
];

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center items-start sm:items-center sm:space-x-8 bg-gray-100 p-6 sm:p-12">
      <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
        <h1 className="text-sm text-blue-500 font-bold mb-4">FAQ</h1>
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
      </div>
      <div className="w-full sm:w-2/3">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4 border-b-2 border-gray-200 pb-4">
            <div
              className={`flex justify-between items-center cursor-pointer ${
                activeIndex === index ? "text-blue-500" : ""
              }`}
              onClick={() => handleToggle(index)}
            >
              <h3 className="text-sm font-semibold transition-colors duration-300">
                {faq.question}
              </h3>
              <div className="text-sm">
                {activeIndex === index ? <FaMinus /> : <FaPlus />}
              </div>
            </div>
            <div
              className={`overflow-hidden text-xs transition-max-height duration-1000 ease-in-out ${
                activeIndex === index ? "max-h-96" : "max-h-0"
              }`}
            >
              <p className="mt-4 text-gray-700">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
