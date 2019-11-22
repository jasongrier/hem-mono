import resemble from 'resemblejs'

// TODO: Make it its own helper
function readAsDataURL(blob: Blob): Promise<string> {
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

// TODO: Make it its own helper
function diffImagesAsDataUrls(a: string, b: string): Promise<number> {
  return new Promise((resolve) => {
    resemble(a)
      .compareTo(b)
      .onComplete(function(data) {
        console.log(data.misMatchPercentage)
        resolve(data.misMatchPercentage)
      })
  })
}

// TODO: Make it its own helper
export function findMiddleFrame(frames: string[]) {
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
