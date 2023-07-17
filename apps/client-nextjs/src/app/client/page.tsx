"use client";

import { api } from "@/utils/api";

export default function Home() {
  const { data: apps } = api.app.getAll.useQuery();
  return (
    <div>
      My insalled apps
      <br />
      {apps?.map((app, i) => (
        <p key={i}>{app.name}</p>
      ))}
    </div>
  );
}
