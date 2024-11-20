import { FC, useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import { VideoProps } from '.';
import { PlayButton } from './PlayButton';

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

export const Video: FC<VideoProps> = ({
  url,
  autoPlay = false,
  loop,
  controls,
  lazyLoad = false,
  placeholderImageUrl,
  muted,
}) => {
  const [playing, setPlaying] = useState(autoPlay);

  const onPlay = useCallback(() => setPlaying(true), []);
  const onPause = useCallback(() => setPlaying(false), []);

  return (
    <div className="relative aspect-video size-full [&_video]:!object-cover">
      {url && (
        <ReactPlayer
          className="absolute left-0 top-0"
          url={url}
          playing={playing}
          onPause={onPause}
          onPlay={onPlay}
          width="100%"
          height="100%"
          controls={controls}
          muted={muted}
          loop={loop}
          light={(lazyLoad && placeholderImageUrl) || lazyLoad}
          playIcon={<PlayButton onClick={onPlay} />}
        />
      )}
    </div>
  );
};
