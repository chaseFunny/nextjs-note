import { type FC, memo } from "react";
import { useFormStatus } from "react-dom";

const DeleteBtn: FC<{ isDraft?: boolean; formAction?: (v: any) => void }> = ({
  isDraft,
  formAction,
}) => {
  const { pending } = useFormStatus();
  return (
    !isDraft && (
      <button
        className="note-editor-delete"
        disabled={pending}
        formAction={formAction}
        role="menuitem"
      >
        <img
          src="/icon/delete.svg"
          width="20px"
          height="20px"
          alt="delete"
          role="presentation"
        />
        删除
      </button>
    )
  );
};

export default memo(DeleteBtn);
