const functions = require('firebase-functions')
const admin = require('firebase-admin')
const cors = require('cors')({ origin: true })
const fs = require('fs')
const uuid = require('uuid-v4')
const { Storage } = require('@google-cloud/storage')

const storage = new Storage({
  projectId: 'lambe-b6c2d',
  keyFilename: 'lambe-key.json',
})

admin.initializeApp()
const rootRef = admin.database().ref('/presidente')

exports.startGame = functions.https.onCall((data, context) => {
  const { roomKey } = data
  const now = new Date().getTime()

  rootRef.child(`/rooms/${roomKey}`).update({ startedAt: now })
  return {
    startedAt: now,
  }
})

// ignore this function
exports.uploadImage = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    try {
      const tmpImagePath = '/tmp/imageToSave.jpg'
      fs.writeFileSync(tmpImagePath, request.body.image, 'base64')

      const bucket = storage.bucket('lambe-b6c2d.appspot.com')
      const id = uuid()
      bucket.upload(
        tmpImagePath,
        {
          uploadType: 'media',
          destination: `/post/${id}.jpg`,
          metadata: {
            metadata: {
              contentType: 'image/jpeg',
              firebaseStorageDownloadTokens: id,
            },
          },
        },
        (error, file) => {
          if (error) {
            console.error(error)
            return response.status(500).json({ error })
          }

          const filename = encodeURIComponent(file.name)
          const imageUrl =
            'https://firebasestorage.googleapis.com/v0/b/' +
            `${bucket.name}/o/${filename}?alt=media&token=${id}`

          return response.status(201).json({ imageUrl })
        }
      )
    } catch (error) {
      console.error(error)
      return response.status(500).json({ error })
    }
  })
})
