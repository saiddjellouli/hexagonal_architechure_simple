import sequelize from "../src/sequelize.js";
import express from "express";
import { AccountService } from "./application/services/accountService.js";
import { SequelizeAccountRepository } from "./infrastructure/persistence/AccountRepository.js";
import { AccountController } from "./web/controllers/AccountController.js";
import { initAccount } from "./infrastructure/persistence/models/AccountModel.js";
import { initTransaction } from "./infrastructure/persistence/models/TransactionModel.js";

const router = express.Router();
const accountRepository = new SequelizeAccountRepository();
const accountService = new AccountService(accountRepository);
const accountController = new AccountController(accountService);

// Create a new account
router.post("/accounts", accountController.createAccount);

// Get a specific account by ID
router.get("/accounts/:accountId", accountController.getAccount);

// List all accounts
router.get("/accounts", accountController.listAccounts);

// Deposit funds into an account
router.post("/accounts/deposit", accountController.deposit);

// Withdraw funds from an account
router.post("/accounts/withdraw", accountController.withdraw);

// Transfer funds from one account to another
router.post("/accounts", accountController.transfer);

const app = express();
const port = 3000;

initTransaction(sequelize);
initAccount(sequelize);

app.use(express.json());
app.use("/api", router);
app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to the database.");
    await sequelize.sync({ force: false });
    console.log("Tables synchronized.");
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
});
