import React, { useState } from "react";
import CloseIcon from "@/components/icons/CloseIcon";

interface ModalAddProps {
  onCloseAdd: () => void;
  handleSave: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  status: number;
  setStatus: React.Dispatch<React.SetStateAction<number>>;
  alertAdd:boolean;
}
const ModalAddTodo: React.FC<ModalAddProps> = (props : ModalAddProps) => {
  const { 
    task,
    setTask,
    status,
    setStatus,
    onCloseAdd,
    handleSave,
    alertAdd
  } = props;

  return (
    <>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
        <div className="bg-white rounded shadow-lg p-4 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Add Todo</h2>
            <button onClick={onCloseAdd}>
              <CloseIcon />
            </button>
          </div>
          {alertAdd &&
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              <span className="font-medium">Values not be empty</span>
            </div>
          }

          <form onSubmit={handleSave}>
            <label className="block font-medium mb-2">
              Task
            </label>
            <input
              type="text"
              placeholder="New Task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <label className="block font-medium mb-2">
              Status
            </label>
            <select
              id="newTodoPriority"
              value={status}
              onChange={(e) => setStatus(parseInt(e.target.value))}
              className="w-full p-2 border rounded"
            >
              <option value="">Select</option>
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

export default ModalAddTodo