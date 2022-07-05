import { Router } from 'express';
import bookController from '../controllers/bookController';
import WelcomeController from '../controllers/welcomeController';

const router = Router();

router.get('/', (req, res) => new WelcomeController(req, res).get());

router
  .route('/books')
  .get((req, res) => bookController.getBooks(req, res))
  .post((req, res) => bookController.createBook(req, res));

router
  .route('/books/:id')
  .get((req, res) => bookController.getBook(req, res))
  .delete((req, res) => bookController.deleteBook(req, res))
  .put((req, res) => bookController.updateBook(req, res));

export default router;
