import React, { useState, useEffect } from "react";
import { IUser } from "./interface";

interface IProps {
  user: IUser;
  onUpdateUser: (id: number, user: IUser) => void;
  setEdit: (bool: boolean) => void;
  setIsModalVisible: (bool: boolean) => void;
}

export default function EditUserForm(props: IProps) {
  const [user, setUser] = useState(props.user);
  useEffect(() => setUser(props.user), [props]);
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user.Project || !user.name) {
      console.log("em");
      return false;
    }
    props.onUpdateUser(user.id, user);
  };
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  return (
    <div className="user-form">
      <h1>edit users</h1>
      <form className="form-edit" onSubmit={onFormSubmit}>
        <div className="form-row">
          <label>Name</label>
          <input
            type="text"
            placeholder="please input name"
            name="name"
            value={user.name}
            onChange={onInputChange}
          />
          {/* <div className="form-error">too short</div> */}
        </div>
        <div className="form-row">
          <label>Project</label>
          <input
            type="text"
            placeholder="please input Project"
            name="Project"
            value={user.Project}
            onChange={onInputChange}
          />
        </div>
        <div className="form-row">
          <label>Comments</label>
          <input
            type="text"
            placeholder="please input Comments"
            name="Comments"
            value={user.Comments}
            onChange={onInputChange}
          />
        </div>
        <div className="form-row">
          <button onClick={() => {props.setIsModalVisible(false)}}>Update</button>
          <button onClick={() => {props.setEdit(false); props.setIsModalVisible(false)}}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
