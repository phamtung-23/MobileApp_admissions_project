import { Routes, Route, Navigate } from "react-router-dom";
import routes from "@/routes";
import DefaultLayout from "./widgets/layout/defaultLayout";
import Chatbot from "https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js"
    Chatbot.init({
        chatflowid: "47ffa23d-89f8-4179-8e05-c334e633e685",
        apiHost: "http://localhost:3000",
    })


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
