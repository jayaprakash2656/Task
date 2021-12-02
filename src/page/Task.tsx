import React, { useState } from "react";
import AddUserForm from "../component/addUserForm";
import EditUserForm from "../component/editUserForm";
import UserTable from "../component/userTable";
import { IBaseUser, IUser } from "../component/interface";
import { Modal, Button } from 'antd';

import "./style.css";

const defaultUsers: Array<IUser> = [
  { Project: "lily", name: "lily hh", id: 1, Comments: "None" },
  { Project: "bob", name: "bob haha", id: 2, Comments: "None" }
];
const initCurrentUser: IUser = { Project: "", name: "", Comments: "", id: 0 };

function Task() {
  const [users, setUsers] = useState(defaultUsers);
  const [editUser, setEditUser] = useState(initCurrentUser);
  const [editing, setEdit] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleAdd, setIsModalVisibleAdd] = useState(false);

  const handleAddBtn = () =>{
    setIsModalVisibleAdd(true);
  }
  const onAddUser = (newUser: IBaseUser) => {
    const id = users.length + 1;
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
    setUsers(users.filter(i => i.id !== currentUser.id));
  };
  return (
    <>
      <h3>Task</h3>
      <br/>
      <div className="user-flex-wrapper">
      <Modal title="" visible={isModalVisibleAdd} footer={null}>
      <AddUserForm setIsModalVisibleAdd = {setIsModalVisibleAdd} onAddUser={onAddUser} />
      </Modal>
      <Button onClick={handleAddBtn}>
          Create Tasks
      </Button>
      </div>
      <br/>
      <div className="user-flex-wrapper">
        <Modal title="" visible={isModalVisible} footer={null}>
        {editing ? (
          <EditUserForm
            user={editUser}
            onUpdateUser={onUpdateUser}
            setEdit={setEdit}
            setIsModalVisible = {setIsModalVisible}
          />
        ) : (
          null
        )}
      </Modal>
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
