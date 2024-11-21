export default function TradeHistory({ trades }) {
    return (
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Trade History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Pair</th>
                <th className="px-6 py-3 text-left">Direction</th>
                <th className="px-6 py-3 text-left">Entry</th>
                <th className="px-6 py-3 text-left">SL</th>
                <th className="px-6 py-3 text-left">TP</th>
                <th className="px-6 py-3 text-left">R:R</th>
                <th className="px-6 py-3 text-left">Risk ($)</th>
                <th className="px-6 py-3 text-left">Outcome</th>
              </tr>
            </thead>
            <tbody>
              {trades.map((trade) => (
                <tr key={trade.id} className="border-t">
                  <td className="px-6 py-4">{new Date(trade.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4">{trade.pair}</td>
                  <td className="px-6 py-4 capitalize">{trade.direction}</td>
                  <td className="px-6 py-4">{trade.entryPrice}</td>
                  <td className="px-6 py-4">{trade.stopLoss}</td>
                  <td className="px-6 py-4">{trade.takeProfit}</td>
                  <td className="px-6 py-4">{trade.riskReward}</td>
                  <td className="px-6 py-4">${trade.riskAmount}</td>
                  <td className="px-6 py-4 capitalize">{trade.outcome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }