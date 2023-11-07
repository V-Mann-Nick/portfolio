import { renderToFile } from '@react-pdf/renderer'

import { getDirName } from './common/utils'
import coverLetterExample from './content/cover-letter-example'
import {
  CoverLetter,
  coverLetterSchema,
} from './templates/cover-letter/cover-letter'

const DIR_NAME = getDirName(import.meta.url)
const DIST_FOLDER = `${DIR_NAME}/../dist`

try {
  coverLetterSchema.parse(coverLetterExample)
  await renderToFile(
    <CoverLetter {...coverLetterExample} />,
    `${DIST_FOLDER}/cover-letter-example.pdf`
  )
} catch (error) {
  console.error(error)
}
