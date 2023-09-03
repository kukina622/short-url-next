import { useState } from "react";
import LinkIcon from "@/components/LinkIcon";

interface IUrlFormProps {
  onSubmit: (url: string) => void;
}

const UrlForm = ({ onSubmit }: IUrlFormProps) => {
  const [url, setUrl] = useState<string>("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(url);
  }

  return (
    <form
      className="px-5 bg-white w-full py-3 mx-auto rounded-lg flex justify-between"
      onSubmit={submit}
    >
      <div className="w-10/12 flex items-center">
        <div className="rounded-md bg-sky-400 bg-opacity-70 inline-flex h-10 w-10 shrink-0 items-center justify-center text-white">
          <LinkIcon />
        </div>
        <input
          className="h-full w-[calc(100%-3.5rem)] mx-4 font-bold border-none text-xl leading-7 text-gray-900 bg-opacity-0 !outline-none"
          placeholder="Paste a link to shorten it"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-fit font-bold inline-flex items-center justify-center p-0.5 text-lg rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 text-white hover:text-white/75 focus:ring-4 focus:outline-none focus:ring-cyan-200"
      >
        <span className="px-5 py-2.5 transition-all ease-in duration-75 rounded-lg">
          Shorten
        </span>
      </button>
    </form>
  );
};

export default UrlForm;
