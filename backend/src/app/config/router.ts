import { Router } from 'express';
import bookController from '../controllers/bookController';
import WelcomeController from '../controllers/welcomeController';

const router = Router();

router.get('/', (req, res) => new WelcomeController(req, res).get());

router.route('/books').get((req, res) => bookController.getBooks(req, res));

export default router;
