import React from "react";
import "./App.css";
import { Avatar, Table, Spin, Icon } from "antd";
import { getAllStudents } from "./client";
import { Container } from "./Container";

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class App extends React.Component {
  state = {
    students: [],
    isFetching: false
  };

  componentDidMount() {
    this.fetchStudents();
    this.setState({ isFetching: true });
  }

  fetchStudents = () => {
    getAllStudents()
      .then(res => res.json())
      .then(students => this.setState({ students, isFetching: false }));
  };

  render() {
    const { students, isFetching } = this.state;
    const columns = [
      {
        title: "Avatar",
        key: "avatar",
        render(text, row, index) {
          return (
            <div>
              <Avatar size="large">{`${row.firstName.charAt(0).toUpperCase() +
                row.lastName.charAt(0).toUpperCase()}`}</Avatar>
            </div>
          );
        }
      },
      {
        title: "Student Id",
        dataIndex: "studentId",
        key: "studentId"
      },
      {
        title: "First Name",
        dataIndex: "firstName",
        key: "firstName"
      },
      {
        title: "Last Name",
        dataIndex: "lastName",
        key: "lastName"
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email"
      },
      {
        title: "Gender",
        dataIndex: "gender",
        key: "gender"
      }
    ];

    if (isFetching) {
      return (
        <Container>
          <Spin indicator={antIcon} />
        </Container>
      );
    }

    if (students && students.length) {
      return (
        <Container>
          <Table dataSource={students} columns={columns} rowKey="studentId" />
        </Container>
      );
    }
    return <h1>No students!</h1>;
  }
}

export default App;
