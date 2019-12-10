import React from "react";
import "./App.css";
import { Avatar, Table, Spin, Icon, Modal, Empty } from "antd";
import { getAllStudents } from "./client";
import Container from "./Container";
import Footer from "./Footer";
import AddStudentForm from "./forms/AddStudentForm";
import { errorNotification, successNotification } from "./Notification";

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class App extends React.Component {
  state = {
    students: [],
    isFetching: false,
    visible: false
  };

  componentDidMount() {
    this.fetchStudents();
    this.setState({ isFetching: true });
  }

  fetchStudents = () => {
    getAllStudents()
      .then(res => res.json())
      .then(students => {
        this.setState({ students, isFetching: false })
      })
      .catch(error => {
        const message = error.message;
        const description = error.error.message;
        errorNotification(message, description);
        this.setState({ isFetching: false });
      });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };
  closeModal = () => {
    this.setState({
      visible: false
    });
  };

  handleOk = e => {
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { students, isFetching } = this.state;
    const CommonElement = () => (
      <div>
        <Footer
          numberOfStudents={students.length}
          showModal={this.showModal}
        ></Footer>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={1000}
        >
          <AddStudentForm
            onSuccess={() => {
              this.fetchStudents();
              successNotification("success", "success");
              // close modal after setSubmitting, to escape memory leak
              setTimeout(this.closeModal);
            }}
            onFailure={error => {
              const message = error.message;
              const description = error.error.message;
              errorNotification(message, description);
            }}
          ></AddStudentForm>
        </Modal>
      </div>
    );
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
          <Table
            dataSource={students}
            columns={columns}
            rowKey="studentId"
            style={{ marginBottom: "5em" }}
          />
          <CommonElement></CommonElement>
        </Container>
      );
    }
    return (
      <div>
        <Empty description={<strong>No students found!</strong>}></Empty>;
        <CommonElement></CommonElement>
      </div>
    );
  }
}

export default App;
