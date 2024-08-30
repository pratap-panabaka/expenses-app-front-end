import ReactDOM from 'react-dom/client'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { ModalContextProvider } from './context/ModalContext.jsx'
import { ExpensesContextProvider } from './context/ExpensesContext.jsx'
import { ContactsContextProvider } from './context/ContactsContext.jsx'
import App from './App.jsx'
import './index.css'

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <AuthContextProvider>
      <ModalContextProvider>
        <ContactsContextProvider>
          <ExpensesContextProvider>
            <App />
          </ExpensesContextProvider>
        </ContactsContextProvider>
      </ModalContextProvider>
    </AuthContextProvider>
  )
