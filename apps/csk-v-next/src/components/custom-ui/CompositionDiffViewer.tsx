'use client';
import React, { FC, useState } from 'react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import DiffViewer, { DiffMethod } from 'react-diff-viewer-continued';
import { cn } from '@uniformdev/csk-components/utils/styling';

type CompositionDiffViewerProps = {
  draftVersion: string;
  publishedVersion: string;
  draftVersionId: string;
  publishedVersionId: string;
  latestVersionScreenshotUrl: string;
  latestPublishedVersionScreenshotUrl: string;
};

const CompositionDiffViewer: FC<CompositionDiffViewerProps> = ({
  draftVersion,
  publishedVersion,
  draftVersionId,
  publishedVersionId,
  latestVersionScreenshotUrl,
  latestPublishedVersionScreenshotUrl,
}) => {
  const [tab, setTab] = useState<'diff' | 'visual'>('visual');
  return (
    <div className="px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold">Versions Comparison</h1>
      <div className="mb-8 flex border-b border-gray-200">
        <button
          onClick={() => setTab('visual')}
          className={cn('bg-white border-b-2 text-lg px-4 py-2', {
            'text-blue-700 border-b-blue-700': tab === 'visual',
            'text-gray-500 border-b-transparent': tab !== 'visual',
          })}
        >
          Visual
        </button>
        <button
          onClick={() => setTab('diff')}
          className={cn('bg-white border-b-2 text-lg px-4 py-2', {
            'text-blue-700 border-b-blue-700': tab === 'diff',
            'text-gray-500 border-b-transparent': tab !== 'diff',
          })}
        >
          JSON
        </button>
      </div>
      {tab === 'diff' && (
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <style>
            {`
            #diff-view tbody {
              width: 100% !important;
            }
          `}
          </style>
          <div id="diff-view" className="overflow-x-auto">
            <DiffViewer
              oldValue={publishedVersion}
              newValue={draftVersion}
              splitView={true}
              showDiffOnly={true}
              compareMethod={DiffMethod.LINES}
              useDarkTheme={false}
              leftTitle={`Published Version (${publishedVersionId})`}
              rightTitle={`Draft Version (${draftVersionId})`}
              styles={{
                splitView: {
                  display: 'flex',
                  width: '100%',
                },
                content: {
                  width: '50%',
                  overflow: 'auto',
                },
                contentText: {
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                },
                line: {
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                },
                lineNumber: {
                  whiteSpace: 'nowrap !important',
                },
                gutter: {
                  whiteSpace: 'nowrap',
                  minWidth: '50px',
                },
              }}
            />
          </div>
        </div>
      )}
      {tab === 'visual' && (
        <div className="mx-auto max-w-[1440px]">
          <ReactCompareSlider
            itemOne={<ReactCompareSliderImage src={latestPublishedVersionScreenshotUrl} alt="Item 1" />}
            itemTwo={<ReactCompareSliderImage src={latestVersionScreenshotUrl} alt="Item 2" />}
          />
        </div>
      )}
    </div>
  );
};

export default CompositionDiffViewer;
