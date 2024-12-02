"use client";

import { Handle, Position } from "@xyflow/react";

export interface TriggerData {
  name: string;
  description?: string;
  id: string;
  metaData?: Object;
  image: string;
}

export const TriggerNode = ({ data }: { data: TriggerData }) => (
  <div className='px-4 border-2 shadow-md rounded-md border-stone-500'>
    <div className='flex justify-center'>
      <div>
        <img src={data.image} width={20} height={20} alt='trigger' />
      </div>
      <div>
        <h3 className='text-lg font-bold'>{data.name}</h3>
        <p className='text-sm'>{data.description}</p>
      </div>
    </div>
    <Handle
      position={Position.Bottom}
      className='w-2 rounded-xl bg-blue-500'
      type='source'
    />
  </div>
);
