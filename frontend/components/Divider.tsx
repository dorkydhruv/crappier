export default function Divider({
    text
}:{
    text:string
}){
    return  <div className='flex w-full items-center rounded-full'>
    <div className='flex-1 border-b border-gray-300'></div>
    <span className='text-slate-800 text-lg font-semibold leading-8 px-8 py-3'>
      {text}
    </span>
    <div className='flex-1 border-b border-gray-300'></div>
  </div>
}