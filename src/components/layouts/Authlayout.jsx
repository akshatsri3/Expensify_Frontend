import React from 'react';
import login from "../../assets/images/login.png";
import { LuTrendingUpDown } from 'react-icons/lu';

const Authlayout = ({ children }) => {
    return (
        <div className="flex h-screen w-screen overflow-hidden">
            {/* Left panel */}
            <div className="w-full md:w-[60vw] h-full flex flex-col px-12 pt-8 pb-12 overflow-y-auto">
                <h2 className="text-lg font-semibold text-[#6366F1] mb-auto">
                    💰 Expense Tracker
                </h2>
                <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto">
                    {children}
                </div>
            </div>

            {/* Right panel */}
            <div className="hidden md:flex md:w-[40vw] h-full bg-[#6366F1] overflow-hidden p-8 relative flex-col items-center justify-between">
                {/* Decorative blobs */}
                <div className="w-48 h-48 rounded-[40px] bg-orange-500 absolute -top-7 -left-5 z-0" />
                <div className="w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-400 absolute top-[30%] -right-[10%] z-0" />
                <div className="w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5 z-0" />

                {/* Stats card */}
                <div className="relative z-10 w-full mt-6">
                    <StatsInfoCard
                        icon={<LuTrendingUpDown />}
                        label="Track Your Income & Expenses"
                        value="₹4,30,000"
                        color="bg-[#6366F1]"
                    />
                </div>

                {/* Illustration */}
                <div className="relative z-10 flex-1 flex items-end justify-center pb-4">
                    <img
                        src={login}
                        alt="Finance illustration"
                        className="w-[80%] max-w-xs drop-shadow-2xl"
                    />
                </div>
            </div>
        </div>
    );
};

export default Authlayout;

const StatsInfoCard = ({ icon, label, value, color }) => {
    return (
        <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-lg">
            <div
                className={`w-12 h-12 flex items-center justify-center text-[22px] text-white ${color} rounded-full drop-shadow-lg shrink-0`}
            >
                {icon}
            </div>
            <div>
                <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                <span className="text-xl font-bold text-slate-800">{value}</span>
            </div>
        </div>
    );
};