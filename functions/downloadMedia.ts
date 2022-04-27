import * as MediaLibrary from "expo-media-library";

const downloadMedia = async (
  photoToDownload: any,
  hasMediaLibraryPermission: boolean
) => {
  if (hasMediaLibraryPermission) {
    try {
      // Create asset and get album
      const asset = await MediaLibrary.createAssetAsync(photoToDownload);
      let album = await MediaLibrary.getAlbumAsync("JoyToTheWorld2021");

      if (album === null) {
        // Create album and save first asset
        await MediaLibrary.createAlbumAsync("JoyToTheWorld2021", asset, false);
      } else {
        // Save asset in previous album
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, true);
      }

      return true;
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
};

export default downloadMedia;
