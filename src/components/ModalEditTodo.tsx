import { useState } from "react";
import CloseIcon from "@/components/icons/CloseIcon";

interface ModalEditProps {
  onCloseEdit: () => void;
  handleSaveEdit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  taskEdit: string;
  setTaskEdit: React.Dispatch<React.SetStateAction<string>>;
  statusEdit: number;
  setStatusEdit: React.Dispatch<React.SetStateAction<number>>;
  alertEdit: boolean;
}
const ModalEditTodo: React.FC<ModalEditProps> = (props : ModalEditProps) => {
  const { 
    taskEdit,
    setTaskEdit,
    statusEdit,
    setStatusEdit,
    onCloseEdit,
    handleSaveEdit,
    alertEdit
  } = props;

  return (
    <>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
        <div className="bg-white rounded shadow-lg p-4 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Edit Todo</h2>
            <button onClick={onCloseEdit}>
              <CloseIcon />
            </button>
          </div>
          {alertEdit &&
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              <span className="font-medium">Values not be empty</span>
            </div>
          }
          <form onSubmit={handleSaveEdit}>
            <label className="block font-medium mb-2">
              Task
            </label>
            <input
              type="text"
              placeholder="New Task"
              value={taskEdit}
              onChange={(e) => setTaskEdit(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <label className="block font-medium mb-2">
              Status
            </label>
            <select
              id="newTodoPriority"
              value={statusEdit}
              onChange={(e) => setStatusEdit(parseInt(e.target.value))}
              className="w-full p-2 border rounded"
            >
              <option value="1">Todo</option>
              <option value="2">Progress</option>
              <option value="3">Finish</option>
            </select>

            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded mt-4">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default ModalEditTodo