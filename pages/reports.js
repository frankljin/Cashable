import React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import Navbar from "../components/Navbar/Navbar";
import { Grid } from "@material-ui/core";
import styles from "../styles/Reports.module.css";
import format from "date-fns/format";
import addDays from "date-fns/addDays";

const Reports = ({account, transaction}) => {
  const { user, error, isLoading } = useUser();
  const data = [];
  const dates = [];
  for (let i = -7; i < 1; i++) {
      data.push(
        { name: format(addDays(new Date(), i), "MMM d"), spent: 0 }
      );
      const pushDate = addDays(new Date(), i);
      dates.push(pushDate.setHours(0, 0, 0, 0));
  }
  transaction.transactions.forEach((entry) => {
      const entryDay = new Date(entry.date);
      const index = dates.indexOf(entryDay.setHours(0, 0, 0, 0));
      if (index !== -1) {
        data[index].spent += parseInt(entry.amount);
      }
  })
  return (
    <>
      <Navbar user={user} />
      {user && (
        <div className={styles.main}>
          <Grid container justify="flex-end">
            <h1 style={{ flex: 1 }}>Reports</h1>
          </Grid>
          <p>
            This page provides users with spending reports. For reports on
            specific budgets, please view the Budgets page.
          </p>
          <h3>Net change in {account.name} account balance over the past week:</h3>
          <LineChart
            width={700}
            height={400}
            data={data}
            margin={{ top: 5, right: 20, bottom: 25, left: 25 }}
          >
            <Line type="monotone" dataKey="spent" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" label={{ value: 'Date', angle: 0, position: 'bottom' }} />
            <YAxis label={{ value: 'Net change ($)', angle: -90, position: 'left' }} />
            <Tooltip />
          </LineChart>
        </div>
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  const accountRes = await fetch(
    `http://localhost:3000/api/accountDetails?id=6126a6e6664d246df2df3a40`
  );
  const accountJson = await accountRes.json();
  const transactionRes = await fetch(
    `http://localhost:3000/api/transactions?id=6126a6e6664d246df2df3a40`
  );
  const transactionJson = await transactionRes.json();
  return {
    props: {
      account: accountJson,
      transaction: transactionJson,
    },
  };
}

export default Reports;
