import { useLocation } from "react-router-dom";
import { ComplexNavbar, Footer } from ".";

function DefaultLayout({children}) {
  const { pathname } = useLocation();
  return ( 
    <>
      {!(pathname == '/sign-in' || pathname == '/sign-up' || pathname == '/forget' || pathname == '/otp' || pathname.split("/")[1] == 'change-pass') && (
        <div className="container sticky top-0 right-0  z-10 mx-auto p-3 ">
          {/* <Navbar routes={routes} /> */}
          <ComplexNavbar />
        </div>
      )
      }
      {children}
      <div className="bg-white">
        <Footer />
      </div>
    </>
   );
}

export default DefaultLayout;