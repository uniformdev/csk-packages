import { FC } from 'react';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { chunkArray } from '../../utils';

type PresetProps = {
  prompts: string[];
  showThinking: boolean;
  sendPresetPrompt: (prompt: string) => void;
};

type PromptButtonProps = {
  prompt: string;
  showThinking: boolean;
  sendPresetPrompt: (prompt: string) => void;
};

const PromptButton: FC<PromptButtonProps> = ({ prompt, showThinking, sendPresetPrompt }) => {
  return (
    <button
      key={prompt}
      disabled={showThinking}
      className={cn(
        'w-full border px-4 py-2 bg-button-secondary text-text-primary hover:bg-button-secondary-hover hover:text-text-primary transition-all duration-300 ease-in-out cursor-pointer',
        {
          'pointer-events-none cursor-not-allowed opacity-50': showThinking,
        }
      )}
      onClick={() => {
        sendPresetPrompt(prompt);
      }}
    >
      {prompt}
    </button>
  );
};

const PresetsSection: FC<PresetProps> = ({ prompts, showThinking, sendPresetPrompt }) => {
  return (
    <div className="mb-2 flex flex-col gap-2">
      {chunkArray(prompts, 2).map((chunk: string[], index: number) => {
        if (chunk.length === 1) {
          const [singlePrompt] = chunk;
          return (
            <PromptButton
              key={singlePrompt}
              prompt={singlePrompt}
              showThinking={showThinking}
              sendPresetPrompt={sendPresetPrompt}
            />
          );
        }
        return (
          <div key={index} className="grid grid-cols-2 gap-2">
            {chunk.map(prompt => (
              <PromptButton
                key={prompt}
                prompt={prompt}
                showThinking={showThinking}
                sendPresetPrompt={sendPresetPrompt}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default PresetsSection;
