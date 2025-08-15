import React, { useState, useEffect } from 'react';
import { Eye, RotateCw, X, ZoomIn, ZoomOut } from 'lucide-react';

// 실물 청첩장 섹션 컴포넌트만 export
export const PhysicalInvitationSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rotation, setRotation] = useState({ x: -15, y: 25, z: 15 });
  const [scale, setScale] = useState(0.9); // 모바일에 맞춰 축소
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  // 화면 크기에 따른 초기 스케일 설정
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 375) {
        setScale(0.7);
      } else if (window.innerWidth < 640) {
        setScale(0.8);
      } else {
        setScale(1.0);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 자동 회전
  useEffect(() => {
    if (!isOpen || !isAutoRotating) return;

    const interval = setInterval(() => {
      setRotation(prev => ({
        x: prev.x,
        y: prev.y + 1.5,
        z: prev.z
      }));
    }, 30);

    return () => clearInterval(interval);
  }, [isOpen, isAutoRotating]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setIsAutoRotating(false);
    setDragStart({ x: e.clientX, y: e.clientY });
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStart.x;

    setRotation(prev => ({
      x: prev.x,  // x축 회전 제거 - 위아래 움직임 차단
      y: prev.y + deltaX * 0.5,  // y축 회전만 허용 - 좌우 회전문 효과
      z: prev.z
    }));

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setIsAutoRotating(false);
    const touch = e.touches[0];
    setDragStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - dragStart.x;

    setRotation(prev => ({
      x: prev.x,  // x축 회전 제거 - 위아래 움직임 차단
      y: prev.y + deltaX * 0.5,  // y축 회전만 허용 - 좌우 회전문 효과
      z: prev.z
    }));

    setDragStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 2.5));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleFlip = () => {
    setRotation(prev => ({ ...prev, y: prev.y + 180 }));
  };

  const resetView = () => {
    const defaultScale = window.innerWidth < 375 ? 0.7 : window.innerWidth < 640 ? 0.8 : 1.0;
    setRotation({ x: -15, y: 25, z: 15 });
    setScale(defaultScale);
    setIsAutoRotating(true);
  };

  return (
    <>
      {/* 기존 청첩장 스타일에 맞춘 섹션 */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="max-w-md mx-auto px-6 sm:px-8">
          {/* 섹션 타이틀 - SectionTitle 컴포넌트 스타일 재현 */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-light text-gray-800 mb-2">실물 청첩장</h2>
            <p className="text-xs sm:text-sm text-gray-500 tracking-widest">PHYSICAL INVITATION</p>
          </div>

          {/* 카드 디자인 - 기존 스타일 매칭 */}
          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-100">
            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-rose-400" />
              </div>
              <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-2 sm:mb-3">
                종이 청첩장 보기
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                실제 발송된 청첩장을<br />
                3D로 확인하실 수 있습니다
              </p>

              <button
                onClick={() => setIsOpen(true)}
                className="bg-rose-400 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl hover:bg-rose-500 transition-all duration-300 hover:shadow-lg text-xs sm:text-sm"
              >
                청첩장 열어보기
              </button>
            </div>
          </div>

          {/* 안내 문구 */}
          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-[10px] sm:text-xs text-gray-400">
              💌 마우스로 드래그하여 회전시킬 수 있습니다
            </p>
          </div>
        </div>
      </section>

      {/* 3D 뷰어 - 전체 화면 */}
      {isOpen && (
        <div className="fixed inset-0 bg-black z-[100]">
          <style>{`
            .preserve-3d {
              transform-style: preserve-3d;
            }
            
            /* 터치 장치에서 선택 방지 */
            .preserve-3d {
              -webkit-touch-callout: none;
              -webkit-user-select: none;
              user-select: none;
              -webkit-tap-highlight-color: transparent;
            }
          `}</style>

          {/* 닫기 버튼 */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-2 sm:p-3 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full transition-colors"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>

          {/* 3D 뷰어 영역 */}
          <div
            className="w-full h-full flex items-center justify-center relative"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* 중앙 정렬을 위한 컨테이너 */}
            <div className="relative flex items-center justify-center">
              <div
                className="relative"
                style={{
                  transform: `scale(${scale})`,
                  transition: isDragging ? 'none' : 'transform 0.3s ease'
                }}
              >
                <div
                  className="relative preserve-3d"
                  style={{
                    transform: `perspective(1200px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`,
                    transformStyle: 'preserve-3d',
                    transition: isDragging ? 'none' : 'transform 0.3s ease',
                    cursor: isDragging ? 'grabbing' : 'grab'
                  }}
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleTouchStart}
                >
                  {/* 청첩장 앞면 - 모바일 최적화 */}
                  <div
                    className="absolute w-[260px] h-[364px] xs:w-[300px] xs:h-[420px] sm:w-[350px] sm:h-[490px] md:w-[400px] md:h-[560px] bg-white rounded-lg overflow-hidden"
                    style={{
                      transform: 'translateX(-50%) translateY(-50%) rotateY(0deg) translateZ(10px)',  // 순서 통일
                      left: '50%',
                      top: '50%',
                      backfaceVisibility: 'hidden',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)'
                    }}
                  >
                    <img
                      src="./images/physics-front.png"
                      alt="청첩장 앞면"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* 청첩장 뒷면 - 모바일 최적화 */}
                  <div
                    className="absolute w-[260px] h-[364px] xs:w-[300px] xs:h-[420px] sm:w-[350px] sm:h-[490px] md:w-[400px] md:h-[560px] bg-white rounded-lg overflow-hidden"
                    style={{
                      transform: 'translateX(-50%) translateY(-50%) rotateY(180deg) translateZ(10px)',  // 순서 변경!
                      left: '50%',
                      top: '50%',
                      backfaceVisibility: 'hidden',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)'
                    }}
                  >
                    <img
                      src="./images/physics-back.png"
                      alt="청첩장 뒷면"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* 그림자 효과 - 위치 조정 */}
                  <div
                    className="absolute w-[260px] h-[364px] xs:w-[300px] xs:h-[420px] sm:w-[350px] sm:h-[490px] md:w-[400px] md:h-[560px] bg-black/20 rounded-lg blur-3xl"
                    style={{
                      transform: 'translateZ(-30px) translateY(20px)',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 하단 컨트롤 - 모바일 최적화 */}
          <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-3 bg-white/10 backdrop-blur-md rounded-full p-1 sm:p-2">
            <button
              onClick={handleZoomOut}
              className="p-2 sm:p-3 hover:bg-white/10 rounded-full transition-colors text-white"
              title="축소"
            >
              <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={handleZoomIn}
              className="p-2 sm:p-3 hover:bg-white/10 rounded-full transition-colors text-white"
              title="확대"
            >
              <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="w-px h-6 sm:h-8 bg-white/20" />

            <button
              onClick={handleFlip}
              className="p-2 sm:p-3 hover:bg-white/10 rounded-full transition-colors text-white"
              title="뒤집기"
            >
              <RotateCw className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={resetView}
              className="px-3 py-1.5 sm:px-4 sm:py-2 hover:bg-white/10 rounded-full transition-colors text-white text-xs sm:text-sm"
            >
              초기화
            </button>
          </div>

          {/* 안내 텍스트 - 모바일 최적화 */}
          <div className="absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 text-center px-4">
            <p className="text-white/60 text-xs sm:text-sm">
              {isAutoRotating ? '자동 회전 중... 터치하여 수동 조작' : '드래그하여 회전시켜 보세요'}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

// 기본 export - 메인 파일에서 import 시 사용
export default PhysicalInvitationSection;