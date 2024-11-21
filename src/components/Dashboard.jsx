import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

export default function Dashboard({ trades }) {
  const calculateStats = () => {
    const totalTrades = trades.length
    const wins = trades.filter(t => t.outcome === 'win').length
    const losses = trades.filter(t => t.outcome === 'loss').length
    const winRate = totalTrades ? ((wins / totalTrades) * 100).toFixed(2) : 0
    
    const profitLoss = trades.reduce((total, trade) => {
      if (trade.outcome === 'win') {
        return total + (parseFloat(trade.riskAmount) * parseFloat(trade.riskReward))
      } else if (trade.outcome === 'loss') {
        return total - parseFloat(trade.riskAmount)
      }
      return total
    }, 0)

    return {
      totalTrades,
      wins,
      losses,
      winRate,
      profitLoss: profitLoss.toFixed(2)
    }
  }

  const stats = calculateStats()
  
  const equityCurveData = trades.reduce((acc, trade, index) => {
    const previousEquity = acc.length > 0 ? acc[acc.length - 1].equity : 0
    const tradeResult = trade.outcome === 'win' 
      ? parseFloat(trade.riskAmount) * parseFloat(trade.riskReward)
      : trade.outcome === 'loss' 
        ? -parseFloat(trade.riskAmount) 
        : 0
    
    acc.push({
      trade: index + 1,
      equity: previousEquity + tradeResult
    })
    return acc
  }, [])

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Trading Statistics</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="text-sm text-gray-500">Total Trades</h3>
          <p className="text-2xl font-bold">{stats.totalTrades}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="text-sm text-gray-500">Win Rate</h3>
          <p className="text-2xl font-bold">{stats.winRate}%</p>
        </div>
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="text-sm text-gray-500">Profit/Loss</h3>
          <p className="text-2xl font-bold">${stats.profitLoss}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="text-sm text-gray-500">W/L Ratio</h3>
          <p className="text-2xl font-bold">{stats.wins}:{stats.losses}</p>
        </div>
      </div>

      {trades.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Equity Curve</h3>
          <LineChart
            width={600}
            height={300}
            data={equityCurveData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="trade" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="equity" stroke="#8884d8" />
          </LineChart>
        </div>
      )}
    </div>
  )
}
