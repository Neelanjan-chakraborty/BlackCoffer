import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import Waitlist from "./pages/Waitlist";


// Components
import Header from "./components/header"; // Replace Navbar with Header

// Context
import { AuthProvider } from "./context/AuthContext";

// Install required dependencies
import 'socket.io-client';
import 'uuid';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Header /> {/* Use Header instead of Navbar */}
          <Routes>
            <Route path="/" element={<Index />} />
            {/* <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} /> */}
            <Route path="/waitlist" element={<Waitlist />} />
            {/* Redirect login and signup to waitlist */}
            <Route path="/login" element={<Navigate to="/waitlist" replace />} />
            <Route path="/signup" element={<Navigate to="/waitlist" replace />} />
            {/* Redirect chat to waitlist */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <Sonner />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;