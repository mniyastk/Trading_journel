import { useState } from 'react'

const TRADING_PAIRS = {
  forex: ['EUR/USD', 'GBP/USD', 'USD/JPY', 'USD/CHF', 'AUD/USD'],
  commodities: ['GOLD', 'SILVER', 'OIL', 'NATURAL GAS'],
  indices: ['S&P 500', 'NASDAQ', 'DOW JONES', 'FTSE 100', 'DAX']
}

const RISK_REWARD_RATIOS = [
  '1:1', '1:2', '1:3', '1:4', '1:5',
  '2:1', '2:3', '2:4', '2:5',
  '3:1', '3:2', '3:4', '3:5'
]

export default function TradeForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    type: 'forex',
    pair: '',
    direction: 'buy',
    riskRewardRatio: '1:1',
    customRatio: '',
    riskAmount: '',
    outcome: 'win',
    notes: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      riskRewardRatio: formData.riskRewardRatio === 'custom' ? formData.customRatio : formData.riskRewardRatio
    })
    setFormData({
      date: new Date().toISOString().split('T')[0],
      type: 'forex',
      pair: '',
      direction: 'buy',
      riskRewardRatio: '1:1',
      customRatio: '',
      riskAmount: '',
      outcome: 'win',
      notes: ''
    })
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">New Trade</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Date</label>
          <input
            type="date"
            className="w-full p-2 border rounded"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-2">Type</label>
          <select
            className="w-full p-2 border rounded"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value, pair: '' })}
          >
            <option value="forex">Forex</option>
            <option value="commodities">Commodities</option>
            <option value="indices">Indices</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">Pair/Asset</label>
          <select
            className="w-full p-2 border rounded"
            value={formData.pair}
            onChange={(e) => setFormData({ ...formData, pair: e.target.value })}
          >
            <option value="">Select Pair</option>
            {TRADING_PAIRS[formData.type].map(pair => (
              <option key={pair} value={pair}>{pair}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2">Direction</label>
          <select
            className="w-full p-2 border rounded"
            value={formData.direction}
            onChange={(e) => setFormData({ ...formData, direction: e.target.value })}
          >
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">Risk:Reward Ratio</label>
          <select
            className="w-full p-2 border rounded mb-2"
            value={formData.riskRewardRatio}
            onChange={(e) => setFormData({ ...formData, riskRewardRatio: e.target.value })}
          >
            {RISK_REWARD_RATIOS.map(ratio => (
              <option key={ratio} value={ratio}>{ratio}</option>
            ))}
            <option value="custom">Custom</option>
          </select>
          
          {formData.riskRewardRatio === 'custom' && (
            <input
              type="text"
              placeholder="Enter custom ratio (e.g., 1:2.5)"
              className="w-full p-2 border rounded"
              value={formData.customRatio}
              onChange={(e) => setFormData({ ...formData, customRatio: e.target.value })}
            />
          )}
        </div>

        <div>
          <label className="block mb-2">Risk Amount ($)</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={formData.riskAmount}
            onChange={(e) => setFormData({ ...formData, riskAmount: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-2">Outcome</label>
          <select
            className="w-full p-2 border rounded"
            value={formData.outcome}
            onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
          >
            <option value="win">Win</option>
            <option value="loss">Loss</option>
            <option value="breakeven">Break Even</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">Notes</label>
          <textarea
            className="w-full p-2 border rounded"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows="3"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Add Trade
        </button>
      </form>
    </div>
  )
}