import { renderToFile } from "@react-pdf/renderer";

import {
  CurriculumVitae,
  curriculumVitaeSchema,
} from "./templates/cv/index.ts";
import process from "node:process";

const contentFile = `${process.cwd()}/${process.argv[2]}`;
const outputPath = process.argv[3];

console.log(`Building cv from ${contentFile} to ${outputPath}`);

try {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const content = (await import(contentFile)).default as unknown;
  await renderToFile(
    <CurriculumVitae {...curriculumVitaeSchema.parse(content)} />,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    outputPath!,
  );
} catch (error) {
  console.error(error);
}
