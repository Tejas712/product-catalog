import React, {
  createContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { Snackbar, Alert, AlertColor, SnackbarProps } from "@mui/material";

type SnackbarOptions = SnackbarProps & {
  message: string;
  severity?: AlertColor;
  duration?: number;
};

type SnackbarContextType = {
  showSnackbar: (options: SnackbarOptions) => void;
  hideSnackbar: () => void;
};

export const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

type SnackbarProviderProps = {
  children: ReactNode;
};

const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
  const [snackbarState, setSnackbarState] = useState<
    {
      open: boolean;
      message: string;
      severity: AlertColor;
    } & SnackbarProps
  >({
    open: false,
    message: "",
    severity: "info",
  });

  const showSnackbar = useCallback(
    ({
      message,
      severity = "info",
      duration = 3000,
      ...rest
    }: SnackbarOptions) => {
      setSnackbarState({ open: true, message, severity, ...rest });

      setTimeout(() => {
        setSnackbarState((prev) => ({ ...prev, open: false }));
      }, duration);
    },
    []
  );

  const hideSnackbar = useCallback(() => {
    setSnackbarState((prev) => ({ ...prev, open: false }));
  }, []);

  return (
    <SnackbarContext.Provider value={{ showSnackbar, hideSnackbar }}>
      {children}
      <Snackbar
        autoHideDuration={6000}
        onClose={hideSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        {...snackbarState}
        
      >
        <Alert
          onClose={hideSnackbar}
          severity={snackbarState.severity}
          sx={{ width: "100%" }}
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
