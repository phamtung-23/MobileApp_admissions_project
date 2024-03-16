import React from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  CardFooter,
} from "@material-tailwind/react";
import useFetch from '@/hooks/useFetch';
import { Link } from 'react-router-dom';

function ListUniversity() {

  const {data, loading, error, reFetch} = useFetch(`http://localhost:3300/api/university?limit=4`)

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ):(
        data.map((university) => (
          <Card className="mt-6 w-80">
            <CardHeader color="blue-gray" className="relative h-56">
              <img className="object-cover w-full h-full"
                src={university.imgCover}
              />
            </CardHeader>
            <CardBody className='mb-14'>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                {university.name.vi}
              </Typography>
              <Typography>Code: {university.code}</Typography>
              <Typography>Email: {university.email}</Typography>
              <Typography>Phone: {university.phone}</Typography>
              <Typography>Type: {university.type}</Typography>

            </CardBody>
            <CardFooter className="pt-0 absolute bottom-0 left-0">
              <Link to={`/university/${university._id}`}>
                <Button>View Detail</Button>
              </Link>
            </CardFooter>
          </Card>
        ))
      )}
    </>
  )
}

export default ListUniversity