import React from "react";
import { Formik } from "formik";
import { Input, Button, Tag } from "antd";
import { addNewStudent } from "../client";

const inputBottomMargin = { marginBottom: "10px" };
const tagStyle = {
  background: "#f50",
  color: "white",
  padding: "5px",
  ...inputBottomMargin
};
const AddStudentForm = props => (
  <div>
    <h1>Anywhere in your app!</h1>
    <Formik
      initialValues={{ firstName: "", lastName: "", email: "", gender: "" }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = "email Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        if (!values.firstName) {
          errors.firstName = "firstName Required";
        }
        if (!values.lastName) {
          errors.lastName = "lastName Required";
        }
        if (!values.gender) {
          errors.gender = "gender Required";
        } else if (
          !["MALE", "male", "FEMALE", "female"].includes(values.gender)
        ) {
          errors.gender =
            "gender must be one of 'MALE', 'male', 'FEMALE', 'female'";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        values.gender = values.gender.toUpperCase();
        addNewStudent(values)
          .then(() => {
            props.onSuccess();
          })
          .catch(error => {
            props.onFailure(error);
          })
          .finally(() => {
            setSubmitting(false);
          });
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        submitForm,
        isValid
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          <Input
            style={inputBottomMargin}
            name="firstName"
            placeholder="firstName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.firstName}
          />
          {errors.firstName && touched.firstName && (
            <Tag style={tagStyle}>errors.firstName</Tag>
          )}
          <Input
            style={inputBottomMargin}
            name="lastName"
            placeholder="lastName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.lastName}
          />
          {errors.lastName && touched.lastName && (
            <Tag style={tagStyle}>errors.lastName</Tag>
          )}
          <Input
            style={inputBottomMargin}
            type="email"
            name="email"
            placeholder="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {errors.email && touched.email && (
            <Tag style={tagStyle}>errors.email</Tag>
          )}
          <Input
            style={inputBottomMargin}
            name="gender"
            placeholder="gender"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.gender}
          />
          {errors.gender && touched.gender && (
            <Tag style={tagStyle}>errors.gender</Tag>
          )}
          <br />
          <Button
            type="submit"
            disabled={isSubmitting | (touched && !isValid)}
            onClick={submitForm}
          >
            Submit
          </Button>
        </form>
      )}
    </Formik>
  </div>
);

export default AddStudentForm;
