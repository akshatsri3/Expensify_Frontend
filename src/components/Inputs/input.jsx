import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
const Input = ({ value, onChange, label, placeholder, type }) => {
    const [showPassword, setShowPassword] = useState(false);

    const ToggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div>
            <label className="text-[13px] text-slate-800">{label}</label>
            <div className="input-box">
                <input
                    type={type == 'password' ? showPassword ? 'text' : 'password' : type}
                    placeholder={placeholder}
                    className="w-full bg-transparent outline-none"
                    value={value}
                    onChange={(e) => onChange(e)}
                />
                {type === 'password' && (
                    <div onClick={ToggleShowPassword} className="cursor-pointer">
                        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Input;