import { useEffect, useRef, useState } from "react";
import { Stack, Box, Typography, IconButton, FormControl, OutlinedInput, CircularProgress } from "@mui/material";
import Header from "@/components/Header";
import { chatCompletion } from "@/api/chat.api";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { Typewriter, useTypewriter } from 'react-simple-typewriter';
import axios from "axios";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  CardFooter,
  List,
  ListItem,
  ListItemSuffix,
  ListItemPrefix,
  Avatar,
  Chip,
  Alert,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { MdOutlineLocationSearching } from "react-icons/md";
import { FaRobot } from "react-icons/fa";
import useFetch from "@/hooks/useFetch";
import { useUser, SignedIn, SignInButton } from "@clerk/clerk-react";
import { callAPI, callAPIChatPdf, callAPIChatPdfFlowise } from "@/api/openAI";
import { MdDelete } from "react-icons/md";





const messageType = {
  assistant: "assistant",
  user: "user"
};

const TextTypeWriter = ({ content, setOnRequest }) => {
  const [text] = useTypewriter({
    words: [`${content}`],
    loop: 1,
    onLoopDone: () => {
      console.log(`loop completed after 3 runs.`)
      setOnRequest(false);
      
    },
    typeSpeed: 10,
    delaySpeed: 100,
    onType:()=>{
      // Scroll to end when typewriter completes
      const chatWrapper = document.getElementById("chat-wrapper");
      chatWrapper.scrollTop = chatWrapper.scrollHeight;
    }
  })
  return text
}

