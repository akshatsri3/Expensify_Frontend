import React, { useState, useEffect } from 'react'
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import Modal from "../../components/Modal";
import AddExpenseForm from "../../components/Expense/AddExpenseForm"
import ExpenseList from "../../components/Expense/ExpenseList"
import DeleteAlert from "../../components/DeleteAlert"
import toast from "react-hot-toast";

const Expenses = () => {

    const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);



    //Get All Expense Details
    const fetchExpenseDetails = async () => {
        if (loading) return;

        setLoading(true);
        try {
            const response = await axiosInstance.get(
                `${API_PATHS.EXPENSE.GET_EXPENSE}`
            );
            if (response.data) {
                setExpenseData(response.data)
            }

        } catch (error) {
            console.log("Something went wrong", error);
        } finally {
            setLoading(false);
        }
    };

    //Handle Add Expense
    const handleAddExpense = async (expense) => {
        const { category, amount, icon, date } = expense;

        //Validation Checks

        if (!category.trim()) {
            toast.error("Category is required.");
            return;
        }

        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            toast.error("Amount should be a valid number greater than 0.");
            return;
        }

        if (!date) {
            toast.error("Date is required.");
            return;
        }

        try {
            await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
                category,
                amount,
                date,
                icon,
            });

            setOpenAddExpenseModal(false);
            toast.success("Expense added successfully!");
            fetchExpenseDetails();

        } catch (error) {
            console.error("Error adding expense:", error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || error.message);
        }
    };

    //Delete Expense
    const deleteExpense = async (id) => {
        try {
            await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
            toast.success("Expense deleted successfully!");
            fetchExpenseDetails();
        } catch (error) {
            console.error("Error deleting expense:", error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || error.message);
        }
    };

    //handle download expense details
    const handleDownloadExpenseDetails = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
                responseType: 'blob',
            });

            // Create a temporary URL for the blob
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'expense_details.xlsx');
            document.body.appendChild(link);
            link.click();

            // Cleanup
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading expense details:", error);
            toast.error("Failed to download. Please try again.");
        }
    };


    useEffect(() => {
        fetchExpenseDetails()

        return () => { };
    }, []);

    return (
        <DashboardLayout activeMenu="Expense">
            <div className='my-5 mx-auto'>
                <div className='my-5 mx-auto'>
                    <div className='grid grid-cols-1 gap-6'>
                        <div className=''>
                            <ExpenseOverview
                                transactions={expenseData}
                                onAddExpense={() => setOpenAddExpenseModal(true)}
                            />
                        </div>

                        <ExpenseList
                            transactions={expenseData}
                            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
                            onDownload={handleDownloadExpenseDetails}
                        />

                    </div>

                    <Modal
                        isOpen={openAddExpenseModal}
                        onClose={() => setOpenAddExpenseModal(false)}
                        title="Add Expense"
                        maxWidth="sm"
                    >
                        <AddExpenseForm
                            onAddExpense={handleAddExpense}
                        />
                    </Modal>

                    <Modal
                        isOpen={openDeleteAlert.show}
                        onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                        title="Delete Expense"
                        maxWidth="sm"
                    >
                        <DeleteAlert
                            content="This expense entry will be permanently deleted. This action cannot be undone."
                            onDelete={() => {
                                deleteExpense(openDeleteAlert.data);
                                setOpenDeleteAlert({ show: false, data: null });
                            }}
                            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                        />
                    </Modal>

                </div>
            </div>
        </DashboardLayout>
    )
}

export default Expenses;