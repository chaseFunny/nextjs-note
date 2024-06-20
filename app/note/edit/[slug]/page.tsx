import NoteEditor from "@/components/NoteEditor";
import { getNote } from "@/lib/prisma";
import { extractAndConcatenateText, sleep } from "@/lib/utils";

export default async function EditPage({
  params,
}: {
  params: { slug: string };
}) {
  const noteId = params.slug;
  const note = await getNote(noteId);

  await sleep(2000);

  if (note === null) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">点击一个笔记进行编辑</span>
      </div>
    );
  }

  return (
    <NoteEditor
      noteId={noteId}
      initialTitle={note.title}
      initialBody={extractAndConcatenateText(note.content)}
    />
  );
}
