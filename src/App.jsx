import { useCallback, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useRef } from 'react';


function App() {
  const [length, setlength] = useState(8);
  const [numallow, setnumallow] = useState(false);
  const [charallow, setcharallow] = useState(false);
  const [password, setpassword] = useState("");
  const [passhistory,setpasshistory] = useState([]);

  const passwordRef = useRef(null);


  const passwordchanger = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqretuvwxyz";
    if (numallow) str += "0123456789";
    if (charallow) str += "!@#$%^&*(){}:";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);
    }
    setpassword(pass)

    setpasshistory((prev)=>{
      const newhistory = [pass, ...prev];
      return newhistory.slice(0,5);
 })
 
  }, [length, numallow, charallow, setpassword])

  useEffect(() => {
    passwordchanger();
  }, [length, numallow, charallow, passwordchanger])

  const copyToPasswordToclipBoard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }, [password])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyToPasswordToclipBoard}
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>

        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex item-center gap-x-1'>

            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setlength(e.target.value) }}
            />
            <lable>Length: {length}</lable>
          </div>

          <div className='flex item-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={numallow}
              id="numinput"
              onChange={() => {
                setnumallow((prev) => !prev);
              }}
            />
            <lable>Numbers</lable>
          </div>

          <div className='flex item-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={charallow}
              id="charinput"
              onChange={() => {
                setcharallow((prev) => !prev);
              }}
            />
            <lable>Characters</lable>
          </div>
        </div>
         <div className='mt-4 text-white'>
          <h2 className='text-center'>Last 5 passwords:</h2>
          <ul className='list-disc pl-5'>
            {passhistory.map((pw,index)=>(
              <li key={index}>{pw}</li>
            ))}
          </ul>   
         </div>
      </div>

    </>
  )
}

export default App
