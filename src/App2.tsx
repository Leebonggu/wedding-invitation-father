import { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { Heart, Phone, ChevronDown, X, Music, PauseCircle, PlayCircle, ChevronRight, ChevronLeft, MapPin, Clock, Copy } from 'lucide-react';

// 음악 컨트롤러 컴포넌트
const MusicController = forwardRef((_props: any, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/wedding-song.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    const startMusicOnFirstInteraction = () => {
      if (!hasUserInteracted && audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setHasUserInteracted(true);
        }).catch(error => {
          console.log('재생 실패:', error);
        });
      }
    };

    const handleInteraction = () => {
      startMusicOnFirstInteraction();
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);
    document.addEventListener('scroll', handleInteraction);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
    };
  }, [hasUserInteracted]);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setHasUserInteracted(true);
      }).catch(error => {
        console.log('재생 실패:', error);
      });
    }
  };

  useImperativeHandle(ref, () => ({
    play: () => {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setHasUserInteracted(true);
        }).catch(error => {
          console.log('자동 재생이 차단되었습니다:', error);
        });
      }
    }
  }));

  return (
    <button
      onClick={toggleMusic}
      className="fixed bottom-6 right-6 z-50 bg-white/80 backdrop-blur-md shadow-lg rounded-full p-3 hover:shadow-xl transition-all duration-300"
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

// 메인 히어로 섹션
const HeroSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* 부드러운 그라데이션 배경 */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-rose-50"></div>

      <div
        className={`relative z-10 text-center px-8 transition-all duration-1500 ${imageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
      >
        <div className="mb-10">
          <img
            src="https://images.unsplash.com/photo-1529636798458-92182e662485?w=400&h=400&fit=crop"
            alt="Wedding"
            className="w-48 h-48 mx-auto rounded-full object-cover shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        <div className="space-y-6">
          <h1 className="font-light tracking-wider">
            <span className="text-4xl text-gray-800 block">이봉구</span>
            <span className="text-rose-300 text-lg my-4 block">&</span>
            <span className="text-4xl text-gray-800 block">이수정</span>
          </h1>

          <div className="text-gray-600 space-y-2">
            <p className="text-lg">2025년 12월 13일 토요일</p>
            <p className="text-base opacity-80">오후 12시 40분</p>
            <p className="text-sm opacity-60">웨딩시그너처 4층 아너스홀</p>
          </div>
        </div>

        <ChevronDown className="w-5 h-5 mx-auto mt-16 text-rose-300 animate-bounce" />
      </div>
    </section>
  );
};

// 인사말 섹션
const GreetingSection = () => {
  return (
    <section className="py-24 px-8 bg-white">
      <div className="max-w-md mx-auto text-center">
        <h2 className="text-2xl font-light tracking-wider mb-12 text-gray-800">초대합니다</h2>
        <div className="text-gray-600 leading-loose space-y-8 font-light">
          <p>
            서로가 마주보며 다져온 사랑을<br />
            이제 함께 한 곳을 바라보며<br />
            걸어갈 수 있는 큰 사랑으로<br />
            키우고자 합니다.
          </p>
          <p>
            저희 두 사람이 사랑의 이름으로<br />
            지켜나갈 수 있도록<br />
            축복해 주시면 감사하겠습니다.
          </p>
        </div>

        <div className="mt-16 space-y-6 text-sm text-gray-500">
          <div className="flex items-center justify-center space-x-3">
            <span>이성화 · 김종희</span>
            <span className="text-xs">의 차남</span>
            <span className="font-medium text-gray-700">봉구</span>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <span>이강준 · 유신자</span>
            <span className="text-xs">의 차녀</span>
            <span className="font-medium text-gray-700">수정</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// 갤러리 섹션
const GallerySection = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [mouseStart, setMouseStart] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const images = [
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&h=400&fit=crop",
  ];

  // 터치 이벤트
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && selectedImageIndex !== null) {
      goToNext();
    }
    if (isRightSwipe && selectedImageIndex !== null) {
      goToPrevious();
    }
  };

  // 마우스 이벤트 (데스크톱 스와이프)
  const handleMouseDown = (e: React.MouseEvent) => {
    setMouseStart(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const distance = mouseStart - e.clientX;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && selectedImageIndex !== null) {
      goToNext();
    }
    if (isRightSwipe && selectedImageIndex !== null) {
      goToPrevious();
    }

    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const goToPrevious = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex(selectedImageIndex === 0 ? images.length - 1 : selectedImageIndex - 1);
  };

  const goToNext = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex(selectedImageIndex === images.length - 1 ? 0 : selectedImageIndex + 1);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;

      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);

  return (
    <section className="py-24 bg-neutral-50">
      <div className="max-w-md mx-auto px-8">
        <h2 className="text-2xl font-light tracking-wider text-center mb-12 text-gray-800">갤러리</h2>

        {/* 3x3 그리드 */}
        <div className="grid grid-cols-3 gap-2">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="aspect-square overflow-hidden rounded-lg cursor-pointer transform transition-transform hover:scale-105"
              onClick={() => setSelectedImageIndex(idx)}
            >
              <img
                src={img}
                alt={`Gallery ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 라이트박스 */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-50"
          onClick={() => setSelectedImageIndex(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors z-10"
            onClick={() => setSelectedImageIndex(null)}
          >
            <X className="w-6 h-6" />
          </button>

          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div
            className="relative max-w-full max-h-full flex items-center justify-center select-none"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            <img
              src={images[selectedImageIndex]}
              alt={`Selected ${selectedImageIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain pointer-events-none"
              draggable={false}
            />

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === selectedImageIndex
                    ? 'bg-white w-8'
                    : 'bg-white/40 hover:bg-white/60'
                    }`}
                />
              ))}
            </div>
          </div>

          {/* 이미지 번호 */}
          <div className="absolute top-6 left-6 text-white/80 bg-black/30 px-3 py-1 rounded-full text-sm">
            {selectedImageIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </section>
  );
};

