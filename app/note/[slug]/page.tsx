import { getNote } from "@/lib/redis";
import dayjs from "dayjs";
import { notFound } from "next/navigation";

export const revalidate = 60;

export default async function Page({ params }: { params: { slug: string } }) {
  const notes = await getNote(params.slug);
  console.log(notes, "notes");

  return (
    <div className="px-10 py-10">
      <h1 className="text-3xl">{notes.title}</h1>
      <div
        className="my-8"
        dangerouslySetInnerHTML={{ __html: notes.content }}
      />
      <div className="float-end">
        {dayjs(notes.updateTime).format("YYYY-MM-DD HH:mm:ss")}
      </div>
    </div>
  );
}
