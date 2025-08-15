import React, { useState, useRef, useEffect } from 'react';
import { Eye, X } from 'lucide-react';

// 실물 청첩장 섹션 컴포넌트
export const PhysicalInvitationSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rotationY, setRotationY] = useState(25);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [velocity, setVelocity] = useState(0);
  const animationRef = useRef<number>(0);

  // 자동 회전 및 관성 효과
  useEffect(() => {
    if (!isOpen) return;

    const animate = () => {
      if (isAutoRotating && !isDragging) {
        setRotationY(prev => prev + 0.5);
      } else if (!isDragging && Math.abs(velocity) > 0.01) {
        setRotationY(prev => prev + velocity);
        setVelocity(prev => prev * 0.95);
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isOpen, isAutoRotating, isDragging, velocity]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setIsAutoRotating(false);
    setDragStartX(e.clientX);
    setVelocity(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStartX;
    const newVelocity = deltaX * 0.3;
    setRotationY(prev => prev + newVelocity);
    setVelocity(newVelocity);
    setDragStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setIsAutoRotating(false);
    setDragStartX(e.touches[0].clientX);
    setVelocity(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const deltaX = e.touches[0].clientX - dragStartX;
    const newVelocity = deltaX * 0.3;
    setRotationY(prev => prev + newVelocity);
    setVelocity(newVelocity);
    setDragStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <>
      {/* 기존 청첩장 스타일에 맞춘 섹션 */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="max-w-md mx-auto px-6 sm:px-8">
          {/* 섹션 타이틀 */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-light text-gray-800 mb-2">실물 청첩장</h2>
            <p className="text-xs sm:text-sm text-gray-500 tracking-widest">PHYSICAL INVITATION</p>
          </div>

          {/* 카드 디자인 */}
          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-100">
            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-rose-400" />
              </div>
              <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-2 sm:mb-3">
                종이 청첩장 보기
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                직접 전해드리지 못해 아쉬운 마음을<br />
                디지털 청첩장으로 대신 전합니다
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
              💌 좌우로 드래그하여 회전시킬 수 있습니다
            </p>
          </div>
        </div>
      </section>

      {/* 3D 뷰어 - 전체 화면 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black z-[100]"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <style>{`
            .card-3d {
              transform-style: preserve-3d;
              will-change: transform;
            }
            
            .card-face {
              position: absolute;
              width: 100%;
              height: 100%;
              backface-visibility: hidden;
              -webkit-backface-visibility: hidden;
            }
            
            .card-back {
              transform: rotateY(180deg);
            }
            
            /* 성능 최적화 */
            .gpu-accelerated {
              transform: translateZ(0);
              will-change: transform;
            }
          `}</style>

          {/* 닫기 버튼 */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-2 sm:p-3 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full transition-colors"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>

          {/* 3D 카드 컨테이너 */}
          <div className="w-full h-full flex items-center justify-center gpu-accelerated">
            <div
              className="relative"
              style={{
                perspective: '1000px',
                perspectiveOrigin: '50% 50%'
              }}
            >
              <div
                className="card-3d relative"
                style={{
                  transform: `rotateY(${rotationY}deg) rotateX(-10deg)`,
                  transformOrigin: 'center center',
                  cursor: isDragging ? 'grabbing' : 'grab',
                  width: window.innerWidth < 640 ? '280px' : '350px',
                  height: window.innerWidth < 640 ? '392px' : '490px',
                }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
              >
                {/* 청첩장 앞면 */}
                <div className="card-face bg-white rounded-lg overflow-hidden shadow-2xl">
                  <img
                    src="./images/3d-front.png"
                    alt="청첩장 앞면"
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </div>

                {/* 청첩장 뒷면 */}
                <div className="card-face card-back bg-white rounded-lg overflow-hidden shadow-2xl">
                  <img
                    src="./images/3d-back.png"
                    alt="청첩장 뒷면"
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 하단 컨트롤 */}
          <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-3 bg-white/10 backdrop-blur-md rounded-full p-1 sm:p-2">
            <button
              onClick={() => setIsAutoRotating(!isAutoRotating)}
              className="px-3 py-1.5 sm:px-4 sm:py-2 hover:bg-white/10 rounded-full transition-colors text-white text-xs sm:text-sm"
            >
              {isAutoRotating ? '수동 조작' : '자동 회전'}
            </button>
          </div>

          {/* 안내 텍스트 */}
          <div className="absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 text-center px-4">
            <p className="text-white/60 text-xs sm:text-sm">
              {isAutoRotating ? '터치하여 수동 조작' : '좌우로 드래그하여 회전'}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
