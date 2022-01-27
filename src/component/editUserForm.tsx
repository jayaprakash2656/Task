import React, { useState, useEffect } from "react";
import { IUser } from "./interface";
import { Select, Input, Modal, message } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

interface IProps {
  user: IUser;
  onUpdateUser: (id: number, user: IUser) => void;
  setIsModalVisible: (bool: boolean) => void;
  visible: boolean
}

export default function EditUserForm(props: IProps) {
  const [user, setUser] = useState(props.user);
  useEffect(() => setUser(props.user), [props]);
  const onFormSubmit = (e: any) => {
    e.preventDefault();
    if (!user.Project || !user.name) {
      console.log("em");
      return false;
    }
    message.success(`${user.name} updated successfully`);
    props.onUpdateUser(user.id, user);
  };
  const onInputChange = (e: any) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  function handleChange(value: any) {
    setUser({ ...user, 'Project': value });
  }
  const handleCancel = () => {
    props.setIsModalVisible(!props.visible)
  }
  return (
    <Modal title="Edit user" visible={props.visible} onOk={onFormSubmit}
      onCancel={handleCancel}>
      <div className="user-form">
        <form className="form-edit">
          <div className="form-row">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              name="name"
              value={user.name}
              onChange={onInputChange}
            />
          </div>
          <div className="form-row">
            <label>Project</label>
            <Select defaultValue="Project 1" onChange={handleChange} style={{ width: '100%' }} allowClear>
              <Option value="">None</Option>
              <Option value="Project 1">Project 1</Option>
              <Option value="Project 2">Project 2</Option>
            </Select>
          </div>
          <div className="form-row">
            <label>Comments</label>
            <TextArea
              placeholder="Enter Comments"
              name="Comments"
              rows={6}
              maxLength={500}
              showCount
              value={user.Comments}
              onChange={onInputChange}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
}
