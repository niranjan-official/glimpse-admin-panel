"use client";
import { MediaObject, Settings } from "@/types";
import React, { useEffect, useState } from "react";
import MediaBlock from "./MediaBlock";

type FilterType = "all" | "specific" | "single";

interface MediaListProps {
  media?: MediaObject[];
  settings?: Settings;
}

const MediaList = ({ media, settings }: MediaListProps) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [filteredMedia, setFilteredMedia] = useState(media);

  useEffect(() => {
    let newMedia = media;

    if (activeFilter === "single" && settings?.singleMediaStore) {
      newMedia = newMedia?.filter(
        (media) => media.key === settings.singleMediaStore,
      );
    } else if (activeFilter === "specific" && settings?.multiMediaStore) {
      newMedia = newMedia?.filter((media) =>
        settings.multiMediaStore.includes(media.key),
      );
    }

    setFilteredMedia(newMedia);
  }, [activeFilter, media, settings]);

  return (
    <div className="flex flex-col">
      <h3 className="mb-2 mt-4 text-2xl">Media Gallery</h3>
      <div className="flex gap-4">
        <button
          onClick={() => setActiveFilter("all")}
          className={`rounded-2xl p-2 px-5 text-sm font-semibold shadow ${activeFilter === "all" ? "bg-primary-red text-white" : "bg-neutral-200 text-neutral-800"}`}
        >
          All
        </button>
        <button
          onClick={() => setActiveFilter("specific")}
          className={`rounded-2xl p-2 px-5 text-sm font-semibold shadow ${activeFilter === "specific" ? "bg-primary-red text-white" : "bg-neutral-200 text-neutral-800"}`}
        >
          Specific
        </button>
        <button
          onClick={() => setActiveFilter("single")}
          className={`rounded-2xl p-2 px-5 text-sm font-semibold shadow ${activeFilter === "single" ? "bg-primary-red text-white" : "bg-neutral-200 text-neutral-800"}`}
        >
          Single
        </button>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 bg-white p-2 shadow">
        {
          !filteredMedia[0] ? (
            <p className="text-3xl font-extrabold text-neutral-300 text-center ">No Images</p>
          ):(
        filteredMedia.map((media, index) => (
          <MediaBlock key={index} src={media.imgSrc} />
        ))
          )
        }
      </div>
    </div>
  );
};

export default MediaList;
