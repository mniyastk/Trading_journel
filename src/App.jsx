import { useState, useEffect } from 'react'
import TradeForm from './components/TradeForm'
import Dashboard from './components/Dashboard'
import TradeHistory from './components/TradeHistory'
import { fetchTrades, createTrade, deleteTrade } from './api'

export default function App() {
  const [trades, setTrades] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadTrades()
  }, [])

  const loadTrades = async () => {
    try {
      const data = await fetchTrades()
      setTrades(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAddTrade = async (trade) => {
    try {
      const newTrade = await createTrade(trade)
      setTrades(prev => [newTrade, ...prev])
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDeleteTrade = async (id) => {
    try {
      await deleteTrade(id)
      setTrades(prev => prev.filter(trade => trade._id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">Trading Journal</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TradeForm onSubmit={handleAddTrade} />
        <Dashboard trades={trades} />
      </div>
      <TradeHistory trades={trades} onDelete={handleDeleteTrade} />
    </div>
  )
}