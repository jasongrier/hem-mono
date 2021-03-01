import React, { ReactElement, SyntheticEvent, useEffect, useState } from 'react'
import { assetHostHostname } from '../../functions'

// const images = [
//   'IMG_1067.JPG',
//   'IMG_1068.JPG',
//   'IMG_1069.JPG',
//   'IMG_1070.JPG',
//   'IMG_1071.JPG',
//   'IMG_1072.JPG',
//   'IMG_1073.JPG',
//   'IMG_1074.JPG',
//   'IMG_1075.JPG',
//   'IMG_1076.JPG',
//   'IMG_1077.JPG',
//   'IMG_1078.JPG',
//   'IMG_1079.JPG',
//   'IMG_1080.JPG',
//   'IMG_1081.JPG',
//   'IMG_1082.JPG',
//   'IMG_1083.JPG',
//   'IMG_1084.JPG',
//   'IMG_1085.JPG',
//   'IMG_1086.JPG',
//   'IMG_1087.JPG',
//   'IMG_1088.JPG',
//   'IMG_1089.JPG',
//   'IMG_1090.JPG',
//   'IMG_1091.JPG',
//   'IMG_1092.JPG',
//   'IMG_1093.JPG',
//   'IMG_1094.JPG',
//   'IMG_1095.JPG',
//   'IMG_1096.JPG',
//   'IMG_1097.JPG',
//   'IMG_1098.JPG',
//   'IMG_1099.JPG',
//   'IMG_1100.JPG',
//   'IMG_1101.JPG',
//   'IMG_1102.JPG',
//   'IMG_1103.JPG',
//   'IMG_1104.JPG',
//   'IMG_1105.JPG',
//   'IMG_1106.JPG',
//   'IMG_1107.JPG',
//   'IMG_1108.JPG',
//   'IMG_1109.JPG',
//   'IMG_1110.JPG',
//   'IMG_1111.JPG',
//   'IMG_1112.JPG',
//   'IMG_1113.JPG',
//   'IMG_1114.JPG',
//   'IMG_1115.JPG',
//   'IMG_1116.JPG',
//   'IMG_1117.JPG',
//   'IMG_1118.JPG',
//   'IMG_1119.JPG',
//   'IMG_1120.JPG',
//   'IMG_1121.JPG',
//   'IMG_1122.JPG',
//   'IMG_1123.JPG',
//   'IMG_1124.JPG',
//   'IMG_1125.JPG',
// ]

