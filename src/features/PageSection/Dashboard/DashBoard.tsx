import React, { useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import type { Student, Mark, Fee, User } from "../../../types/allTypes";
import { getStudents, getMarks, getFees, getUsers } from "../../../api/api";

const Dashboard: React.FC = () => {
  
  const [students, setStudents] = useState<Student[]>([]);
  const [marks, setMarks] = useState<Mark[]>([]);
  const [fees, setFees] = useState<Fee[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentRes, marksRes, feesRes, usersRes] =
          await Promise.all([
            getStudents(),
            getMarks(),
            getFees(),
            getUsers(),
          ]);

        setStudents(studentRes.data);
        setMarks(marksRes.data);
        setFees(feesRes.data);
        setUsers(usersRes.data);
      } catch (error) {
        console.error("Dashboard Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

    const totalUsers = users.length;
  const totalStudents = students.length;

  const totalSubjects = useMemo<number>(() => {
    const subjects = marks.map((m) => m.subject);
    return new Set(subjects).size;
  }, [marks]);

  const totalFeesAmount = useMemo<number>(() => {
    return fees.reduce((acc, curr) => acc + curr.totalamount, 0);
  }, [fees]);

  const feeStatusData = useMemo(() => {
    const paid = fees.filter((f) => f.paymentstatus === "paid").length;
    const partial = fees.filter((f) => f.paymentstatus === "partial").length;
    const due = fees.filter((f) => f.paymentstatus === "due").length;

    return [
      { name: "Paid", value: paid },
      { name: "Partial", value: partial },
      { name: "Due", value: due },
    ];
  }, [fees]);

  const summaryData = [
    { name: "Users", value: totalUsers },
    { name: "Students", value: totalStudents },
    { name: "Subjects", value: totalSubjects },
  ];

  const COLORS = ["#28a745", "#ffc107", "#dc3545"];

  if (loading)
    return <h4 className="text-center mt-5">Loading Dashboard...</h4>;

  return (
    <div className="container-fluid p-4">
      <h2 className="fw-bold mb-4">📊 Admin Dashboard</h2>

      <div className="row g-4 mb-4">
        <Card title="Total Users" value={totalUsers} bg="primary" />
        <Card title="Total Students" value={totalStudents} bg="success" />
        <Card title="Total Subjects" value={totalSubjects} bg="warning" />
        <Card
          title="Total Fees Amount"
          value={`₹ ${totalFeesAmount.toLocaleString()}`}
          bg="danger"
        />
      </div>

      <div className="row g-4">
        <div className="col-lg-6 col-12">
          <div className="card shadow-sm p-3">
            <h5>System Overview</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={summaryData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#0d6efd" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-lg-6 col-12">
          <div className="card shadow-sm p-3">
            <h5>Fees Status</h5>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={feeStatusData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {feeStatusData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CardProps {
  title: string;
  value: string | number;
  bg: string;
}

const Card: React.FC<CardProps> = ({ title, value, bg }) => (
  <div className="col-lg-3 col-md-6 col-12">
    <div className={`card text-white bg-${bg} shadow-lg h-100`}>
      <div className="card-body">
        <h6>{title}</h6>
        <h3 className="fw-bold">{value}</h3>
      </div>
    </div>
  </div>
);

export default Dashboard;