"use client";
export default function CheckedFeature({ title }: { title: string }) {
  return (
    <div className='flex  py-2 gap-2 justify-start items-center'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth='1.5'
        stroke='currentColor'
        className='size-6 '
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
        />
      </svg>

      <div className='text-lg font-normal'>{title}</div>
    </div>
  );
}
