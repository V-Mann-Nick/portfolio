import { Image, View } from "@react-pdf/renderer";
import { z } from "zod";

import { useConfig } from "./config.ts";
import { Triangle } from "./triangle.tsx";

export const headerSchema = z.object({
  picture: z.string(),
  title: z.string(),
  subtitle: z.string(),
});

type HeaderProps = z.infer<typeof headerSchema>;

export const Header: React.FunctionComponent<HeaderProps> = ({
  picture,
  title,
  subtitle,
}) => {
  const { spacing, colors, typography } = useConfig();
  return (
    <View
      style={{
        paddingTop: `${spacing.pagePaddingTop}mm`,
        paddingBottom: `${spacing.headerPaddingBottom}mm`,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        color: colors.light.text,
      }}
    >
      <Triangle
        position="top-left"
        style={{ position: "absolute", top: 0, left: 0, width: "65vw" }}
        color={colors.dark.accent}
      />
      <Image
        cache={false}
        src={picture}
        style={{
          height: `${spacing.imageHeight}mm`,
          width: `${spacing.imageWidth}mm`,
          borderRadius: 100,
          objectFit: "cover",
          marginLeft: `${spacing.imageMarginLeft}mm`,
          marginRight: `${spacing.imageMarginRight}mm`,
        }}
      />
      <View>
        <typography.H1>{title}</typography.H1>
        <typography.H2 style={{ color: colors.light.accent }}>
          {subtitle}
        </typography.H2>
      </View>
    </View>
  );
};
