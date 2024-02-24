import { AccountService } from "../../application/services/accountService.js";
import express from "express";
import { SequelizeAccountRepository } from "../../infrastructure/persistence/AccountRepository.js";
import { AccountController } from "../../web/controllers/AccountController.js";

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
router.post("/accounts/:accountId/deposit", accountController.deposit);
// Withdraw funds from an account
router.post("/accounts/:accountId/withdraw", accountController.withdraw);
// Transfer funds from one account to another
router.post(
  "/accounts/:originAccountId/transfer/:destinationAccountId",
  accountController.transfer
);
export default router;
