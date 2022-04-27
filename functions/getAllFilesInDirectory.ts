import * as MediaLibrary from "expo-media-library";

const getAllFilesInDirectory = async () => {
  try {
    let album = await MediaLibrary.getAlbumAsync("JoyToTheWorld2021");
    if (album !== null) {
      const { assets } = await MediaLibrary.getAssetsAsync({
        album: album,
        first: 100,
        mediaType: [MediaLibrary.MediaType.photo, MediaLibrary.MediaType.video],
        sortBy: MediaLibrary.SortBy.modificationTime,
      });
      return assets.map((e: any) => e.uri);
    }
    return [];
  } catch (error) {
    console.error("Error getting files:", error);
    return null;
  }
};

export default getAllFilesInDirectory;
