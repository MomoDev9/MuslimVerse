import Feedback from "@/components/OnePage/Feedback";
import Layout from "@/components/Layout/Layout";

export const metadata = {
  title: "Saran & Masukan",
  description: "Berikan saran dan masukan untuk pengembangan MuslimVerse.",
};

export default function FeedbackPage() {
  return (
    <Layout>
      <Feedback />
    </Layout>
  );
}
