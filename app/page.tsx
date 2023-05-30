"use client";

import booksData from '@/booksData';
import { Book } from '@/classes/Book';
import Image from 'next/image';
import { useState } from 'react';
import DatePicker from "react-datepicker";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

import "react-datepicker/dist/react-datepicker.css";

export default function Home() {
  const [infos, setInfos] = useState({
    firstname: "",
    lastname: "",
    email: ""
  });

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const options = booksData;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({ id: 0, title: '-- Select --', author: '', image: '' });

  const handleOptionChange = (option: Book) => {
    setSelectedOption(option);
  };
  
  const submitRequest = (event: any) => {
    event.preventDefault();

    const sqlInjectionRegex = /(\b(ALTER|CREATE|DELETE|DROP|EXEC(UTE){0,1}|INSERT( +INTO){0,1}|MERGE|SELECT|UPDATE( +TOP){0,1})\b|\b(AND|OR)\b)/i;
    // Check for SQL injection in first name
    if (sqlInjectionRegex.test(infos.firstname)) {
      alert('Invalid first name');
      return;
    }   
    // Check for SQL injection in last name
    if (sqlInjectionRegex.test(infos.lastname)) {
      alert('Invalid last name');
      return;
    }   
    // Check for SQL injection in email
    if (sqlInjectionRegex.test(infos.email)) {
      alert('Invalid email');
      return;
    }

    console.log('Send to backend');
    return;
  }

  return (
    <div className="w-full flex flex-col justify-center items-center p-8">
      <h1 className="text-3xl font-black font-mono uppercase py-8 ">Welcome to your Bookstore</h1>
      <form className="w-full max-w-lg py-8">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
              First Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="firstname"
              name="firstname"
              value={infos.firstname}
              onChange={(event) => setInfos({...infos, [event.target.name]: event.target.value})}
              type="text"
              placeholder="Jane"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
              Last Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="lastname"
              name="lastname"
              value={infos.lastname}
              onChange={(event) => setInfos({...infos, [event.target.name]: event.target.value})}
              type="text"
              placeholder="Doe"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
              Email
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="email"
              name="email"
              value={infos.email}
              onChange={(event) => setInfos({...infos, [event.target.name]: event.target.value})}
              type="email"
              placeholder="example@test.com"
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-12">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
              Book
            </label>
            <div className="relative select-none cursor-pointer">
              <div className="">
                <div onClick={() => setIsOpen(!isOpen)} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  {selectedOption.title !== "-- Select --"
                    ? <div className="flex justify-start items-center gap-2">
                      <Image className="object-cover h-[45px] w-[80px]" src={selectedOption.image} alt={selectedOption.title} width={320} height={180} />
                      <div className="flex justify-start items-center">
                        <span className='font-semibold'>{selectedOption.title}</span>
                        <span className='mx-2'>-</span>
                        <span className='font-medium'>{selectedOption.author}</span>
                      </div>
                    </div>
                    : <span className='font-semibold'>-- Select --</span>
                  }
                </div>
                {isOpen && (
                  <div className="text-gray-700">
                    {options.map((option) => (
                      <div
                        key={option.title}
                        className={"flex justify-start items-center gap-2 p-2 " + (option.title === selectedOption.title ? "bg-gray-300" : "bg-gray-100 hover:bg-gray-300")}
                        onClick={() => {
                          handleOptionChange(option)
                          setIsOpen(false)
                        }
                        }
                      >
                        <Image className="object-cover h-[45px] w-[80px]" src={option.image} alt={option.title} width={320} height={180} />
                        <div className="flex justify-start items-center">
                          <span className='font-semibold'>{option.title}</span>
                          <span className='mx-2'>-</span>
                          <span className='font-medium'>{option.author}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className={"pointer-events-none absolute flex items-start px-2 text-gray-700 " + (selectedOption.title === "-- Select --" ? "inset-y-4 right-2" : "inset-y-7 right-3")}>
                {isOpen
                  ? <MdKeyboardArrowUp />
                  : <MdKeyboardArrowDown />}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center gap-3 mb-6">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                Starting Date
              </label>
              <DatePicker
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                Returning Date
              </label>
              <DatePicker
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center items-center">
          <button onClick={submitRequest} className='text-white font-mono uppercase bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-lg px-5 py-2.5 mr-2 mb-2'>
            Add
          </button>
        </div>
      </form >
    </div >
  );
}
