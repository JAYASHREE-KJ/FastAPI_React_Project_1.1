export const validate = (schema, data) => {
  const result = schema.safeParse(data);

  if (!result.success) {
    console.error("Zod error:", result.error);
    throw new Error("Invalid API response");
  }

  return result.data;
};