import AuthController from "../controllers/AuthController"
import Route from "./route";

class AuthRoute extends Route{
  private authController = new AuthController();

  constructor() {
    super();
    this.prefix = '/auth';
    this.setRoutes();
  }

  protected setRoutes() {
    this.router.post('/mail_login', this.authController.mail_login);
    this.router.post('/register', this.authController.register);
    this.router.get('/google_login', this.authController.google_login);
    this.router.get('/google/callback', this.authController.google_callback);
    this.router.get('/me', this.authController.me);
    this.router.get('/verify', this.authController.verify);
    this.router.post('/temp_register', this.authController.temp_register);
  }
}

export default AuthRoute;
