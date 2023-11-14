import { renderToFile } from '@react-pdf/renderer'

import {
  CoverLetter,
  coverLetterSchema,
} from './templates/cover-letter/cover-letter'

const contentFile = `${process.cwd()}/${process.argv[2]}`
const outputPath = process.argv[3]

console.log(`Building cover letter from ${contentFile} to ${outputPath}`)

try {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const content = (await import(contentFile)).default as unknown
  await renderToFile(
    <CoverLetter {...coverLetterSchema.parse(content)} />,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    outputPath!
  )
} catch (error) {
  console.error(error)
}
