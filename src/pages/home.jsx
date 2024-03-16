import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,

} from "@material-tailwind/react";
import { FingerPrintIcon, UsersIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer } from "@/widgets/layout";
import { FeatureCard, TeamCard } from "@/widgets/cards";
import { featuresData, teamData, contactData } from "@/data";
import { SiRobotframework } from "react-icons/si";


import { Link } from "react-router-dom";
import SwiperImg from "@/components/swiperImg";
import ListUniversity from "@/components/listUniversity";


export function Home() {


  return (
    <>
      <div className="flex h-screen content-center items-center justify-center pt-16 pb-32">
        <div className="absolute top-0 h-full w-full bg-[url('/img/bg-home-3.jpg')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
              <Typography
                variant="h1"
                color="white"
                className="mb-6 font-black"
              >
                You are ready for college?
              </Typography>
              <Typography variant="lead" color="white" className="opacity-80">
                Setting the Lead: A Detailed Guide and Extensive Resources to Support Students Through the AI-Integrated College Admissions Process, With Up-to-date Information and Strategies Essential for Seizing the Opportunity Society and Success in the Modern University Environment.
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <section className="-mt-32 bg-white px-4 pb-20 pt-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map(({ color, title, icon, description }) => (
              <FeatureCard
                key={title}
                color={color}
                title={title}
                icon={React.createElement(icon, {
                  className: "w-5 h-5 text-white",
                })}
                description={description}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="-mt-32 bg-white px-4 pb-20 pt-4">
        <div className="container mx-auto">
          <div className="mt-32 flex justify-center items-center">
            <SwiperImg/>
          </div>
        </div>
      </section>
      
      <section className="-mt-32 bg-white px-4 pb-20 pt-4">
        <div className="container mx-auto">
          <div className="mt-32 flex flex-wrap items-center">
            <div className="mx-auto -mt-8 w-full px-4 md:w-5/12">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-gray-900 p-2 text-center shadow-lg">
                {/* <FingerPrintIcon className="h-8 w-8 text-white " /> */}
                <SiRobotframework className="h-8 w-8 text-white "/>
              </div>
              <Typography
                variant="h3"
                className="mb-3 font-bold"
                color="blue-gray"
              >
                AI Chat Feature
              </Typography>
              <Typography className="mb-8 font-normal text-blue-gray-500">
                Our AI-powered chatbox is a crucial tool for navigating university admissions. It provides instant access to detailed information about each university and offers personalized advice based on both institutional data and user input, streamlining the search for your ideal educational destination.
                <br />
                <br />
              </Typography>
              <Link to={`/chatbot`}>
                <Button variant="filled">Chat Now</Button>
              </Link>
            </div>
            <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0">
              <Card className="shadow-lg border shadow-gray-500/10 rounded-lg">
                <CardHeader floated={false} className="relative h-56">
                  <img
                    alt="Card Image"
                    src="/img/chatbox-la-gi-2.jpg"
                    className="h-full w-full"
                  />
                </CardHeader>
                <CardBody>
                  <Typography variant="small" color="blue-gray" className="font-normal">Example</Typography>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mb-3 mt-2 font-bold"
                  >
                    Auto-reply
                  </Typography>
                  <Typography className="font-normal text-blue-gray-500">
                  Incorporating GPT (Generative Pre-trained Transformer) is a popular deep learning model architecture in the field of natural language processing (NLP). GPT was developed by OpenAI and is based on the Transformer architecture, a powerful attention-based neural network architecture.
                  </Typography>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pt-20 pb-48">
        <div className="container mx-auto">
          <PageTitle section="Top University" heading="This is a list of universities in Vietnam">
            Below is a list of the top universities in Vietnam, known for their excellence in teaching, admissions, and support for graduating students.
          <div className="w-full flex justify-center items-center">
            <Link to={`/university`}>
              <button
                class="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
                type="button">
                View All
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                  class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
                </svg>
              </button>
            </Link>
          </div>
          </PageTitle>
          <div className="mt-24 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-4">
            <ListUniversity />
          </div>
        </div>
      </section>
      {/* <section className="relative bg-white py-24 px-4">
        <div className="container mx-auto">
          <PageTitle section="Contact Us" heading="Want to work with us?">
            Complete this form and we will get back to you in 24 hours.
          </PageTitle>
          <form className="mx-auto w-full mt-12 lg:w-5/12">
            <div className="mb-8 flex gap-8">
              <Input variant="outlined" size="lg" label="Full Name" />
              <Input variant="outlined" size="lg" label="Email Address" />
            </div>
            <Textarea variant="outlined" size="lg" label="Message" rows={8} />
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  I agree the
                  <a
                    href="#"
                    className="font-medium transition-colors hover:text-gray-900"
                  >
                    &nbsp;Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
            <Button variant="gradient" size="lg" className="mt-8" fullWidth>
              Send Message
            </Button>
          </form>
        </div>
      </section> */}

    </>
  );
}

export default Home;
