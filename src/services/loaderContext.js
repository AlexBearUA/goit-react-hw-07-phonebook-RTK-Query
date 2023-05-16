// import { createContext, useContext, useState } from 'react';

// const LoaderContext = createContext();

// export const useLoader = () => useContext(LoaderContext);

// export const LoaderProvider = ({ children }) => {
//   const [isLoad, setIsLoading] = useState(false);

//   const load = loader => {
//     setIsLoading(loader);
//   };

//   return (
//     <LoaderContext.Provider value={{ isLoad, load }}>
//       {children}
//     </LoaderContext.Provider>
//   );
// };
