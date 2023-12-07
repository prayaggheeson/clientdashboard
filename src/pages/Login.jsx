import { Web3Button, useAddress } from "@thirdweb-dev/react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
const Login = () => {
  const [resgitrationStatus, setResgirationStatus] = useState(null);
  const [address, setAddress] = useState(null);
  const userWalletAddress = useAddress();
  const to = "0x8441e0d9626a92cc0Fc8fb5b9edB0e605806DEeC";
  const amount = "1000000";

  const checkUser = async () => {
    const response = await axios.get(
      `http://localhost:3000/api/checkuser/address=${userWalletAddress}`
    );
    const responsedata = response.data;
    setResgirationStatus(responsedata);
  };

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
            contract.call("transfer", [to, amount]);
          }}
          className="mx-auto"
        >
          Register
        </Web3Button>

        <button type="button" onClick={checkUser}>
          Check user
        </button>
       
      </div>
    </div>
  );
};

export default Login;
