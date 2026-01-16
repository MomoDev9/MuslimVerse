import axios from "axios";

export const quranAPI = {
  async getAllSurahs() {
    try {
      const response = await axios.get("https://equran.id/api/v2/surat");
      return response.data.data.map((surah) => ({
        id: surah.nomor,
        nama: surah.nama,
        namaLatin: surah.namaLatin,
        arti: surah.arti,
        jumlahAyat: surah.jumlahAyat,
        tempatTurun: surah.tempatTurun,
        deskripsi: surah.deskripsi,
      }));
    } catch (error) {
      console.error("Error fetching surahs:", error);
      return [];
    }
  },

  async getSurahDetail(id) {
    try {
      const response = await axios.get(`https://equran.id/api/v2/surat/${id}`);
      const surahData = response.data.data;

      return {
        surahInfo: {
          nomor: surahData.nomor,
          nama: surahData.nama,
          namaLatin: surahData.namaLatin,
          arti: surahData.arti,
          jumlahAyat: surahData.jumlahAyat,
          tempatTurun: surahData.tempatTurun,
          deskripsi: surahData.deskripsi,
        },
        verses: surahData.ayat.map((ayat) => ({
          id: ayat.nomorAyat,
          text_uthmani: ayat.teksArab,
          translations: [{ text: ayat.teksIndonesia }],
          audio: this.getAudioUrl(surahData.nomor, ayat.nomorAyat),
        })),
      };
    } catch (error) {
      console.error("Error fetching surah detail:", error);
      throw error;
    }
  },

  getAudioUrl(surahNumber, verseNumber) {
    const surahPadded = surahNumber.toString().padStart(3, "0");
    const versePadded = verseNumber.toString().padStart(3, "0");
    return `https://everyayah.com/data/Alafasy_128kbps/${surahPadded}${versePadded}.mp3`;
  },
};
