export const expCreateExportElement = (document, content, fileName) => {
  const element = document.createElement('a');
  const file = new Blob([content], { type: 'data' });
  element.href = URL.createObjectURL(file);
  element.download = fileName;
  return element;
};

// for future expansions
export const expDummy = () => null;

export const trimFileName = fileName => {
  if (fileName.length > 80) {
    return `${fileName.slice(0, 50)}...${fileName.substr(fileName.length - 20)}`;
  }
  return fileName;
};

export const decode = data => {
  const enc = new TextDecoder('utf-8');
  return enc.decode(data);
};

export function readFile(file, isReadAsText) {
  return new Promise((resolve, reject) => {
    const obj = {};
    try {
      const fileReader = new window.FileReader();

      if (isReadAsText === true) fileReader.readAsText(file);
      else fileReader.readAsArrayBuffer(file);

      fileReader.onload = e => {
        obj.name = file.name;
        obj.result = e.target.result;

        resolve(obj);
      };

      fileReader.onerror = e => {
        reject(e.error);
      };
      fileReader.onabort = e => {
        reject(e.fileName);
      };
    } catch (error) {
      reject(error);
    }
  });
}
