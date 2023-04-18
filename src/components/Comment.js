import React, { useState } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function Comment(props) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const handleDeleteClose = () => {
    setDeleteOpen((prevstate) => !prevstate);
  };

  const handleEditClose = () => {
    setEditOpen((prevstate) => !prevstate);
    props.setEditedComment(null);
  };

  return (
    <>
      <ListItem
        secondaryAction={
          <>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={handleDeleteClose}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={handleEditClose}
            >
              <EditIcon />
            </IconButton>
          </>
        }
      >
        <ListItemAvatar>
          <Avatar />
        </ListItemAvatar>
        <ListItemText
          secondary={<React.Fragment>{props.comment.content}</React.Fragment>}
        />
      </ListItem>
      <Divider />
      <Dialog open={deleteOpen} onClose={handleDeleteClose}>
        <DialogTitle>Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this comment?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => [
              props.handleDelete(props.comment.content, props.comment.id),
              handleDeleteClose(),
            ]}
          >
            Delete
          </Button>
          <Button onClick={handleDeleteClose}>No</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit following comments</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="content"
            label="Comments"
            type="text"
            fullWidth
            variant="standard"
            value={
              props.editedComment !== null
                ? props.editedComment
                : props.comment.content
            }
            onChange={(e) => props.setEditedComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Back</Button>
          <Button
            onClick={() => [
              props.handleEdit(props.comment.content, props.comment.id),
              handleEditClose(),
            ]}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
