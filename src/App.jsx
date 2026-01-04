import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Customers from './pages/Customers'
import Accounting from './pages/Accounting'
import Planning from './pages/Planning'

export default function App() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <Routes>
          <Route path="/" element={<Navigate to="/customers" replace />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/accounting" element={<Accounting />} />
          <Route path="/planning" element={<Planning />} />
        </Routes>
      </main>
    </div>
  )
}
