import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  IconButton,
  Input,
  Textarea,
  Checkbox,
  Avatar,
  CardFooter,
} from "@material-tailwind/react";

import useFetch from "@/hooks/useFetch";
import { MdOutlineLocationSearching } from "react-icons/md";
import { Link } from "react-router-dom";


export function University() {

  const [searchInputName, setSearchInputName] = useState('');

  let url = `http://localhost:3300/api/university?q=${searchInputName}`;
  const {data, loading, error, reFetch} = useFetch(url)

  useEffect(()=>{
    reFetch()
  },[searchInputName])


  return (
    <>
      <div className="flex  content-center items-center justify-center pt-16 pb-32">
        <div className="absolute top-0 h-2/4 w-full bg-[url('/img/bg-home-3.jpg')] bg-cover bg-center" />
        <div className="absolute top-0 h-2/4 w-full bg-black/60 bg-cover bg-center" />
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
              <Typography
                variant="h1"
                color="white"
                className="mb-6 font-black"
              >
                List of universities in Vietnam
              </Typography>
              <Typography variant="lead" color="white" className="opacity-80">
              Below is a list of the top universities in Vietnam, known for their excellence in teaching, admissions, and support for graduating students.
              </Typography>
            </div>
          </div>
        </div>
      </div>


      <section className="px-4 pt-10 pb-20">
        <div className="container mx-auto">
        <div className="mt-32 flex flex-wrap items-start">
            <div className="mx-auto  w-full px-4 md:w-3/12 sticky top-36">
              <Card className="w-full">
                <CardHeader
                  variant="gradient"
                  className="mb-4 grid h-12 place-items-center"
                >
                  <Typography variant="h5" color="black">
                    Search University
                  </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                  <Input label="Name/Code" size="lg" onChange={e => setSearchInputName(e.target.value)}/>
                </CardBody>
                <CardFooter className="pt-0">
                  <Button variant="gradient" fullWidth className=" flex justify-center gap-2">
                    <MdOutlineLocationSearching /> Search
                  </Button>
                  
                </CardFooter>
              </Card>
            </div>
            <div className="mx-auto mt-10 flex w-full justify-center px-4 md:w-9/12 lg:mt-0">
              <div className=" grid grid-cols-1 gap-10 gap-x-10 md:grid-cols-2 xl:grid-cols-3">
                {data.map((university) => (
                  <Card className="mt-6 w-80">
                    <CardHeader color="blue-gray" className="relative h-56">
                      <img className="object-cover w-full h-full"
                        src={university.imgCover}
                      />
                    </CardHeader>
                    <CardBody className=' mb-14'>
                      <Typography variant="h5" color="blue-gray" className="mb-2">
                        {university.name.vi}
                      </Typography>
                      <Typography>Code: {university.code}</Typography>
                      <Typography>Email: {university.email}</Typography>
                      <Typography>Phone: {university.phone}</Typography>
                      <Typography>Type: {university.type}</Typography>

                    </CardBody>
                    <CardFooter className="pt-0 absolute bottom-0 left-0">
                      <Link to={`${university._id}`}>
                        <Button>View Detail</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
                
              </div>
            </div>
          </div>
          
        </div>
      </section>
    

    </>
  );
}

export default University;
