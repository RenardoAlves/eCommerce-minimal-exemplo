import { BrowserRouter } from "react-router-dom"
import Layout from "./components/Layout"
import MainRoutes from "./routes"

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <MainRoutes/>
      </Layout>
    </BrowserRouter>
  )
}

export default App