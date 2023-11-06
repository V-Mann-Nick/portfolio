import { renderToFile } from '@react-pdf/renderer'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import en from './content/en'
import {
  CurriculumVitae,
  curriculumVitaeSchema,
} from './template/curriculum-vitae'

const DIR_NAME = path.dirname(fileURLToPath(import.meta.url))
const DIST_FOLDER = `${DIR_NAME}/../dist`

try {
  curriculumVitaeSchema.parse(en)
  await renderToFile(<CurriculumVitae {...en} />, `${DIST_FOLDER}/cv.pdf`)
} catch (error) {
  console.error(error)
}
