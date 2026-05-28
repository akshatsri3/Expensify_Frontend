import React from 'react';
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS = ["#875cf5", "#fa2c37", "#ff6900"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {

    const balanceData = [
        { name: "Total Balance", amount: totalBalance },
        { name: "Total Expenses", amount: totalExpense },
        { name: "Total Income", amount: totalIncome },
    ];

    const stats = [
        { label: "Total Balance", value: totalBalance, color: "#875cf5" },
        { label: "Total Income", value: totalIncome, color: "#ff6900" },
        { label: "Total Expenses", value: totalExpense, color: "#fa2c37" },
    ];

    return (
        <div className="card">
            <h5 className="text-lg font-medium text-gray-900 mb-4">Financial Overview</h5>

            {totalBalance === 0 && totalIncome === 0 && totalExpense === 0 ? (
                <div className="h-[300px] flex items-center justify-center text-gray-400 text-sm">
                    No data available
                </div>
            ) : (
                <>
                    <CustomPieChart
                        data={balanceData}
                        label="Total Balance"
                        totalAmount={`₹${totalBalance}`}
                        colors={COLORS}
                        showTextAnchor
                    />

                    {/* Custom stat rows */}
                    <div className="flex flex-col gap-3 mt-4">
                        {stats.map((stat) => (
                            <div key={stat.label} className="flex items-center justify-between px-2">
                                <div className="flex items-center gap-2">
                                    <span
                                        className="w-2.5 h-2.5 rounded-full shrink-0"
                                        style={{ backgroundColor: stat.color }}
                                    />
                                    <span className="text-sm text-gray-500">{stat.label}</span>
                                </div>
                                <span className="text-sm font-semibold text-gray-800">
                                    ₹{stat.value?.toLocaleString()}
                                </span>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default FinanceOverview;
