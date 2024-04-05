import { useState } from 'react';
import { MdDelete } from "react-icons/md";
import { FaRegSquare, FaRegCircle, FaArrowRight,FaPen ,FaAngleDown } from "react-icons/fa";
import { CiText } from "react-icons/ci";
import { GoDiamond } from "react-icons/go";
import { IoRemoveOutline } from "react-icons/io5";
import { LuMousePointer2 } from "react-icons/lu";

const Navbar = ({ onClearCanvas, onColorChange, onSelectShape }) => {
  const [selectedShape, setSelectedShape] = useState('pointer'); // Default active item is 'pointer'
  const [isChildVisible, setIsChildVisible] = useState(false);
  

  const toggleChildVisibility = () => {
    setIsChildVisible(!isChildVisible);
  };

  const handleColorChange = (e) => {
    onColorChange(e.target.value);
  };

  const selectShape = (shape) => {
    setSelectedShape(shape);
    onSelectShape(shape);
  };



  return (
    <nav className="absolute top-0 left-1/2 transform -translate-x-1/2 flex justify-center items-center w-fit py-2 bg-zinc-800/50 backdrop-blur-sm text-white px-6 mt-8 rounded-2xl ">
      <button onClick={onClearCanvas} className="text-red-600 text-2xl flex items-center justify-center">
        <MdDelete className="inline-block" />
      </button>
      <input
        type="color"
        onChange={handleColorChange}
        className="ml-4 w-10 h-6 rounded-sm"
        defaultValue="#ffffff" // Set initial color to white
      />
      <button
        onClick={() => selectShape('text')}
        className={`text-md p-2 hover:bg-zinc-700 rounded-lg ml-2 ${selectedShape === 'text' ? 'bg-zinc-700' : ''}`}
      >
        <CiText />
      </button>
      <button
        onClick={() => selectShape('pointer')}
        className={`text-md p-2 hover:bg-zinc-700 rounded-lg ml-2 ${selectedShape === 'pointer' ? 'bg-zinc-700' : ''}`}
      >
        <LuMousePointer2 />
      </button>
      <button
        onClick={() => selectShape('pen')}
        className={`text-md p-2 hover:bg-zinc-700 rounded-lg ml-2 ${selectedShape === 'pen' ? 'bg-zinc-700' : ''}`}
      >
        <FaPen />
      </button>
      <div className='flex gap-4 ml-2 bg-zinc-700/75 px-6 py-2 rounded-lg max-sm:gap-1 max-sm:hidden'>
        <button
          onClick={() => selectShape('square')}
          className={`text-sm p-2 hover:bg-zinc-600 rounded-lg ${selectedShape === 'square' ? 'bg-zinc-600' : ''}`}
        >
          <FaRegSquare />
        </button>
        <button
          onClick={() => selectShape('circle')}
          className={`text-sm p-2 hover:bg-zinc-600 rounded-lg ${selectedShape === 'circle' ? 'bg-zinc-600' : ''}`}
        >
          <FaRegCircle />
        </button>
        <button
          onClick={() => selectShape('diamond')}
          className={`text-md p-2 hover:bg-zinc-600 rounded-lg ${selectedShape === 'diamond' ? 'bg-zinc-600' : ''}`}
        >
          <GoDiamond />
        </button>
        <button
          onClick={() => selectShape('line')}
          className={`text-lg p-2 hover:bg-zinc-600 rounded-lg ${selectedShape === 'line' ? 'bg-zinc-600' : ''}`}
        >
          <IoRemoveOutline />
        </button>
        <button
          onClick={() => selectShape('arrow')}
          className={`text-sm p-2 hover:bg-zinc-600 rounded-lg ${selectedShape === 'arrow' ? 'bg-zinc-600' : ''}`}
        >
          <FaArrowRight />
        </button> 
      </div>
      <div className='relative'>
      <div onClick={toggleChildVisibility} className='bg-zinc-700/75 p-2 rounded-lg ml-2 cursor-pointer'>
        <FaAngleDown style={{ transform: isChildVisible ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }} />
      </div>
      {isChildVisible && (
        <div className='absolute top-12 bg-zinc-700/75 p-2 rounded-lg flex flex-col gap-4'>
          <button
            onClick={() => selectShape('square')}
            className={`text-sm p-2 hover:bg-zinc-600 rounded-lg ${selectedShape === 'square' ? 'bg-zinc-600' : ''}`}
          >
            <FaRegSquare />
          </button>
          <button
            onClick={() => selectShape('circle')}
            className={`text-sm p-2 hover:bg-zinc-600 rounded-lg ${selectedShape === 'circle' ? 'bg-zinc-600' : ''}`}
          >
            <FaRegCircle />
          </button>
          <button
            onClick={() => selectShape('diamond')}
            className={`text-md p-2 hover:bg-zinc-600 rounded-lg ${selectedShape === 'diamond' ? 'bg-zinc-600' : ''}`}
          >
            <GoDiamond />
          </button>
          <button
            onClick={() => selectShape('line')}
            className={`text-lg p-2 hover:bg-zinc-600 rounded-lg ${selectedShape === 'line' ? 'bg-zinc-600' : ''}`}
          >
            <IoRemoveOutline />
          </button>
          <button
            onClick={() => selectShape('arrow')}
            className={`text-sm p-2 hover:bg-zinc-600 rounded-lg ${selectedShape === 'arrow' ? 'bg-zinc-600' : ''}`}
          >
            <FaArrowRight />
          </button> 
        </div>
      )}
    </div>
    </nav>
  );
};

export default Navbar;
