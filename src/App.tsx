import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import BadgePage from './pages/BadgePage';
import type { User } from './types';

function App() {
  // Define alguns usuários de exemplo para a área administrativa. Esses dados podem ser
  // carregados de uma API no futuro; por enquanto são apenas mockados para mostrar
  // a funcionalidade de edição. A senha é armazenada somente no front-end para fins de demonstração.
  const initialUsers: User[] = [
    {
      id: 1,
      name: 'SD EP NOVAKOSKI',
      cpf: '12345678900',
      militaryId: 'MG1234567',
      password: 'senha123',
      vehicle: {
        type: 'carro',
        model: 'JETTA',
        color: 'BRANCO',
        plate: 'FFG-8D03',
        parkingNumber: '44-R',
        titular: false,
      },
    },
    {
      id: 2,
      name: 'TEN MORAES',
      cpf: '98765432100',
      militaryId: 'MG7654321',
      password: 'senha456',
      vehicle: {
        type: 'carro',
        model: 'FORD KA',
        color: 'BRANCO',
        plate: 'XYZ9E87',
        parkingNumber: '10-T',
        titular: true,
      },
    },
    {
      id: 3,
      name: 'SGT SILVA',
      cpf: '11122233344',
      militaryId: 'MG1122334',
      password: 'senha789',
      vehicle: {
        type: 'moto',
        model: 'CB 500',
        color: 'PRETO',
        plate: 'DEF4G56',
        parkingNumber: '22-M',
        titular: true,
      },
    },
  ];

  // Carrega usuários do localStorage ou usa os iniciais
  const loadUsers = (): User[] => {
    const stored = localStorage.getItem('users');
    return stored ? JSON.parse(stored) : initialUsers;
  };

  // Lista de usuários cadastrados no sistema (simulado localmente)
  const [users, setUsers] = useState<User[]>(loadUsers);
  // Usuário atualmente autenticado; null se não houver
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  // Flag que indica se o administrador está logado. Para fins de exemplo,
  // consideramos que o CPF "00000000000" e a senha "admin" correspondem ao admin.
  const [adminLogged, setAdminLogged] = useState(false);

  // Salva usuários no localStorage sempre que a lista mudar
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  /**
   * Manipula a autenticação de usuários ou administradores.
   * Se as credenciais forem do administrador, define adminLogged como true.
   * Caso contrário, procura um usuário com CPF/senha correspondente e define
   * currentUser com esse usuário.
   */
  const handleLogin = (cpf: string, password: string) => {
    // Remove formatação do CPF para comparação
    const cleanCpf = cpf.replace(/\D/g, '');

    // Verifica se é administrador
    if (cleanCpf === '00000000000' && password === 'admin') {
      setAdminLogged(true);
      setCurrentUser(null);
      return { success: true, redirect: '/admin' };
    }
    // Busca usuário existente (compara CPF sem formatação)
    const found = users.find((u) => u.cpf.replace(/\D/g, '') === cleanCpf && u.password === password);
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