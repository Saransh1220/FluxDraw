import { FaUndo, FaRedo } from 'react-icons/fa';

const Undo = ({ onUndo, onRedo }) => {
  return (
    <div className="flex gap-2 absolute right-4 bottom-4">
      <button className="bg-zinc-700 p-3 rounded-full" onClick={onUndo}>
        <FaUndo className='text-sm'/>
      </button>
      <button className="bg-zinc-700 p-3 rounded-full" onClick={onRedo}>
        <FaRedo className='text-sm'/>
      </button>
    </div>
  );
};

export default Undo;
