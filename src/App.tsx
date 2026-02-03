import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import BadgePage from './pages/BadgePage';
import type { User } from './types';

function App() {
  // Lista de usuários cadastrados no sistema (simulado localmente)
  const [users, setUsers] = useState<User[]>([]);
  // Usuário atualmente autenticado; null se não houver
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  // Flag que indica se o administrador está logado. Para fins de exemplo,
  // consideramos que o CPF "00000000000" e a senha "admin" correspondem ao admin.
  const [adminLogged, setAdminLogged] = useState(false);

  /**
   * Manipula a autenticação de usuários ou administradores.
   * Se as credenciais forem do administrador, define adminLogged como true.
   * Caso contrário, procura um usuário com CPF/senha correspondente e define
   * currentUser com esse usuário.
   */
  const handleLogin = (cpf: string, password: string) => {
    // Verifica se é administrador
    if (cpf === '00000000000' && password === 'admin') {
      setAdminLogged(true);
      setCurrentUser(null);
      return { success: true, redirect: '/admin' };
    }
    // Busca usuário existente
    const found = users.find((u) => u.cpf === cpf && u.password === password);
    if (found) {
      setCurrentUser(found);
      setAdminLogged(false);
      return { success: true, redirect: '/dashboard' };
    }
    // Credenciais inválidas
    return { success: false };
  };

  /**
   * Registra um novo usuário no sistema.
   * Gera um ID incremental para o usuário e armazena na lista.
   */
  const handleRegister = (user: Omit<User, 'id'>) => {
    const nextId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    const newUser: User = { ...user, id: nextId };
    setUsers([...users, newUser]);
    return newUser;
  };

  /**
   * Atualiza um usuário existente na lista. Usado pelo painel de usuário e pelo administrador.
   */
  const handleUpdateUser = (updatedUser: User) => {
    setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    if (currentUser && currentUser.id === updatedUser.id) {
      setCurrentUser(updatedUser);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={<LoginPage onLogin={handleLogin} />}
        />
        <Route
          path="/register"
          element={<RegisterPage onRegister={handleRegister} />}
        />
        <Route
          path="/dashboard"
          element={
            currentUser ? (
              <UserDashboard user={currentUser} onSave={handleUpdateUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/admin"
          element={
            adminLogged ? (
              <AdminDashboard
                users={users}
                onUpdateUser={handleUpdateUser}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/badge/:id"
          element={<BadgePage users={users} />}
        />
      </Routes>
    </Router>
  );
}

export default App;