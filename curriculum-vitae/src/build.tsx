import { renderToFile } from "@react-pdf/renderer";
import { InvalidArgumentError, Option, program } from "commander";
import fs from "node:fs";
import {
  CoverLetter,
  coverLetterSchema,
} from "./templates/cover-letter/cover-letter.tsx";
import {
  CurriculumVitae,
  curriculumVitaeSchema,
} from "./templates/cv/index.ts";
import process from "node:process";

program
  .name("build")
  .description("Build PDF document")
  .addOption(
    new Option("-t, --template <template>", "template to use")
      .choices(["cv", "cover-letter"])
      .makeOptionMandatory(true),
  )
  .addOption(
    new Option("-c, --content <path>", "path to content file")
      .argParser((path) => {
        const fullPath = `${process.cwd()}/${path}`;
        if (!fs.existsSync(fullPath)) {
          throw new InvalidArgumentError("File does not exist");
        }
        return fullPath;
      })
      .makeOptionMandatory(true),
  )
  .addOption(
    new Option("-o, --output <path>", "path to output file")
      .argParser((path) => `${process.cwd()}/${path}`)
      .makeOptionMandatory(true),
  );

program.parse();

const {
  template,
  content: contentPath,
  output: outputPath,
} = program.opts<{
  template: "cv" | "cover-letter";
  content: string;
  output: string;
}>();

const TemplateComponent = template === "cv" ? CurriculumVitae : CoverLetter;
const schema = template === "cv" ? curriculumVitaeSchema : coverLetterSchema;

try {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const content = (await import(contentPath)).default as unknown;
  await renderToFile(
    // @ts-expect-error Type check are present
    <TemplateComponent {...schema.parse(content)} />,
    outputPath,
  );
} catch (error) {
  console.error(error);
}
