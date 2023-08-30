import UrlForm from "@/components/UrlForm";
import Banner from "@/components/Banner";
import GradientLayout from "@/layouts/GradientLayout";

export default function Index() {
  return (
    <GradientLayout className="py-60 px-32">
      <Banner />
      <UrlForm />
    </GradientLayout>
  );
}
