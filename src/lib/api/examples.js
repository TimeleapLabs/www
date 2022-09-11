import dotenv from "dotenv";
import { get } from "../env";

dotenv.config();

export const getExamples = async () => {
  const { STRAPI_BASE_URL, STRAPI_API_KEY } = await get();
  const res = await fetch(
    `${STRAPI_BASE_URL}/api/examples?populate=tags,image`,
    {
      headers: {
        Authorization: `Bearer ${STRAPI_API_KEY}`,
      },
    }
  );
  const result = await res.json();
  return result.data.map((d) => ({
    id: d.id,
    ...d.attributes,
    image: `${STRAPI_BASE_URL}${d.attributes.image.data.attributes.formats.medium.url}`,
    tags: d.attributes.tags.map((t) => t.tag),
  }));
};
