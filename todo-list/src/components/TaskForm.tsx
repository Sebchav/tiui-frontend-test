import React, { useState, ChangeEvent } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface TaskFormProps {
  onAddTask: (task: string) => void; // Función para añadir una nueva tarea
}

const MAX_TASK_LENGTH = 50; // Longitud máxima para una tarea

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState<string>(''); // Estado para la nueva tarea
  
  // Maneja cambios en el input de la nueva tarea
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value.substring(0, MAX_TASK_LENGTH));
  };

  // Añade una nueva tarea a la lista
  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      onAddTask(newTask);
      setNewTask('');
    } else {
      alert('No puedes añadir una tarea vacía');
    }
  };

  return (
    <Grid container spacing={2} justifyContent="center" maxWidth="800px">
      <Grid item xs={12} md={6}>
        <TextField
          id="outlined-basic"
          label="Ej. Lavar la ropa"
          variant="outlined"
          fullWidth
          value={newTask}
          onChange={handleInputChange}
        />
      </Grid>

      <Grid item xs={12} md={2}>
        <Button variant="contained" onClick={handleAddTask} startIcon={<AddIcon />} fullWidth>
          Añadir Tarea
        </Button>
      </Grid>
    </Grid>
  );
};

export default TaskForm;
