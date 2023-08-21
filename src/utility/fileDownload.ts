export const downloadFileFromURL = (uri: string, filename: string) => {
  const anchor = document.createElement('a');
  anchor.href = uri;
  anchor.target = '_blank';
  anchor.download = filename;

  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
};
