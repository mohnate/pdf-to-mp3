const Footer = () => {
  return (
    <footer className="bg-black text-white border-t-[5px] border-white rounded-full py-4 mt-4 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6 md:px-4 space-y-4 md:space-y-0">
        <div className="flex items-center justify-center md:justify-start">
          <p className="text-center md:text-left md:text-lg font-medium cursor-pointer hover:text-purple-400 transition duration-300">
            © 2024 PDF to MP3 Generator
          </p>
        </div>
        <div className="flex space-x-6 justify-center md:justify-end">
          <a
            href="#"
            className="text-white hover:text-purple-400 transition duration-300"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-white hover:text-purple-400 transition duration-300"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