// 캘린더 섹션 - 미니멀하게
const CalendarSection = () => {
  const weddingDate = new Date(2025, 11, 13);
  const getDaysUntilWedding = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const weddingDateCopy = new Date(weddingDate);
    weddingDateCopy.setHours(0, 0, 0, 0);
    const diff = weddingDateCopy.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-md mx-auto px-8 text-center">
        <div className="inline-flex items-center gap-2 text-sm text-rose-400 mb-8">
          <Clock className="w-4 h-4" />
          <span>{getDaysUntilWedding() > 0 ? `D-${getDaysUntilWedding()}` : 'D-Day'}</span>
        </div>

        <div className="space-y-3">
          <h3 className="text-3xl font-light text-gray-800">12월 13일</h3>
          <p className="text-gray-600">토요일 오후 12시 40분</p>
          <p className="text-sm text-gray-500">2025년</p>
        </div>
      </div>
    </section>
  );
};

// 위치 섹션 - 심플하게
const LocationSection = () => {
  return (
    <section className="py-24 bg-neutral-50">
      <div className="max-w-md mx-auto px-8">
        <h2 className="text-2xl font-light tracking-wider text-center mb-12 text-gray-800">오시는 길</h2>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="text-center mb-8">
            <h3 className="text-xl mb-3 text-gray-800">웨딩시그너처</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              서울시 마포구 양화로 87<br />
              웨딩시그너처 4층 아너스홀
            </p>
          </div>

          <div className="aspect-[4/3] bg-gray-100 rounded-xl mb-6 overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="https://t1.daumcdn.net/roughmap/imgmap/563c4e06f503c5e78fa4a0720f7941a38f0a7e51baa457c1ab2d3ad9cb9ec134"
              alt="웨딩시그너처 위치"
            />
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
              <div className="space-y-2 text-gray-600">
                <p>
                  <span className="font-medium text-gray-700">합정역</span>
                  <span className="text-xs ml-1">(2, 6호선)</span>
                  <br />
                  <span className="text-xs">2번 출구 도보 4분</span>
                </p>
                <p>
                  <span className="font-medium text-gray-700">홍대입구역</span>
                  <span className="text-xs ml-1">(2호선, 공항철도)</span>
                  <br />
                  <span className="text-xs">1번 출구 도보 11분</span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              주차가 혼잡하오니 대중교통 이용을 권장드립니다
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <a
            href="https://naver.me/5XkPZKZK"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-green-500 text-white py-3.5 rounded-xl font-medium hover:bg-green-600 transition-colors text-center text-sm"
          >
            네이버 지도
          </a>
          <a
            href="https://kko.kakao.com/UYLNMIMBsX"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-yellow-400 text-gray-800 py-3.5 rounded-xl font-medium hover:bg-yellow-500 transition-colors text-center text-sm"
          >
            카카오맵
          </a>
        </div>
      </div>
    </section>
  );
};

