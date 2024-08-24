import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { ExpensesContextProvider } from './context/ExpensesContext.jsx'
import { ModalContextProvider } from './context/ModalContext.jsx'

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <AuthContextProvider>
      <ExpensesContextProvider>
        <ModalContextProvider>
          <App />
        </ModalContextProvider>
      </ExpensesContextProvider>
    </AuthContextProvider>
  )
