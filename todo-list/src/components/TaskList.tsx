import React from 'react';
import { List, Typography, Box, LinearProgress } from '@mui/material';
import TodoListItem from './TodoListItem';

interface TaskListProps {
  tasks: { task: string; completed: boolean }[]; // Lista de tareas con su estado de completado
  onToggleTask: (index: number) => void; // Función para cambiar el estado de una tarea
  onEditTask: (index: number) => void; // Función para editar una tarea
  onDeleteTask: (index: number) => void; // Función para eliminar una tarea
  filter: string; // Filtro actual de tareas
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleTask, onDeleteTask, onEditTask, filter }) => {
    // Filtra las tareas basado en el filtro actual
    const getFilteredTasks = () => {
    switch (filter) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'pending':
        return tasks.filter(task => !task.completed);
      case 'all':
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();

  return (
    <>
      {filteredTasks.length === 0 ? (
        <Typography variant="body1" sx={{ mt: 3 }}>
          {filter === 'completed' ? 'No hay tareas completadas.' : 'No hay tareas pendientes.'}
        </Typography>
      ) : (
        <List sx={{ width: '100%', maxWidth: 600, mt: 3 }}>
          {filteredTasks.map((task, index) => (
            <TodoListItem
              key={index}
              task={task.task}
              completed={task.completed}
              onToggle={() => onToggleTask(tasks.findIndex(t => t === task))}
              onDelete={() => onDeleteTask(tasks.findIndex(t => t === task))}
              onEdit={() => onEditTask(tasks.findIndex(t => t === task))}
            />
          ))}
        </List>
      )}

      {tasks.length > 0 && (
        <Box sx={{ width: '100%', maxWidth: 600, mt: 3 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            {`${tasks.filter(task => task.completed).length} de ${tasks.length} tareas completadas`}
          </Typography>
          <LinearProgress variant="determinate" value={(tasks.filter(task => task.completed).length / tasks.length) * 100} sx={{ mb: 2, bgcolor: 'success.main' }} />
        </Box>
      )}
    </>
  );
};

export default TaskList;
