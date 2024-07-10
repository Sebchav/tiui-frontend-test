import React, { useState, useEffect, ChangeEvent } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

interface TaskModalProps {
  isOpen: boolean; // Indica si el modal está abierto
  task: string; // Tarea actual para editar
  onSaveEdit: (editedTask: string) => void; // Función para guardar la tarea editada
  onClose: () => void; // Función para cerrar el modal
}

const MAX_TASK_LENGTH = 50;

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, task, onSaveEdit, onClose }) => {
  const [editedTask, setEditedTask] = useState<string>(task);

  // Sincroniza el estado cuando cambia la tarea
  useEffect(() => {
    setEditedTask(task);
  }, [task]);

  // Maneja cambios en el input de edición
  const handleEditInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedTask(e.target.value.substring(0, MAX_TASK_LENGTH));
  };

  // Guarda la tarea editada y cierra el modal
  const handleSaveEdit = () => {
    onSaveEdit(editedTask);
    onClose();
  };

  const handleClose = () => {
    setEditedTask(task); 
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="edit-task-modal"
      aria-describedby="edit-task-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxWidth: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="edit-task-modal" variant="h6" component="h2" gutterBottom>
          Editar Tarea
        </Typography>
        <TextField
          id="edit-task"
          label="Tarea"
          variant="outlined"
          fullWidth
          value={editedTask}
          onChange={handleEditInputChange}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleSaveEdit} sx={{ mr: 1 }}>
          Guardar
        </Button>
        <Button variant="contained" color="error" onClick={handleClose}>
          Cancelar
        </Button>
      </Box>
    </Modal>
  );
};

export default TaskModal;
