
import { Button } from './components/ui/button'
import { useGetAllCarsQuery } from './redux/api/baseApi'

function App() {

  const {data, isLoading} = useGetAllCarsQuery(undefined)

  if (isLoading) return <p>Loading...</p>

  console.log(data.data);
  

  return (
    <>
      <Button>Click me</Button>
    </>
  )
}

export default App
