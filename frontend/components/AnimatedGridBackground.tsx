export const AnimatedGridBackground = () => {
  const columns = 6;
  const verticalPositions = [102, 172, 162, 16];

  return (
    <div className='fixed inset-0 w-screen h-screen -z-10'>
      <div className='absolute inset-0 w-full h-full overflow-hidden max-w-[1440px] mx-auto'>
        {/* Blurred gradient overlays */}
        <div className='absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[500px] bg-gradient-radial from-[#EBFF00]/5 to-transparent opacity-50 blur-3xl' />
        <div className='absolute bottom-0 right-0 w-[50%] h-[300px] bg-gradient-radial from-blue-100/10 to-transparent opacity-30 blur-2xl' />

        {/* Vertical Lines */}
        {Array.from({ length: columns }).map((_, i) => (
          <div
            key={`vline-${i}`}
            className='absolute h-full transition-opacity duration-1000'
            style={{
              left: `${(i / (columns - 1)) * 100}%`,
              opacity: i % 2 === 0 ? 0.7 : 0.4,
            }}
          >
            <div className='w-[1px] h-full bg-neutral-200/70 overflow-hidden'>
              <div className='w-full h-40 bg-gradient-to-b from-transparent via-[#EBFF00]/20 to-transparent animate-moveDown' />
            </div>
          </div>
        ))}

        {/* Horizontal Lines */}
        {verticalPositions.map((height, i) => (
          <div
            key={`hline-${i}`}
            className='absolute w-full'
            style={{ top: `${122 + i * 192}px` }}
          >
            <div className='h-[1px] w-full bg-neutral-200/70' />
            {Array.from({ length: columns }).map((_, j) => {
              const isLargeDot =
                (i === 1 && j % 2 === 1) || (i === 3 && j % 3 === 0);
              return (
                <div
                  key={`dot-${i}-${j}`}
                  className={`absolute ${
                    isLargeDot ? "w-5 h-5" : "w-3 h-3"
                  } rounded-full -translate-x-1/2 -translate-y-1/2`}
                  style={{
                    left: `${(j / (columns - 1)) * 100}%`,
                    backgroundColor: isLargeDot
                      ? "rgba(255,255,255,0.9)"
                      : "rgba(230,230,230,0.6)",
                  }}
                >
                  {isLargeDot && (
                    <div className='absolute inset-1 rounded-full bg-white/90 backdrop-blur-sm animate-pulse' />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
