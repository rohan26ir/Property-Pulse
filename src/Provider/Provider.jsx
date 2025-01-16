
export const AuthContext = createContext();

const Provider = ({ children }) => {

 


  const authInfo = {

  };

  return (
    <AuthContext.Provider  value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default Provider;