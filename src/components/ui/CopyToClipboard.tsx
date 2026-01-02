import { useState } from "react";

import Copy from "@/assets/copy.svg?react";
import Check from "@/assets/check.svg?react";
import { IconButton } from "./IconButton";
import { LABELS } from "@/constants";

type Props = {
  content: string;
};

export const CopyToClipboard = ({ content }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <IconButton
      onClick={handleCopy}
      className={`transition-colors duration-200 h-fit focus:outline-none focus:ring-transparent focus:ring-offset-transparent active:outline-none active:border-transparent focus-visible:outline-none focus-visible:border-transparent ${
        copied ? "text-green-600" : ""
      }`}
      title={copied ? LABELS.copied : LABELS.copy}
    >
      {copied ? <Check className="w-4" /> : <Copy className="w-4" />}
    </IconButton>
  );
};
