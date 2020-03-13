import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import UserTable from "../../components/UserTable";
import Button from "@material-ui/core/Button";
import DeletionDialog from "../../components/DeletionDialog";
import UsersDialog from "../../components/UsersDialog";
import uuid from 'react-uuid';

export default props => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [data, setData] = useState([]);

  useEffect(() => {
    let users = localStorage.getItem("users");
    setData(users ? JSON.parse(users) : {});
  }, []);

  const onDeleteItem = item => {
    let newData = {...data};
    delete newData[item.id];
    setData(newData);
    localStorage.setItem("users", JSON.stringify(newData));
  };

  const onEditItem = item => {
    if(item.id) {
      let newData = {...data};
      newData[item.id] = item;
      setData(newData);
      localStorage.setItem("users", JSON.stringify(newData));
    } else {
      let id = uuid();
      let newData = {...data, [id]: {...item, id}};
      setData(newData);
      localStorage.setItem("users", JSON.stringify(newData));
    }
  };

  return (
    <Grid direction='column' alignItems='flex-end' container>
      <Grid item>
        <Button variant='contained' color='primary' onClick={() => setOpenEdit(true)}>Add record</Button>
      </Grid>

      <UserTable onDeleteItem={(item) => {
        setSelectedItem(item);
        setOpenDelete(true);
      }} onEditItem={(item) => {
        setSelectedItem(item);
        setOpenEdit(true);
      }} data={Object.values(data).reverse()}/>

      <DeletionDialog onNegativeAction={() => {
        setOpenDelete(false);
        setSelectedItem(null);
      }} onPositiveAction={() => {
        onDeleteItem(selectedItem);
      }} onClose={() => setOpenDelete(false)} open={openDelete}/>

      <UsersDialog {...selectedItem} onNegativeAction={() => {
        setSelectedItem(null);
      }} onPositiveAction={(user) => {
        onEditItem(user);
        setOpenEdit(false);
      }} onClose={() => {
        setSelectedItem(null);
        setOpenEdit(false);
      }} open={openEdit}/>
    </Grid>
  )
};