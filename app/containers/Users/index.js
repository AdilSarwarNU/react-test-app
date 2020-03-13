import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import UserTable from "../../components/UserTable";
import Button from "@material-ui/core/Button";

export default props => {
  const [data, setData] = useState([
    {
      name: 'Adil Sarwar',
      email: "adil@sarwar.com",
      phone: "+1571315646",
    },
    {
      name: 'John Doe',
      email: "john@doe.com",
      phone: "+6231413237",
    },
  ]);

  return (
    <Grid direction='column' alignItems='flex-end' container>
      <Grid item>
        <Button variant='contained' color='primary'>Add record</Button>
      </Grid>
      <UserTable data={data}/>
    </Grid>
  )
};