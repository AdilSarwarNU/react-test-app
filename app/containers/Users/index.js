import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import UserTable from "../../components/UserTable";
import Button from "@material-ui/core/Button";
import DeletionDialog from "../../components/DeletionDialog";

export default props => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [data, setData] = useState([
    {
      id: "1",
      name: 'Adil Sarwar',
      email: "adil@sarwar.com",
      phone: "+1571315646",
    },
    {
      id: "2",
      name: 'John Doe',
      email: "john@doe.com",
      phone: "+6231413237",
    },
  ]);

  useEffect(() => {
    let users = localStorage.getItem("users");
    setData(users ? JSON.parse(users) : []);
  }, []);

  const onDeleteItem = item => {
    let newData = data.filter(value => value.id !== item.id);
    setData(newData);
    localStorage.setItem("users", JSON.stringify(newData));
  };

  const onEditItem = item => {

  };

  return (
    <Grid direction='column' alignItems='flex-end' container>
      <Grid item>
        <Button variant='contained' color='primary'>Add record</Button>
      </Grid>
      <UserTable onDeleteItem={(item) => {
        setSelectedItem(item);
        setOpenDelete(true);
      }} onEditItem={(item) => {
        setSelectedItem(item);
        setOpenEdit(true);
      }} data={data}/>
      <DeletionDialog onNegativeAction={() => {
        setOpenDelete(false);
        setSelectedItem(null);
      }} onPositiveAction={() => {
        onDeleteItem(selectedItem);
      }} onClose={() => setOpenDelete(false)} open={openDelete}/>
    </Grid>
  )
};