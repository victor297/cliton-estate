//For formatting amount
const formatCurrency = function (number) {
  // Convert number to string
  const strNumber = String(number);

  // Split the number into whole and decimal parts
  const [wholePart, decimalPart] = strNumber.split(".");

  // Format the whole part with commas
  let formattedNumber = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Add currency symbol
  formattedNumber = "₦" + formattedNumber;

  // Round up the decimal part to 2 decimal places
  if (decimalPart) {
    const roundedDecimal =
      Math.ceil(parseFloat("0." + decimalPart) * 100) / 100;
    formattedNumber += "." + roundedDecimal.toFixed(2).slice(-2);
  } else {
    formattedNumber += ".00";
  }
  return formattedNumber;
};

export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
};

function formatZeroes(numberString) {
  const number = parseFloat(numberString);

  if (isNaN(number)) {
    // Return the original string if it's not a valid number
    return numberString;
  }

  if (number >= 1e6) {
    // If the number is in millions, format it with "m"
    return (number / 1e6).toFixed(1) + "m";
  } else if (number >= 1e3) {
    // If the number is in thousands, format it with "k"
    return (number / 1e3).toFixed(1) + "k";
  }

  // Return the original number if it's less than 1000
  return number.toString();
}

export const formatNumber = {
  formatCurrency,
  formatTime,
  formatZeroes,
};
