import React, { ReactElement } from 'react'
import { useParams } from 'react-router'
import { assetHostHostname } from '../../functions'

const images = [
  'IMG_1067.JPG',
  'IMG_1068.JPG',
  'IMG_1069.JPG',
  'IMG_1070.JPG',
  'IMG_1071.JPG',
  'IMG_1072.JPG',
  'IMG_1073.JPG',
  'IMG_1074.JPG',
  'IMG_1075.JPG',
  'IMG_1076.JPG',
  'IMG_1077.JPG',
  'IMG_1078.JPG',
  'IMG_1079.JPG',
  'IMG_1080.JPG',
  'IMG_1081.JPG',
  'IMG_1082.JPG',
  'IMG_1083.JPG',
  'IMG_1084.JPG',
  'IMG_1085.JPG',
  'IMG_1086.JPG',
  'IMG_1087.JPG',
  'IMG_1088.JPG',
  'IMG_1089.JPG',
  'IMG_1090.JPG',
  'IMG_1091.JPG',
  'IMG_1092.JPG',
  'IMG_1093.JPG',
  'IMG_1094.JPG',
  'IMG_1095.JPG',
  'IMG_1096.JPG',
  'IMG_1097.JPG',
  'IMG_1098.JPG',
  'IMG_1099.JPG',
  'IMG_1100.JPG',
  'IMG_1101.JPG',
  'IMG_1102.JPG',
  'IMG_1103.JPG',
  'IMG_1104.JPG',
  'IMG_1105.JPG',
  'IMG_1106.JPG',
  'IMG_1107.JPG',
  'IMG_1108.JPG',
  'IMG_1109.JPG',
  'IMG_1110.JPG',
  'IMG_1111.JPG',
  'IMG_1112.JPG',
  'IMG_1113.JPG',
  'IMG_1114.JPG',
  'IMG_1115.JPG',
  'IMG_1116.JPG',
  'IMG_1117.JPG',
  'IMG_1118.JPG',
  'IMG_1119.JPG',
  'IMG_1120.JPG',
  'IMG_1121.JPG',
  'IMG_1122.JPG',
  'IMG_1123.JPG',
  'IMG_1124.JPG',
  'IMG_1125.JPG',
]

function PrintFlipBooks(): ReactElement {

  let { page }: any = useParams()

  page = page ? parseInt(page, 10) - 1 : 0

  const pageImages = images.slice(page * 4, page * 4 + 4)

  return (
    <div className="page page-internal page-internal-print-flip-books clearfix">
      <div className="flip-book-paper">
        { pageImages.map(image => (
          <div
            key={image}
            className="flip-book-frame"
          >
            <div
              className="flip-book-frame-image"
              style={{
                backgroundImage: `url(${assetHostHostname()}/hem-rocks/flip-books/1/${image})`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default PrintFlipBooks
