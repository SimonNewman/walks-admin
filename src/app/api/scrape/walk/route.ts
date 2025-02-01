import type { NextRequest } from "next/server";
import OpenAI from "openai";

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
            summary: {
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
            "summary",
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

  return response;
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

  const res = await getSingleWalk(md);

  return Response.json(JSON.parse(res.choices[0]?.message?.content));
}
