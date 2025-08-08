import { useState } from "react"
import { GetSection } from "./components/GetSection/GetSection"
import { Header } from "./components/Header/Header"
import { Home } from "./components/Home/Home"
import { PostSection } from "./components/PostSection/PostSection"

function App() {
  const [updateUsersList, setUpdateUsersList] = useState(0);

  return (
    <>
    <Header />

    <Home />

    <GetSection updateUsersList={updateUsersList}/>

    <PostSection setUpdateUsersList={setUpdateUsersList}/>
    </>
  )
}

export default App
