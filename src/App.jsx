/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import Toast from './Toast Component/Toast';

const App = () => {

  // state for toast message, position
  const [data, setData] = useState({
    message: "", 
    checked: false, // initially unchecked ----> auto dismiss
    position: "top-center",
    duration: null, // duration for clear the toast message ----> null (disable)
  });

  //toast list 
  const [toastList, setToastList] = useState({
    "top-center": [],
    "bottom-right": [],
    "bottom-left": [],
    "top-right": [],
    "top-left":[],
  });

  //handle user input change function
  function handleChange(event) {
    const { name, value } = event.target;
    const newData = {...data};
    console.log("newData ---> ", newData);
    newData[name] = value;
    console.log("newData[name] ---> ", value);
    setData({...newData});
  }

  //function to add new toast message
  const addToastMessage = ({ type }) => {
    const newData = { ...toastList };
    const currentPosition = data?.position; // if data is present then set the position to the current position

    //create new toast
    const newToast = {
      id: uuid(),
      message: data?.message ? data?.message : type === "success" ? "Data fetched successfully" : type==="error" ? "Internal server error" : "Invalid data provided",
      duration: data?.checked ? (data?.duration ? data?.duration : 1) : null,
      type,
    };

    newData[currentPosition].push(newToast);
    setData({ ...newData });


    //set-timeout for auto delete the toast package
    if(newToast.duration) {
      setTimeout(() => {
        setToastList((prevToastList) => {
          const updatedToastData = {... prevToastList};
          updatedToastData[currentPosition] = updatedToastData[currentPosition].filter((item) => item.id !== newToast.id);
          return {...updatedToastData};
        });
      }, newToast.duration * 1000); //seconds
    }
  }


  return (
    <div className='bg-blue-200'>
      <div>
        <h1 className='text-6xl font-extrabold font-serif text-center mt-10'>Toasty JS</h1>
        <header className='flex justify-center mt-25 gap-60'>
          <div className='flex gap-5'>
            <input type='checkbox' id='checked' name='checked' className='cursor-pointer' checked={data?.checked} onChange={() => { setData({ ...data, checked: !data?.checked }) }} />
            <label className='mt-3.5' htmlFor='checked'>Auto-Dismiss</label>
          </div>

          <div className='flex flex-col gap-2.5'>
            <label>Duration (in sec)</label>
            <input type='number' placeholder='5' id='duration' name='duration' disabled={!data?.checked} defaultValue={!data?.checked ?  1 : null} onChange={(event) => handleChange(event)} />
          </div>
        </header>

        <main className='flex justify-center mr-20 mt-5'>
          <div className='flex flex-col'>
            <label htmlFor='message'>Toast Message</label>
            <input className='mt-4' name='message' type='text' placeholder='Data fetched successfully' value={data?.message} onChange={(event) => handleChange(event)} />
          </div>

          <div className='flex flex-col ml-45'>
            <label htmlFor='position'>Toast Position</label>
            <select className='mt-4' name='position' id='position' onChange={(event) => handleChange(event)}>
              <option value='top-center'>Top Center</option>
              <option value='top-left'>Top Left</option>
              <option value='top-right'>Top Right</option>
              <option value='bottom-right'>Bottom Right</option>
              <option value='bottom-left'>Bottom Left</option>
            </select>
          </div>
        </main>

        <footer>
          <div className='grid grid-cols-2 gap-y-5'>
            <button onClick={() => addToastMessage("success")}>Success Toast</button>
            <button onClick={() => addToastMessage("error")}>Error Toast</button>
            <button onClick={() => addToastMessage("warning")}>Warning Toast</button>
            <button 
              onClick={() => setToastList({
                "top-center": [],
                "bottom-right": [],
                "bottom-left": [],
                "top-right": [],
                "top-left":[],
              })} >Clear All</button>
          </div>
        </footer>
        <div>
          <Toast />
        </div>
      </div>
    </div>
  )
}

export default App;

