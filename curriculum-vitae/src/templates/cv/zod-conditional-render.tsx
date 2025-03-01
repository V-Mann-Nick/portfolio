import type z from "zod";

type ZodConditionalRenderProps<TValue, TSchema, TOther> = {
  schema: z.ZodType<TSchema>;
  value: TValue;
  children: (value: TSchema) => React.ReactNode;
  fallback: (value: TOther) => React.ReactNode;
};

export const ZodConditionalRender = <
  TValue,
  TSchema,
  TOther extends Exclude<TValue, TSchema>,
>({
  schema,
  value,
  children,
  fallback,
}: ZodConditionalRenderProps<TValue, TSchema, TOther>) => {
  try {
    const assertedValue = schema.parse(value);
    return children(assertedValue);
  } catch (_err) {
    return fallback(value as unknown as TOther);
  }
};
