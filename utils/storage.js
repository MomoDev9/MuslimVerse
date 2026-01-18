export const storage = {
  saveBookmark(verse) {
    const bookmarks = this.getBookmarks();
    const exists = bookmarks.find(
      (b) => b.surah === verse.surah && b.verse === verse.verse
    );

    if (!exists) {
      bookmarks.push(verse);
      localStorage.setItem("quran_bookmarks", JSON.stringify(bookmarks));
    }
  },

  removeBookmark(surah, verse) {
    const bookmarks = this.getBookmarks().filter(
      (b) => !(b.surah === surah && b.verse === verse)
    );
    localStorage.setItem("quran_bookmarks", JSON.stringify(bookmarks));
  },

  getBookmarks() {
    return JSON.parse(localStorage.getItem("quran_bookmarks") || "[]");
  },

  isBookmarked(surah, verse) {
    return this.getBookmarks().some(
      (b) => b.surah === surah && b.verse === verse
    );
  },

  saveLastRead(surah, verse) {
    localStorage.setItem(
      "quran_last_read",
      JSON.stringify({
        surah,
        verse,
        timestamp: Date.now(),
      })
    );
  },

  getLastRead() {
    return JSON.parse(localStorage.getItem("quran_last_read") || "null");
  },

  saveProgress(surah, verse, readDuration = 0) {
    const progress = this.getProgress();
    const key = `${surah}:${verse}`;

    progress[key] = {
      lastRead: Date.now(),
      readCount: (progress[key]?.readCount || 0) + 1,
      totalDuration: (progress[key]?.totalDuration || 0) + readDuration,
    };

    localStorage.setItem("quran_reading_progress", JSON.stringify(progress));
  },

  getProgress() {
    return JSON.parse(localStorage.getItem("quran_reading_progress") || "{}");
  },

  clearAll() {
    localStorage.removeItem("quran_bookmarks");
    localStorage.removeItem("quran_last_read");
    localStorage.removeItem("quran_reading_progress");
  },
};
