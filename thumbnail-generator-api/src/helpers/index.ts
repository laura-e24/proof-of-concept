import sharp from "sharp"
import fs from "fs";

export const resizeImage = async (width: number, height: number, path: string, name: string, outputName?: string) => {
  const newPath = `${process.cwd()}\\thumbnails\\${outputName || name}.png`;

  if (!fs.existsSync(`${process.cwd()}\\thumbnails`)) {
    fs.mkdirSync(`${process.cwd()}\\thumbnails`);
  }

  const thumbnail = await sharp(path)
  .resize(width, height, {
    fit: 'cover',
  })
  .toFile(newPath)

  return { url: newPath, thumbnail }
}