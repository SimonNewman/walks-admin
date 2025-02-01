"use client";

import { useEffect, useState } from "react";

import { xml2js } from "xml-js";

import mapboxPolyline from "@mapbox/polyline";

const MapImage = ({ linear = false, file = "" }) => {
  // const mapboxPolyline = require("@mapbox/polyline")
  const [imageUrl, setImageUrl] = useState("");
  const [gpx, setGpx] = useState(file);

  useEffect(() => {
    if (!gpx) return;
    console.log(
      xml2js(gpx).elements[0].elements.find((element) => {
        return element.name === "rtept";
      }),
    );
    return;
    const data = xml2js(gpx)
      .elements[0].elements.find((element) => {
        return element.name === "trk";
      })
      .elements.find((element) => {
        return element.name === "trkseg";
      })
      .elements.map(({ attributes }) => [attributes.lat, attributes.lon]);

    const start = `${parseFloat(data[0][0])},${parseFloat(data[0][1])}`;
    const finish = `${parseFloat(data[data.length - 1][0])},${parseFloat(
      data[data.length - 1][1],
    )}`;

    const polyline = encodeURIComponent(mapboxPolyline.encode(data));

    let url = `
    https://api.jawg.io/static?size=1200x800&layer=ab2a0137-3629-4bb8-a255-7b29f3001480&format=png&access-token=uWEREKMqd4C0mbhGOp3bJU9TlflX6sdzLxNGRN7jEEchj9X4Q8qgMpK6mtQBOJ5n&path=color:166534,weight:26%7C${polyline}&path=color:4ade80,weight:13%7C${polyline}&path=color:166534,weight:40%7C${start}%7C${start}&path=color:4ade80,weight:26%7C${start}%7C${start}
`;
    if (linear) {
      url += `&path=color:166534,weight:40%7C${finish}&path=color:4ade80,weight:26%7C52.035905,-1.862557%7C${finish}`;
    }

    setImageUrl(url);
  }, [gpx]);

  const selectedFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = (e) => {
      setGpx(e.target.result);
    };
  };

  return (
    <div className="mb-8">
      <input
        type="file"
        name="gpx"
        onChange={(e) => selectedFile(e.target.files[0])}
      />
      <input type="hidden" name="image" value={imageUrl} />
      {imageUrl && gpx && (
        <img src={imageUrl} height={400} width={600} alt="" />
      )}
    </div>
  );
};

export default MapImage;
