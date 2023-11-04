import { renderToFile } from '@react-pdf/renderer'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { CurriculumVitae } from '../src/curriculum-vitae'

const DIR_NAME = path.dirname(fileURLToPath(import.meta.url))
const DIST_FOLDER = `${DIR_NAME}/../dist`

await renderToFile(<CurriculumVitae />, `${DIST_FOLDER}/cv.pdf`)
