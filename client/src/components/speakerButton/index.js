import React, { useState } from 'react';
import { FaVolumeUp } from 'react-icons/fa';
import Sound from 'react-sound';

const useAudio = () => {
    const [playing, setPlaying] = useState(Sound.status.STOPPED);
    const onPlay = () => {if(playing === Sound.status.STOPPED ) setPlaying(Sound.status.PLAYING)};
    const onStop = () => {setPlaying(Sound.status.STOPPED)};
    return [playing, onPlay, onStop];
  };
export default function SpeakerButton({url}) {
    const [playing, onPlay, onStop] = useAudio();
    return(
            <div style = {{ height: 24, width: 20, cursor: 'pointer' }}>
            {
                url &&
                <div>
                    <FaVolumeUp onClick={onPlay}/>   
                    <Sound
                        url={url}
                        playStatus={playing}
                        position={0}
                        // onPlaying={({ position }) => console.log('Position', position)}
                        loop = {false}
                        onFinishedPlaying={onStop}
                    />
                </div>
            }
            </div>
    )
}

