import { ConfigEnv, defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  root: 'src/renderer', 
  plugins: [react()],
});