import { SignInButton } from "@clerk/nextjs";
import React from "react";

const LoginPrompt = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white m-8 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Please Sign In</h2>
        <p className="mb-4">
          You need to sign in to continue using this feature after 3 attempts.
        </p>
        <div className="flex justify-between">
          <div className="bg-purple-500 self-center text-white py-2 px-4 rounded-md hover:bg-purple-600 transition duration-300">
            <SignInButton mode="modal" />
          </div>
          <button
            onClick={onClose}
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPrompt;