// 연락처 섹션 - 미니멀하게
const ContactSection = () => {
  const contacts = [
    { role: '신랑', name: '이봉구', phone: '010-5031-6317' },
    { role: '신부', name: '이수정', phone: '010-8765-4321' },
    { role: '신랑 아버지', name: '이성화', phone: '010-1111-2222' },
    { role: '신랑 어머니', name: '김종희', phone: '010-3333-4444' },
    { role: '신부 아버지', name: '이강준', phone: '010-5555-6666' },
    { role: '신부 어머니', name: '유신자', phone: '010-7777-8888' }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-md mx-auto px-8">
        <h2 className="text-2xl font-light tracking-wider text-center mb-12 text-gray-800">연락처</h2>

        <div className="grid grid-cols-2 gap-4">
          {contacts.map((contact, idx) => (
            <a
              key={idx}
              href={`tel:${contact.phone}`}
              className="group p-6 text-center hover:bg-neutral-50 rounded-xl transition-colors"
            >
              <p className="text-xs text-gray-500 mb-1">{contact.role}</p>
              <p className="font-medium text-gray-800 mb-3">{contact.name}</p>
              <div className="inline-flex items-center justify-center w-10 h-10 bg-rose-50 group-hover:bg-rose-100 rounded-full transition-colors">
                <Phone className="w-4 h-4 text-rose-400" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

// 마음 전하기 섹션 - 심플하게
const AccountSection = () => {
  const [showAccount, setShowAccount] = useState({ groom: false, bride: false });
  const [copiedAccount, setCopiedAccount] = useState('');

  const copyToClipboard = (text: string, accountId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(accountId);
    setTimeout(() => setCopiedAccount(''), 2000);
  };

  return (
    <section className="py-24 bg-neutral-50">
      <div className="max-w-md mx-auto px-8">
        <h2 className="text-2xl font-light tracking-wider text-center mb-12 text-gray-800">마음 전하기</h2>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          <p className="text-center text-gray-600 mb-8 font-light">
            참석이 어려우신 분들을 위해<br />
            계좌번호를 남겨드립니다.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => setShowAccount({ ...showAccount, groom: !showAccount.groom })}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50 rounded-xl transition-colors"
            >
              <span className="text-gray-700">신랑측 계좌번호</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showAccount.groom ? 'rotate-180' : ''}`} />
            </button>

            {showAccount.groom && (
              <div className="px-4 pb-4 space-y-3">
                <div className="flex items-center justify-between py-2">
                  <div className="text-sm">
                    <p className="text-gray-500 text-xs">신랑 이봉구</p>
                    <p className="text-gray-700">국민은행 123-456-789012</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard('123-456-789012', 'groom1')}
                    className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    {copiedAccount === 'groom1' ? '복사됨' : '복사'}
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={() => setShowAccount({ ...showAccount, bride: !showAccount.bride })}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50 rounded-xl transition-colors"
            >
              <span className="text-gray-700">신부측 계좌번호</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showAccount.bride ? 'rotate-180' : ''}`} />
            </button>

            {showAccount.bride && (
              <div className="px-4 pb-4 space-y-3">
                <div className="flex items-center justify-between py-2">
                  <div className="text-sm">
                    <p className="text-gray-500 text-xs">신부 이수정</p>
                    <p className="text-gray-700">우리은행 111-222-333444</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard('111-222-333444', 'bride1')}
                    className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    {copiedAccount === 'bride1' ? '복사됨' : '복사'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// 안내사항 - 아이콘과 함께
const NoticeSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-md mx-auto px-8">
        <h2 className="text-2xl font-light tracking-wider text-center mb-12 text-gray-800">안내사항</h2>

        <div className="space-y-4">
          {/* 주차 안내 */}
          <div className="bg-gray-50 rounded-2xl p-6 flex gap-4">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🅿️</span>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-800 mb-2">주차안내</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                예식 당일 주차 혼잡이 예상됩니다.<br />
                가급적 대중교통 이용을 부탁 드립니다.
              </p>
              <p className="text-gray-500 text-xs mt-2">
                · 지정 주차장 2시간 무료<br />
                · 건물 정문에서 안내 받으세요
              </p>
            </div>
          </div>

          {/* 화환 안내 */}
          <div className="bg-rose-50 rounded-2xl p-6 flex gap-4">
            <div className="w-14 h-14 bg-rose-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">💐</span>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-800 mb-2">화환안내</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                화환은 정중히 사양합니다.<br />
                축하해 주시는 마음만 감사히 받겠습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
// 푸터
const FooterSection = () => {
  return (
    <footer className="py-16 bg-rose-50">
      <div className="text-center">
        <Heart className="w-6 h-6 mx-auto mb-4 text-rose-300" />
        <p className="text-gray-600 text-sm font-light">
          봉구 & 수정
        </p>
        <p className="text-gray-400 text-xs mt-2">
          2025.12.13
        </p>
      </div>
    </footer>
  );
};

// 메인 앱
export default function WeddingInvitation() {
  const [showMusicPrompt, setShowMusicPrompt] = useState(true);
  const musicControllerRef = useRef<{ play: () => void } | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full max-w-lg mx-auto bg-white">
        <style>{`
        @import url('//fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400;500&display=swap');
        @import url('//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css');
  
        * {
          font-family: 'Spoqa Han Sans Neo', 'sans-serif';
        }
        
        h1, h2, h3 {
          font-family: 'Noto Serif KR', serif;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
          
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>

        {showMusicPrompt && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl">
              <div className="text-center">
                <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Music className="w-6 h-6 text-rose-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">배경음악</h3>
                <p className="text-sm text-gray-600 mb-6">
                  청첩장과 함께 음악을 들으시겠습니까?
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowMusicPrompt(false);
                      if (musicControllerRef.current) {
                        musicControllerRef.current.play();
                      }
                    }}
                    className="flex-1 bg-rose-400 text-white py-2.5 px-4 rounded-xl hover:bg-rose-500 transition-colors"
                  >
                    재생
                  </button>
                  <button
                    onClick={() => setShowMusicPrompt(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2.5 px-4 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <MusicController ref={musicControllerRef} />
        <HeroSection />
        <GreetingSection />
        <GallerySection />
        <CalendarSection />
        <LocationSection />
        <ContactSection />
        <AccountSection />
        <NoticeSection />
        <FooterSection />
      </div>
    </div>
  );
}