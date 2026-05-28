import moment from "moment";

//Helping Function Definations


export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
    // Requires at least 8 characters, one uppercase, one lowercase, one number and one special character
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;

    return hasLowercase && hasUppercase && hasNumber && hasSpecial && isLongEnough;
};

export const getInitials = (name) => {
    if (!name) return "";

    const words = name.split(" ");
    let intials = "";

    for (let i = 0; i < Math.min(words.length, 2); i++) {
        intials += words[i][0];
    }

    return intials.toUpperCase();
};

export const addThousandSeparator = (num) => {
    if (num == null || isNaN(num)) return "";

    const [integerPart, fractionalPart] = num.toString().split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return fractionalPart
        ? `${formattedInteger}.${fractionalPart}`
        : formattedInteger;


}

export const prepareExpenseBarChartData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((item) => ({
        month: moment(item?.date).format('DD MMM'),
        amount: item?.amount,
        category: item?.category,
    }));

    return chartData;
};


export const prepareIncomeBarChartData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date))

    const chartData = sortedData.map((item) => ({
        month: moment(item?.date).format('DD MMM'),
        amount: item?.amount,
        source: item?.source,
    }));

    return chartData;
};