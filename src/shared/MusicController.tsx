import { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { PauseCircle, PlayCircle, } from 'lucide-react';

// 음악 컨트롤러 컴포넌트
export const MusicController = forwardRef((_props: any, ref) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const play = () => {
        if (!audio) {
            const newAudio = new Audio('/wedding-song.mp3');
            newAudio.loop = true;
            newAudio.volume = 0.3;
            newAudio.play().then(() => {
                setIsPlaying(true);
                setAudio(newAudio);
            }).catch(() => {
                alert('음악 재생이 차단되었습니다.');
            });
            newAudio.addEventListener('loadedmetadata', () => {
                setDuration(newAudio.duration);
            });

            newAudio.addEventListener('timeupdate', () => {
                setCurrentTime(newAudio.currentTime);
                const prog = (newAudio.currentTime / newAudio.duration) * 100;
                setProgress(prog);
            });
        } else {
            audio.play();
            setIsPlaying(true);
        }
    };

    const pause = () => {
        if (audio) {
            audio.pause();
            setIsPlaying(false);
        }
    };

    useImperativeHandle(ref, () => ({
        play,
        pause,
        isPlaying,
        toggleMusic: () => {
            if (isPlaying) {
                pause();
            } else {
                play();
            }
        },
        progress,  // 추가
        currentTime,  // 추가
        duration  // 추가
    }));

    useEffect(() => {
        return () => {
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
        };
    }, [audio]);

    const toggleMusic = () => {
        if (isPlaying) {
            pause();
        } else {
            play();
        }
    };

    return (
        <button
            onClick={toggleMusic}
            className="fixed bottom-6 right-6 z-50 bg-white/90 backdrop-blur-md shadow-lg rounded-full p-3.5 hover:shadow-xl transition-all duration-300"
            aria-label={isPlaying ? '음악 일시정지' : '음악 재생'}
        >
            {isPlaying ? (
                <PauseCircle className="w-5 h-5 text-rose-400" />
            ) : (
                <PlayCircle className="w-5 h-5 text-rose-400" />
            )}
        </button>
    );
});