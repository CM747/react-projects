export function calculateLumpsumInvestment({
  investmentAmount,
  numberOfYears,
  rateOfInterestPA,
}) {
  const annualReturns = [];
  let totalAmount = investmentAmount;

  for (let i = 0; i < numberOfYears; i++) {
    let interest = Math.round(totalAmount * (rateOfInterestPA / 100));
    totalAmount += interest;
    annualReturns.push({
      year: i + 1,
      interest: interest,
      totalAmount: totalAmount,
      totalInvested: investmentAmount,
    });
  }

  return annualReturns;
}

export function calculateSIPInvestment({
  initialInvestmentAmount,
  monthlySPIAmount,
  numberOfYears,
  rateOfInterestPA,
}) {
  const annualReturns = [];
  let totalAmount = initialInvestmentAmount;
  let totalInvested = initialInvestmentAmount;
  let monthlyInterest = parseFloat(
    (Math.pow(1 + rateOfInterestPA, 1 / 12) - 1).toFixed(2)
  );

  for (let i = 0; i < numberOfYears; i++) {
    let interest = 0;
    for (let j = 0; j < 12; j++) {
      interest += Math.round(totalAmount * (monthlyInterest / 100));
      totalAmount += interest + monthlySPIAmount;
      totalInvested += monthlySPIAmount;
    }
    if (i == numberOfYears - 1) {
      annualReturns.push({
        year: i + 1,
        interest: interest,
        totalAmount: totalAmount - monthlySPIAmount,
        totalInvested: totalInvested - monthlySPIAmount,
      });
    } else {
      annualReturns.push({
        year: i + 1,
        interest: interest,
        totalAmount: totalAmount,
        totalInvested: totalInvested,
      });
    }
  }

  return annualReturns;
}

export function formatINR(value) {
  return value.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });
}
