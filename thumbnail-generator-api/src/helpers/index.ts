import sharp from "sharp"

export const resizeImage = async (width: number, height: number, path: string, name: string, outputName?: string) => {
  const newPath = `${process.cwd()}\\thumbnails\\${outputName || name}.png`;
  const thumbnail = await sharp(path)
  .resize(width, height, {
    fit: 'cover',
  })
  .toFile(newPath)

  return { url: newPath, thumbnail }
}