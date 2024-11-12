import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function InputLabel({
    type,
    label,
    placeholder,
    onChange,
  }: {
    type: string;
    label: string;
    placeholder: string;
    onChange: () => void;
  }) {
    return (
      <div className='mb-4'>
        <Label className='font-normal text-base mx-1 mb-2 text-slate-600'>{label}</Label>
        <Input placeholder={placeholder} type={type} onChange={onChange} className='' />
      </div>
    );
  }
  