import './App.css';
import { MotionConfig } from 'framer-motion';
import Desktop from './components/os/Desktop';
import { LocaleProvider } from './i18n';

// reducedMotion="user": framer-motion drops transform animations (keeps
// opacity) when the OS asks for reduced motion.
function App() {
    return (
        <LocaleProvider>
            <MotionConfig reducedMotion="user">
                <div className="App">
                    <Desktop />
                </div>
            </MotionConfig>
        </LocaleProvider>
    );
}

export default App;
