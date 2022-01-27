import React, { useState } from "react";
import { IBaseUser } from "./interface";
import validator, { noErrors, FormErrors } from "../page/validator";
import { Select, Input, Button, Modal, message } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

interface IProps {
  onAddUser: (user: IBaseUser) => void;
}
const initUser = { Project: "", name: "", Comments: "" };
const AddUserForm: React.FunctionComponent<IProps> = props => {
  const [formValue, setFormValue] = useState(initUser);
  const [selected, setSelected] = useState("")
  const [isModalVisibleAdd, setIsModalVisibleAdd] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const handleAddBtn = () => {
    setIsModalVisibleAdd(true);
  }
  const onFormSubmit = (e: any) => {
    e.preventDefault();
    const rules = [
      { key: "name", required: true, label: "Name" },
      { key: "Project", required: true, label: "Project" },
      { key: "Comments", required: false, label: "Comments" },
      { key: "name", maxLength: 16, label: "name" },
      { key: "name", minLength: 4, label: "name" }
    ];
    validator(
      formValue,
      rules,
      (errors: any): any => {
        if (noErrors(errors)) {
          setErrors({})
          setIsModalVisibleAdd(false);
          props.onAddUser(formValue);
          setSelected("")
          setFormValue(initUser);
          message.success(`${formValue.name} added successfully`);
          return false;
        }
        setErrors(errors);
      }
    );
  };
  const handleCancel = () => {
    setIsModalVisibleAdd(!isModalVisibleAdd)
    setErrors({})
    setSelected("")
    setIsModalVisibleAdd(false);
    setFormValue(initUser);
  }
  const onInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  function handleChange(value: any) {
    setSelected(value)
    setFormValue({ ...formValue, 'Project': value });
  }
  return (
    <>
      <Button onClick={handleAddBtn}>
        Create Tasks
      </Button>
      <Modal title="Add User" visible={isModalVisibleAdd} onOk={onFormSubmit}
        onCancel={handleCancel}>
        <div className="user-form">
          <form className="form-edit">
            <div className="form-row">
              <label>Name</label>
              <Input
                type="text"
                placeholder="Enter Name"
                name="name"
                value={formValue.name}
                onChange={onInputChange}
              />
              {errors["name"] && errors["name"].length > 0 && (
                <div className="form-error">{errors["name"].join(",")}</div>
              )}
            </div>
            <div className="form-row">
              <label>Project</label>
              <Select defaultValue="Project 1" onChange={handleChange} value={selected} style={{ width: '100%' }} allowClear>
                <Option value="">None</Option>
                <Option value="Project 1">Project 1</Option>
                <Option value="Project 2">Project 2</Option>
              </Select>
              {errors["Project"] && errors["Project"].length > 0 && (
                <div className="form-error">{errors["Project"].join(",")}</div>
              )}
            </div>
            <div className="form-row">
              <label>Comments</label>
              <TextArea
                placeholder="Enter Comments"
                name="Comments"
                rows={6}
                maxLength={500}
                showCount
                value={formValue.Comments}
                onChange={onInputChange}
              />
              {errors["Comments"] && errors["Comments"].length > 0 && (
                <div className="form-error">{errors["Comments"].join(",")}</div>
              )}
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};
export default AddUserForm;
