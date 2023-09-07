import { useState } from "react";
import UrlForm from "@/components/UrlForm";
import Banner from "@/components/Banner";
import GradientLayout from "@/layouts/GradientLayout";
import ShortLinkDialog from "@/components/ShortLinkDialog";
import { isValidUrl } from "@/utils";

export default function Index() {
  const [isOpen, setIsOpen] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);

  const [link, setLink] = useState<string | undefined>(undefined);

  const [message, setMessage] = useState<string | undefined>(undefined);

  async function onUrlFormSubmit(url: string) {
    if (!isValidUrl(url)) {
      setMessage("Operation failed");
      setIsSuccess(false);
      setIsOpen(true);

      return;
    }

    try {
      const res = await fetch("/api/link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      setIsSuccess(data.success);
      if (data.success) {
        setLink(data.data.shortUrl);

        return;
      }
      setMessage(data.message);
    } catch (error) {
      setIsSuccess(false);
      setMessage("Operation failed");
    } finally {
      setIsOpen(true);
    }
  }

  return (
    <GradientLayout className="py-60 px-32">
      <Banner />
      <UrlForm onSubmit={onUrlFormSubmit} />
      <ShortLinkDialog
        isSuccess={isSuccess}
        link={link}
        message={message}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </GradientLayout>
  );
}
