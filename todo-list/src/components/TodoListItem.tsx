import React from 'react';
import { ListItem, Typography, Checkbox, Button, Box, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface TodoListItemProps {
  task: string; // Nombre de la tarea
  completed: boolean; // Estado de completado de la tarea
  onToggle: () => void; // Función para cambiar el estado de completado de la tarea
  onEdit: () => void; // Función para editar la tarea
  onDelete: () => void; // Función para eliminar la tarea
}

const MAX_TASK_LENGTH = 50; 

const TodoListItem: React.FC<TodoListItemProps> = ({ task, completed, onToggle, onEdit, onDelete }) => {
    
  return (
    <>
      <ListItem
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: 'calc(100% - 150px)' }}>
          <Checkbox checked={completed} onChange={onToggle} />
          <Typography variant="body1" sx={{ marginLeft: '8px', textDecoration: completed ? 'line-through' : 'none', overflowWrap: 'anywhere' }}>
            {task.length > MAX_TASK_LENGTH ? `${task.substring(0, MAX_TASK_LENGTH)}...` : task}
          </Typography>
        </Box>
        <Box display={'flex'} flexDirection={{ xs: 'column', sm: 'row' }} gap={1}>
          <Button variant="contained" onClick={onEdit} startIcon={<EditIcon />}>
            Editar
          </Button>
          <Button variant="contained" color="error" onClick={onDelete} startIcon={<DeleteIcon />}>
            Eliminar
          </Button>
        </Box>
      </ListItem>
      <Divider />
    </>
  );
};

export default TodoListItem;
