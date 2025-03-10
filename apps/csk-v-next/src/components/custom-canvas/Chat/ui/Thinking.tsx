import { FC } from 'react';
import { AiIcon } from './icon/AiIcon';

export const Thinking: FC = () => (
  <div className="my-4 flex  items-center gap-3 text-sm text-gray-600">
    <span className="flex items-start justify-center rounded-full">
      <AiIcon />
    </span>
    <div className="flex items-center font-bold text-gray-700">
      <span>Thinking</span>
      <span className="animate-[fade_1.5s_ease-in-out_infinite]">.</span>
      <span className="animate-[fade_1.5s_ease-in-out_infinite_0.3s]">.</span>
      <span className="animate-[fade_1.5s_ease-in-out_infinite_0.6s]">.</span>

      <style>{`
        @keyframes fade {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
        `}</style>
    </div>
  </div>
);
Thinking.displayName = 'Thinking';
