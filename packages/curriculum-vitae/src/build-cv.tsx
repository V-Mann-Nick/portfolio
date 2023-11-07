import { renderToFile } from '@react-pdf/renderer'

import { getDirName } from './common/utils'
import cvEn from './content/cv-en'
import { CurriculumVitae, curriculumVitaeSchema } from './templates/cv'

const DIR_NAME = getDirName(import.meta.url)
const DIST_FOLDER = `${DIR_NAME}/../dist`

try {
  curriculumVitaeSchema.parse(cvEn)
  await renderToFile(<CurriculumVitae {...cvEn} />, `${DIST_FOLDER}/cv.pdf`)
} catch (error) {
  console.error(error)
}
