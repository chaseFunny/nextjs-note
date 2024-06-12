import { type FC, memo } from "react";
import { useFormStatus } from "react-dom";

const SaveBtn: FC<{ formAction?: (v: any) => void }> = ({ formAction }) => {
  const { pending } = useFormStatus();
  return (
    <button
      className={`note-save-btn ${pending ? "bg-red-600" : ""}`}
      formAction={formAction}
      type="submit"
      disabled={pending}
    >
      <img
        width={"20px"}
        height={"20px"}
        src="/icon/save.svg"
        alt="save"
        role="save-note"
      />
      保存
    </button>
  );
};

export default memo(SaveBtn);
