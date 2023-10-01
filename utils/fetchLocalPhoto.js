export default async function fetchLocalPhoto(uri) {
  const response = await fetch(uri);
  const blobImage = await response.blob();
  return blobImage;
}
