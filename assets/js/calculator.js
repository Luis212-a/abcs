/* ══════════════════════════════════════════════════════════════════════
   SOLAR CALCULATOR — Real-time calculation and ROI estimation
═════════════════════════════════════════════════════════════════════ */

class SolarCalculator {
  constructor() {
    this.inputs = {
      consumption: document.getElementById('consumption'),
      rate: document.getElementById('rate'),
      property: document.getElementById('property'),
      financing: document.getElementById('financing'),
    };

    this.outputs = {
      annual: document.getElementById('annual'),
      thirty: document.getElementById('thirty'),
      co2: document.getElementById('co2'),
      power: document.getElementById('power'),
      investment: document.getElementById('investment'),
      monthlyText: document.getElementById('monthly-text'),
      roi: document.getElementById('roi'),
    };

    this.init();
  }

  init() {
    // Listen for changes
    Object.values(this.inputs).forEach((input) => {
      if (input) {
        input.addEventListener('change', () => this.calculate());
        input.addEventListener('input', () => this.calculate());
      }
    });

    // Initial calculation
    this.calculate();
  }

  calculate() {
    // Get input values
    const consumption = parseInt(this.inputs.consumption.value) || 0;
    const rate = parseFloat(this.inputs.rate.value) || 2.5;
    const property = this.inputs.property.value || 'residential';
    const financing = this.inputs.financing.value || 'cash';

    if (consumption === 0) {
      this.updateOutputs(0, 0, 0, 0, 0, 0, 0);
      return;
    }

    // Calculations
    const monthlyBill = consumption * rate;
    const annualBill = monthlyBill * 12;

    // System size estimation (1 kW produces ~1.3 MWh/year in Mexico)
    const estimatedPowerKw = Math.ceil(consumption / 400); // Conservative estimate
    const annualProduction = estimatedPowerKw * 1300; // kWh/year

    // Annual savings
    const annualSavings = annualProduction * rate;

    // Investment calculation (aprox $2,000-2,500 per kW installed)
    const costPerKw = property === 'residential' ? 2200 : property === 'commercial' ? 2000 : 1800;
    const investment = estimatedPowerKw * costPerKw;

    // Apply financing discount
    let finalInvestment = investment;
    let monthlyPayment = 0;

    if (financing === 'cash') {
      finalInvestment = investment * 0.85; // 15% discount
    } else if (financing === '25years') {
      monthlyPayment = (investment / 300) * 0.8; // Approx payment over 25 years, lower interest
    } else if (financing === '20years') {
      monthlyPayment = (investment / 240) * 0.85;
    }

    // 30-year savings
    const thirtyYearSavings = annualSavings * 30;

    // CO2 reduction (1 MWh = 0.55 tons CO2)
    const co2Tons = Math.round((annualProduction * 25 * 0.55) / 1000);

    // ROI (break-even in years)
    const roi = Math.ceil(finalInvestment / annualSavings);

    // Update outputs
    this.updateOutputs(
      Math.round(annualSavings),
      Math.round(thirtyYearSavings),
      co2Tons,
      estimatedPowerKw,
      Math.round(finalInvestment),
      monthlyPayment,
      roi
    );
  }

  updateOutputs(annual, thirty, co2, power, investment, monthlyPayment, roi) {
    this.outputs.annual.textContent = annual.toLocaleString('es-MX');
    this.outputs.thirty.textContent = thirty.toLocaleString('es-MX');
    this.outputs.co2.textContent = co2;
    this.outputs.power.textContent = power.toFixed(1);
    this.outputs.investment.textContent = investment.toLocaleString('es-MX');
    this.outputs.roi.textContent = roi;

    // Monthly payment text
    if (monthlyPayment > 0) {
      this.outputs.monthlyText.textContent = `$${Math.round(monthlyPayment).toLocaleString('es-MX')}`;
    } else {
      this.outputs.monthlyText.textContent = '—';
    }
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new SolarCalculator();
  });
} else {
  new SolarCalculator();
}
