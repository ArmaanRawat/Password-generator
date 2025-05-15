import { useState, useCallback, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+-=[]{}|;:',.<>?/`~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    // alert('Successfuly copied the password')
    toast.success("Copied to clipboard!");
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="min-h-screen bg-black text-orange-400 flex flex-col items-center justify-start py-10 px-4">
      <div className="items-start justify-start w-full mb-24">
        <div className="mb-6 pl-6">
          <h1 className="text-5xl font-extrabold text-white uppercase tracking-wide leading-tight">
            Strong
          </h1>
          <h1 className="text-5xl font-extrabold text-white uppercase tracking-wide leading-tight">
            Passwd
          </h1>
          <div className="flex items-end space-x-3 mt-1">
            <h1 className="text-5xl font-extrabold text-white uppercase tracking-wide">
              Generator
            </h1>
            <h3 className="text-sm text-white italic mb-1 py-1.5">"xoxo"</h3>
          </div>
        </div>
      </div>

      <br />
      <br />
      <div className="w-full max-w-4xl bg-gray-900 shadow-2xl rounded-2xl p-8">
        <p className="text-white mb-2 text-lg font-semibold">
          Your new password
        </p>
        <div className="flex items-center mb-6 bg-gray-800 rounded-lg overflow-hidden">
          <input
            type="text"
            value={password}
            className="flex-1 bg-transparent px-4 py-3 text-white text-lg font-mono outline-none"
            placeholder="Generated password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold"
            onClick={copyPasswordToClipboard}>
            Copy
          </button>
          <ToastContainer position="bottom-right" autoClose={2000} />
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="flex items-center gap-3">
            <label
              htmlFor="lengthRange"
              className="whitespace-nowrap text-white">
              Length: {length}
            </label>
            <input
              id="lengthRange"
              type="range"
              min={6}
              max={100}
              value={length}
              className="w-full cursor-pointer"
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="numberInput"
              checked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
              className="accent-orange-500"
            />
            <label htmlFor="numberInput" className="text-white select-none">
              Include Numbers
            </label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="charInput"
              checked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
              className="accent-orange-500"
            />
            <label htmlFor="charInput" className="text-white select-none">
              Include Special Characters
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
