import { View } from "@react-pdf/renderer";
import { z } from "zod";

import { FaIcon } from "../../common/fa-icon.tsx";
import {
  type ContactInfoProps,
  type ContactProps,
  contactSchema,
} from "../../common/types.ts";
import { useConfig } from "./config.ts";

const ContactInfo: React.FunctionComponent<ContactInfoProps> = ({
  icon,
  text,
  href,
}) => {
  const { spacing, colors, typography } = useConfig();
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: `${spacing.contactItemGap}mm`,
      }}
    >
      <View
        style={{
          width: "6mm",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FaIcon {...icon} color={colors.dark.accent} />
      </View>
      <typography.Text
        as={href ? "link" : "text"}
        src={href}
        style={{ color: colors.dark.text, textDecoration: "none" }}
      >
        {text}
      </typography.Text>
    </View>
  );
};

export const Contact: React.FunctionComponent<ContactProps> = ({
  contactInfo,
}) => {
  const { spacing } = useConfig();
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        gap: `${spacing.contactGap}mm`,
        paddingRight: `${spacing.pagePaddingX}mm`,
      }}
    >
      {contactInfo.map((info, idx) => <ContactInfo key={idx} {...info} />)}
    </View>
  );
};

const receiverSchema = z.object({
  name: z.string(),
  addressLines: z.array(z.string()).optional(),
});

type ReceiverProps = z.infer<typeof receiverSchema>;

export const Receiver: React.FunctionComponent<ReceiverProps> = ({
  name,
  addressLines,
}) => {
  const { typography, colors, spacing } = useConfig();
  return (
    <View>
      <typography.KeyTitle
        style={{
          color: colors.dark.accent,
          marginBottom: `${spacing.receiverHeadingMarginBottom}mm`,
        }}
      >
        Recipient
      </typography.KeyTitle>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: `${spacing.receiverGap}mm`,
        }}
      >
        <typography.H2>{name}</typography.H2>
        {addressLines?.map((line, idx) => (
          <typography.Text key={idx}>{line}</typography.Text>
        ))}
      </View>
    </View>
  );
};

export const headerSchema = z.object({
  name: z.string(),
  receiver: receiverSchema,
  contact: contactSchema,
});

type HeaderProps = z.infer<typeof headerSchema>;

export const Header: React.FunctionComponent<HeaderProps> = ({
  name,
  contact,
  receiver,
}) => {
  const { typography, spacing, colors } = useConfig();
  return (
    <View
      style={{
        paddingTop: `${spacing.pagePaddingY}mm`,
        paddingLeft: `${spacing.pagePaddingX}mm`,
        backgroundColor: colors.dark.background,
        color: colors.dark.text,
      }}
    >
      <View
        style={{
          borderBottomColor: colors.dark.accent,
          borderBottomWidth: "0.2mm",
          paddingBottom: `${spacing.headingPaddingBottom}mm`,
        }}
      >
        <typography.H1>{name}</typography.H1>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBottom: `${spacing.receiverAndContactPaddingY}mm`,
          paddingTop: `${spacing.receiverAndContactPaddingY}mm`,
        }}
      >
        <Receiver {...receiver} />
        <Contact {...contact} />
      </View>
    </View>
  );
};
