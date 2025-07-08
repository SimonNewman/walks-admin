import { NextResponse, type NextRequest } from "next/server";
import OpenAI from "openai";
import { db } from "~/server/db";
import { api } from "~/trpc/server";

const getMdUrl = (url: string) => `https://r.jina.ai/${url}`;

const getSingleWalk = async (md: string) => {
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
          "I will provide you with data about a walk. Evaluate and return the data in the correct JSON format.",
      },
      {
        role: "user",
        content: md,
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "walk",
        strict: true,
        schema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "The name of the walk",
            },
            description: {
              type: "string",
              description:
                "A 75-100 word summary of the walk using language that is matter of fact but slightly fun that would entice the reader to want to complete the walk. Use the walk name in the summary. It could include the location of the walk, the type of terrain, and any interesting features, sites and points of interest.",
            },
            parking: {
              type: ["string", "null"],
              description:
                "The parking location for the walk. Return null if not stated",
            },
            osMap: {
              type: ["string", "null"],
              description:
                "The names of available maps that include the location of the walk. These are normally OSMaps or Landranger maps. Separate by commas. Return null if not stated",
            },
            distance: {
              type: ["number", "null"],
              description:
                "The distance of the walk in miles. If Km is used, convert to miles. Return to 1 decimal place if available. Return null if not stated",
            },
            time: {
              type: ["number", "null"],
              description:
                "How long the walk takes to complete. Return null if not stated",
            },
            stiles: {
              type: ["number", "null"],
              description: "How many stiles. Return null if not stated",
            },
            gpx: {
              type: ["string", "null"],
              description:
                "A URL link to the GPX file for the walk (only return a value if the link is to a .gpx file). Return null if not stated",
            },
          },
          required: [
            "name",
            "description",
            "distance",
            "parking",
            "osMap",
            "time",
            "stiles",
            "gpx",
          ],
          additionalProperties: false,
        },
      },
    },
  });

  if (response.choices[0]?.message?.content) {
    return JSON.parse(response.choices[0].message.content) as {
      name: string;
      description: string;
      distance?: number;
      parking?: string;
      osMap?: string;
      time?: number;
      stiles?: number;
      gpx?: string;
    };
  }

  throw new Error("Failed to retrieve walk data from OpenAI.");
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = Number(searchParams.get("id"));

  if (!id) {
    return new Response("id is required", { status: 400 });
  }

  const walk = await api.walk.getById(id);

  if (!walk) {
    return new Response("Walk not found", { status: 400 });
  }

  const mdUrl = getMdUrl(walk.url);
  const mdRes = await fetch(mdUrl);
  const md = await mdRes.text();

  const walkJson = await getSingleWalk(md);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { name, ...walkData } = walkJson;

  const updatedWalk = await db.walk.update({
    where: {
      id,
    },
    data: {
      ...walkData,
    },
  });

  return NextResponse.json(updatedWalk);
}
