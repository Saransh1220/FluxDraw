import { FaUndo, FaRedo } from 'react-icons/fa';

const Undo = ({ onUndo, onRedo }) => {
  return (
    <div className="flex gap-2 absolute right-4 bottom-4">
      <button className="bg-zinc-700 p-4 rounded-full" onClick={onUndo}>
        <FaUndo />
      </button>
      <button className="bg-zinc-700 p-4 rounded-full" onClick={onRedo}>
        <FaRedo />
      </button>
    </div>
  );
};

export default Undo;
