import express from 'express'
import axios from 'axios'
import fs from 'fs'

const randomRouter = express.Router()

randomRouter.get('/api/random', async (req, res, next) => {
  try {
    const response = await axios.get('https://dog.ceo/api/breeds/image/random')
    const image = await axios.get(response.data.message, {
      responseType: 'arraybuffer',
    })
    const filename =
      new Date().getTime() + `.${image.config.url.split('.').pop()}`
    const imageTemp = `storage/${filename}`

    fs.writeFileSync(imageTemp, image.data)

    return res.download(imageTemp, (err) => {
      if (!err) {
        fs.unlinkSync(imageTemp)
      }
    })
  } catch (error) {
    next(error)
  }
})

export default randomRouter
