import { NextResponse, type NextRequest } from "next/server";
import OpenAI from "openai";
import { slugify } from "~/lib/slugify";
import { db } from "~/server/db";

const getMdUrl = (url: string) => `https://r.jina.ai/${url}`;

const getWalkCollection = async (md: string) => {
  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  const response = await openai.chat.completions.create({
    model: "openai/gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "I will provide you with data about a collection of walks. Included in this data are the individual walks. Return information about these individual walks.",
      },
      {
        role: "user",
        content: md,
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "walks",
        strict: true,
        schema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description:
                "The name of the trail that the walks are part of. For example, 'Millenium Way' or 'The Cotswold Way'",
            },
            description: {
              type: "string",
              description:
                "A 75 word summary of the walk collection using language that is matter of fact but slightly fun that would entice the reader to want to complete the walks. Use the trail name in the summary.",
            },
            walks: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    description:
                      "The name of the individual walk. Do not include any other information such as distance",
                  },
                  url: {
                    type: "string",
                    description: "The URL of the indiviudal walk",
                  },
                },
                required: ["name", "url"],
                additionalProperties: false,
              },
            },
          },
          required: ["name", "description", "walks"],
          additionalProperties: false,
        },
      },
    },
  });

  if (response.choices[0]?.message?.content) {
    return JSON.parse(response.choices[0].message.content) as {
      name: string;
      description: string;
      walks: { name: string; url: string }[];
    };
  }

  throw new Error("Failed to retrieve walk collection data from OpenAI.");
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get("url");

  if (!url) {
    return new Response("url is required", { status: 400 });
  }

  const mdUrl = getMdUrl(url);
  const mdRes = await fetch(mdUrl);
  const md = await mdRes.text();

  const { name, description, walks } = await getWalkCollection(md);

  const collection = await db.walkCollection.create({
    data: {
      name,
      slug: slugify(name),
      description,
      url,
    },
  });

  await db.walk.createMany({
    data: walks.map(({ name, url }) => ({
      name,
      slug: slugify(name),
      url,
      collectionId: collection.id,
    })),
  });

  return NextResponse.json(collection);
}
