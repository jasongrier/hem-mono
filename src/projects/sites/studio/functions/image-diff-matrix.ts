import resemble from 'resemblejs'

function readAsDataURL(blob: Blob): Promise<string> { // TODO: Make it its own helper
  const temporaryFileReader = new FileReader()

  return new Promise((resolve, reject) => {
    temporaryFileReader.onerror = (err) => {
      temporaryFileReader.abort()
      reject(err)
    }

    temporaryFileReader.onload = () => {
      resolve(temporaryFileReader.result as string)
    }

    temporaryFileReader.readAsDataURL(blob)
  })
}

function diffImagesAsDataUrls(a: string, b: string): Promise<number> { // TODO: Make it its own helper
  return new Promise((resolve) => {
    resemble(a)
      .compareTo(b)
      .onComplete(function(data) {
        console.log(data.misMatchPercentage)
        resolve(data.misMatchPercentage)
      })
  })
}

export function findMiddleFrame(frames: string[]) { // TODO: Make it its own helper
  return Math.floor((frames.length - 1) / 2)
}

async function imageDiffMatrix(images: string[]) {
  let filesAsDataUrls: string[] = []

  for (const src of images) {
    try {
      const res = await window.fetch(src)
      const blob = await res.blob()
      const dataUrl = await readAsDataURL(blob)
      filesAsDataUrls.push(dataUrl)
    }

    catch(err) {
      console.log(err)
    }
  }

  const origin = filesAsDataUrls[findMiddleFrame(filesAsDataUrls)]
  const distances: number[] = []

  for (var image of filesAsDataUrls) {
    distances.push(await diffImagesAsDataUrls(origin, image))
  }

  return distances
}

export default imageDiffMatrix