const images = [
  'DSC_0867.JPG',
  'DSC_0868.JPG',
  'DSC_0869.JPG',
  'DSC_0870.JPG',
  'DSC_0871.JPG',
  'DSC_0872.JPG',
  'DSC_0873.JPG',
  'DSC_0874.JPG',
  'DSC_0875.JPG',
  'DSC_0876.JPG',
  'DSC_0877.JPG',
  'DSC_0878.JPG',
  'DSC_0879.JPG',
  'DSC_0880.JPG',
  'DSC_0881.JPG',
  'DSC_0882.JPG',
  'DSC_0883.JPG',
  'DSC_0884.JPG',
  'DSC_0885.JPG',
  'DSC_0886.JPG',
  'DSC_0887.JPG',
  'DSC_0888.JPG',
  'DSC_0889.JPG',
  'DSC_0890.JPG',
  'DSC_0891.JPG',
  'DSC_0892.JPG',
  'DSC_0893.JPG',
  'DSC_0894.JPG',
  'DSC_0895.JPG',
  'DSC_0896.JPG',
  'DSC_0897.JPG',
  'DSC_0898.JPG',
  'DSC_0899.JPG',
  'DSC_0900.JPG',
  'DSC_0901.JPG',
  'DSC_0902.JPG',
  'DSC_0903.JPG',
  'DSC_0904.JPG',
  'DSC_0905.JPG',
  'DSC_0906.JPG',
  'DSC_0907.JPG',
  'DSC_0908.JPG',
  'DSC_0909.JPG',
  'DSC_0910.JPG',
  'DSC_0911.JPG',
  'DSC_0912.JPG',
  'DSC_0913.JPG',
  'DSC_0914.JPG',
  'DSC_0915.JPG',
  'DSC_0916.JPG',
  'DSC_0917.JPG',
  'DSC_0918.JPG',
  'DSC_0919.JPG',
  'DSC_0920.JPG',
  'DSC_0921.JPG',
  'DSC_0922.JPG',
  'DSC_0923.JPG',
  'DSC_0924.JPG',
  'DSC_0925.JPG',
  'DSC_0926.JPG',
  'DSC_0927.JPG',
  'DSC_0928.JPG',
  'DSC_0929.JPG',
  'DSC_0930.JPG',
  'DSC_0931.JPG',
  'DSC_0932.JPG',
  'DSC_0933.JPG',
  'DSC_0934.JPG',
  'DSC_0935.JPG',
  'DSC_0936.JPG',
  'DSC_0937.JPG',
  'DSC_0938.JPG',
  'DSC_0939.JPG',
  'DSC_0940.JPG',
  'DSC_0941.JPG',
  'DSC_0942.JPG',
  'DSC_0943.JPG',
  'DSC_0944.JPG',
  'DSC_0945.JPG',
  'DSC_0946.JPG',
  'DSC_0947.JPG',
  'DSC_0948.JPG',
  'DSC_0949.JPG',
  'DSC_0950.JPG',
  'DSC_0951.JPG',
  'DSC_0952.JPG',
  'DSC_0953.JPG',
  'DSC_0954.JPG',
  'DSC_0955.JPG',
  'DSC_0956.JPG',
  'DSC_0957.JPG',
  'DSC_0958.JPG',
  'DSC_0959.JPG',
  'DSC_0960.JPG',
  'DSC_0961.JPG',
  'DSC_0962.JPG',
  'DSC_0963.JPG',
  'DSC_0964.JPG',
  'DSC_0965.JPG',
  'DSC_0966.JPG',
  'DSC_0967.JPG',
  'DSC_0968.JPG',
  'DSC_0969.JPG',
  'DSC_0970.JPG',
  'DSC_0971.JPG',
  'DSC_0972.JPG',
  'DSC_0973.JPG',
  'DSC_0974.JPG',
  'DSC_0975.JPG',
  'DSC_0976.JPG',
  'DSC_0977.JPG',
  'DSC_0978.JPG',
  'DSC_0979.JPG',
  'DSC_0980.JPG',
  'DSC_0981.JPG',
  'DSC_0982.JPG',
  'DSC_0983.JPG',
  'DSC_0984.JPG',
  'DSC_0985.JPG',
  'DSC_0986.JPG',
  'DSC_0987.JPG',
  'DSC_0988.JPG',
  'DSC_0989.JPG',
]

function PrintFlipBooks(): ReactElement {
  const [page, setPage] = useState<number>(1)

  useEffect(function captureKeys() {
    function handleKeyDown(evt: any) {
      if (evt.keyCode === 32) {
        setPage(page + 1)
      }
    }

    document.body.addEventListener('keydown', handleKeyDown)

    return function cleanup() {
      document.body.removeEventListener('keydown', handleKeyDown)
    }
  }, [page])

  const slicePoint = page ? page - 1 : 0
  const pageImages = images.slice(slicePoint * 4, slicePoint * 4 + 4)

  return (
    <div className="page page-internal page-internal-print-flip-books clearfix">
      <div className="flip-book-paper">
        { pageImages.map(image => (
          <div
            key={image}
            className="flip-book-frame"
          >
            <img
              className="flip-book-frame-image"
              src={`${assetHostHostname()}/hem-rocks/flip-books/2/${image}`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default PrintFlipBooks
