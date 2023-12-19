import { ConnectWallet, Web3Button, useAddress } from "@thirdweb-dev/react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [resgitrationStatus, setResgirationStatus] = useState(null);
  const [address, setAddress] = useState(null);
  const navigate = useNavigate();
  const userWalletAddress = useAddress();
  const to = "0x8441e0d9626a92cc0Fc8fb5b9edB0e605806DEeC";
  const amount = "1000000";

  const checkUser = async () => {
    const response = await axios.get(
      `http://localhost:3000/api/users/checkuser?address=7878788411`
    );
    const responsedata = response.data;
    setResgirationStatus(responsedata);
  };

  const handleApi = async (url,sucessMessage) => {
  try {
    const response = await axios.get(url);
    const responsedata = response.data;

    setResgirationStatus(responsedata)

    if(Array.isArray(responsedata)){
      if(responsedata.includes('message: "User registered successfully"')){
        toast.success(sucessMessage);
      }else if(responsedata.includes('message: "Login Successfully"')){
        toast.success(sucessMessage);
      }
    }
  } catch (error) {
    
  }
  }

  const handleLogin= () =>{
    const url = `/api/login?address=${userWalletAddress}`;
    handleApi(url,"Login Successfully"); 
  }
   
  const handleRegister= () =>{
    const url = `/register?address=${userWalletAddress}`;
    handleApi(url,"User registered successfully");
  }

  return (
    <div className="bg-blue-500 flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg justify-around md:max-w-lg lg:max-w-xl xl:max-w-2xl p-4 md:p-6 lg:p-8">
        <div className="">
          <label htmlFor="Walletaddress" className="block text-center">
            Wallet Address
          </label>
          <input
            type="text"
            placeholder="address"
            className="w-full border border-gray-300 rounded-lg p-2"
            id="Walletaddress"
            name="Walletaddress"
            onChange={(e) => setAddress(e.target.value)}
            value={userWalletAddress}
            readOnly
          />
        </div>
        <Web3Button
          connectWallet={{
            btnTitle: "Connect",
          }}
          contractAddress="0x32702946083578B514853528119Ecf2a7f0cd664"
          action={(contract) => {
            checkUser();
            if (resgitrationStatus === "user exists") {
              contract.call("transfer", [to, amount]);
              navigate("/dashboard");
            }else if(resgitrationStatus==="user does not exist" ){
              toast.error("User does not exist");
            }
            
          }}
          className="mx-auto"
        >
          Register
        </Web3Button>

<button type="button" onClick={checkUser}>chechuser</button>

        {/* <Web3Button btnTitle="Login" action={async()=>{
          await checkUser();
          if(resgitrationStatus === "user exists"){
           navigate("/dashboard");
          }else{
            handleRegister();
          }
        }}
      onSuccess={(sucessMessage) => toast.success(sucessMessage)}
        >Login</Web3Button> */}
       
      </div>
    </div>
  );
};

export default Login;
