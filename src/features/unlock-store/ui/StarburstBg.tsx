export const StarburstBg = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-gradient-to-tr from-fuchsia-300 via-pink-200 to-cyan-300">
      {/* repeating-conic-gradient — 중앙 얇고 바깥 넓어지는 삼각형 빛살
          Tailwind translate 클래스 사용 금지: animation의 transform과 충돌함
          대신 margin으로 중앙 정렬 */}
      <div
        style={{
          position: 'absolute',
          width: '200vmax',
          height: '200vmax',
          top: '50%',
          left: '50%',
          marginTop: '-100vmax',
          marginLeft: '-100vmax',
          background: `repeating-conic-gradient(
            from 0deg,
            rgba(255, 255, 255, 0.18) 0deg 10deg,
            transparent 10deg 20deg
          )`,
          animation: 'starburst-spin 60s linear infinite',
        }}
      />
    </div>
  );
};
