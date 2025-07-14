import { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { Heart, MapPin, Phone, ChevronDown, X, Music, PauseCircle, PlayCircle } from 'lucide-react';

// 음악 컨트롤러 컴포넌트
const MusicController = forwardRef((props, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio('/wedding-song.mp3')); // 여기에 음악 파일 경로 입력

  useEffect(() => {
    // 오디오 설정
    audio.loop = true;
    audio.volume = 0.3; // 볼륨 30%

    // 컴포넌트 언마운트 시 정리
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  const toggleMusic = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(error => {
        console.log('자동 재생이 차단되었습니다:', error);
        // 브라우저 자동 재생 정책으로 인한 에러 처리
      });
    }
    setIsPlaying(!isPlaying);
  };

  // ref를 통해 toggleMusic 함수 노출
  useImperativeHandle(ref, () => ({
    play: () => {
      if (!isPlaying) {
        toggleMusic();
      }
    }
  }));

  return (
    <button
      onClick={toggleMusic}
      className="fixed bottom-8 right-8 z-50 bg-white shadow-lg rounded-full p-4 hover:shadow-xl transition-shadow"
      aria-label={isPlaying ? '음악 일시정지' : '음악 재생'}
    >
      {isPlaying ? (
        <PauseCircle className="w-6 h-6 text-pink-500" />
      ) : (
        <PlayCircle className="w-6 h-6 text-pink-500" />
      )}
    </button>
  );
});

