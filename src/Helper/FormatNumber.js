


const FormatNumber = ({number}) => {
    const options = { 
        minimumFractionDigits: 2,
        maximumFractionDigits: 2 
    };
    return Number(number).toLocaleString('en', options);
}

export default FormatNumber;