import Favorite from "@/components/OnePage/Favorite";
import Layout from "@/components/Layout/Layout";

export const metadata = {
  title: "Ayat Favorit",
  description: "Ayat favorit Anda di MuslimVerse.",
};

export default function FavoritePage() {
  return (
    <Layout>
      <Favorite />
    </Layout>
  );
}
