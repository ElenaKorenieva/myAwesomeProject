export default function getFilename(uri) {
  const array = uri.split("/");
  const filename = array[array.length - 1];
  return filename;
}
