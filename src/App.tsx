import logo from './logo.svg'
import { useAppDispatch, useExampleSelector } from './store';
import { incrementExampleValue, deleteExampleState } from './store/example';
import { Button } from '@mui/material';

function App() {
  const appDispatch = useAppDispatch();
  const exampleState = useExampleSelector();

  const incrementCount = () => {
    appDispatch(incrementExampleValue());
  }

  const removeCount = () => {
    appDispatch(deleteExampleState());
  }

  return (
    <div className="w-screen h-screen p-20 flex flex-col items-center">
      <header className="flex flex-col gap-4">
        <img src={logo} className="w-[100px] sm:w-[200px]" alt="logo" />
        <p>Hello Vite + React!</p>
        <div className="flex gap-4">
          <Button variant="contained" onClick={incrementCount}>
            count is: {exampleState.value ?? 'not-set'}
          </Button>
          <Button variant="outlined" onClick={removeCount}>
            remove local store
          </Button>
        </div>
        <div
          p="x-10 y-5"
          bg="red-500"
          className='flex flex-col gap-2 rounded-full'
        >
          <h1 className="font-bold text-7xl">Unocss Example</h1>
          <div className="flex flex-row">
            <p text="lg green-500">With Icon Support</p>
            <div className="i-bx-alarm-exclamation w-10 h-10" />
          </div>
        </div>
      </header>
    </div>
  )
}

export default App
