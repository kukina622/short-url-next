import { useState } from "react";
import UrlForm from "@/components/UrlForm";
import Banner from "@/components/Banner";
import GradientLayout from "@/layouts/GradientLayout";
import ShortLinkDialog from "@/components/ShortLinkDialog";

export default function Index() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <GradientLayout className="py-60 px-32">
      <Banner />
      <UrlForm />
      <ShortLinkDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </GradientLayout>
  );
}
