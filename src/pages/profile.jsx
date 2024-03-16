import { Avatar, Typography, Button } from "@material-tailwind/react";
import {
  MapPinIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import { Footer } from "@/widgets/layout";
import { UserProfile } from "@clerk/clerk-react";

export function Profile() {
  return (
    <>
      <section className="relative flex justify-center bg-white py-16">
        <UserProfile />
      </section>
    </>
  );
}

export default Profile;
