"use client";
import { deleteNote, saveNote } from "@/app/actions";

import DeleteBtn from "@/components/DeleteBtn";
import SaveBtn from "@/components/SaveBtn";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, memo, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import NotePreview from "./NotePreview";
import { Input } from "./ui/input";
const initialState: any = {
  message: null,
};
const NoteEditor: FC<{
  noteId: string | null;
  initialTitle?: string | null;
  initialBody?: string | null;
}> = ({ noteId, initialTitle, initialBody }) => {
  const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });
  const [saveState, saveFormAction] = useFormState(saveNote, initialState);
  const [delState, delFormAction] = useFormState(deleteNote, initialState);

  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);

  const isDraft = !noteId;
  useEffect(() => {
    if (saveState.errors) {
      // 处理错误
      console.log(saveState.errors);
    }
  }, [saveState]);

  return (
    <div className="NoteEditor">
      <form className="note-editor-form space-y-8" autoComplete="off">
        <input type="hidden" name="noteId" value={noteId ?? ""} />
        <div className="note-editor-menu" role="menubar">
          <SaveBtn formAction={saveFormAction} />
          <DeleteBtn isDraft={isDraft} formAction={delFormAction} />
        </div>
        <div className="note-editor-menu">
          {saveState?.message}
          {saveState.errors && saveState.errors[0].message}
        </div>
        <Label htmlFor="note-title-input">请输入标题</Label>
        <Input
          id="note-title-input"
          type="text"
          name="title"
          value={title ?? ""}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <Label htmlFor="note-body-input">请输入内容</Label>
        <Textarea
          placeholder="请输入内容"
          name="body"
          value={body ?? ""}
          id="note-body-input"
          onChange={(e) => setBody(e.target.value)}
        />
      </form>
      <div className="note-editor-preview">
        <Card>
          <CardHeader>
            <CardTitle>内容预览 - 标题：{title}</CardTitle>
            {/* <CardDescription>
              {dayjs().format("YYYY-MM-DD HH:mm:ss")}
            </CardDescription> */}
          </CardHeader>
          <CardContent>
            <NotePreview>{body}</NotePreview>
          </CardContent>
          {/* <CardFooter>
            <p>{dayjs().format("YYYY-MM-DD HH:mm:ss")}</p>
          </CardFooter> */}
        </Card>
      </div>
    </div>
  );
};

export default memo(NoteEditor);
