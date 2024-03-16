import { Avatar, Typography, Button } from "@material-tailwind/react";
import {
  MapPinIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import { Link, useParams } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import { FaPhoneVolume } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import React, { useState } from "react";
import { pdfjs } from 'react-pdf';
import PDFComp from "@/components/pdfComp";
import { TbMessageChatbot } from "react-icons/tb";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();




export function DetailUniversity() {
  const { id } = useParams();

  let url = `http://localhost:3300/api/university/${id}`;
  const {data, loading, error, reFetch} = useFetch(url)

  return (
    <>
      <section className="relative block h-[60vh] -mt-20 overflow-y-hidden">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-cover bg-center scale-105">
          <img
            className="absolute h-full w-full rounded-b-lg object-cover object-center -mt-2"
            src={data.imgCover}
            alt="nature image"
          />
        </div>
      </section>
      <section className="relative bg-white py-16">
        <div className="relative mb-6 -mt-40 flex w-full px-4 min-w-0 flex-col break-words bg-white">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row justify-between mb-14">
              <div className="relative flex gap-6 items-start">
                <div className="-mt-20 w-40">
                  <Avatar
                    src={data.icon}
                    alt="Profile picture"
                    variant="circular"
                    className="h-full w-full"
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <Typography variant="h4" color="blue-gray">
                    {data.nameVi}
                  </Typography>
                  <Typography variant="paragraph" color="gray" className="!mt-0 font-normal">{data.nameEn}</Typography>
                </div>
              </div>

              <div className="mt-10 mb-10 flex lg:flex-col justify-between items-center lg:justify-end lg:mb-0 lg:px-4 flex-wrap lg:-mt-5">
                {/* <Button className="bg-gray-900 w-fit lg:ml-auto">Conntect</Button> */}
                <div className="flex justify-start py-4 pt-8 lg:pt-4">
                  <div className="mr-4 p-3 text-center">
                    <a href={data.website}>
                      <Button variant="outlined">Website</Button>
                    </a>
                  </div>
                  <div className="mr-4 p-3 text-center">
                    <a href={data.facebook}>
                      <Button variant="outlined">Facebook</Button>
                    </a>
                  </div>
                  <div className="mr-4 p-3 text-center">
                    <Link to="/chatbot" state={{ code: data.code , name: data.nameVi, icon: data.icon}}>
                      <Button className="flex items-center gap-3">
                        <TbMessageChatbot size={20}/>
                        AI Chat Support
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="-mt-4 container space-y-2">
              <div className="flex items-center gap-2">
                <MapPinIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
                <Typography className="font-medium text-blue-gray-500">
                  {data.address}
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <BriefcaseIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
                <Typography className="font-medium text-blue-gray-500">
                {data.trainingSystem}
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <BuildingLibraryIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
                <Typography className="font-medium text-blue-gray-500">
                  {data.type}
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <FaPhoneVolume className="-mt-px h-4 w-4 text-blue-gray-500"/>
                <Typography className="font-medium text-blue-gray-500">
                  {data.phone}
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <MdEmail className="-mt-px h-4 w-4 text-blue-gray-500"/>
                <Typography className="font-medium text-blue-gray-500">
                  {data.email}
                </Typography>
              </div>
            </div>
            <div className="mb-5 mt-5 py-6">
              <div className="flex w-full items-center justify-center">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {/* <ImgGallery gallery={data.imgGallery} /> */}
                  {loading? "Loading...":(
                    <>
                      {
                        data && data.imgGallery && data.imgGallery.map((item,index)=>(
                          <div key={index}>
                            <img
                              className="h-40 w-full max-w-full rounded-lg object-cover object-center"
                              src={item}
                              alt="gallery-photo"
                            />
                          </div>
                        ))
                      }
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative bg-white flex justify-center">
        {loading? "Loading...":(
            <>
              {
                data && data.infoAdmission && <PDFComp pdfFile={data.infoAdmission} />
              }
            </>
          )}
      </section>
    </>
  );
}

export default DetailUniversity;