// 메인 히어로 섹션
const HeroSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-pink-100 to-white"></div>
      <div
        className={`relative z-10 text-center px-8 transition-opacity duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="mb-8">
          <img
            src="https://images.unsplash.com/photo-1529636798458-92182e662485?w=400&h=400&fit=crop"
            alt="Wedding"
            className="w-64 h-64 mx-auto rounded-full object-cover shadow-2xl"
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        <h1 className="text-4xl font-serif mb-4 text-gray-800">
          <span className="block">이봉구</span>
          <span className="text-2xl font-light my-2 block">&</span>
          <span className="block">이수정</span>
        </h1>
        <p className="text-gray-600 mb-6">2025년 12월 13일 토요일 오후 12시 40분</p>
        <p className="text-gray-600">웨딩시그너치 4층 아너스홀</p>
        <ChevronDown className="w-6 h-6 mx-auto mt-12 text-gray-400 animate-bounce" />
      </div>
    </section>
  );
};

// 인사말 섹션
const GreetingSection = () => {
  return (
    <section className="py-20 px-8 bg-white">
      <div className="max-w-md mx-auto text-center">
        <h2 className="text-3xl font-serif mb-8 text-gray-800">인사말</h2>
        <div className="text-gray-600 leading-relaxed space-y-4">
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
        <div className="mt-12 space-y-4 text-sm text-gray-600">
          <div>
            <p className="font-semibold">이성화 · 김종희의 차남 봉구</p>
          </div>
          <div>
            <p className="font-semibold">이강준 · 유신자의 차녀 수정</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// 갤러리 섹션
const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-md mx-auto px-8">
        <h2 className="text-3xl font-serif mb-8 text-center text-gray-800">갤러리</h2>
        <div className="grid grid-cols-3 gap-2">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="aspect-square overflow-hidden rounded-lg cursor-pointer transform transition-transform hover:scale-105"
              onClick={() => setSelectedImage(img)}
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

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={selectedImage}
            alt="Selected"
            className="max-w-full max-h-full rounded-lg"
          />
        </div>
      )}
    </section>
  );
};

// 캘린더 섹션
const CalendarSection = () => {
  const weddingDate = new Date(2025, 11, 13); // 2025년 12월 13일 (월은 0부터 시작)
  const weddingYear = weddingDate.getFullYear();
  const weddingMonth = weddingDate.getMonth();
  const weddingDay = weddingDate.getDate();

  // 해당 월의 총 일수
  const daysInMonth = new Date(weddingYear, weddingMonth + 1, 0).getDate();
  // 해당 월의 첫 날 요일 (0: 일요일)
  const firstDayOfMonth = new Date(weddingYear, weddingMonth, 1).getDay();

  const getDaysUntilWedding = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 시간을 00:00:00으로 설정
    const weddingDateCopy = new Date(weddingDate);
    weddingDateCopy.setHours(0, 0, 0, 0);

    const diff = weddingDateCopy.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (days < 0) return `D+${Math.abs(days)}`;
    else if (days === 0) return 'D-Day';
    else return `D-${days}`;
  };

  const getDayOfWeek = (date: Date) => {
    const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    return days[date.getDay()];
  };

  const getMonthName = (date: Date) => {
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-md mx-auto px-8">
        <h2 className="text-3xl font-serif mb-8 text-center text-gray-800">일시 및 장소</h2>

        <div className="bg-pink-50 rounded-2xl p-6 mb-8">
          <div className="text-center mb-6">
            <p className="text-2xl font-semibold text-gray-800 mb-2">
              {weddingYear}년 {weddingMonth + 1}월 {weddingDay}일
            </p>
            <p className="text-lg text-gray-600">{getDayOfWeek(weddingDate)} 오후 12시 40분</p>
            <p className="text-sm text-pink-600 mt-2">{getDaysUntilWedding()}</p>
          </div>

          <div className="bg-white rounded-lg p-4">
            <div className="text-center mb-2">
              <p className="text-sm font-semibold text-gray-600">{getMonthName(weddingDate)}</p>
            </div>
            <div className="grid grid-cols-7 gap-1 text-xs text-center">
              {['일', '월', '화', '수', '목', '금', '토'].map(day => (
                <div key={day} className="font-semibold text-gray-500 py-2">
                  {day}
                </div>
              ))}
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const currentDay = i + 1;
                return (
                  <div
                    key={currentDay}
                    className={`py-2 rounded ${currentDay === weddingDay
                      ? 'bg-pink-500 text-white font-semibold'
                      : 'text-gray-700'
                      }`}
                  >
                    {currentDay}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 위치 섹션
const LocationSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-md mx-auto px-8">
        <h2 className="text-3xl font-serif mb-8 text-center text-gray-800">오시는 길</h2>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">웨딩시그니처</h3>
          <p className="text-gray-600 mb-4">서울시 마포구 양화로 87 (서교동378-7)<br />웨딩시그니처 4층 아너스홀</p>

          <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
            <MapPin className="w-12 h-12 text-gray-400" />
          </div>

          <div className="space-y-3 text-sm">
            <div>
              <p className="font-semibold text-gray-700 mb-1">지하철</p>
              <p className="text-gray-600">2호선 강남역 3번 출구 도보 5분</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700 mb-1">버스</p>
              <p className="text-gray-600">간선 146, 341, 360<br />지선 3412, 4318</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700 mb-1">주차</p>
              <p className="text-gray-600">건물 내 주차장 2시간 무료</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button className="flex-1 bg-green-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors">
            네이버 지도
          </button>
          <button className="flex-1 bg-yellow-400 text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-yellow-500 transition-colors">
            카카오맵
          </button>
        </div>
      </div>
    </section>
  );
};

// 연락처 섹션
const ContactSection = () => {
  const contacts = [
    { role: '신랑', name: '이봉구', phone: '010-1234-5678' },
    { role: '신부', name: '이수정', phone: '010-8765-4321' },
    { role: '신랑 아버지', name: '이성화', phone: '010-1111-2222' },
    { role: '신랑 어머니', name: '김종희', phone: '010-3333-4444' },
    { role: '신부 아버지', name: '이강준', phone: '010-5555-6666' },
    { role: '신부 어머니', name: '유신자', phone: '010-7777-8888' }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-md mx-auto px-8">
        <h2 className="text-3xl font-serif mb-8 text-center text-gray-800">연락처</h2>

        <div className="space-y-4">
          {contacts.map((contact, idx) => (
            <div key={idx} className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
              <div>
                <p className="text-sm text-gray-600">{contact.role}</p>
                <p className="font-semibold text-gray-800">{contact.name}</p>
              </div>
              <a
                href={`tel:${contact.phone}`}
                className="bg-pink-500 text-white p-3 rounded-full hover:bg-pink-600 transition-colors"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 마음 전하기 섹션
const AccountSection = () => {
  const [showAccount, setShowAccount] = useState({ groom: false, bride: false });
  const [copiedAccount, setCopiedAccount] = useState('');

  const copyToClipboard = (text: string, accountId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(accountId);
    setTimeout(() => setCopiedAccount(''), 2000);
  };

  const AccountItem = ({ name, bank, account, accountId }: {
    name: string;
    bank: string;
    account: string;
    accountId: string;
  }) => (
    <div className="mb-3 last:mb-0">
      <p className="text-sm text-gray-600">{name}</p>
      <div className="flex items-center justify-between">
        <p className="font-medium">{bank} {account}</p>
        <button
          onClick={() => copyToClipboard(account, accountId)}
          className="ml-2 px-3 py-1 text-xs bg-pink-500 text-white rounded hover:bg-pink-600 transition-colors"
        >
          {copiedAccount === accountId ? '복사됨!' : '복사'}
        </button>
      </div>
    </div>
  );

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-md mx-auto px-8">
        <h2 className="text-3xl font-serif mb-8 text-center text-gray-800">마음 전하기</h2>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <p className="text-center text-gray-600 mb-6">
            참석이 어려우신 분들을 위해<br />
            계좌번호를 남겨드립니다.
          </p>

          <div className="space-y-4">
            <div className="border rounded-lg">
              <button
                onClick={() => setShowAccount({ ...showAccount, groom: !showAccount.groom })}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-800">신랑측 계좌번호</span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transform transition-transform ${showAccount.groom ? 'rotate-180' : ''}`} />
              </button>
              {showAccount.groom && (
                <div className="border-t p-4 bg-gray-50">
                  <AccountItem
                    name="신랑 이봉구"
                    bank="국민은행"
                    account="123-456-789012"
                    accountId="groom1"
                  />
                  <AccountItem
                    name="신랑 아버지 이성화"
                    bank="신한은행"
                    account="987-654-321098"
                    accountId="groom2"
                  />
                </div>
              )}
            </div>

            <div className="border rounded-lg">
              <button
                onClick={() => setShowAccount({ ...showAccount, bride: !showAccount.bride })}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-800">신부측 계좌번호</span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transform transition-transform ${showAccount.bride ? 'rotate-180' : ''}`} />
              </button>
              {showAccount.bride && (
                <div className="border-t p-4 bg-gray-50">
                  <AccountItem
                    name="신부 이수정"
                    bank="우리은행"
                    account="111-222-333444"
                    accountId="bride1"
                  />
                  <AccountItem
                    name="신부 아버지 이강준"
                    bank="하나은행"
                    account="555-666-777888"
                    accountId="bride2"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 푸터 섹션
const FooterSection = () => {
  return (
    <footer className="py-12 bg-pink-100">
      <div className="text-center">
        <Heart className="w-8 h-8 mx-auto mb-4 text-pink-500" />
        <p className="text-gray-600 text-sm">
          봉구 & 수정의 결혼식에 초대합니다
        </p>
        <p className="text-gray-500 text-xs mt-2">
          2025.12.13
        </p>
      </div>
    </footer>
  );
};

// 메인 앱 컴포넌트
export default function WeddingInvitation() {
  const [showMusicPrompt, setShowMusicPrompt] = useState(true);
  const musicControllerRef = useRef<{ play: () => void } | null>(null);

  useEffect(() => {
    // 스크롤 애니메이션을 위한 Intersection Observer
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
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>

      {/* 음악 재생 안내 팝업 */}
      {showMusicPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <div className="text-center">
              <Music className="w-12 h-12 mx-auto mb-4 text-pink-500" />
              <h3 className="text-lg font-semibold mb-2">배경음악을 재생하시겠습니까?</h3>
              <p className="text-sm text-gray-600 mb-6">
                청첩장과 함께 아름다운 음악을 들으실 수 있습니다
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowMusicPrompt(false);
                    // ref를 통한 음악 재생
                    if (musicControllerRef.current) {
                      musicControllerRef.current.play();
                    }
                  }}
                  className="flex-1 bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors"
                >
                  재생
                </button>
                <button
                  onClick={() => setShowMusicPrompt(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  나중에
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
      <FooterSection />
    </div>
  );
}