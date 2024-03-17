import { Routes, Route, Navigate } from "react-router-dom";
import routes from "@/routes";
import DefaultLayout from "./widgets/layout/defaultLayout";



function App() {

  return (
    <>
      <Routes>
        {routes.map(
          ({ path, element, layout }, key) =>{
            let Layout = DefaultLayout

            if(layout){
              Layout = layout
            }else if(layout === null){
              Layout = Fragment
            }
            
            return <Route key={key} exact path={path} element={<Layout>{element}</Layout>} />;
          }
        )}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  );
}

export default App;
