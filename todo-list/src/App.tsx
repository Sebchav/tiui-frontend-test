import React, { useState, useEffect } from 'react';
import { Typography, Box, Button } from '@mui/material';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskModal from './components/EditTaskModal';
import { Task } from './types/task';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem('tasks'); // Obtiene las tareas almacenadas del localStorage
    return storedTasks ? JSON.parse(storedTasks) : []; // Parsea las tareas almacenadas o devuelve un array vacío
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('all'); // Estado para el filtro

  // Carga las tareas almacenadas del localStorage al montar la aplicación
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Guarda las tareas en el localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);


  // Añade una nueva tarea a la lista
  const handleAddTask = (task: string) => {
    setTasks([...tasks, { task, completed: false }]);
  };

  // Inicia la edición de una tarea al hacer clic en el botón de editar
  const handleEditTask = (index: number) => {
    setCurrentTaskIndex(index);
    setIsModalOpen(true);
  };

   // Elimina una tarea de la lista
  const handleDeleteTask = (index: number) => {
    if (window.confirm('¿Estás seguro de eliminar esta tarea?')) {
      setTasks(tasks.filter((_, i) => i !== index));
    }
  };

  // Cambia el estado de completado de una tarea
  const handleToggleTask = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };


  // Guarda la tarea editada y cierra el modal
  const handleSaveEdit = (editedTask: string) => {
    if (currentTaskIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[currentTaskIndex].task = editedTask;
      setTasks(updatedTasks);
      setIsModalOpen(false);
    }
  };


  // Cierra el modal de edición
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Cambia el filtro de las tareas a mostrar
  const handleFilterChange = (filter: string) => {
    setFilter(filter);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          minHeight: '100vh',
          padding: '20px',
          textAlign: 'center', // Centra el contenido
        }}
      >
        <Typography variant="h3" component="h1" sx={{ mb: 3 }}>
          Task Master
        </Typography>

        {/* Botones de filtro */}
        <Box sx={{ mb: 2, display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center" }}>
          <Button
            variant={filter === 'all' ? 'contained' : 'outlined'}
            onClick={() => handleFilterChange('all')}
            sx={{ mx: 1 }}
          >
            Todas
          </Button>
          <Button
            variant={filter === 'completed' ? 'contained' : 'outlined'}
            onClick={() => handleFilterChange('completed')}
            sx={{ mx: 1 }}
          >
            Completadas
          </Button>
          <Button
            variant={filter === 'pending' ? 'contained' : 'outlined'}
            onClick={() => handleFilterChange('pending')}
            sx={{ mx: 1 }}
          >
            Pendientes
          </Button>
        </Box>

        {/* Formulario para añadir tareas */}
        <TaskForm onAddTask={handleAddTask} />

        {/* Lista de tareas */}
        <TaskList
          tasks={tasks}
          onToggleTask={handleToggleTask}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          filter={filter}
        />

        {/* Modal de edición de tarea */}
        <TaskModal
          isOpen={isModalOpen}
          task={tasks[currentTaskIndex ?? 0]?.task || ''}
          onSaveEdit={handleSaveEdit}
          onClose={handleCloseModal}
        />
      </Box>
    </>
  );
};

export default App;
