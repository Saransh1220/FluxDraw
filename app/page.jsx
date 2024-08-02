

import TextComponent from '@/components/TextComponent';
import Canvas from '../components/Canvas';
import Zoom from '../components/Zoom';
export default function Home() {
  return (

    <main className="relative h-screen w-screen">
      {/* Metallic Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 opacity-90 z-0"></div>
      {/* Dotted Grid Pattern */}
      <div className="absolute inset-0 bg-[length:25px_25px] bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.35)_1px,#0000_2px)] z-10"></div>
      {/* Content */}
      <div className="flex justify-center items-center h-full relative z-20">
      
      <Canvas />
     
      <Zoom/>
    </div>
    </main>
  );
}
