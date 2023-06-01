"use client";

import booksData from '@/booksData';
import { Book, User } from '@/classes/Book';
import { useState } from 'react';
import DatePicker from "react-datepicker";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import axios from "axios";

import "react-datepicker/dist/react-datepicker.css";

export default function Home() {
  const [borrowedBooks, setBorrowedBooks] = useState<User[]>([]);

  const [infos, setInfos] = useState({
    firstname: "",
    lastname: "",
    email: ""
  });
  const [email, setEmail] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  
  const options = booksData;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({ id: 0, name: '-- Select --' });

  const handleOptionChange = (option: Book) => {
    setSelectedOption(option);
  };

  const addBook = async (event: any) => {
    event.preventDefault();


    const sqlInjectionRegex = /(\b(ALTER|CREATE|DELETE|DROP|EXEC(UTE){0,1}|INSERT( +INTO){0,1}|MERGE|SELECT|UPDATE( +TOP){0,1})\b|\b(AND|OR)\b)/i;
    // Check for SQL injection in first name
    if (infos.firstname.length === 0 || sqlInjectionRegex.test(infos.firstname)) {
      alert('Invalid first name');
      return;
    }
    // Check for SQL injection in last name
    if (infos.lastname.length === 0 || sqlInjectionRegex.test(infos.lastname)) {
      alert('Invalid last name');
      return;
    }
    // Check for SQL injection in email
    if (infos.email.length === 0 || sqlInjectionRegex.test(infos.email)) {
      alert('Invalid email');
      return;
    }

    if (selectedOption.name !== "-- Select --" && startDate && endDate) {
      try {
        await axios.post('http://localhost:8080/customers/unsecured', {
          firstName: infos.firstname,
          lastName: infos.lastname,
          email: infos.email,
          book: {
            name: selectedOption.name,
          },
          startDate: startDate,
          endDate: endDate,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    return;
  }

  const searchBooks = async (event: any) => {
    event.preventDefault();

    const sqlInjectionRegex = /(\b(ALTER|CREATE|DELETE|DROP|EXEC(UTE){0,1}|INSERT( +INTO){0,1}|MERGE|SELECT|UPDATE( +TOP){0,1})\b|\b(AND|OR)\b)/i;
     // Check for SQL injection in email
     if (email.length === 0 || sqlInjectionRegex.test(email)) {
      alert('Invalid email');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/customers/unsecured/borrows', {
        email: email
      });
      setBorrowedBooks(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  console.log(borrowedBooks)

  return (
    <div className="flex flex-col justify-start items-center w-full">
      <h1 className="text-3xl font-black font-mono uppercase py-8 ">Welcome to your Bookstore</h1>
      <div className="flex justify-between items-start w-full">
        <div className="w-full flex flex-col justify-center items-center p-8">
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
                  onChange={(event) => setInfos({ ...infos, [event.target.name]: event.target.value })}
                  type="text"
                  placeholder="First name"
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
                  onChange={(event) => setInfos({ ...infos, [event.target.name]: event.target.value })}
                  type="text"
                  placeholder="Last name"
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
                  onChange={(event) => setInfos({ ...infos, [event.target.name]: event.target.value })}
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
                      {selectedOption.name !== "-- Select --"
                        ? <div className="flex justify-start items-center gap-2">
                          <div className="flex justify-start items-center">
                            <span className='font-semibold'>{selectedOption.name}</span>
                          </div>
                        </div>
                        : <span className='font-semibold'>-- Select --</span>
                      }
                    </div>
                    {isOpen && (
                      <div className="text-gray-700">
                        {options.map((option) => (
                          <div
                            key={option.name}
                            className={"flex justify-start items-center gap-2 p-2 " + (option.name === selectedOption.name ? "bg-gray-300" : "bg-gray-100 hover:bg-gray-300")}
                            onClick={() => {
                              handleOptionChange(option)
                              setIsOpen(false)
                            }
                            }
                          >
                            <div className="flex justify-start items-center">
                              <span className='font-semibold'>{option.name}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="pointer-events-none absolute flex items-start px-2 text-gray-700 inset-y-4 right-2">
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
              <button onClick={addBook} className='text-white font-mono uppercase bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-lg px-5 py-2.5 mr-2 mb-2'>
                Add
              </button>
            </div>
          </form >
        </div>
        <div className="w-full flex flex-col justify-start items-center p-8">
          <form className="w-full max-w-lg py-8 ">
            <div className="flex flex-wrap flex-col justify-center items-center -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                  Email
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="example@test.com"
                />
              </div>
            </div>
            {borrowedBooks.length > 0 &&
              borrowedBooks.map(book => {
                return (
                  <div
                    key={book.book.id}
                    className="flex justify-start items-center gap-2 p-2 bg-gray-200 hover:bg-gray-300 rounded-md my-1"
                  >
                    <div className="flex justify-start items-center">
                      <span className='font-semibold'>{book.book.name}</span>
                    </div>
                  </div>
                )
              })}
            <div className="w-full flex justify-center items-center my-4">
              <button onClick={searchBooks} className='text-white font-mono uppercase bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-lg px-5 py-2.5 mr-2 mb-2'>
                Search
              </button>
            </div>
          </form >
        </div>
      </div>
    </div>
  );
}
