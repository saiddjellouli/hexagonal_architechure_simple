import { AccountService } from 'application/services/accountService.js';
import { Request, Response } from 'express';
import AccountModel from 'infrastructure/persistence/models/AccountModel.js';

export class AccountController {
  private accountService: AccountService;

  constructor(accountService: AccountService) {
    this.accountService = accountService;
  }

  listAccounts = async (req: Request, res: Response): Promise<void> => {
    try {
      const accounts = this.accountService.listAccounts();
      res.json(accounts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getAccount = async (req: Request, res: Response): Promise<void> => {
    const { accountId } = req.params;

    try {
      const account = this.accountService.getAccount(accountId);
      res.json(account);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  createAccount = async (req: Request, res: Response): Promise<void> => {
    const { clientId } = req.body;

    try {
      const account = this.accountService.createAccount(clientId);
      res.json(account);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  saveAccount = async (req: Request, res: Response): Promise<void> => {
    const accountData = req.body;
  
    try {
      const accountModel = AccountModel.build(accountData); // Create an instance of AccountModel
      const account = this.accountService.saveAccount(accountModel);
      res.json(account);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  withdraw = async (req: Request, res: Response): Promise<void> => {
    const {accountId, value, description} = req.body;
    try {
        const withdraw = this.accountService.withdraw(accountId, value, description);
        res.json(withdraw);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
  }

  deposit = async (req: Request, res: Response): Promise<void> => {
    const {accountId, value, description} = req.body;
    try {
        const deposit = this.accountService.deposit(accountId, value, description);
        res.json(deposit);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
  }

  transfer = async (req: Request, res: Response): Promise<void> => {
    const {originId, destinationId, value, description} = req.body;
    try {
        const deposit = this.accountService.transfer(originId, destinationId, value, description);
        res.json(deposit);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
  }
  
  public routes(): void {
    const router = require('express').Router();
    router.get('/accounts', this.listAccounts);
    router.get('/accounts/:accountId', this.getAccount);
    router.post('/accounts', this.createAccount);
    router.put('/accounts/:accountId', this.saveAccount);
    router.post('/accounts/withdraw', this.withdraw);
    router.post('/accounts/deposit', this.withdraw);
    router.post('/accounts/transfer', this.withdraw);

    require('express')().use('/api', router);
  }
}
