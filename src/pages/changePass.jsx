import { AuthContext } from "@/context/AuthContext";
import {
  Input,
  Checkbox,
  Button,
  Typography,
  Alert
} from "@material-tailwind/react";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios'
import Swal from 'sweetalert2'


function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
      />
    </svg>
  );
}

export function ChangePass() {

  const [credentials, setCredentials] = useState({
    newPassword: undefined
  })

  const location = useLocation()
  const id  = location.pathname.split("/")[2]

  const [btnActive, setBtnActive] = useState(false)

  const  { user, loading, error, dispatch } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({...prev, [e.target.id]: e.target.value}))
  }

  const handleClick = async e => {
    e.preventDefault()
    setBtnActive(true)
    try {
      const res = await axios.post(`http://localhost:3300/reset/${id}`, credentials)
        Swal.fire({
          position: 'center',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
          title: res.data.message,
        }).then(()=>{
          localStorage.removeItem("emailOtp")
          setBtnActive(false)
          navigate(`/sign-in`)
        })  
    } catch (error) {
      Swal.fire({
        icon: 'error',
        confirmButtonColor: "#212121",
        text: error.response.data.message
      })
      setBtnActive(false)
    }
  }
  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Change Password</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter new password</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            {error && <Alert icon={<Icon />}>{error.data.message.message}</Alert>}

            <div className="w-100">
              <div className="relative w-full min-w-[200px] h-10">
                <input
                  className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                  placeholder=" " 
                  id="newPassword"
                  onChange={handleChange}
                />
                <label
                  className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                    New password
                </label>
              </div>
            </div>  
            
            
          </div>
          <Button disabled={btnActive} className="mt-6" fullWidth onClick={handleClick}>
            Confirm
          </Button>

          
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            <Link to="/otp" className="text-gray-900 ml-1">Back to OTP</Link>
          </Typography>
        </form>

      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
    </section>
  );
}

export default ChangePass;
