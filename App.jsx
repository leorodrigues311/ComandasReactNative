import { Routes }from './app/routes/Routes'
import { ComandaProvider } from '@/app/context/comandaContext'


const App = () => {

    return (

        <ComandaProvider>
            <Routes/>
        </ComandaProvider>
    )

}

export default App;