import { createRoot } from 'react-dom/client'
import './index.css'

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 rounded-xl shadow-lg bg-white">
        <h1 className="text-2xl font-bold text-purple-600">Tailwind está funcionando!</h1>
        <p className="mt-2 text-gray-600">Se você vê cores e espaçamento, o Tailwind foi aplicado.</p>
      </div>
    </div>
  )
}

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(<App />)
