import { FC } from 'react';
import { AssetParamValue } from '@uniformdev/assets';
import { flattenValues } from '@uniformdev/canvas';
import { Video as CSKVideo, VideoProps as CSKVideoProps } from '@uniformdev/csk-components/components/canvas';

type VideoProps = CSKVideoProps & {
  videoAsset?: AssetParamValue;
};

const Video: FC<VideoProps> = ({ url, videoAsset, ...props }) => {
  const videoUrl = url?.path || flattenValues(videoAsset, { toSingle: true })?.url;

  return (
    <CSKVideo
      {...props}
      url={
        videoUrl
          ? {
              path: videoUrl,
              type: 'url',
            }
          : undefined
      }
    />
  );
};

export default Video;
