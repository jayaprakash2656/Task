import React, { useState } from "react";
import { IBaseUser } from "./interface";
import validator, { noErrors, FormErrors } from "../page/validator";

interface IProps {
  onAddUser: (user: IBaseUser) => void;
  setIsModalVisibleAdd: (bool: boolean) => void;
}
const initUser = { Project: "", name: "", Comments: "" };
const AddUserForm: React.FunctionComponent<IProps> = props => {
  const [formValue, setFormValue] = useState(initUser);
  const [errors, setErrors] = useState<FormErrors>({});
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const rules = [
      { key: "name", required: true, label: "Name" },
      { key: "Project", required: true, label: "Project" },
      { key: "Comments", required: true, label: "Comments" },
      { key: "name", maxLength: 16, label: "name" },
      { key: "name", minLength: 4, label: "name" },
      { key: "Comments", minValue: 18, label: "Comments" },
      { key: "Comments", maxValue: 60, label: "Comments" }
    ];
    validator(
      formValue,
      rules,
      (errors: any): any => {
        if (noErrors(errors)) {
          props.onAddUser(formValue);
          setFormValue(initUser);
          return false;
        }
        setErrors(errors);
      }
    );
  };
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  return (
    <div className="user-form">
      <h1>Users</h1>
      <form className="form-edit" onSubmit={onFormSubmit}>
        <div className="form-row">
          <label>Name</label>
          <input
            type="text"
            placeholder="please input name"
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
          <input
            type="text"
            placeholder="please input Project"
            name="Project"
            value={formValue.Project}
            onChange={onInputChange}
          />
          {errors["Project"] && errors["Project"].length > 0 && (
            <div className="form-error">{errors["Project"].join(",")}</div>
          )}
        </div>
        <div className="form-row">
          <label>Comments</label>
          <input
            type="text"
            placeholder="please input Comments"
            name="Comments"
            value={formValue.Comments}
            onChange={onInputChange}
          />
          {errors["Comments"] && errors["Comments"].length > 0 && (
            <div className="form-error">{errors["Comments"].join(",")}</div>
          )}
        </div>
        <div className="form-row">
          <button onClick={() => {props.setIsModalVisibleAdd(false)}}>Add new user</button>
          <button onClick={() => {props.setIsModalVisibleAdd(false)}}>Cancel</button>
        </div>
      </form>
    </div>
  );
};
export default AddUserForm;
