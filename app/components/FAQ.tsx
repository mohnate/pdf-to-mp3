import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is the Text to MP3 Converter?",
    answer:
      "The Text to MP3 Converter is a web application that allows you to convert text input or PDF files into MP3 audio files using a selection of 6 AI voices.",
  },
  {
    question: "How do I convert text to MP3?",
    answer:
      "To convert text to MP3, simply type or paste your text into the provided text area and select your preferred AI voice. Click the 'Generate Audio' button and the application will create an MP3 file for you to download.",
  },
  {
    question: "Can I convert PDF files to MP3?",
    answer:
      "Yes, you can convert PDF files to MP3. Upload your PDF document, select your preferred AI voice, and click the 'Generate Audio' button. The application will extract text from the PDF and convert it into an MP3 file.",
  },
  {
    question: "What AI voices are available?",
    answer:
      "The application offers 6 AI voices: Alloy, Echo, Fable, Onyx, Nova, and Shimmer. You can choose any of these voices to narrate your text or PDF content.",
  },
  {
    question: "Is the service free to use?",
    answer:
      "Yes, the basic functionality of the Text to MP3 Converter is free to use. However, there might be limitations on the number of conversions you can perform daily or the length of text you can convert.",
  },
  {
    question: "How do I download the MP3 file?",
    answer:
      "After the conversion is complete, a download link will be provided. Click on the link to download the MP3 file to your device.",
  },
  {
    question: "How can I change the AI voice?",
    answer:
      "You can change the AI voice by selecting a different voice from the dropdown menu before generating the audio. Each voice offers a unique tone and style.",
  },
  {
    question: "What should I do if the conversion fails?",
    answer:
      "If the conversion fails, please check your input text or PDF file for any issues and try again. If the problem persists, you can contact our support team at support@texttomp3converter.com for assistance.",
  },
  {
    question: "Are there any limitations on the file size or text length?",
    answer:
      "There may be limitations on the size of the PDF file or the length of the text that can be converted in a single request. Please refer to our documentation for specific details on these limits.",
  },
  {
    question: "How secure is my data?",
    answer:
      "Your data security is our priority. We ensure that all files and text are processed securely and are not stored on our servers after the conversion is complete.",
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
