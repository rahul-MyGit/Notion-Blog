import { ChangeEvent } from "react";

interface InputLabeType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function Input({label, placeholder, onChange, type}: InputLabeType) {
  return (
    <div className="pt-4">
        <label className="block mb-2 text-sm text-gray-900 font-semibold">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
  )
}

export default Input