const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef();
  const chatWrapperRef = useRef();

  const [onRequest, setOnRequest] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [typeChat, setTypeChat] = useState("gpt")
  const {user, isLoading} = useUser()
 

  const onEnterPress = (e) => {
    if (e.keyCode === 13) fetchResponse(typeChat);
  };


  useEffect(() => {
    const chatWrapper = document.getElementById("chat-wrapper");
    chatWrapper.scrollTop = chatWrapper.scrollHeight;
  }, [messages]);

  const [ searchInputName, setSearchInputName ] = useState('')
  let url = `http://localhost:3300/api/university?q=${searchInputName}`;
  const {data, loading, error, reFetch} = useFetch(url)
  const [ nameHeaderChat, setNameHeaderChat] = useState("AI Chat GPT")
  const [ iconHeaderChat, setIconHeaderChat] = useState("img/iconChatGPT.png")
  const { state } = useLocation();
  
  // console.log(state)


  useEffect(()=>{
    reFetch()
  },[searchInputName])

  useEffect(()=>{
    if (state){
      handleClick(state.name, state.code, state.icon)
    }else{
      const fetchMess = async ()=>{
        
          const client = axios.create({
            headers: {}
          });
          const res = await client.get(`http://localhost:3300/api/messages/${user.id}`);
          setMessages(res.data.messages);
        
      }
      fetchMess()

    }

  },[user])

  const fetchInJectPdf = async (value)=>{
    const client = axios.create({
      headers:{}
    })
    const res = await client.post(`http://localhost:3300/chat/injectPdf`,{
      filename:`${value}.pdf`
    })
    console.log(res.data)
  }

  const handleClick = async (name, code, icon) => {
    setNameHeaderChat(name)
    setTypeChat(code)
    setIconHeaderChat(icon)
    if(code === "gpt"){
      const fetchMess = async ()=>{
      
        const client = axios.create({
          headers: {}
        });
        const res = await client.get(`http://localhost:3300/api/messages/${user.id}`);
        setMessages(res.data.messages);
      
      }
      fetchMess()
    }else{
      const client = axios.create({
        headers:{}
      })
      const res = await client.get(`http://localhost:3300/api/messagesPdf/${user.id}/${code}`)
      setMessages(res.data.messages) 
  
      fetchInJectPdf(code)
    }
  }

  const saveMess = async (userId, messages) => {
    const client = axios.create({
      headers:{
      }
    })
    const res = await client.post(`http://localhost:3300/api/messages`,{
      userId: userId,
      messages: messages
    })

    let result = res.data
    if(res.status != 200){
      Alert.alert(result.message);
    }
  }

  const saveMessPDF = async (userId, messages, type) => {
    // console.log(userId, messages, type)
    const client = axios.create({
      headers:{
      }
    })
    const res = await client.post(`http://localhost:3300/api/messagesPdf`,{
      userId: userId,
      messages: messages,
      type: type
    })

    let result = res.data
    if(res.status != 200){
      Alert.alert(result.message);
    }
  }
  
  const fetchResponse = (typeChat) => {
    // if (onRequest) return;
    
    if (typeChat == "gpt"){
      if(question.length>0){
        let newMessage = [...messages]
        newMessage.push({role: 'user', content: question.trim()})
        setMessages([...newMessage])
        setQuestion('')
        setOnRequest(true);
        // save message in db
        saveMess(user.id, {role: 'user', content: question.trim()})
        // scroll end
        // updateScrollView()
        callAPI(question.trim()).then((response)=>{
          if(response.success){
            // console.log(response.data.message)
            saveMess(user.id, response.data.message)
            newMessage.push(response.data.message)
            setMessages([...newMessage])
            // updateScrollView()
            setQuestion('')
          }else{
            Alert.alert('Error', response.msg)
          }
        })
      }
    }else{
      if(question.length>0){
        let newMessage = [...messages]
        newMessage.push({role: 'user', content: question.trim()})
        setMessages([...newMessage])
        setQuestion('')
        setOnRequest(true);
        // save message in db
        saveMessPDF(user.id, {role: 'user', content: question.trim()}, typeChat)
        // scroll end
        // updateScrollView()
        callAPIChatPdf(question.trim()).then((response)=>{
          if(response.success){
            // console.log(response.data.data)
            saveMessPDF(user.id, response.data.data, typeChat)
            newMessage.push(response.data.data)
            setMessages([...newMessage])
            // updateScrollView()
            setQuestion('')
          }else{
            Alert.alert('Error', response.msg)
          }
        })
      }
    }
  }

  const deleteMess = async (id, type) => {
    // console.log(user, type)
    const client = axios.create({
      headers: {}
    });
    const res = await client.post(`http://localhost:3300/api/messages/${id}`,{
      type: type
    });
    if(res.status === 200){
      setMessages([])
    }else{
      console.log(res.data.error)
    }
  }

  return (
    
    <>
    {isLoading&&!user&&(
      <Dialog open={true} >
        <DialogHeader>You are not logged in!</DialogHeader>
        <DialogBody>
          Please log in before starting a conversation.
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="green" >
            <SignInButton />
          </Button>
        </DialogFooter>
      </Dialog>
    )}
     <section className="relative block h-[40vh] -mt-20">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-cover bg-center scale-105">
          <img
            className="absolute h-full w-full rounded-b-lg object-cover object-center -mt-2"
            src='/img/bg-home-3.jpg'
            alt="nature image"
          />
          <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
          <div className="max-w-8xl container relative mx-auto mt-32">
            <div className="flex flex-wrap items-center">
              <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
                <Typography
                  variant="h3"
                  color="white"
                  className="mb-6 font-bold"
                >
                  Chat AI Support
                </Typography>
                <Typography variant="lead" color="white" className="opacity-80">
                Support chats offer admission information, and helpful suggestions for students
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="px-4 pt-10 pb-20">
          <div className="container mx-auto">
            <div className="mt-10 flex flex-wrap items-start">
                <div className="mx-auto  w-full px-4 md:w-4/12 sticky top-36 max-h-full">
                  <Card className="w-full">
                    <CardHeader
                      variant="gradient"
                      className="mb-4 h-12 place-items-center flex justify-center items-center"
                    >
                      <FaRobot className="h-[20px] w-[20px]" />
                      <Typography variant="h5" color="black"  className=" ps-3">
                        AI conversation
                      </Typography>
                    </CardHeader>
                    <CardBody className="flex flex-col gap-4">
                      <Input label="Name University" size="lg" onChange={e => setSearchInputName(e.target.value)}/>

                      <Card className="w-full relative max-h-[450px] overflow-auto">
                        <List className="">
                          <ListItem onClick={()=>{handleClick('AI Chat Assistant','gpt', 'img/iconChatGPT.png')}}>
                            <ListItemPrefix>
                              <Avatar variant="circular" alt="candice" src="img/iconChatGPT.png" />
                            </ListItemPrefix>
                            <div>
                              <Typography variant="h6" color="blue-gray">
                              AI chat Assistant
                              </Typography>
                              
                            </div>
                          </ListItem>
                          <ListItem onClick={()=>{handleClick('All University', 'all', 'img/chatPDF.png')}}>
                            <ListItemPrefix>
                              <Avatar variant="circular" alt="alexander" src="img/chatPDF.png" />
                            </ListItemPrefix>
                            <div>
                              <Typography variant="h6" color="blue-gray">
                              All PDF University
                              </Typography>
                            </div>
                          </ListItem>
                          {data.map((university) => (
                            <ListItem key={university.code} onClick={()=>{handleClick(university.name.vi, university.code, university.icon)}}>
                              <ListItemPrefix>
                                <Avatar variant="circular" alt="emma" src={university.icon} />
                              </ListItemPrefix>
                              <div>
                                <Typography variant="h6" color="blue-gray">
                                {university.name.vi}
                                </Typography>
                                <Typography variant="small" color="gray" className="font-normal">
                                {university.name.en}
                                </Typography>
                              </div>
                            </ListItem>
                          ))}
                        </List>
                      </Card>
                    </CardBody>
                    {/* <CardFooter className="pt-0">
                      <Button variant="gradient" fullWidth className=" flex justify-center gap-2">
                        <MdOutlineLocationSearching /> Search
                      </Button>
                      
                    </CardFooter> */}
                  </Card>
                </div>
                <div className="mx-auto mt-10 flex w-full justify-center md:w-8/12 lg:mt-0 border border-solid ">
                  <Stack
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ height: "600px" }}
                    className=""
                  >
                    <Header bg borderBottom>
                      <Box sx={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                        paddingX: 2,
                        maxWidth: "md"
                      }}>
                        <Typography
                          variant="h6"
                          fontWeight="700"
                          color={'white'}
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)"
                          }}
                        >
                          <Avatar variant="circular" alt="candice" className="m-2" size="xs" src={iconHeaderChat} />
                          {nameHeaderChat}
                        </Typography>
                        <IconButton
                          onClick={()=>{deleteMess(user.id, typeChat)}}
                          sx={{
                            position: "absolute",
                            top: "50%",
                            right: "16px",
                            transform: "translateY(-50%)",
                            color: "white",
                          }}
                        >
                          <MdDelete />
                        </IconButton>
                      </Box>
                    </Header>

                    <Box id="chat-wrapper" ref={chatWrapperRef} sx={{
                      height: "100%",
                      position: "relative",
                      zIndex: 1,
                      maxWidth: "md",
                      width: "100%",
                      overflowY: "auto",
                      paddingTop: "20px",
                      paddingBottom: "150px",
                      "&::-webkit-scrollbar": {
                        width: "0px"
                      }
                    }}>
                      <Box sx={{
                        display: "relative",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        maxWidth: "md",
                        width: "100%",
                      }}>
                        {messages.map((item, index) => (
                          <Box key={index} padding={1}>
                            <Box sx={{
                              padding: 2,
                              bgcolor: item.role === messageType.assistant && "gray",
                              borderRadius: 3,
                              color: item.role === messageType.assistant && "white"
                            }}>
                              {index === messages.length - 1 ? (
                                item.role === messageType.assistant ? (
                                  <TextTypeWriter content={item.content} setOnRequest={setOnRequest} />
                                ) : item.content
                              ) : (
                                item.content
                              )}
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </Box>

                    <Stack
                      alignItems="center"
                      justifyContent="center"
                      bgcolor="#2f2f2f"
                      zIndex={3}
                      position={"relative"}
                      bottom={0}
                      className="container rounded-b-lg"
                      width={"max-content"}
                    >
                      <Box
                        padding={0}
                        paddingRight={5}
                        paddingLeft={5}
                        width="100%"
                      
                      >
                        <FormControl fullWidth variant="outlined">
                          <OutlinedInput
                            inputRef={inputRef}
                            sx={{
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: "none",
                              },
                              ".MuiInputBase-input": {
                                color: "white",
                                cursor: "pointer",
                              },
                              ".MuiSvgIcon-root": {
                                color: "white"
                              }
                            }}
                            endAdornment={
                              onRequest ? (
                                <CircularProgress size="1.5rem" />
                              ) : (
                                <SendOutlinedIcon />
                              )
                            }
                            autoFocus
                            disabled={onRequest}
                            onKeyUp={onEnterPress}
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Ask something..."
                          />
                        </FormControl>
                      </Box>
                    </Stack>
                  </Stack>  
                </div>
            </div>
          </div>
      </section>
    </>
  );
};

export default Chat;
