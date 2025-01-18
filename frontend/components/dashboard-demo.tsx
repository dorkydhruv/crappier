import { Play } from "lucide-react";

export function DashboardDemo() {
  return (
    <section className='py-16 md:py-24 lg:py-32 relative overflow-hidden'>
      {/* Enhanced decorative elements */}
      <div
        className='absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-48 
        bg-[conic-gradient(from_0deg_at_50%_50%,#EBFF0015,#3b82f620,#EBFF0015)] blur-3xl animate-slow-spin'
      />

      <div className='container mx-auto px-4 max-w-7xl'>
        <div className='max-w-2xl mx-auto text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-950 to-neutral-600 mb-4'>
            See it in action
          </h2>
          <p className='text-neutral-600'>
            Watch how easily you can automate your Solana transactions
          </p>
        </div>

        <div
          className='rounded-2xl p-2 md:p-4 lg:p-6 backdrop-blur-sm bg-white/40 
          shadow-xl hover:shadow-2xl transition-all duration-500 group/container'
        >
          <div
            className='rounded-xl overflow-hidden border border-neutral-200/50 
            bg-white/90 relative group cursor-pointer'
          >
            {/* Enhanced play button overlay */}
            <div
              className='absolute inset-0 flex items-center justify-center 
              bg-gradient-to-tr from-black/30 to-black/10 opacity-0 
              group-hover:opacity-100 transition-all duration-500'
            >
              <div
                className='w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 
                flex items-center justify-center shadow-lg transform 
                group-hover:scale-110 transition-all duration-500 
                hover:shadow-[0_0_30px_-5px_#EBFF00]'
              >
                <Play className='w-8 h-8 text-black translate-x-0.5' />
              </div>
            </div>

            <div className='aspect-[16/9]'>
              <iframe
                width='100%'
                height='100%'
                src='https://www.youtube.com/embed/your-demo-video-id'
                title='Crappier Dashboard Demo'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
                className='border-0'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
