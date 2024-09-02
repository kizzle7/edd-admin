

export const amountFormat = (value, extraZeros,curr) => {
    const zeros = extraZeros ? extraZeros : 2;
    // ₦
    return `${curr}${value?.toLocaleString(undefined, {
      minimumFractionDigits: zeros,
      maximumFractionDigits: zeros,
    })}`
  };