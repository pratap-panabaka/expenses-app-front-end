import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { ExpensesContextProvider } from './context/ExpensesContext.jsx'

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <AuthContextProvider>
      <ExpensesContextProvider>
        <App />
      </ExpensesContextProvider>
    </AuthContextProvider>
  )
