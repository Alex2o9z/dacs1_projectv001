import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Home } from './pages/home';
import { Auth } from './pages/auth';
import { RecipesList } from './pages/recipes/recipes-list';
import { IngredientsList } from './pages/ingredients/ingredients-list';
import { IngredientAdd } from './pages/ingredients/ingredient-add';
import { ProjectsList } from './pages/projects/projects-list';
import { Navbar } from "./components/navbar";
import { Sidebar } from "./components/sidebar";
import { Footer } from "./components/footer";

function App() {
  return (
    <div className="App">
      <Router>
        <div className='flex flex-row'>
          <Sidebar />
          <div className='w-full'>
            <Navbar />
            <Routes>
              <Route path="/" element={< Home />} />
              <Route path="/home" element={< Home />} />
              <Route path="/auth" element={< Auth />} />
              <Route path="/recipes-list" element={< RecipesList />} />
              <Route path="/ingredients-list" element={< IngredientsList />} />
              <Route path="/ingredient-add" element={< IngredientAdd />} />
              <Route path="/projects-list" element={< ProjectsList />} />
            </Routes>
            <Footer />
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;