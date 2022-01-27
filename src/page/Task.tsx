import React, { useState } from "react";
import AddUserForm from "../component/addUserForm";
import EditUserForm from "../component/editUserForm";
import UserTable from "../component/userTable";
import { IBaseUser, IUser } from "../component/interface";
import { message } from 'antd';

import "./style.css";

const defaultUsers: Array<IUser> = [
  { Project: "Project 1", name: "lily hh", id: 1, Comments: "None" },
  { Project: "Project 2", name: "bob haha", id: 2, Comments: "None" }
];
const initCurrentUser: IUser = { Project: "", name: "", Comments: "", id: 0 };

function Task() {
  const [users, setUsers] = useState(defaultUsers);
  const [editUser, setEditUser] = useState(initCurrentUser);
  const [editing, setEdit] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const onAddUser = (newUser: IBaseUser) => {
    var id = 1;
    users.map(i => {
      id = i.id + 1
      return null;
    })
    setUsers([...users, { ...newUser, id }]);
  };
  const onCurrentUser = (user: IUser) => {
    setEditUser(user);
    setEdit(true);
    setIsModalVisible(true);
  };
  const onUpdateUser = (id: number, newUser: IUser) => {
    setEdit(false);
    setUsers(users.map(i => (i.id === id ? newUser : i)));
  };
  const onDeleteUser = (currentUser: IUser) => {
    console.log('delete!')
    setUsers(users.filter(i => i.id !== currentUser.id));
    message.error(`${currentUser.name} deleted successfully`);
  };
  return (
    <>
      <h3>Task</h3>
      <br />
      <div className="user-flex-wrapper">

        <AddUserForm onAddUser={onAddUser} />
      </div>
      <br />
      <div className="user-flex-wrapper">
        {editing ? (
          <EditUserForm
            user={editUser}
            onUpdateUser={onUpdateUser}
            setIsModalVisible={setIsModalVisible}
            visible={isModalVisible}
          />
        ) : (
          null
        )}
        <UserTable
          users={users}
          onEdit={onCurrentUser}
          onDelete={onDeleteUser}
        />
      </div>
    </>
  );
}

export default Task;
