import NoteEditBtn from "@/components/NoteEditBtn";
import NotePreview from "@/components/NotePreview";
import { getNote } from "@/lib/prisma";
import { extractAndConcatenateText } from "@/lib/utils";
import dayjs from "dayjs";

export const revalidate = 60;

export default async function Page({ params }: { params: { slug: string } }) {
  const notes = await getNote(params.slug);
  console.log(notes, "notes");

  return (
    <div className="px-10 py-10">
      <h1 className="text-3xl">{notes.title}</h1>
      {params.slug && (
        <div className="flex justify-end items-center w-full">
          <NoteEditBtn noteId={params.slug} />
        </div>
      )}
      <NotePreview>{extractAndConcatenateText(notes.content)}</NotePreview>
      <div className="float-end">
        {dayjs(notes.updateTime).format("YYYY-MM-DD HH:mm:ss")}
      </div>
    </div>
  );
}
