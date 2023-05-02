import { MouseEventHandler, useEffect, useState } from "react";
import ModalAddTodo from "@/components/ModalAddTodo";
import Navbar from "@/components/layouts/Navbar";
import { getTodos, createTodo, todoSelector, updateTodo, deleteTodo } from "../redux/features/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import ModalEditTodo from "./ModalEditTodo";
import { ShowAlert, ShowConfirm, ShowWarningAlert } from "src/util/SwetAlert";

interface TodoList {
    id: number;
    task: string;
    status: number;
    created_at: string;
    updated_at: string;
  }

const ListTodo: React.FC = () => {
    const todo = useSelector(todoSelector.selectAll);
    const dispatch: AppDispatch = useDispatch();
    const [isModalAddOpen, setIsModalAddOpen] = useState<boolean>(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(false);
    const [task, setTask] = useState<string>("");
    const [status, setStatus] = useState<number>(0);
    const [taskEdit, setTaskEdit] = useState<string>("");
    const [statusEdit, setStatusEdit] = useState<number>(0);    
    const [taskEditOld, setTaskEditOld] = useState<string>("");
    const [statusEditOld, setStatusEditOld] = useState<number>(0);
    const [id, setId] = useState<number>(0);
    const [alertAdd, setAlertAdd]= useState<boolean>(false);
    const [alertEdit, setAlertEdit]= useState<boolean>(false);

    const toggleModalAdd = (): void => {
        setAlertAdd(false);
        setIsModalAddOpen(!isModalAddOpen);
    };
    const toggleModalEdit = (): void => {
        setAlertEdit(false);
        setIsModalEditOpen(!isModalEditOpen);
    };

    const handleSave = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if(task == '' || status == 0){            
            // setAlertAdd(true);
            ShowWarningAlert('Warning', 'Values not be empty')
            setIsModalAddOpen(true);
        }else{
            await dispatch(createTodo({ task, status }));
            ShowAlert('Succes', 'Todo Created', 'success');
            setTask('');
            setStatus(0);
            setAlertAdd(false);
            setIsModalAddOpen(false);
            dispatch(getTodos());
        }
    };

    const handleShowEdit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, todo: TodoList): void => {
        setIsModalEditOpen(true);
        setId(todo.id);
        setTaskEdit(todo.task);
        setStatusEdit(todo.status);
        setTaskEditOld(todo.task);
        setStatusEditOld(todo.status);
      }
      
    const handleSaveEdit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if(taskEdit == '' || statusEdit == 0){
            setTaskEdit(taskEditOld);
            setStatusEdit(statusEditOld);
            // setAlertEdit(true);
            ShowWarningAlert('Warning', 'Values not be empty')
            setIsModalEditOpen(true);
        }else{
            await dispatch(updateTodo({id, task : taskEdit, status: statusEdit}));
            ShowAlert('Succes', 'Todo Updated', 'success');
            setTaskEdit('');
            setStatusEdit(0);
            setAlertEdit(false)
            setIsModalEditOpen(false);
            dispatch(getTodos());
        }
    };

    const confirmDelete =  async (id: number): Promise<void> =>{
        const result = await ShowConfirm('Are you sure?', 'Do you really want to delete this?', 'Yes', 'No')
        if (result.isConfirmed) {
            dispatch(deleteTodo(id))
        }
        
    }

    useEffect(()=> {
        dispatch(getTodos());
    }, [dispatch])
    // console.log(todo)
    return (
        <>
        <Navbar/>
            <div className="flex justify-center">
                <div className="bg-white shadow-md rounded mt-24">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded" onClick={toggleModalAdd}>
                        Add
                    </button>
                    <table className="text-left w-full border-collapse">
                        <thead>
                            <tr className="border-b">
                                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-r">No</th>
                                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-r">Task</th>
                                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-r">Status</th>
                                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-r">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {todo.map((todo, index) => (
                            <tr className="hover:bg-grey-lighter" key={index}>
                                <td className="py-4 px-6 border-b border-grey-light">{index + 1}</td>
                                <td className="py-4 px-6 border-b border-grey-light">{todo.task}</td>
                                <td className="py-4 px-6 border-b border-grey-light">
                                    {todo.status === 1 ? 'Todo' : todo.status === 2 ? 'Progress' : 'Finish'}
                                </td>
                                <td className="py-4 px-6 border-b border-grey-light">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded me-1" onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleShowEdit(event, todo)}
>
                                        Edit
                                    </button>
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => confirmDelete(todo.id)}>
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isModalAddOpen && 
            <ModalAddTodo 
                onCloseAdd={toggleModalAdd}
                task={task} 
                setTask={setTask} 
                status={status}
                setStatus={setStatus}
                handleSave={handleSave} 
                alertAdd={alertAdd}
            />
            }
            {isModalEditOpen &&
                <ModalEditTodo
                onCloseEdit={toggleModalEdit}
                taskEdit={taskEdit} 
                setTaskEdit={setTaskEdit} 
                statusEdit={statusEdit}
                setStatusEdit={setStatusEdit}
                handleSaveEdit={handleSaveEdit}
                alertEdit={alertEdit}
                />
            }

        </>

    );
}

export default ListTodo;