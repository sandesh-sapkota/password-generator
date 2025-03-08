import { useState, useCallback, useEffect, useRef } from 'react'


 
function App() {
const [length, setLength] = useState(8)
const [numberAllowed, setNumberAllowed] = useState(false)
const [charAllowed, setCharAllowed] = useState(false)
const [password, setPassword] = useState('')

//useRef hook
const passwordRef= useRef(null)
 
const passwordGenerator = useCallback(()=>{
  let pass= ''
  let str= 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

  if(numberAllowed){
    str=str+ '0123456789'
  }
  if(charAllowed){
    str=str+ '!@#$%^&*()_+{}[]`~'
  }

  for (let i = 1; i <= length; i++) {
    let char = Math.floor(Math.random() * str.length + 1)

    pass += str.charAt(char)

  }


  setPassword(pass)

}, [length, numberAllowed, charAllowed])

useEffect(()=>{
  passwordGenerator()
},[length, numberAllowed, charAllowed])

const copyPasswordToClipboard = ()=>{
  passwordRef.current.select()
  window.navigator.clipboard.writeText(password)
}



  return (
    <>
    <div className=" max-w-100 sm:max-w-120 md:max-w-150 mx-auto rounded-lg px-4 my-8 text-orange-500 bg-gray-800">
      <h1 className="text-white text-center pt-3 text-2xl mb-3">Password Generator</h1>
      <div className="py flex gap-2">
        <input type="text"
        value={password}
        className='outline-none w-full py-2 px-3 mb-5 bg-white rounded-lg text-xl'
        placeholder='Password'
        readOnly
        ref={passwordRef}
        />
        <button
        onClick={copyPasswordToClipboard}
        className='bg-blue-700 hover:bg-blue-600 text-white px-3 py-1 rounded-xl mb-4 cursor-pointer'>Copy</button>
      </div>

      <div className="flex gap-x-2 sm:gap-x-4 md:gap-x-7 pb-3">
        <div className="flex items-center gap-x-1">
          <input 
          type="range"
          min={6}
          max={18}
          value={length}
          className='cursor-pointer max-w-15 sm:max-w-30'
          onChange={(e)=>{setLength(e.target.value)}}
          />
          <label >Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input 
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={()=>{
            setNumberAllowed((prev)=> !prev);
          }}
          />
          <label>Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input 
          type="checkbox"
          defaultChecked={charAllowed}
          id="characterInput"
          onChange={()=>{
            setCharAllowed((prev)=> !prev);
          }}
          />
          <label>Characters</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
