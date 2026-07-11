import { useMemo, useState } from 'react'
import { EnquiryForm } from '../common/EnquiryForm'
import './EmiCalculator.css'

const toNumber = (value) => Number(String(value).replace(/[^0-9.]/g, '')) || 0
const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0, style: 'currency', currency: 'INR' }).format(value)

export function EmiCalculator({ property }) {
  const initialPrice = property.budget || toNumber(property.price)
  const [price, setPrice] = useState(initialPrice)
  const [downPayment, setDownPayment] = useState(Math.round(initialPrice * 0.2))
  const [interestRate, setInterestRate] = useState(8.5)
  const [tenure, setTenure] = useState(20)
  const [showForm, setShowForm] = useState(false)

  const result = useMemo(() => {
    const loanAmount = Math.max(0, price - downPayment)
    const monthlyRate = interestRate / 12 / 100
    const months = tenure * 12
    const emi = loanAmount > 0 && monthlyRate > 0 && months > 0
      ? (loanAmount * monthlyRate * ((1 + monthlyRate) ** months)) / (((1 + monthlyRate) ** months) - 1)
      : 0
    const totalPayment = emi * months
    const totalInterest = Math.max(0, totalPayment - loanAmount)

    return { emi, loanAmount, totalInterest, totalPayment }
  }, [downPayment, interestRate, price, tenure])

  return (
    <section className="emi-calculator">
      <div>
        <p className="eyebrow">Home Loan Assistance</p>
        <h2>Estimate your monthly EMI</h2>
        <p>This calculation is an estimate only. Actual loan terms may vary by lender, applicant profile, and applicable charges.</p>
      </div>
      <div className="emi-calculator__grid">
        <label>
          Property price
          <input min="0" type="number" value={price} onChange={(event) => setPrice(Math.max(0, Number(event.target.value) || 0))} />
        </label>
        <label>
          Down payment
          <input min="0" type="number" value={downPayment} onChange={(event) => setDownPayment(Math.max(0, Number(event.target.value) || 0))} />
        </label>
        <label>
          Interest rate (%)
          <input min="0" step="0.1" type="number" value={interestRate} onChange={(event) => setInterestRate(Math.max(0, Number(event.target.value) || 0))} />
        </label>
        <label>
          Tenure (years)
          <input min="1" type="number" value={tenure} onChange={(event) => setTenure(Math.max(1, Number(event.target.value) || 1))} />
        </label>
      </div>
      <div className="emi-results">
        <article>
          <span>Loan Amount</span>
          <strong>{formatCurrency(result.loanAmount)}</strong>
        </article>
        <article>
          <span>Monthly EMI</span>
          <strong>{formatCurrency(result.emi)}</strong>
        </article>
        <article>
          <span>Total Interest</span>
          <strong>{formatCurrency(result.totalInterest)}</strong>
        </article>
        <article>
          <span>Total Payment</span>
          <strong>{formatCurrency(result.totalPayment)}</strong>
        </article>
      </div>
      <button className="button primary" type="button" onClick={() => setShowForm((current) => !current)}>
        Request Home Loan Assistance
      </button>
      {showForm && (
        <EnquiryForm
          propertyName={property.title}
          source="Home Loan Assistance"
          sourcePage={`/property/${property.slug}`}
          title="Home Loan Assistance"
        />
      )}
    </section>
  )
}
