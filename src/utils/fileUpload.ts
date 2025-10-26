export const handleFileUpload = (
  file: File,
  maxSize: number,
  onSuccess: (data: string) => void
): void => {
  if (file.size > maxSize) {
    alert(`Arquivo muito grande! Máximo ${maxSize / 1024 / 1024}MB.`);
    return;
  }

  const reader = new FileReader();
  reader.onloadend = () => {
    onSuccess(reader.result as string);
  };
  reader.readAsDataURL(file);
};