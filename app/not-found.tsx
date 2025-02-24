export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-100 text-gray-500">
      <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-4">404</h1>
      <p className="text-2xl md:text-3xl lg:text-4xl mb-4">Page Not Found</p>
      <p className="text-xl md:text-2xl lg:text-3xl mb-8">
        😔 Oops! It seems like you&lsquo;ve hit a dead end. 🚧
      </p>
      <a
        href="/"
        className="text-blue-500 text-lg md:text-xl lg:text-2xl underline"
      >
        Go Back Home
      </a>
    </div>
  );
};
