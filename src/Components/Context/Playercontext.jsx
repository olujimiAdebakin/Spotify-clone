// How to create a playercontexxt

import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../../assets/assets";

export const Playercontext = createContext();

const PlayercontextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const [track, setTrack] = useState(songsData[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      seconds: 0,
      minute: 0,
    },
    totalTime: {
      seconds: 0,
      minute: 0,
    },
  });
    
    const play = () => {
        audioRef.current.play();
        setIsPlaying(true)
    }

    const pause = () => {
        audioRef.current.pause();
        setIsPlaying(false);
  }
  
  const playWithId = async (id) => {
    await setTrack(songsData[id]);
    await audioRef.current.play();
    setIsPlaying(true);
  }

  const previous = async () => {
    if (track.id > 0) {
      await MediaStreamTrack(songsData[track.id - 1]);
      await audioRef.current.play();
      setIsPlaying(true)
    }
  }

    const next = async () => {
      if (track.id < songsData.length-1) {
        await MediaStreamTrack(songsData[track.id + 1]);
        await audioRef.current.play();
        setIsPlaying(true);
      }
    };

    useEffect(() => {
        setTimeout(() => {
            
            audioRef.current.ontimeupdate = () => {
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%";
                setTime({
                  currentTime: {
                    seconds: Math.floor(audioRef.current.currentTime %60),
                    minute: Math.floor(audioRef.current.currentTime /60),
                  },
                  totalTime: {
                    seconds: Math.floor(audioRef.current.duration %60),
                    minute: Math.floor(audioRef.current.duration /60),
                  },
                });
            }
        }, 1000);
    },[audioRef])

  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,setTrack,
    isPlaying,setIsPlaying,
      time, setTime,
    play, pause,
    playWithId,
    previous,next
  };

  return (
    <Playercontext.Provider value={contextValue}>
      {props.children}
    </Playercontext.Provider>
  );
};

export default PlayercontextProvider;
