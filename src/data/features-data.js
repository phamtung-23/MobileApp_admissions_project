import {
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/solid";
import { PiStudentDuotone } from "react-icons/pi";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { FaRocket } from "react-icons/fa";

export const featuresData = [
  {
    color: "gray",
    title: "University Information",
    icon: PiStudentDuotone,
    description:
      "Provides detailed information about the university including: school name, school code, training system, year's enrollment information.",
  },
  { 
    color: "gray",
    title: "AI Chat Support",
    icon: IoChatboxEllipsesOutline,
    description:
      "If you are lazy to search for information on a series of websites without knowing which one will be the focus, this is a great feature.",
  },
  {
    color: "gray",
    title: "Great Performance",
    icon: FaRocket,
    description:
      "Quickly search for information about your favorite universities, with convenient AI-powered features that can provide useful suggestions.",
  },
];

export default featuresData;
