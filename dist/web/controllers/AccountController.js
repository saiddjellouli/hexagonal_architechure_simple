import AccountModel from "../../infrastructure/persistence/models/AccountModel.js";
import { AccountService } from "../../application/services/accountService.js";

const accountService = new AccountService();

export class AccountController {
  listAccounts = async (req, res) => {
    accountService
      .listAccounts()
      .then((accounts) => res.status(200).send(accounts))
      .catch((err) => console.log(err));
  };
  getAccount = async (req, res) => {
    const { accountId } = req.params;
    try {
      const account = accountService.getAccount(accountId);
      res.json(account);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  createAccount = async (req, res) => {
    const { accountId, balance, clientId } = req.body;
    accountService
      .createAccount(accountId, balance, clientId)
      .then(() =>
        res.status(201).json({
          message: `Account with id ${accountId} successfully created.`,
        })
      )
      .catch((err) => res.status(500).json({ error: err.message }));
  };
  saveAccount = async (req, res) => {
    const { accountId, balance, clientId } = req.body;
    try {
      const account = accountService.saveAccount(accountId, balance, clientId);
      res.json(account);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  withdraw = async (req, res) => {
    const { accountId, value, description } = req.body;
    try {
      const withdraw = this.accountService.withdraw(
        accountId,
        value,
        description
      );
      res.json(withdraw);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  deposit = async (req, res) => {
    const { accountId, value, description } = req.body;
    try {
      const deposit = accountService.deposit(accountId, value, description);
      res.json(deposit);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  transfer = async (req, res) => {
    const { originId, destinationId, value, description } = req.body;
    try {
      const deposit = accountService.transfer(
        originId,
        destinationId,
        value,
        description
      );
      res.json(deposit);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  routes() {
    const router = require("express").Router();
    router.get("/accounts", this.listAccounts);
    router.get("/accounts/:accountId", this.getAccount);
    router.post("/accounts", this.createAccount);
    router.put("/accounts/:accountId", this.saveAccount);
    router.post("/accounts/withdraw", this.withdraw);
    router.post("/accounts/deposit", this.withdraw);
    router.post("/accounts/transfer", this.withdraw);
    require("express")().use("/api", router);
  }
}
