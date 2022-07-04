import BaseController from '../config/controller';
import log from '../helpers/log';

class WelcomeController extends BaseController {
  public get() {
    log.server.setLog({
      type: 'info',
      log: 'hit endpoint of root',
    });
    this.response.send('welcome to server node TS');
  }
}

export default WelcomeController;
