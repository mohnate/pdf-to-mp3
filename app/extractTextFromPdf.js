import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf"; // Use the legacy build

const extractTextFromPdf = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let text = "";

  for (let i = 0; i < pdf.numPages; i++) {
    const page = await pdf.getPage(i + 1);
    const content = await page.getTextContent();
    const strings = content.items.map((item) => item.str).join(" ");
    text += strings + " ";
  }

  return text;
};

export default extractTextFromPdf;
