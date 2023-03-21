import { resizeImage } from "../helpers";

export const thumbnailGenerator = async (req, res) => {
  const { img: { name, size, tempFilePath } } = req.files;
  const fileExt = name.slice(name.indexOf("."));
  const imgName = name.slice(0, name.indexOf("."));

  try {
    if (size > 11000000) throw new Error('File size must not exceed 11MB.');
    if (fileExt !== ".png" && fileExt !== ".jpeg") throw new Error('File extension must be either PNG or JPEG.');

    const thumbnailsURLs = []
    const thumbnailsData = [
      { width: 400, height: 300, name: `${imgName}-lg` },
      { width: 160, height: 120, name: `${imgName}-md` },
      { width: 120, height: 120, name: `${imgName}-sm` },
    ]

    for (let i = 0; i < thumbnailsData.length; i++) {
      let generatedThumbnailURL = (await resizeImage(
        thumbnailsData[i].width, 
        thumbnailsData[i].height, 
        tempFilePath, 
        imgName, 
        thumbnailsData[i].name
        )).url

        thumbnailsURLs.push(generatedThumbnailURL)
    }


    // OPCIÓN 1: Enviar elementos HTML con la imagen nueva
      // res.setHeader('Content-type','text/html')
      // .send(`<img src="${process.cwd()}/thumbnails/${img.name}" />`);
      
    // OPCIÓN 2: Enviar las URLs de dónde se almacenaron las imágenes
    res.status(200).json(thumbnailsURLs)
	} catch (error) {
    const status = error.message.includes("File size") ? 400 
    : error.message.includes("File extension") ? 415
    : 500
		res.status(status).json(error.message) 
	}
}