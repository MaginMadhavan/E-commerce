import React, { useState, useEffect } from "react";
import Layout from "../../components/Layouts/Layout";
import UserMenu from "../../components/Layouts/UserMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();

  //state
  const [name, setName] = useState("");
  const [email, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  //get user data
  useEffect(() => {
    const { email, name, phone, address } = auth.user;
    setName(name);
    setPhone(phone);
    setMail(email);
    setAddress(address);
  }, [auth?.user]);
  //function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/auth/profile`,
        { name, email, password, address, phone }
      );
      if (data?.error) {
        toast.error(data?.error);
        return;
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data?.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="form-container">
              <div>
                <h1 className="title">User Profile</h1>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      placeholder="Name"
                      type="text"
                      className="form-control"
                      id="exampleInputName"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      placeholder="Email"
                      type="email"
                      className="form-control"
                      id="exampleInputMail"
                      value={email}
                      onChange={(e) => setMail(e.target.value)}
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      placeholder="Phone Number"
                      type="text"
                      className="form-control"
                      id="exampleInputPhone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      placeholder="Address"
                      type="text"
                      className="form-control"
                      id="exampleInputAddress"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      placeholder="Password"
                      type="password"
                      className="form-control"
                      id="exampleInputPassword"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
