import './App.css';
import { MotionConfig } from 'framer-motion';
import Desktop from './components/os/Desktop';

// reducedMotion="user": framer-motion drops transform animations (keeps
// opacity) when the OS asks for reduced motion.
function App() {
    return (
        <MotionConfig reducedMotion="user">
            <div className="App">
                <Desktop />
            </div>
        </MotionConfig>
    );
}

export default App;
