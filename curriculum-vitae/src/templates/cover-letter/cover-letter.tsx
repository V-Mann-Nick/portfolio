import { Document, Page } from "@react-pdf/renderer";
import { z } from "zod";

import { documentMeta } from "../../common/types.ts";
import { ConfigProvider, configSchema, useConfig } from "./config.ts";
import { Content, contentSchema } from "./content.tsx";
import { Header, headerSchema } from "./header.tsx";

export const WithProviders: React.FunctionComponent<
  Omit<CoverLetterProps, "config">
> = ({ documentMeta, header, content }) => {
  const { fontFamily, registerFonts, spacing, colors } = useConfig();
  registerFonts();
  return (
    <Document
      title={documentMeta.title}
      author={documentMeta.author}
      subject={documentMeta.subject}
    >
      <Page
        style={{
          fontFamily,
          paddingBottom: `${spacing.pagePaddingY}mm`,
          backgroundColor: colors.light.background,
          color: colors.light.text,
        }}
      >
        <Header {...header} />
        <Content {...content} />
      </Page>
    </Document>
  );
};

export const coverLetterSchema = z.object({
  documentMeta,
  config: configSchema,
  header: headerSchema,
  content: contentSchema,
});

export type CoverLetterInput = z.input<typeof coverLetterSchema>;

export type CoverLetterProps = z.infer<typeof coverLetterSchema>;

export const CoverLetter: React.FunctionComponent<CoverLetterProps> = ({
  config,
  ...props
}) => (
  <ConfigProvider config={config}>
    <WithProviders {...props} />
  </ConfigProvider>
);
