import { BrowserRouter as Router } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import ChatInterface from './components/ChatInterface'
import Header from './components/Header'
import SpaceBackground from './components/SpaceBackground'

function App() {
  return (
    <Router>
      <div className="flex h-screen relative overflow-hidden">
        <SpaceBackground />
        <div className="flex w-full h-full relative z-20">
          <Sidebar />
          <div className="flex flex-col flex-1">
            <Header />
            <main className="flex-1 overflow-hidden">
              <ChatInterface />
            </main>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
